import { approvedEstimate } from "./pricing-rules.js";
import { businessKnowledge, plannerCharacter } from "./business-knowledge.js";

export const knowledge = { ...businessKnowledge, character: plannerCharacter, process: businessKnowledge.draftAdvice.process };

// Unapproved fixtures are available only when explicitly enabled in local development.
export const engagements = {
  product: {
    title: "Focused product UX/UI work", price: [3000, 5000], weeks: [3, 5],
    scope: ["Product audit", "Core user flows", "Dashboard or key screen UX/UI", "UI system", "Clickable prototype", "Developer handoff"],
    assumptions: ["One focused product area", "An existing product to review, where applicable", "Feedback from one decision-maker"],
  },
  website: {
    title: "Marketing website design", price: [2500, 4500], weeks: [3, 5],
    scope: ["Content and site structure", "Key page UX/UI", "Responsive design", "Reusable components", "Developer handoff"],
    assumptions: ["Page count, content and CMS requirements to be agreed", "Brand and copy supplied by your team", "Feedback from one decision-maker"],
  },
  new_product: {
    title: "New product discovery & design", price: [4000, 7000], weeks: [4, 7],
    scope: ["Understand the first-release goal", "MVP scope and user flows", "Core screen UX/UI", "UI system", "Clickable prototype", "Developer handoff"],
    assumptions: ["A focused first release", "Access to users or existing research", "Backend engineering scoped separately"],
  },
  webflow: {
    title: "Webflow development", price: null, weeks: null,
    scope: ["Review supplied designs or the existing Webflow site", "Build responsive pages and agreed interactions", "Set up agreed CMS requirements", "Check the build and agree launch responsibilities"],
    assumptions: ["Designs or the required changes are supplied", "Content, CMS and integrations are scoped before the build"],
  },
  components: {
    title: "Focused UI component work", price: null, weeks: null,
    scope: ["Agree the component list and required variants", "Design or refine components and important states", "Document usage and hand off the agreed work"],
    assumptions: ["A bounded component list", "An existing brand or interface direction where available"],
  },
  discovery: {
    title: "Project discovery", price: [750, 1500], weeks: [1, 2],
    scope: ["Discovery session", "Current experience review", "Prioritised opportunities", "A scoped project roadmap"],
    assumptions: ["A focused discovery phase", "The full build is priced separately"],
  },
};

export const blankBrief = () => ({
  project_type: null, existing_product: null, audience: null, goal: null,
  scope: null, timeline: null, budget: null, needs_development: null,
  complexity: "unknown", engagement: null, working_model: null,
  delivery_preference: null, fit: null, technical_review: false, uncertainties: [],
  market: null, location: null, scope_size: "unknown", technology: null,
});

export function missingInformation(brief) {
  return [
    ["project_type", "Project type"], ["goal", "Main goal"], ["scope", "Key screens or pages"],
    ["needs_development", "Design or design + frontend"], ["timeline", "Preferred timing"], ["budget", "Available budget"],
  ].filter(([key]) => brief[key] == null || brief[key] === "Not decided").map(([key, label]) => brief[key] === "Not decided" ? `${label} (not decided)` : label);
}

// Numerical estimates and deliverables are derived here, never accepted from model output.
export function recommend(brief, { demoEstimates = false } = {}) {
  const base = engagements[brief.engagement];
  if (!base || !brief.goal || !brief.scope || brief.fit === "outside_scope") return null;
  if (brief.needs_development === null && brief.delivery_preference !== "undecided" && brief.engagement !== "discovery") return null;
  const ongoing = ["ongoing", "pilot"].includes(brief.working_model);
  const review = brief.technical_review || brief.fit === "needs_review";
  const approved = approvedEstimate(brief);
  const showEstimates = Boolean(base.price && base.weeks) && demoEstimates && !ongoing && !review && brief.delivery_preference !== "undecided";
  const price = [...(base.price || [0, 0])];
  const weeks = [...(base.weeks || [0, 0])];
  const scope = ["webflow", "components"].includes(brief.engagement) ? [...base.scope] : brief.scope_size === "landing_page" ? ["Structure and content hierarchy for one landing page", "Responsive UX/UI", "Agree key interactions and handoff needs"] : brief.scope_size === "product_flow" ? ["Review the selected user flow", "UX/UI for its priority screens and states", "Reuse or extend the existing UI system", "Developer handoff"] : [...base.scope];
  const assumptions = [...base.assumptions];
  if (brief.needs_development && scope.includes("Developer handoff")) scope.splice(scope.indexOf("Developer handoff"), 1, "Review approved designs before implementation");
  if (brief.needs_development && !["discovery", "webflow"].includes(brief.engagement)) {
    price[0] += 2000; price[1] += 4000; weeks[0] += 2; weeks[1] += 3;
    scope.push(brief.technology === "Webflow" ? "Webflow implementation" : "Frontend implementation with agreed technical scope", "Agree responsive QA and launch responsibilities");
    assumptions.push("Frontend only; backend and external integrations need a separate review");
  }
  if (brief.complexity === "expanded") {
    price[0] = Math.ceil(price[0] * 1.4 / 250) * 250;
    price[1] = Math.ceil(price[1] * 1.6 / 250) * 250;
    weeks[0] += 1; weeks[1] += 3;
    assumptions.push("Several flows, roles or integrations; a scope review is needed");
  }
  return {
    title: brief.engagement === "webflow" ? base.title : brief.delivery_preference === "existing_design_build" ? "Frontend implementation scope review" : ongoing ? brief.working_model === "pilot" ? "Paid pilot for ongoing design support" : "Ongoing design partnership" : (brief.engagement === "website" && brief.scope_size === "landing_page" ? "Landing page design" : base.title) + (brief.needs_development && !["discovery", "webflow"].includes(brief.engagement) ? brief.technology === "Webflow" ? " + Webflow build" : " + frontend" : ""),
    scope: brief.engagement === "webflow" ? scope : brief.delivery_preference === "existing_design_build" ? ["Review supplied designs and responsive states", "Agree frontend components and implementation responsibilities", "Confirm build and QA scope after technical review"] : ongoing ? ["Agree the first priority and a manageable backlog", "Design and review alongside your team", "Agree capacity and responsibilities with Karlo"] : scope,
    budget: showEstimates ? { min: price[0], max: price[1], currency: "EUR" } : null,
    duration: showEstimates ? { min: weeks[0], max: weeks[1], unit: "weeks" } : null,
    visitor_scope: brief.scope,
    review_required: Boolean(review),
    estimate_status: showEstimates ? "demo_only" : "needs_karlo_review",
    process: brief.engagement === "webflow" ? ["Review supplied designs and content", "Build responsive pages and CMS", "Review and check the implementation", "Agree handover and launch"] : brief.engagement === "components" ? ["Agree components, variants and states", "Design or implement the component set", "Review and hand off"] : knowledge.process, assumptions,
    factors: ["More screens, user roles or integrations increase scope.", "Ready-to-use content and an existing UI system can reduce scope.", "A fixed launch date needs a feasibility check with Karlo."],
    disclaimer: showEstimates ? "Prototype example only. Indicative range, not a binding quote. Karlo will confirm scope, timing and pricing." : "A starting scope, not a quote or availability commitment. Karlo needs to confirm pricing and timing.",
    pricing_version: showEstimates ? "prototype-2026-10-06" : null, placeholder: showEstimates,
    ...(approved || {}),
    ...(approved ? { assumptions: [...assumptions, ...approved.pricing_assumptions] } : {}),
    next_step: review ? "Review technical responsibilities and fit with Karlo before agreeing the scope." : ongoing ? "Discuss the first priority, monthly capacity and a possible paid pilot with Karlo." : "Review the focused scope with Karlo before agreeing price and timing.",
  };
}

export function qualify(brief, recommendation) {
  // An explainable internal signal, never a claim about a visitor's intent or finances.
  const signals = { clear_goal: Boolean(brief.goal), defined_scope: Boolean(brief.scope), timing_shared: Boolean(brief.timeline && !/not decided|unsure|unknown/i.test(brief.timeline)), budget_shared: Boolean(brief.budget && !/not decided|unsure|unknown/i.test(brief.budget)), service_fit: Boolean(recommendation && !recommendation.review_required) };
  const count = Object.values(signals).filter(Boolean).length;
  return { level: count >= 4 ? "ready_for_review" : count >= 2 ? "needs_discovery" : "early_exploration", signals };
}

// The next useful decision, not a requirement to complete every field.
export const questionKeys = ["project_type", "goal", "needs_development", "scope", "timeline", "budget", "working_model", "market"];
export function nextQuestion(brief) {
  if (brief.fit === "outside_scope") return null;
  if (!brief.project_type) return "project_type";
  if (!brief.goal) return "goal";
  if (!brief.scope) return "scope";
  if (brief.engagement !== "discovery" && brief.needs_development === null && brief.delivery_preference !== "undecided") return "needs_development";
  if (brief.scope_size === "landing_page" && !brief.market) return "market";
  if (!brief.timeline) return "timeline";
  if (!brief.budget) return "budget";
  return null;
}
