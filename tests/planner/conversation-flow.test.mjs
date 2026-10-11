import test from "node:test";
import assert from "node:assert/strict";
import { blankBrief } from "../../src/lib/planner/knowledge.js";
import { closingGuidance, meetingReady } from "../../src/lib/planner/conversation-flow.js";
import { nextAction } from "../../src/lib/planner/conversation-boundary.js";

const dashboard = { ...blankBrief(), engagement: "product", goal: "Clearer dashboard", scope_size: "product_flow", needs_development: false, delivery_preference: "design_only" };
test("a rough supported scope is enough for a call without budget, date or location", () => {
  assert.equal(meetingReady(dashboard), true);
  assert.match(closingGuidance({ messages: [] }, dashboard), /READY FOR A CALL/);
  assert.equal(meetingReady({ ...dashboard, needs_development: null, delivery_preference: null }), false);
  assert.equal(meetingReady({ ...dashboard, needs_development: null, delivery_preference: "undecided" }), true);
  assert.equal(meetingReady({ ...dashboard, fit: "outside_scope" }), false);
  assert.equal(meetingReady(blankBrief()), false);
});
test("existing call invitations are respected, and natural invitations show the contact control", () => {
  assert.match(closingGuidance({ messages: [{ role: "assistant", action: "contact", content: "Would you like a quick call?" }] }, dashboard), /do not restart discovery/);
  const turn = { brief: dashboard, intent: "project", question: null, reply: "I can design the dashboard. How about a quick call so we can work through the scope?" };
  assert.equal(nextAction(turn, "UX/UI only"), "contact");
  assert.equal(nextAction({ ...turn, intent: "off_topic" }, "UX/UI only"), "none");
});
