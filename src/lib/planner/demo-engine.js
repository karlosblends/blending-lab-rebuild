import { blankBrief, knowledge, nextQuestion } from "./knowledge.js";

const undecided = /not decided|isn't decided|is not decided|don't know|do not know|unsure|not sure|haven't decided|no budget yet|rather not|prefer not|skip/i;
const questions = {
  project_type: "Is this mainly a website, product, Webflow build, or a specific component task?",
  goal: "What's the main problem you'd like to solve?",
  needs_development: "Do you need design, development from existing designs, or both?",
  scope: "Which page or user flow would make the most useful place to start?",
  timeline: "Is there a launch date to work around, or is the timing flexible?",
  market: "Where is your company based? Local and international pricing need different ranges.",
  budget: "Do you have a budget range in mind? It's fine if that isn't decided yet.",
};
const answer = (brief, reply, question = null) => ({ brief, reply, question });

function faq(text, brief) {
  const match = knowledge.caseStudies.find((study) => text.toLowerCase().includes(study.name.toLowerCase()));
  if (match && /example|work|experience|case study|tell me|have you|portfolio/i.test(text)) {
    return answer(brief, `${match.fact} You can read the case study at ${match.url}.`);
  }
  if (/guarantee|guaranteed|promise.*(?:sales|conversion)/i.test(text)) return answer(brief, "Karlo can work on the pages and flows that affect conversion, but a sales increase can't be guaranteed. It also depends on the offer, traffic and what happens after someone enquires.");
  if (/how.*(?:pricing|price)|how much|what.*cost|(?:monthly|retainer).*rate|what.*(?:budget|charge)|hourly|satnica|po satu/i.test(text)) return answer(brief, "Karlo proposes the fee and billing model once the scope is clear. Project fees are scoped separately from the published hourly reference. Ongoing support has a confirmed monthly reference and defined capacity; project ranges still need his review.");
  if (/how long|turnaround|available|start.*(?:tomorrow|next week)/i.test(text)) return answer(brief, "Timing depends on the first phase, the feedback needed and Karlo's availability. A launch date is useful context, but it needs a feasibility check before anyone promises delivery.");
  if (/project or.*(?:monthly|retainer)|difference.*(?:project|retainer)|how.*monthly.*work/i.test(text)) return answer(brief, "A project works well when there is a defined outcome. Monthly support makes more sense when your team has a continuing backlog and ships regularly. A focused paid pilot can help you test that working relationship first.");
  if (/\b(?:can|do|does|will)\b.*(?:you|karlo|blending lab).*\b(?:build|develop|webflow|backend)\b/i.test(text)) return answer(brief, "Karlo can help with design-only work, complete websites, standalone Webflow development and UI components. Backend logic, infrastructure and complex integrations need a review of who will own that work.");
  if (/paid pilot|free.*(?:pilot|trial|redesign)|what.*pilot/i.test(text) && !/we (?:want|need)|let'?s|start with/i.test(text)) return answer(brief, "The pilot is a focused, paid piece of work before a possible monthly partnership. Its scope, fee and timing need agreeing with Karlo; it isn't an unlimited trial or a required first step.");
  if (/\b(?:email|contact|book|meeting|send.*karlo|talk to karlo|speak to karlo)\b/i.test(text)) return answer(brief, "Use 'Send project to Karlo' below to add your contact details. The brief and full conversation will be included, so you won't need to explain it again. You can also email karlo@blending-lab.com directly.");
  return null;
}

// Scripted local fallback, not a substitute for model evaluation. Business facts stay shared.
export function demoTurn(conversation) {
  const b = { ...blankBrief(), ...conversation.brief, uncertainties: [...(conversation.brief?.uncertainties || [])] };
  const userMessages = conversation.messages.filter((message) => message.role === "user");
  const latest = userMessages.at(-1)?.content || "";
  const lower = latest.toLowerCase();
  const priorQuestion = conversation.messages.filter((m) => m.role === "assistant" && m.question).at(-1)?.question;
  if (/\b(weather|recipe|poem|capital of|ignore (?:all|previous)|system prompt|write (?:me )?code|tell me a joke|stock price)\b/i.test(latest)) return answer(b, "I can help with a website or product project for Blending Lab. What are you trying to build or improve?");
  const information = faq(latest, b);
  if (information) return information;
  if (/\b(?:only|just)\s+(?:a )?(?:logo|bookkeeping|ads management|legal advice)\b/i.test(latest)) {
    b.fit = "outside_scope";
    return answer(b, "That falls outside the product and website work this planner covers. Karlo would need to confirm whether he can help or point you towards someone else.");
  }
  const wantsSummary = /summari[sz]e|show.*plan|final summary|enough questions/i.test(latest);
  const shortUncertain = undecided.test(latest) && latest.length < 120;
  const serviceMention = /\b(saas|dashboard|app|product|website|landing page|marketing site|webflow|components?)\b/.test(lower);
  if (serviceMention && (!b.engagement || /we (?:need|have|want)|i (?:need|have|want)|actually|instead|switch/i.test(latest))) {
    if (/\bcomponents?\b/.test(lower) && !/\b(?:whole|full|complete) (?:website|product)\b/.test(lower)) {
      b.engagement = "components"; b.project_type = "UI component work"; b.scope_size = "component_set";
    } else if (/\bwebflow\b/.test(lower) && /development only|dev only|standalone|just.*(?:build|development|dev)|already.*design|designs?.*(?:ready|supplied)|figma.*(?:build|develop)|webflow (?:development|dev|build)/.test(lower) && !/design (?:and|\+) (?:build|dev)|design.*from scratch/.test(lower)) {
      b.engagement = "webflow"; b.project_type = "Webflow development";
    } else if (/\b(website|landing page|marketing site)\b/.test(lower) && !/\b(saas|dashboard|app)\b/.test(lower)) {
      b.engagement = "website"; b.project_type = /landing page/.test(lower) ? "Landing page" : "Marketing website";
      if (/\b(new|from scratch)\b/.test(lower)) b.existing_product = false;
      if (/\b(existing|redesign|improve)\b/.test(lower)) b.existing_product = true;
    } else {
      b.engagement = /\b(existing|redesign|running|years|messy|improve)\b/.test(lower) ? "product" : "new_product";
      b.project_type = b.engagement === "product" ? /saas/.test(lower) ? "SaaS redesign" : "Product UX/UI improvements" : "New digital product";
      b.existing_product = b.engagement === "product";
    }
    b.fit = "aligned";
  }
  if (!b.engagement && undecided.test(latest)) { b.engagement = "discovery"; b.project_type = "Project exploration"; }
  if (/landing page/.test(lower)) b.scope_size = "landing_page";
  if (/\bwebflow\b/.test(lower)) b.technology = "Webflow";
  if (/\b(?:croatia|zagreb|split|rijeka)\b/.test(lower)) b.location = latest.slice(0, 200);
  if (/\b(?:croatia|zagreb|split|rijeka)\b/.test(lower)) b.market = "local";
  if (/\b(?:based in|company is in|located in)\b/.test(lower)) b.location = latest.slice(0, 200);
  if (/\b(?:based in|company is in|located in)\b/.test(lower)) b.market = /\b(?:croatia|zagreb|split|rijeka)\b/.test(lower) ? "local" : "global";
  if (priorQuestion === "market") {
    b.location = shortUncertain ? null : latest.slice(0, 200);
    b.market = shortUncertain ? "undecided" : /\b(local|croatia|zagreb|split|rijeka)\b/.test(lower) ? "local" : "global";
  }
  if (/\bb2b\b/.test(lower)) b.audience = "B2B";
  if (/\bb2c\b/.test(lower)) b.audience = "B2C";
  if (/ongoing|every (?:week|month)|weekly|monthly (?:support|work)|continuing backlog|retainer|keep shipping|release.*(?:regularly|month)/.test(lower)) b.working_model = "ongoing";
  if (/\b(?:try|start|begin|want)\b.*\b(?:paid )?pilot\b/.test(lower)) b.working_model = "pilot";
  if (/one.off|one.time|single project|fixed project/.test(lower)) b.working_model = "project";
  if (b.engagement && !b.working_model) b.working_model = "project";
  if (!wantsSummary && !shortUncertain && !b.goal && b.engagement && b.engagement !== "discovery") b.goal = latest.slice(0, 600);
  if (priorQuestion === "goal" && !wantsSummary && !shortUncertain) b.goal = latest.slice(0, 600);
  if (/dashboard/.test(lower)) b.scope = "Dashboard UX/UI and its relationship to the existing product";
  if (/\b(\d+\s*(?:pages|screens)|onboarding|checkout|landing page|homepage)\b/.test(lower) || priorQuestion === "scope" && !wantsSummary && !shortUncertain) b.scope = latest.slice(0, 600);
  if (priorQuestion === "scope" && shortUncertain) {
    b.engagement = "discovery"; b.scope = "Clarify the first useful phase before agreeing a wider scope";
    b.uncertainties = [...new Set([...b.uncertainties, "The first phase needs a scope review"])];
  }
  if (/\bonboarding\b/.test(lower)) { b.scope = "Onboarding flow UX/UI"; b.scope_size = "product_flow"; }
  if (/\bcheckout\b/.test(lower)) { b.scope = "Checkout flow UX/UI"; b.scope_size = "product_flow"; }
  if (b.scope_size === "landing_page") b.scope = "One focused landing page with responsive states";
  if (b.engagement === "components" && /\b(?:buttons?|modals?|tables?|cards?|forms?|navigation|\d+ components?)\b/.test(lower)) b.scope = latest.slice(0, 600);
  const designOnly = /design only|only (?:ux|ui|design)|ux\/ui only|our (?:own )?developers|we (?:have|handle).*(?:engineers|developers)|no (?:frontend|development|implementation)|(?:we|our team).*build it/.test(lower);
  const build = /\b(frontend|front.end|implementation|development|dev|build it|design and build|design \+ dev|both)\b/.test(lower);
  if (designOnly) { b.needs_development = false; b.delivery_preference = "design_only"; }
  else if (build || priorQuestion === "needs_development" && /^yes\b/.test(lower)) {
    b.needs_development = true; b.delivery_preference = /designs? (?:ready|already)|already.*design/.test(lower) ? "existing_design_build" : "design_and_frontend";
  } else if (priorQuestion === "needs_development" && /^no\b/.test(lower)) { b.needs_development = false; b.delivery_preference = "design_only"; }
  if (b.engagement === "webflow" && !designOnly) { b.needs_development = true; b.delivery_preference = "existing_design_build"; }
  if (b.engagement === "components" && /\bdesign\b/.test(lower) && !build) { b.needs_development = false; b.delivery_preference = "design_only"; }
  const uncertaintyAboutDelivery = /(?:not sure|don't know|unsure|not decided).*(?:who.*build|development|implementation|frontend)|(?:development|implementation|frontend).*(?:not decided|not sure|unsure)/.test(lower);
  if (priorQuestion === "needs_development" && shortUncertain && !designOnly && (!build || uncertaintyAboutDelivery)) { b.needs_development = null; b.delivery_preference = "undecided"; }
  const externalWork = /\b(backend|back.end|infrastructure|complex integrations|native (?:mobile|app)|ios app|android app)\b/.test(lower) && !/our (?:own )?(?:team|developers).*backend|backend.*(?:handled|covered)|no backend|don't need.*backend/.test(lower);
  if (externalWork) {
    b.technical_review = true; b.fit = "needs_review";
    b.uncertainties = [...new Set([...b.uncertainties, "Technical scope and engineering ownership need Karlo's review"])];
  } else if (designOnly) {
    b.technical_review = false;
    if (b.fit !== "outside_scope") b.fit = "aligned";
    b.uncertainties = b.uncertainties.filter((item) => !item.includes("engineering ownership"));
  } else if (b.needs_development && b.technology !== "Webflow") b.technical_review = true;
  if (/\b(january|february|march|april|may|june|july|august|september|october|november|december|asap|next month|\d+ (?:weeks?|months?)|deadline|no rush|timing.*flexible)\b/.test(lower) || priorQuestion === "timeline" && !wantsSummary) b.timeline = shortUncertain ? "Not decided" : latest.slice(0, 600);
  if (/[€$£]|\b(?:budget|\d+[,.]?\d*\s?k\b|euros?)\b/.test(lower) || priorQuestion === "budget" && !wantsSummary) b.budget = undecided.test(latest) ? "Not decided" : latest.slice(0, 600);
  if (/no budget yet|budget.*(?:not decided|isn't decided|is not decided|don't know|unsure)/.test(lower)) b.budget = "Not decided";
  if (/no deadline|timing.*not decided/.test(lower)) b.timeline = "Not decided";
  if (/\b(multiple roles|many screens|complex|20 pages|multilingual|integrations)\b/.test(lower)) b.complexity = "expanded";
  else if (/only (?:one|a)|just (?:one|a)|single (?:page|flow)|reduce.*scope/.test(lower)) b.complexity = "focused";
  else if (b.scope && b.complexity === "unknown") b.complexity = "focused";
  if (b.engagement === "discovery" && b.goal && !b.scope) b.scope = "Clarify the first useful phase before agreeing a wider scope";
  const next = wantsSummary ? null : nextQuestion(b);
  let opening = "";
  if (userMessages.length === 1 && b.working_model === "ongoing") opening = "That sounds closer to ongoing design support than a single redesign. ";
  else if (userMessages.length === 1 && b.engagement === "webflow") opening = "Karlo can help with the Webflow build from your existing designs or agreed site changes. ";
  else if (userMessages.length === 1 && b.engagement === "components") opening = "That can be a focused piece of work without redesigning the whole product. ";
  else if (userMessages.length === 1 && b.engagement === "product" && b.scope) opening = "The dashboard could be a useful place to start, especially if the existing screens have drifted apart. ";
  else if (b.technical_review) opening = "The design can be scoped, but implementation needs a review of the stack and engineering responsibilities with Karlo. ";
  if (undecided.test(latest) && priorQuestion === "budget") opening = "That's fine. The budget can stay open while we work out a useful first phase. ";
  if (next === "goal" && /messy|redesign/.test(lower)) return answer(b, "A complete redesign may be more than you need. What's the main thing people struggle to do in the current product?", "goal");
  return answer(b, next ? opening + questions[next] : opening + "We have enough for a starting scope. Karlo can review the open decisions before agreeing price and timing.", next);
}
