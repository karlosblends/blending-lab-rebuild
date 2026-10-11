import { randomUUID } from "node:crypto";
import { route, json, requestBody, authenticate, publicConversation, enrichment } from "../../../lib/planner/http.js";
import { PlannerError } from "../../../lib/planner/config.js";
import { generateTurn } from "../../../lib/planner/engine.js";
import { recommend } from "../../../lib/planner/knowledge.js";
import { pricingAnswer } from "../../../lib/planner/pricing-rules.js";
import { recommendationText } from "../../../lib/planner/recommendation-text.js";

import { nextAction, firstReplyGreeting } from "../../../lib/planner/conversation-boundary.js";

export const prerender = false;

export const POST = (context) => route(context, async ({ request, cookies, config, store }) => {
  const body = await requestBody(request);
  if (typeof body.message !== "string" || !body.message.trim() || body.message.length > 6000 || !/^[a-f0-9-]{36}$/.test(body.message_id || "")) throw new PlannerError("Please enter a message of up to 6,000 characters.");
  let conversation = await authenticate(cookies, store);
  if (conversation.submitted_at) throw new PlannerError("This project has already been submitted. Start a new conversation to plan another project.", 409);
  const existing = conversation.messages.find((message) => message.id === body.message_id);
  if (existing && (existing.role !== "user" || existing.content !== body.message.trim())) throw new PlannerError("That message identifier is already in use.", 409);
  if (conversation.messages.some((message) => message.reply_to === body.message_id)) return json({ conversation: publicConversation(conversation, config) });
  if (conversation.closed) throw new PlannerError("This conversation has ended. For a website or product design enquiry, email karlo@blending-lab.com.", 409);
  if (conversation.pending && Date.parse(conversation.pending.expires_at) > Date.now()) throw new PlannerError("I'm still working on your last message. Please try again in a moment.", 409);
  if (!existing && conversation.messages.filter((m) => m.role === "user").length >= 40) throw new PlannerError("Your brief has plenty of context. Send it to Karlo, or start a new project.", 429);
  if (!existing && conversation.messages.at(-1)?.role === "user") throw new PlannerError("Please retry your last message before sending another.", 409);
  const lease = randomUUID();
  conversation = await store.save({ ...conversation,
    messages: existing ? conversation.messages : [...conversation.messages, { id: body.message_id, role: "user", content: body.message.trim(), created_at: new Date().toISOString() }],
    pending: { id: lease, expires_at: new Date(Date.now() + 60000).toISOString() },
  }, conversation.version);
  try {
    const turn = await generateTurn(conversation, config);
    const current = await store.get(conversation.id);
    if (current.pending?.id !== lease) throw new PlannerError("Your conversation changed. Please refresh to see the latest reply.", 409);
    const recommendation = recommend(turn.brief, { demoEstimates: config.demoEstimates });
    const offTopic = turn.intent === "off_topic";
    const summaryRequested = !offTopic && /\b(?:summary|summari[sz]e|recap|project brief|sažetak)\b/i.test(body.message);
    const commercialAnswer = offTopic ? null : pricingAnswer(body.message);
    // Maintain the full recommendation privately; only show a report when requested.
    const content = (offTopic ? turn.reply : firstReplyGreeting(turn.reply, current.messages)) + (commercialAnswer && !(summaryRequested && recommendation?.budget?.period === "month") ? `\n\n${commercialAnswer}` : "") + (summaryRequested && recommendation ? `\n\n${recommendationText(recommendation)}` : "");
    const next = enrichment({ ...current, brief: turn.brief, recommendation, pending: null,
      off_topic_count: offTopic ? (current.off_topic_count || 0) + 1 : turn.intent === "small_talk" ? current.off_topic_count || 0 : 0, closed: Boolean(turn.closed),
      messages: [...current.messages, { id: randomUUID(), role: "assistant", content, action: nextAction(turn, body.message), question: turn.question || null, reply_to: body.message_id, created_at: new Date().toISOString() }],
    });
    conversation = await store.save(next, current.version);
    return json({ conversation: publicConversation(conversation, config) });
  } catch (error) {
    const current = await store.get(conversation.id);
    if (current.pending?.id === lease) await store.save({ ...current, pending: null }, current.version);
    throw error;
  }
});
