# Blending Lab: daily performance check

[Open the live daily dashboard](https://analytics.google.com/analytics/web/?authuser=2#/a412976322p560179584/reports/reportinghub?params=_u.dateOption%3Dlast7Days%26_u.comparisonOption%3DlastPeriodMdw)

The report is saved as **Blending Lab - Daily performance** and set as the property's default Reports snapshot. It updates from GA4; this document is a reading guide, not a separate data source.

## The two-minute routine

1. Start with **Last 7 days**, compared with the preceding week. Use **Yesterday** for a daily pulse. Today is still incomplete; Realtime is for checking collection, not judging performance.
2. Read **Key events** first: these are successful enquiries. Then read **Session key event rate**: the share of visits that produced a key event. More enquiries with a stable or higher conversion rate is a useful positive signal.
3. Read **Active users** (engaged visitors) and **Sessions** (visits). A person can make several visits. More visits without more enquiries deserves investigation, not an automatic celebration.
4. Check **Sessions by source / medium** and **Session key event rate by source / medium** together. Identify which channels bring visits and which produce enquiries. A channel with one visit is too small to compare reliably.
5. Check **Landing pages**, **Page views**, and **Device category** to see where people enter, what they read, and whether mobile or desktop dominates. Open the detailed reports when a page or device performs unexpectedly.
6. Read **Event count by event name** for behavior. Use the translations below. Check form errors and whether starts are followed by submissions.

## Translate the behavior events

| GA4 label | Plain-English meaning | What it helps you decide |
| --- | --- | --- |
| `generate_lead` | Successful enquiry | Is the website generating demand? |
| `form_start` | Someone began interacting with a form | Are people reaching the enquiry step? |
| `form_error` | A submission failed | Check the form promptly if this appears repeatedly |
| `booking_click` | Someone opened Calendly | Interest in a call; not proof of a booking |
| `email_click` / `phone_click` | Someone clicked email or phone | Contact intent; not proof of a message/call |
| `estimate_start` | Someone opened the estimator | Pricing interest; completion inside the iframe is not tracked |
| `planner_start` | A planner conversation began | Interest in discussing a project |
| `questionnaire_start` / `questionnaire_complete` | Questionnaire started / reached final step | Whether visitors move through the questionnaire |
| `portfolio_select` | A project card was opened | Which work draws interest |
| `cta_click` | A recognized call-to-action link was clicked | Interaction with website prompts |
| `scroll_depth` | A visitor crossed a depth threshold | Content consumption; several events can come from one visit |

Event counts are actions, not unique people. Do not divide all form starts by all leads and call that a precise funnel: leads can come from several forms and the planner. Use the **Enquiry form** custom dimension to separate `contact`, `landing_contact`, `questionnaire`, and `planner` in detailed analysis.

## Interpret the numbers fairly

- Collection started **22 October 2026**. Earlier zeros mean no data was collected in this property, not no visitors.
- Launch day includes testing and one authorized test enquiry, reference `BL-GA4-QA-20261022`. The launch annotation records this. Exclude that test from business lead totals when reviewing the day.
- Analytics covers visitors who allow statistics cookies and whose browsers permit tracking. Compare GA4 enquiries with your actual inbox/lead records.
- Standard reports need processing time. Check the following day and allow corrections rather than relying on same-day totals.
- There is no revenue, profit or paid-ad ROI measurement yet. Enquiries are not won clients. Calendly completion, estimator internals and qualified/won lead imports remain separate integration work.
- Treat small numbers as individual observations. Look for patterns over several weeks before changing a page or campaign based on a conversion-rate swing.

## Practical responses

| What you see | First thing to check |
| --- | --- |
| Traffic drops across channels | Website availability, consent banner, collection, then acquisition activity |
| Traffic rises, enquiries stay flat | Source quality, landing-page promise, CTA clarity and form errors |
| Many form starts, few enquiries | Form friction or failure; separate each enquiry form before drawing conclusions |
| Many pricing or booking clicks | Compare with real estimator enquiries and Calendly bookings |
| One channel brings enquiries consistently | Explore that channel's landing pages and campaigns before increasing investment |

Bookmark the dashboard. No scheduled email or recurring task is required to use it daily.
