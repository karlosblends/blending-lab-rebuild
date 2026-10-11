import { randomBytes, randomUUID } from "node:crypto";
import { route, json, sessionCookie, hash, authenticate, publicConversation } from "../../../lib/planner/http.js";
import { blankBrief } from "../../../lib/planner/knowledge.js";

export const prerender = false;

export const GET = (context) => route(context, async ({ cookies, store, config }) => {
  if (!cookies.has(sessionCookie)) return json({ conversation: null, mode: config.demo ? "demo" : "live", placeholder_pricing: false });
  const conversation = await authenticate(cookies, store);
  return json({ conversation: publicConversation(conversation, config) });
}, { mutation: false });

export const POST = (context) => route(context, async ({ cookies, store, config }) => {
  const token = randomBytes(32).toString("hex");
  const conversation = await store.save({
    id: randomUUID(), token_hash: hash(token), version: 0,
    created_at: new Date().toISOString(), expires_at: new Date(Date.now() + 7 * 86400000).toISOString(),
    messages: [], brief: blankBrief(), recommendation: null, pending: null,
    contact: null, submitted_at: null, notification: null,
  }, 0);
  cookies.set(sessionCookie, `${conversation.id}.${token}`, { httpOnly: true, secure: config.production, sameSite: "strict", path: "/api/planner", maxAge: 7 * 86400 });
  return json({ conversation: publicConversation(conversation, config) }, 201);
});
