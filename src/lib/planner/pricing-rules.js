// Commercial rules are separate from conversational knowledge. Only approved ranges
// with a defined market and scope can become visitor-facing numeric recommendations.
import { currentPriceList } from "../../data/service-price-list.js";

const pendingPackage = (engagement, scope_size, delivery, needs_development, scope, technology = null) => ({
  status: "awaiting_lower_ranges", engagement, scope_size, delivery, needs_development, technology,
  scope, exclusions: ["Brand identity or substantial copywriting", "Custom backend or complex integrations", "Work beyond the agreed pages, components or flow"],
  ranges: { local: null, global: null }, duration: null,
});

export const pricingRules = {
  version: "2026-10-09-project-prices-pending",
  currency: "EUR",
  source: "Karlo, planner conversation, 6 October 2026",
  markets: { local: { definition: "Croatia" }, global: { definition: "International enquiries outside the agreed local market" } },
  strategy: {
    phase: "initial_evidence_gathering",
    objective: "Win suitable paid projects across supported design and development services",
    positioning: "Accessible initial prices, not premium positioning",
    changePolicy: "Karlo reviews prices after evidence; no automatic increase or invented promotion",
    evidence: ["Enquiry-to-booking conversion", "Price objections and lost-project reasons", "Actual delivery time and scope changes", "Project margin", "Repeat business"],
    minimumPolicy: "Use service-specific starting points; the landing-page anchor is not a universal minimum",
    projectRangeStatus: "Karlo requested lower ranges on 9 October; replacement figures are pending. Do not publish the previous proposal.",
  },
  anchors: {
    landing_page: { local: 800, global: 1200, status: "confirmed_starting_prices", includes: "needs_confirmation" },
    ongoing: { monthly: 2000, hours_per_week: 20, market: "all", status: "confirmed_rate_and_capacity" },
    globalUplift: { min: 0.6, max: 0.7, status: "directional_only", note: "The explicit landing-page anchor is 50% higher. Do not calculate every service from a universal multiplier." },
  },
  packages: {
    landing_page: {
      status: "awaiting_lower_ranges", engagement: "website", scope_size: "landing_page",
      scope: "One focused landing page, one primary conversion goal, responsive design; supplied brand and draft content",
      delivery: null, needs_development: null, technology: null,
      exclusions: ["Full brand identity", "Custom backend", "Complex integrations", "Multiple languages or page templates", "Unagreed copywriting"],
      ranges: { local: null, global: null },
      duration: null,
    },
    component_design: pendingPackage("components", "component_set", "design_only", false, "An agreed small set of UI components, variants and states within an existing visual direction"),
    landing_page_design: pendingPackage("website", "landing_page", "design_only", false, "One focused landing page, responsive layouts, supplied brand and draft content, design handoff"),
    webflow_landing_build: pendingPackage("webflow", "landing_page", "existing_design_build", true, "One landing page built from supplied responsive designs and content, with agreed straightforward interactions", "Webflow"),
    landing_page_design_build: pendingPackage("website", "landing_page", "design_and_frontend", true, "One landing page with a primary conversion goal, supplied brand and content, responsive design and Webflow build", "Webflow"),
    small_website_design_build: pendingPackage("website", "small_website", "design_and_frontend", true, "A bounded small website with shared components, supplied brand and content; page count and CMS agreed before quoting", "Webflow"),
    focused_product_design: pendingPackage("product", "product_flow", "design_only", false, "One selected product flow or dashboard area, an agreed screen and state list, existing product context and developer handoff"),
  },
  ongoing: { status: "approved_reference", monthly: 2000, hours_per_week: 20, duration: "Monthly; start date and terms need agreement" },
};

export function approvedEstimate(brief) {
  if (brief.fit === "outside_scope") return null;
  if (brief.working_model === "ongoing" && !brief.technical_review && brief.fit !== "needs_review") return {
    budget: { min: pricingRules.ongoing.monthly, max: pricingRules.ongoing.monthly, currency: "EUR", period: "month" },
    duration: null, capacity: { hours_per_week: pricingRules.ongoing.hours_per_week },
    pricing_version: pricingRules.version, placeholder: false, estimate_status: "approved_retainer_reference",
    pricing_assumptions: ["Approximate weekly capacity, not unlimited output", "Available start date, priorities and agreement terms need Karlo's confirmation"],
    disclaimer: "Monthly plan reference, not a binding quote or availability commitment. Karlo confirms scope, capacity and terms.",
  };
  const pack = Object.values(pricingRules.packages).find((item) => item.status === "approved" && item.engagement === brief.engagement && item.scope_size === brief.scope_size && item.delivery && item.delivery === brief.delivery_preference && item.needs_development === brief.needs_development && (!item.technology || item.technology === brief.technology));
  if (!pack || brief.fit !== "aligned" || brief.complexity !== "focused" || !["local", "global"].includes(brief.market)) return null;
  if (brief.complexity === "expanded" || brief.technical_review || brief.fit === "needs_review" || ["ongoing", "pilot"].includes(brief.working_model)) return null;
  const range = pack.ranges[brief.market];
  if (!Array.isArray(range) || range.length !== 2 || !range.every((value) => Number.isFinite(value) && value > 0) || range[1] < range[0]) return null;
  return {
    budget: { min: range[0], max: range[1], currency: pricingRules.currency },
    duration: pack.duration ? { min: pack.duration[0], max: pack.duration[1], unit: "weeks" } : null,
    pricing_version: pricingRules.version, placeholder: false, estimate_status: "approved_indicative_range",
    pricing_assumptions: [pack.scope, ...pack.exclusions.map((item) => `${item} is outside this range`)],
    disclaimer: "Indicative range, not a binding quote. Karlo confirms the final scope, price and timing.",
  };
}

export function pricingAnswer(message) {
  if (/\b(?:hourly|per hour|hourly rate|satnica|po satu)\b/i.test(message) && /\b(?:price|pricing|rate|rates|cost|costs|budget|charge|much|cijena|cijene|koliko|satnica)\b/i.test(message)) {
    const reference = currentPriceList.services.find((service) => service.unit === "sat");
    if (!reference) return null;
    const value = new Intl.NumberFormat("en-IE").format(reference.price);
    return `The published hourly reference for design and development is €${value}/hour. Project fees are scoped separately; Karlo proposes the suitable fee and billing model once the work is clear. The hourly reference does not determine a fixed project quote. Published price list: https://www.blending-lab.com/cjenik`;
  }
  if (/\b(?:retainer|monthly|ongoing)\b/i.test(message) && /\b(?:price|pricing|rate|rates|cost|costs|budget|charge|much)\b/i.test(message)) {
    return "The monthly plan reference is €2,000/month for approximately 20 hours a week. This applies to global and Croatian clients. Karlo needs to confirm availability, scope and terms; this isn't a booking or binding quote.";
  }
  return null;
}
