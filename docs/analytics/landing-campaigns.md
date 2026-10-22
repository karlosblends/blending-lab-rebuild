# Landing-page and campaign measurement

Tracking extension: 22 October 2026. Existing GA4 property 560179584.

## Monday HVAC outreach

Use the same campaign on every email link, and a different non-identifying `utm_content` for each email/variant. Do not use a recipient name, email, company, or customer ID.

- First email: https://www.blending-lab.com/landing-stranice?utm_source=outreach&utm_medium=email&utm_campaign=hvac_landing_offer_20261026&utm_content=email_01
- Follow-up: https://www.blending-lab.com/landing-stranice?utm_source=outreach&utm_medium=email&utm_campaign=hvac_landing_offer_20261026&utm_content=email_02
- Final follow-up: https://www.blending-lab.com/landing-stranice?utm_source=outreach&utm_medium=email&utm_campaign=hvac_landing_offer_20261026&utm_content=email_03

GA4's Session campaign and Session manual ad content identify the campaign and email respectively. These are link visits and resulting activity, not email sends, opens or replies. Email replies and won clients are unavailable until a reliable mail/CRM source is integrated.

## Event contract

All questionnaire events include `form_id=questionnaire`, `questionnaire_version=offer_v1`, and `cards_total=6`.

| Event | Meaning |
| --- | --- |
| questionnaire_card_view | Current card at least half visible while the document is visible; recorded once per presentation, including a later presentation after undo/restart |
| questionnaire_start | First observed decision in this run; not a passive card view |
| questionnaire_answer | Yes/no decision with card ID, position and current answered count |
| questionnaire_complete | All six cards answered, once per run; answering the last card again after undo does not inflate completions |
| questionnaire_undo | Previous answer removed, with resulting progress |
| questionnaire_restart | Explicit restart and progress before reset |
| form_start | First focus in the enquiry form after consent |
| form_error | Validation error or unsuccessful submission request; includes error_type |
| generate_lead | Successful submission accepted by the form service |

Card IDs in order: website, offer, traffic, ads, analytics, improvements. Left=yes, right=no. Answers are categorical; names, emails, generated sentences and messages are never passed to analytics. Revisions are separate answer events, so answer event counts are not unique people or a final-answer census.

The ordinary landing contact form uses `form_id=landing_contact`; it counts even if cards are skipped. The main website form uses `contact`, and the planner uses `planner`.

## Measurement rules

- Enquiries received sums `enquiries_received`, set to 1 only on a successful business submission; QA contributes 0. No backfill before the extension is implied.
- Enquiries per 100 visits = 100 × enquiries received / sessions. This counts submissions per visit, not the share of unique people who enquire. More than one enquiry per visit is possible.
- Funnel: page_view on the offer page → questionnaire_start → questionnaire_complete → form_start with questionnaire → generate_lead with questionnaire. Ordered, indirectly followed steps. Use people for funnel steps, not event totals. Drop-off is the people at a step who do not reach the next within the configured window; it is not a browser-exit event.
- Use a separate card sequence to inspect stopping points. No beforeunload/visitor-left event is sent.
- Consent is required before any GA4 tracking. Pre-consent answers are not replayed; a mid-sequence consent grant can leave a partial observed journey.
- Sessions are visits; total/active users are browser-based estimates of people. Events are actions. Calls, emails and booking clicks are intent only.
- Empty results before collection, before custom definitions finish processing, during a data/access failure or outside coverage mean unavailable, not proven zero. A zero after processing means no observed activity among measurable visitors, not necessarily no real-world activity.
- Normal GA4 reports are processed rather than instant. Use Realtime/DebugView to verify delivery; compare completed days for business decisions.

## QA exclusion

Add `bl_test=1` only to a deliberate test page URL. It marks traffic as internal/debug and prefixes custom events with `qa_`. The custom Enquiries received metric is zero for QA successes; QA events are never `generate_lead`. It does not persist to later visits. Use a clearly labelled test name/message in the form service. Exclude test page locations in visit analysis if the internal filter is not active.

The earlier contact test BL-GA4-QA-20261022 predates this contract. It remains one historical generate_lead event, but contributes nothing to the new Enquiries received metric. Do not silently reinterpret all historical key events as business leads.
