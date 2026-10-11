# Planner launch verification — 9 October 2026

Story: a visitor describes a project → the planner saves messages and a structured brief → an indicative scope appears → the visitor enters minimal contact details inside the chat → the enquiry and complete transcript are saved → notification status is shown accurately.

## Verified locally

- 30 automated tests passed. Coverage includes strict model-output validation, persistence, private session access, idempotent message/lead retries, early enquiries, email failure followed by retry, pricing/service/technology gates and new Supabase secret-key headers. Provider calls in these tests are mocked.
- Production build and TypeScript check passed. Build reports the existing local Node 24 / deployed Node 22 runtime difference; no build error.
- Browser flow tested at 390×844: two project messages, a saved scope with no unapproved numeric price, contact entry and permission, saved local enquiry, reload/resume, a simulated failed-notification state with retry, and a new conversation after submission. The saved file contained contact details, all four messages, structured brief and consent; contact and capability credentials were absent from the public response.
- Contact form cancellation returns focus to the composer. No horizontal overflow at 390px. Visitor bubbles remain rgb(190,190,190), or #BEBEBE; chat font weight remains 500.
- Planner-only accessibility audit reports zero violations in contact and submitted states after fixing the original component's log/list semantics and scroll-region keyboard access. Offscreen date/author contrast checks were inconclusive, so this is not a claim of full accessibility certification.
- Planner page does not load PostHog or Google Analytics scripts. Privacy-policy link responds successfully.
- Synthetic notification-failure browser fixture was restored to the local-inbox state after retry. No real email was sent.

## Not verified / not ready for public launch

`npm run check:planner` reports missing OPENAI_API_KEY, SUPABASE_URL, SUPABASE_SECRET_KEY, RESEND_API_KEY and PLANNER_EMAIL_FROM. Accounts still need setup, as confirmed by Karlo. Vercel has no planner credentials. The running local endpoint reports demo mode and uses scripted replies/local files. No production deployment was made.

Real OpenAI language/tone and extraction, Supabase migration and durable writes, verified sender domain, Resend acceptance and inbox delivery remain unverified. The live verification script is prepared; run it only after credentials are securely configured. Then test the visible flow in a preview deployment.

Karlo requested lower project prices than the proposed table. Replacement project ranges and delivery-duration evidence remain pending; previous project figures are disabled. Only the confirmed monthly reference and the published hourly reference are available. Stored-record retention/deletion is also an open launch decision; session expiry alone does not delete records.

See [account-setup.md](account-setup.md) for the remaining setup.
