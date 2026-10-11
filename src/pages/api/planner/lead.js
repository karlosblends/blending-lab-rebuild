import { route, json, requestBody, authenticate, publicConversation, enrichment } from "../../../lib/planner/http.js";
import { PlannerError } from "../../../lib/planner/config.js";
import { notify } from "../../../lib/planner/notifications.js";

export const prerender = false;

export const POST = (context) => route(context, async ({ request, cookies, config, store }) => {
  const body = await requestBody(request);
  if (body.website_trap) throw new PlannerError("Please try again.");
  let conversation = await authenticate(cookies, store);
  if (conversation.pending && Date.parse(conversation.pending.expires_at) > Date.now()) throw new PlannerError("Please wait for the current reply before submitting.", 409);
  if (conversation.messages.at(-1)?.role === "user") throw new PlannerError("Please retry your last message before submitting.", 409);
  if (!conversation.messages.some((m) => m.role === "user")) throw new PlannerError("Describe your project before sending it to Karlo.");
  if (!conversation.submitted_at) {
    if (typeof body.name !== "string" || body.name.trim().length < 2 || body.name.length > 120 || typeof body.email !== "string" || body.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) || typeof body.company !== "string" || body.company.length > 300 || body.consent !== true) throw new PlannerError("Please add your name, a valid email and permission to send this conversation.");
    conversation = await store.save(enrichment({ ...conversation,
      contact: { name: body.name.trim(), email: body.email.trim(), company: body.company.trim() || null },
      submitted_at: new Date().toISOString(), consent: { version: "planner-v1", accepted_at: new Date().toISOString(), text: "Send my contact details, project brief and full conversation to Blending Lab to respond to my enquiry." },
      notification: { status: "pending" },
    }), conversation.version);
  }
  if (!["sent", "local_inbox"].includes(conversation.notification?.status)) {
    try {
      const notification = await notify(conversation, config);
      const latest = await store.get(conversation.id);
      conversation = await store.save({ ...latest, notification }, latest.version);
    } catch {
      const latest = await store.get(conversation.id);
      conversation = await store.save({ ...latest, notification: { status: "failed", attempted_at: new Date().toISOString() } }, latest.version);
    }
  }
  return json({ conversation: publicConversation(conversation, config) });
});
