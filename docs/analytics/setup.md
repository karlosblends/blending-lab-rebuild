# Blending Lab analytics

Configured 22 October 2026 for karlo@blending-lab.com. Supera accounts are separate and unchanged.

## Accounts and reports

- GA account: `412976322`; property: `560179584` (Blending Lab Website).
- Web stream: `16180764902`; measurement ID: `G-835XPCFJM5`.
- GTM account: `6399117309`; container: `283071998`; public ID: `GTM-MLG3VGZR`.
- [Performance dashboard](https://analytics.google.com/analytics/web/?authuser=2#/a412976322p560179584/reports/reportinghub).
- [Realtime verification](https://analytics.google.com/analytics/web/?authuser=2#/a412976322p560179584/realtime/overview).
- [Published GTM version 2](https://tagmanager.google.com/?authuser=2#/versions/accounts/6399117309/containers/283071998/versions/2).

The Reports snapshot dashboard shows users, sessions, key events, session key event rate, acquisition sources, channel performance, devices, event names, pages, landing pages and realtime users. Croatia timezone and EUR currency. Event retention set to 14 months.

## Measurement contract

| Event | Meaning |
| --- | --- |
| `generate_lead` | Successful enquiry saved/submitted; primary GA4 key event |
| `form_start` | First focus within a contact, landing offer or questionnaire form |
| `form_error` | Failed form submission |
| `planner_start` | A new non-demo planner conversation is created |
| `questionnaire_start` / `questionnaire_complete` | First questionnaire decision / last step completed |
| `booking_click` | Click to Calendly, not a confirmed booking |
| `email_click` / `phone_click` | Click to email/call, not confirmed contact |
| `estimate_start` | Open estimator from a website link |
| `portfolio_select` | Open a portfolio project card |
| `cta_click` | Other recognized button-style link click |
| `scroll_depth` | 25%, 50%, 75%, 90% of scrollable page traversed |

`form_id` distinguishes `contact`, `landing_contact`, `questionnaire`, and `planner`. Registered GA custom dimensions: Enquiry form (`form_id`), Page language (`page_language`), CTA placement (`placement`).

Only categorical allowlisted parameters are sent with custom events. Names, email addresses, messages, planner conversation text and briefs are not included. A submitted enquiry is counted once per successful submission, not assigned an invented revenue value. Planner notification retries do not produce a second lead event.

GTM contains the base Google tag on Initialization and a consent-checked custom event relay triggered by `bl_event`. The relay drains `window.blEventQueue` through `gtag`, targeting this measurement ID. Automatic form and scroll measurement are disabled to avoid duplicating the custom implementation. Page-load pageviews, outbound links, supported video interactions and downloads are enabled. Automatic user-provided data collection is disabled.

## Consent and scope

The website initializes denied consent and loads GTM only after Cookiebot statistics consent. Advertising consent remains denied. Withdrawal disables GA and clears queued events. Development hosts and preview domains do not initialize GA. Embedded planner events forward to the parent page so the iframe does not create a second GA session/pageview. Standalone planner can use consented GA, but has no PostHog recording.

Existing PostHog remains separate; repeated consent notifications no longer repeat its pageview.

### Cookiebot authorization issue resolved

The first production check reported that `www.blending-lab.com` was not authorized for domain group `7ed9dcf1-31f4-41cc-acc6-7f646c55c031`. After the owner signed into Cookiebot, inspection confirmed that `blending-lab.com` was already registered on the Free plan with 37 scanned pages. The live banner then opened without the previous authorization error. No extra domain, alias or paid subscription was needed. The precise account-side cause of the earlier error was not established. Clearer banner body text was saved to explain optional analytics and consent withdrawal.

## Verification

- Production deployment `dpl_9XXKxkfgXBhNWA7XmunJPNwrBRa7` is READY and assigned to both production domains, from commit `d631dc64c31e8fcaec9ca523084a4d74a8c8deb1`.
- Production HTML contains the new measurement/container IDs and no legacy `G-V79FTZG2PR`.
- Public published GTM JavaScript contains the new measurement ID and consent event relay.
- Production browser with statistics denied contains no Google Tag Manager script, as intended.
- Build passed; 43 planner tests and 3 consent/parameter tests passed; diff checks passed.
- Live GA4 Realtime confirmed one test user, two pageviews across initial consent and reload, `first_visit`, `session_start`, `form_start`, and four `scroll_depth` events. Evidence: `output/analytics/realtime-verified.png`.
- Statistics-only consent enabled the GTM script while preferences and marketing remained denied. Consent persisted across reload. Withdrawal changed statistics back to denied in the live widget; a subsequent reload again contained no GTM script.
- No fake production lead was submitted. Receipt of `generate_lead` from a successful production enquiry remains to be checked with the next genuine enquiry or an explicitly coordinated test.

## Remaining integrations

- Calendly confirmation needs access to the booking integration/webhook or embedded booking completion event. Current tracking measures outbound intent only.
- The estimator is an external Lovable iframe. Internal estimator steps/completion require its source or an agreed cross-frame event contract.
- Google Ads is not linked to Supera. Link a dedicated Blending Lab Ads account when used.
- Search Console linking, internal-traffic exclusion and CRM qualified/won lead import are not configured. Internal-traffic exclusion needs the actual public office IP/range; do not guess it.
- Use consistent campaign UTMs on external promotional links, e.g. `utm_source=linkedin&utm_medium=organic_social&utm_campaign=landing_offer`. Never put private customer details in URL parameters.

The core consent and collection path is operational. Verify the next successful enquiry against its GA4 `generate_lead` event before relying on conversion counts for campaign optimization.
