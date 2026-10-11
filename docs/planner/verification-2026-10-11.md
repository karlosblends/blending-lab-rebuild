# Planner account verification — 11 October 2026

## OpenAI

- Karlo saved the existing project key in the ignored local configuration file. No secret was printed.
- Real `gpt-4.1-mini` requests using the planner's Responses API and structured output succeeded.
- Initial live scenarios exposed inconsistent field extraction and preservation. Fact extraction now runs with a focused structured brief schema before the separate reply-writing request. Both requests share one turn deadline and disable provider response storage. Reply generation cannot overwrite the extracted brief.
- The three-turn live verifier passed with real Supabase storage and OpenAI: existing SaaS extraction, explicit design-only ownership, undecided budget/timing, and unrelated-question redirection with the brief preserved.
- The 32 automated planner tests passed. Automated provider responses are mocked; the live verifier uses actual provider calls.
- Additional live Croatian landing-page and UI-component scenarios passed their service, ownership and market checks. A standalone Webflow scenario initially misclassified build-only work as design-and-build; the server now enforces the standalone Webflow service's build-only delivery mode and prevents explicitly undecided budget/timing becoming the next-question metadata. The three-turn verifier passed again after that correction.
- The standalone Webflow live scenario then passed: supplied designs, build-only ownership, global UK market, Webflow technology and no repeat budget/timeline question. The final production build passed.

## Supabase

- Project: Blending Lab Planner (`etgqpdotppnijiirbvbs`), EU West region, healthy.
- Local project URL matches this project, and its configured secret key passed actual server access tests.
- Applied `supabase/migrations/202610060001_project_planner.sql` as migration `project_planner` to the initially empty database.
- Created conversations, individual messages and rate-window tables, plus server-only save and rate-consumption functions.
- Verified real create/read/update, persistence of three individual messages, rejection of a stale update, and one successful rate consumption out of three simultaneous requests against a limit of one.
- Synthetic conversation/messages and rate records were deleted after verification. Zero synthetic verification conversations remain.
- All three tables have RLS enabled and deny reads to `anon` and `authenticated`; the server role retains access.
- The security advisor returned only informational [RLS enabled without policies notices](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy). This is intentional for server-only tables: public roles have no grants or policies granting row access.

## Remaining

- Confirm inbox arrival of the two synthetic test emails. Resend accepted them, which is not proof of inbox placement.
- Review live tone and recommendations with Karlo before launch.
- Approve project price rules and a record-retention period.
- Configure hosting credentials and verify a deployment before publishing.

## Resend and visible website flow

- All required local configuration is present. Secrets were neither logged nor copied into source control.
- Resend accepted a synthetic connection-check email to `karlo@blending-lab.com`, ID `01a12b63-3b47-73bd-b7b0-e55a6481752a`. Its database test record was removed afterward.
- The real local chat at `http://127.0.0.1:4322/planner` completed a fictional Croatian B2B SaaS dashboard enquiry using live OpenAI and Supabase.
- Its brief recorded design-only ownership, an existing product, B2B audience, Croatia/local market, one dashboard, and explicitly undecided budget/timeline. Project numeric ranges remained disabled as intended.
- Submitted the in-chat contact form with required permission, and verified the saved contact, consent, complete transcript, individual messages, structured brief and notification status in Supabase.
- Resend accepted that notification, ID `01a12b67-97b6-7006-97d0-ec364ceb16f4`. Reloading the page restored the transcript and submitted confirmation.
- The browser test lead is clearly named `TEST — Planner end-to-end`, conversation `1302ab50-3459-49c1-8efd-31d494cdcc83`.
- Screenshot: `/tmp/blending-lab-planner-live-verification.jpg`.
- Building while the development server was running caused a temporary stale-module hydration error; restarting the local server resolved it. Local Cookiebot also reports an unauthorized localhost domain; no production Cookiebot configuration was changed.
# Arc questionnaire follow-up

## Homepage entry and modal

The homepage hero now uses the existing Arc composer instead of its two CTA buttons. Arc Dialog opens the existing planner in a centered same-origin frame over its blurred overlay. Browser checks confirmed hero-to-chat transfer with a real AI reply, one copy of the initial message, persistence on reopen, Escape from inside the frame, restored hero input focus and a 390px-wide phone layout. Frame handoff checks both origin and source window; chat text is not placed in a URL. The parent hero entry/modal are excluded from PostHog recording/autocapture; the planner frame keeps analytics disabled. No test enquiry was emailed. Screenshots: `/tmp/blending-lab-hero-entry.jpg` and `/tmp/blending-lab-hero-modal.jpg`.

The optional in-chat questionnaire uses the installed Arc radio-group, checkbox, input and slider components. Browser verification covered multiple checkbox selections, single radio selection, keyboard slider input, skipped timing, answer review, submission to live AI and restored answers after reload. The synthetic photographer conversation was not submitted as a lead and sent no notification. Live replies use first-person studio language, and automatic recommendation reports are removed from ordinary turns. Structured recommendations remain saved internally; visitors can still request a summary. All 34 planner tests, TypeScript checking and the production build passed. This questionnaire collects scope context; final package pricing remains pending, and the external estimator has not been imported.

## Greeting, contextual actions and credit protection

The hero's separate open link is removed and its Arc composer has a subtle warm glow with stronger hover/focus states. Hero-submitted text appears as the first chat message; the welcome bubble is absent and the first real project reply begins with a short greeting. Next-step controls require an explicit visitor request or an appropriate offered next step, and now include “What would you like to do?” They disappear during pending replies and off-topic exchanges.

The existing extraction call now classifies the latest message before any prose generation. Obvious unrelated requests bypass OpenAI entirely; other off-topic classifications skip prose generation and preserve the brief. A second off-topic attempt closes the stored conversation, disables the composer and blocks subsequent message generation server-side. Replaying the closing request is idempotent.

Verified the exact relativity and school-Python examples in the real homepage modal, no stale buttons during replies, contextual buttons after a requested questionnaire/handoff, no duplicate welcome and persisted closure on reopening `/planner`. No new enquiry email was sent. All 39 planner tests, TypeScript checking, live database/AI verification and production build passed. Screenshots: `/tmp/blending-planner-glow.jpg`, `/tmp/blending-planner-next-step.jpg`, `/tmp/blending-planner-closed.jpg`. Local server restarted on port 4322 after the build.

An additional live semantic check asked for the rulers of ancient Rome, bypassing the obvious-topic patterns. OpenAI classified it as off-topic in one extraction request; no prose-generation request followed, no historical answer was returned, and the existing photography brief stayed unchanged.

## Orange gradient border

Replaced the static glow with an always-visible gradient perimeter around the existing Arc composer, using Blending Lab orange/ember, amber, peach and muted rose. It circles once every twelve seconds while idle and smoothly tracks cursor direction on hover. Animation pauses offscreen, when the document is hidden and when the modal opens; reduced-motion preferences keep the border static. Browser verification confirmed changing idle angles, tracking from the left to right edge and the unchanged editable composer. TypeScript and production build passed. Screenshot: `/tmp/blending-planner-orange-border.jpg`. Development server is running on port 4322.
