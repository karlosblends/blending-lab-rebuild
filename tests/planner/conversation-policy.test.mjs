import test from "node:test";
import assert from "node:assert/strict";
import { blankBrief, recommend, qualify, missingInformation } from "../../src/lib/planner/knowledge.js";
import { demoTurn, systemPrompt, validateTurn } from "../../src/lib/planner/engine.js";
import { pricingRules, approvedEstimate, pricingAnswer } from "../../src/lib/planner/pricing-rules.js";
import { recommendationText } from "../../src/lib/planner/recommendation-text.js";
import { notificationText } from "../../src/lib/planner/notifications.js";

const focused = () => ({ ...blankBrief(), project_type: "Landing page", engagement: "website", goal: "Explain our offer and get enquiries", scope: "One landing page", scope_size: "landing_page", market: "local", needs_development: false, delivery_preference: "design_only", complexity: "focused", fit: "aligned" });

test("published hourly reference is separate from project fees and model-generated estimates", () => {
  assert.match(pricingAnswer("What is your hourly rate?"), /€40\/hour/);
  assert.match(pricingAnswer("What is your hourly rate?"), /does not determine a fixed project quote/);
  assert.equal(pricingAnswer("We need forty hours of work"), null);
  assert.match(systemPrompt(blankBrief()), /Send project to Karlo/);
  assert.doesNotMatch(systemPrompt(blankBrief()), /no visitor submission control|no hourly tracking/);
});

test("an undecided budget and date do not erase explicit implementation ownership", () => {
  const c = chat("We have a B2B SaaS product with a messy interface and need a new dashboard.", "UX/UI only. Our developers will build it. Budget and launch timing are not decided.");
  assert.equal(c.brief.needs_development, false);
  assert.equal(c.brief.delivery_preference, "design_only");
  assert.equal(c.brief.budget, "Not decided");
  assert.equal(c.brief.timeline, "Not decided");
});
function chat(...messages) {
  const c = { brief: blankBrief(), messages: [] };
  for (const content of messages) {
    c.messages.push({ role: "user", content });
    const turn = demoTurn(c);
    c.brief = turn.brief; c.messages.push({ role: "assistant", content: turn.reply, question: turn.question });
  }
  return c;
}

test("unapproved project anchors cannot turn into numeric ranges by default", () => {
  const r = recommend(focused());
  assert.equal(r.budget, null); assert.equal(r.duration, null);
  assert.equal(r.placeholder, false);
  assert.doesNotMatch(recommendationText(r), /€|\d+–\d+ weeks/);
  assert.equal(pricingRules.anchors.landing_page.local, 800);
  assert.equal(pricingRules.anchors.landing_page.global, 1200);
});

test("monthly reference keeps the same rate and capacity across markets", () => {
  for (const market of ["local", "global", null]) {
    const r = recommend({ ...focused(), working_model: "ongoing", market });
    assert.equal(r.budget.min, 2000); assert.equal(r.budget.period, "month");
    assert.equal(r.capacity.hours_per_week, 20);
    assert.equal(r.duration, null);
    assert.match(recommendationText(r), /€2,000\/month/);
    assert.doesNotMatch(recommendationText(r), /Example pricing/);
  }
  assert.equal(approvedEstimate({ ...focused(), working_model: "pilot" }), null);
  assert.equal(approvedEstimate({ ...focused(), working_model: "ongoing", technical_review: true }), null);
  assert.match(pricingAnswer("What does the monthly retainer cost?"), /€2,000\/month/);
  assert.equal(pricingAnswer("We have an ongoing product backlog"), null);
});

test("FAQ and case study questions preserve the brief and role boundaries", () => {
  const b = focused();
  const c = { brief: b, messages: [{ role: "user", content: "Do you also build the backend?" }] };
  assert.deepEqual(demoTurn(c).brief, b);
  assert.match(demoTurn(c).reply, /review/);
  c.messages = [{ role: "user", content: "Tell me about your Visit Šibenik work" }];
  assert.match(demoTurn(c).reply, /MOA'TI/);
  c.messages = [{ role: "user", content: "Tell me about your super.AI experience" }];
  assert.match(demoTurn(c).reply, /concept/);
  assert.deepEqual(demoTurn(c).brief, b);
});

test("unknown implementation and declined budget do not trap visitors in repeated questions", () => {
  const c = chat("We have an existing B2B SaaS product with a messy interface and a dashboard.", "I'm not sure who will build it", "Timing isn't decided yet", "No budget yet");
  assert.equal(c.brief.delivery_preference, "undecided");
  assert.equal(c.brief.needs_development, null);
  assert.equal(c.brief.timeline, "Not decided");
  assert.equal(c.brief.budget, "Not decided");
  assert.equal(c.messages.at(-1).question, null);
  assert.ok(recommend(c.brief));
  assert.equal(qualify(c.brief, recommend(c.brief)).signals.budget_shared, false);
  assert.ok(missingInformation(c.brief).some((s) => /budget.*not decided/i.test(s)));
});

test("ongoing work and paid pilots stay distinct from a one-off project", () => {
  const c = chat("We have an existing SaaS product, release features every month and need ongoing design alongside our developers. Start with onboarding.");
  assert.equal(c.brief.working_model, "ongoing");
  assert.equal(c.brief.needs_development, false);
  assert.match(recommend(c.brief).title, /Ongoing/);
  const pilot = chat("We have an existing SaaS dashboard and our developers handle the build. We want to start with a paid pilot before a retainer.");
  assert.equal(pilot.brief.working_model, "pilot");
  assert.equal(recommend(pilot.brief).budget, null);
});

test("backend requirements need review, explicit design-only correction clears that concern", () => {
  const c = chat("We need a new app with onboarding and backend infrastructure. Both design and development.");
  assert.equal(c.brief.technical_review, true); assert.equal(c.brief.fit, "needs_review");
  assert.equal(recommend(c.brief, { demoEstimates: true }).budget, null);
  c.messages.push({ role: "user", content: "Actually UX/UI only; our developers handle the backend." });
  const turn = demoTurn(c);
  assert.equal(turn.brief.needs_development, false);
  assert.equal(turn.brief.technical_review, false);
  assert.equal(turn.brief.fit, "aligned");
});

test("pricing market uses a stated location, never language or audience", () => {
  const local = chat("We are based in Zagreb, Croatia and need a landing page. Design only.");
  assert.equal(local.brief.market, "local");
  const global = chat("We are based in London and need a landing page. Design only.");
  assert.equal(global.brief.market, "global");
  const unknown = chat("We need a landing page for a global audience. Design only.");
  assert.equal(unknown.brief.market, null);
  assert.equal(unknown.messages.at(-1).question, "market");
});

test("brief extraction schema rejects invalid decisions and keeps monetary output server-owned", () => {
  assert.deepEqual(validateTurn({ reply: "Which page should we focus on?", brief: focused(), question: "scope" }).brief, focused());
  assert.throws(() => validateTurn({ reply: "The price is €800", brief: focused(), question: null }), /verify/);
  assert.throws(() => validateTurn({ reply: "What matters first?", brief: { ...focused(), market: "cheap" }, question: "goal" }), /invalid/);
  assert.throws(() => validateTurn({ reply: "What matters first?", brief: { ...focused(), uncertainties: [2000] }, question: "goal" }), /invalid/);
  const prompt = systemPrompt(blankBrief());
  assert.match(prompt, /Actively welcome/); assert.match(prompt, /never language/);
  assert.match(prompt, /not automatically|do not automatically|do not make/i);
});

test("lead notifications support unpriced projects and monthly references", () => {
  for (const working_model of ["project", "ongoing"]) {
    const brief = { ...focused(), working_model };
    const c = { id: "test", contact: { name: "Visitor", email: "visitor@example.com" }, brief, project_summary: brief.goal, recommendation: recommend(brief), lead_quality: qualify(brief, recommend(brief)), missing_information: missingInformation(brief), messages: [] };
    const text = notificationText(c);
    assert.match(text, /Needs scope review/);
    if (working_model === "ongoing") assert.match(text, /2000–2000\/month/);
  }
});

test("approved project rules require a supported service, market and bounded scope", () => {
  const pack = pricingRules.packages.landing_page_design;
  const previous = { status: pack.status, ranges: pack.ranges };
  try {
    pack.status = "approved";
    pack.ranges = { local: [800, 1200], global: [1200, 2000] }; // Synthetic approval fixture, not business approval.
    assert.deepEqual(approvedEstimate(focused()).budget, { min: 800, max: 1200, currency: "EUR" });
    assert.deepEqual(approvedEstimate({ ...focused(), market: "global" }).budget, { min: 1200, max: 2000, currency: "EUR" });
    assert.equal(approvedEstimate({ ...focused(), market: null }), null);
    assert.equal(approvedEstimate({ ...focused(), complexity: "expanded" }), null);
    assert.equal(approvedEstimate({ ...focused(), technical_review: true }), null);
    assert.equal(approvedEstimate({ ...focused(), needs_development: true }), null);
    assert.equal(approvedEstimate({ ...focused(), engagement: "product" }), null);
    assert.equal(approvedEstimate({ ...focused(), delivery_preference: "undecided" }), null);
    assert.equal(approvedEstimate({ ...focused(), complexity: "unknown" }), null);
    assert.doesNotMatch(recommendationText(recommend(focused())), /Example pricing/);
    assert.equal(recommend(focused()).duration, null);
    pack.ranges.local = null;
    assert.equal(approvedEstimate(focused()), null);
  } finally { Object.assign(pack, previous); }
});

test("a Webflow package cannot price a different implementation technology", () => {
  const pack = pricingRules.packages.landing_page_design_build;
  const previous = { status: pack.status, ranges: pack.ranges };
  try {
    Object.assign(pack, { status: "approved", ranges: { local: [800, 1200], global: [1200, 2000] } });
    const brief = { ...focused(), needs_development: true, delivery_preference: "design_and_frontend", technology: "Webflow" };
    assert.ok(approvedEstimate(brief));
    assert.equal(approvedEstimate({ ...brief, technology: "React" }), null);
    assert.equal(approvedEstimate({ ...brief, technology: null }), null);
  } finally { Object.assign(pack, previous); }
});

test("standalone Webflow work stays a build engagement without a compulsory redesign", () => {
  const c = chat("We need standalone Webflow development from ready Figma designs, 5 pages with responsive layouts. We are based in Croatia.");
  assert.equal(c.brief.engagement, "webflow");
  assert.equal(c.brief.technology, "Webflow");
  assert.equal(c.brief.needs_development, true);
  assert.equal(c.brief.delivery_preference, "existing_design_build");
  assert.equal(c.brief.technical_review, false);
  assert.equal(c.brief.fit, "aligned");
  const r = recommend(c.brief);
  assert.equal(r.title, "Webflow development");
  assert.ok(r.process.some((item) => /supplied designs/.test(item)));
  assert.ok(!r.scope.some((item) => /audit|discovery workshop|full redesign/i.test(item)));
  assert.equal(r.budget, null);
});

test("a few design components stay a small project without a landing-page minimum", () => {
  const c = chat("We need design only for 3 UI components, buttons and a modal. Our budget is limited.");
  assert.equal(c.brief.engagement, "components");
  assert.equal(c.brief.scope_size, "component_set");
  assert.equal(c.brief.needs_development, false);
  assert.equal(c.brief.fit, "aligned");
  const r = recommend(c.brief);
  assert.match(r.title, /component/i);
  assert.equal(r.budget, null);
  assert.doesNotMatch(r.scope.join(" "), /full design system|discovery workshop|product audit/i);
  assert.match(pricingRules.strategy.minimumPolicy, /not a universal minimum/);
});

test("a straightforward complete Webflow site remains supported design-and-build work", () => {
  const c = chat("We need a full website design and build in Webflow, 5 pages. We are based in London.");
  assert.equal(c.brief.engagement, "website");
  assert.equal(c.brief.needs_development, true);
  assert.equal(c.brief.technical_review, false);
  const r = recommend(c.brief);
  assert.match(r.title, /Webflow build/);
  assert.ok(r.scope.includes("Webflow implementation"));
  assert.ok(!r.scope.includes("Developer handoff"));
});

test("acquisition guidance preserves commercial honesty and later evidence-based review", () => {
  const prompt = systemPrompt(blankBrief());
  assert.doesNotMatch(prompt, /Lead with design|Offer implementation selectively/);
  assert.match(prompt, /winning suitable paid projects/);
  assert.match(prompt, /no premium positioning/);
  assert.match(prompt, /no.*invented discount/);
  assert.equal(pricingRules.strategy.phase, "initial_evidence_gathering");
  assert.match(pricingRules.strategy.changePolicy, /no automatic increase/);
});
