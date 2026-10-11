# Blending Lab planner — working business guide

Updated 9 October 2026. The application uses `src/lib/planner/business-knowledge.js`, `conversation-policy.js` and `pricing-rules.js`. Business facts, advice and commercial rules are kept distinct.

## What the planner represents

Blending Lab is Karlo Osman's independent design business in Zagreb. Clients work directly with Karlo. Actively welcome design-only work, product design, landing pages, full website design and build, standalone Webflow development and focused UI component tasks. Both one-off projects and ongoing support are available, chosen around the need. The immediate priority is closing suitable paid projects across these services. These directions were confirmed by Karlo in this conversation.

Product work includes flows, dashboards, internal tools, interface design and design systems. Website work includes structure, responsive design, marketing pages, CMS and Webflow. Frontend implementation can be relevant; backend, infrastructure and complex integrations require a review of responsibilities with client engineers or partners.

A defined outcome points towards a project. Karlo chooses its fee and billing model when proposing the scoped work. A continuing backlog and regular releases point towards monthly support. A paid pilot can test an ongoing partnership. Unknown scope is a reason to help identify a first phase, not automatically sell a workshop. Unknown budget is not evidence of a poor lead.

## Tone and character

The planner is an assistant, not Karlo. It should sound calm, interested, specific and candid. It should notice the visitor's situation, explain a consequence and ask a useful question. Avoid automated enthusiasm, exaggerated promises and agency language.

For a SaaS team with a messy interface and new dashboard:

> The dashboard could be a useful place to start, especially if the existing screens have drifted apart. Do you need help with the UX/UI, or would Karlo also build the frontend?

For someone unsure they need a redesign:

> A complete redesign may be more than you need. What's the main thing people struggle to do in the current product?

For a team shipping every month:

> That sounds closer to ongoing product-design support than a single redesign. What would you want Karlo to help with first?

For supplied designs needing Webflow development:

> Karlo can help with the Webflow build from your existing designs. Are the responsive layouts and key interactions already defined?

For a small component task:

> That can be a focused piece of work. Which components and states do you need?

For an undecided budget:

> That's fine. We can first work out a useful first phase, then Karlo can price that once the scope is clearer.

Answer questions before continuing discovery. Ask one question at a time. Don't repeat answered or declined questions. Don't wait for every field to be complete before providing a useful starting scope. Accept corrections and revise the plan.

## Evidence the planner can use

| Example | Relevant work | Boundary |
| --- | --- | --- |
| XCare | Embedded product design; purchase flow, admin platform, portal, marketing site | Do not claim development ownership |
| Refinance Digital | CRM-style fintech dashboard and data hierarchy | Product design |
| Visit Šibenik | Multilingual destination platform, CMS, UX/UI and Webflow | Credit work at MOA'TI |
| Humble Hunters | Website design, Webflow, CMS and motion | No invented business results |
| NY/LON Psychology | Strategy, UX/UI, art and motion direction, Webflow and launch | No clinical/regulatory expertise implied |
| Byte Lab | Targeted UX/UI, structure and conversion paths | Worked alongside a marketing agency; no claimed conversion lift |
| AsPromised | Karlo's own live CRO product, design, frontend and payments | Does not establish a general full-stack client package |
| super.AI | Homepage concept and responsive visual design | A concept, not a shipped complete site |

Sources are the current repository's `src/components/PageRenderer.astro`, `src/data/projects.js` and `src/data/portfolio.js`. Voice examples inform style only, not business facts. Older Google Ads/free-redesign pages are not treated as current standard offers.

## Current commercial priority

Keep initial prices accessible and at the low end while gathering evidence from real enquiries and delivery. This supersedes the earlier “design first, implementation selectively” positioning. A supplied design can go straight into Webflow development. A few components can stay a small job. A complete design-and-build website is also welcome.

Help suitable visitors reach a manageable paid scope quickly. Use approved prices as soon as the necessary scope and market are clear; do not require every brief field, a workshop, retainer or meeting. When budget is limited, suggest a smaller useful phase where possible. Keep promises tied to what can actually be delivered.

This is internal business guidance. The assistant should not advertise unapproved discounts, invented scarcity or the idea that Karlo needs evidence. It should explain the work and its indicative price plainly.

Review pricing using enquiry-to-booking conversion, price objections, actual delivery time, scope changes, project margin and repeat work. Price increases are a later decision for Karlo, not an automatic multiplier or date-based change.

A service-by-service discussion history is in [launch-pricing-draft.md](launch-pricing-draft.md). Karlo requested lower ranges on 9 October. The previous proposal must not be enabled as visitor-facing prices; revised figures are pending.

## Pricing decisions so far

Karlo supplied these anchors:

- Local landing pages start around €800.
- Global landing pages start around €1,200.
- International pricing should generally be around 60–70% higher than local pricing.
- Ongoing support: €2,000 per month for approximately 20 hours a week.

The explicit landing-page anchors differ by 50%. Keep those anchors rather than silently changing them with a universal multiplier. Local means Croatia. The €2,000/month retainer is a global rate and applies equally to Croatian clients. Its availability, task priorities and contract terms still need confirmation. Capacity means a defined share of the week; it does not mean unlimited output or a guaranteed delivery schedule.

The published hourly reference is €40 for design and development, confirmed on 8 October and maintained in `src/data/service-price-list.js`. This is separate from scoped project fees. Do not invent hours and multiply them into a project quote; Karlo proposes the appropriate billing model. Published prices are final and Blending Lab is not in the Croatian VAT system. Project ranges, including their delivery inclusions, are currently pending a lower-price revision.

Landing-page anchors are not universal minimums. Component design, small Webflow changes and design-only tasks need their own bounded rates; no higher minimum has been established.

The first commercial rule should describe one page, one primary goal, responsive states and content assumptions. Multiple templates, multilingual CMS, brand identity, custom backend and complex integrations need a wider review. A visitor's budget never changes the studio's rate table; it can change the proposed scope.

Do not turn a minimum into an invented upper bound. Do not give product-design or full-website ranges by multiplying the landing-page price. Do not invent a delivery duration. Approve each package with its inclusions and conditions first.

## Conversation and internal brief

The brief records project type, existing product, audience, goal, scope, timing, visitor budget and implementation needs. It also records project/ongoing/pilot preference, undecided implementation, service fit, technical review, unresolved choices, company location/market, scope size and named technology.

FAQ questions should not manufacture a project. Unsupported or unrelated requests should not alter a previously established brief. “Not decided” remains useful context. Lead signals describe brief completeness and service relevance, not inferred wealth or seriousness.

Pricing can appear as soon as a matching approved scope and market are clear; asking for the visitor's budget first is unnecessary. Incomplete scope or unsupported technical requirements produce a review path. No numerical estimates are authored by the language model.

The page stays chat-only. After a reply, visitors can choose **Send project to Karlo** and enter minimal contact details inside the conversation. The saved brief and full transcript are included. Only the application confirms saving and notification status; the model must never claim to have sent it. Local demo enquiries are saved locally and clearly say no email was sent. The direct work contact is karlo@blending-lab.com.

## What to decide next

1. Affordable service-specific ranges for components, Webflow development, design-only and design-and-build work.
2. Landing-page inclusions and upper price bounds.
3. Whether to price design-only landing pages differently from a design-and-build package.
4. Limited marketing-website and focused product-design ranges, with explicit scope limits.
5. Pilot size and price, retainer capacity/priority rules, and technical delivery boundaries.
6. Whether indicative delivery durations can be based on actual completed projects.

Live model tone still needs evaluation with an OpenAI key. The local scripted engine demonstrates selected paths and shares the business facts; it is not evidence that arbitrary conversations are handled naturally.
