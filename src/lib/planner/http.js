import { createHash, timingSafeEqual } from "node:crypto";
import { plannerConfig, assertConfigured, PlannerError } from "./config.js";
import { createStore } from "./store.js";
import { missingInformation, qualify } from "./knowledge.js";

export const sessionCookie = "bl_project_planner";
export const hash = (value) => createHash("sha256").update(value).digest("hex");
export const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), {
  status, headers: { "Content-Type": "application/json", "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff", ...headers },
});

export async function requestBody(request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new PlannerError("Please send a JSON request.", 415);
  // Bound streamed input too; Content-Length can be absent or forged.
  const reader = request.body?.getReader();
  if (!reader) throw new PlannerError("Invalid request.");
  const chunks = []; let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 20000) { await reader.cancel(); throw new PlannerError("That message is too long.", 413); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  let body;
  try { body = JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new PlannerError("Invalid request."); }
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new PlannerError("Invalid request.");
  return body;
}

export function publicConversation(conversation, config) {
  return {
    id: conversation.id, messages: conversation.messages.map(({ id, role, content, created_at, action }) => ({ id, role, content, created_at, action: action || "none" })),
    brief: conversation.brief, recommendation: conversation.recommendation,
    missing_information: missingInformation(conversation.brief), submitted: Boolean(conversation.submitted_at), closed: Boolean(conversation.closed),
    pending: Boolean(conversation.pending && Date.parse(conversation.pending.expires_at) > Date.now()),
    notification: conversation.notification?.status || null,
    mode: config.demo ? "demo" : "live", storage: config.supabaseUrl ? "supabase" : "local",
    placeholder_pricing: Boolean(conversation.recommendation?.placeholder),
  };
}

export async function authenticate(cookies, store) {
  const credential = cookies.get(sessionCookie)?.value || "";
  const [id, token] = credential.split(".");
  if (!/^[a-f0-9-]{36}$/.test(id || "") || !/^[a-f0-9]{64}$/.test(token || "")) throw new PlannerError("Please start a new project conversation.", 401);
  const conversation = await store.get(id);
  const supplied = Buffer.from(hash(token));
  const expected = Buffer.from(conversation?.token_hash || "");
  if (!conversation || supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) throw new PlannerError("Please start a new project conversation.", 401);
  if (Date.parse(conversation.expires_at) < Date.now()) throw new PlannerError("This project session has expired. Please start a new conversation.", 401);
  return conversation;
}

export function enrichment(conversation) {
  return { ...conversation, project_summary: conversation.brief.goal || "Early project enquiry", lead_quality: qualify(conversation.brief, conversation.recommendation), missing_information: missingInformation(conversation.brief) };
}

export async function route(context, handler, { mutation = true, rate = true } = {}) {
  try {
    const config = plannerConfig(); assertConfigured(config);
    const { request } = context;
    if (mutation && request.headers.get("origin") !== new URL(request.url).origin) throw new PlannerError("Please use the planner on this website.", 403);
    const store = createStore(config);
    if (rate) {
      // Vercel overwrites this header; don't trust an arbitrary X-Forwarded-For in production.
      const ip = config.production ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() : context.clientAddress;
      const key = hash(`planner:ip:${ip || "unknown"}`);
      const allowed = await store.rateLimit(key, 35, 600);
      const dailyAllowed = await store.rateLimit(`${key}:daily`, 150, 86400);
      if (!allowed || !dailyAllowed) return json({ error: "You've sent quite a few requests. Please take a break and try again later." }, 429, { "Retry-After": "600" });
    }
    return await handler({ request, cookies: context.cookies, config, store });
  } catch (error) {
    if (!(error instanceof PlannerError)) console.error("Planner request failed:", error.name);
    return json({ error: error instanceof PlannerError ? error.message : "Something went wrong. Please retry or email karlo@blending-lab.com." }, error instanceof PlannerError ? error.status : 500);
  }
}
