# Connecting the live planner

As of 11 October 2026, Karlo has configured OpenAI, Supabase and Resend locally. The database migration is applied, the live multi-turn AI/database verification passed, and the visible chat completed a synthetic enquiry with a saved transcript and Resend-accepted notification. Inbox arrival still needs confirmation. A production build and 32 automated tests passed. Hosting configuration, business-price approval, record-retention rules and a review of live conversation quality remain before public launch. See [current verification](verification-2026-10-11.md).

## 1. OpenAI

Open [OpenAI's API platform](https://platform.openai.com/), create a Blending Lab project and enable API billing. ChatGPT subscription billing is separate from API billing ([OpenAI billing guide](https://help.openai.com/en/articles/9039756-managing-billing-for-chatgpt-and-the-api-platform)). Create a project API key and store it as `OPENAI_API_KEY`. The current implementation uses `gpt-4.1-mini` and strict structured output. Set a spending limit appropriate to the pilot in the provider dashboard.

## 2. Supabase

Create a Blending Lab project in the [Supabase dashboard](https://supabase.com/dashboard). Choose an appropriate EU region for the business. Use the SQL Editor to run `supabase/migrations/202610060001_project_planner.sql` once; it creates the conversation/message tables and private server functions.

Save the project URL as `SUPABASE_URL` and a backend secret key as `SUPABASE_SECRET_KEY`. Do not use the publishable key: this database is private to the server. The implementation also supports legacy service-role keys in `SUPABASE_SERVICE_ROLE_KEY` for existing projects. Supabase's current [API-key guide](https://supabase.com/docs/guides/getting-started/api-keys) recommends secret keys for backend access.

## 3. Resend

Create a [Resend account](https://resend.com/signup). Add a sending domain or subdomain you control and complete the DNS verification shown in Resend. A sending subdomain such as `notify.blending-lab.com` can keep notification sending separate from normal work email. Do not replace existing email-provider MX records. Resend's [verified-domain guide](https://resend.com/docs/dashboard/domains/introduction) explains sending-domain requirements.

Create an API key with sending access for that domain and save it as `RESEND_API_KEY`. Set `PLANNER_EMAIL_FROM` to a sender on the verified domain, for example `Blending Lab Planner <planner@notify.blending-lab.com>` **only after that domain verifies**. `PLANNER_EMAIL_TO` defaults to the confirmed work address `karlo@blending-lab.com`. The visitor's email becomes Reply-To, never the destination.

## Secure configuration

Private values belong in the existing project's ignored `.env.local` for local development and in **Settings → Environment Variables** for the Vercel `blending-lab-rebuild` project. Use Preview and Production environments when ready. Keep local/preview tests separate from real client conversations where practical. Redeploy after changing deployed environment values; restart the local server after local changes. Do not paste keys into this chat or put them in public variables.

The optional OpenAI Developers, Supabase and Resend plugin connection cards shown in this chat can grant account access for the remaining setup. Installing a plugin does not itself enable API billing or configure this website's runtime credentials.

## Verification after connecting

1. `npm run check:planner` checks required configuration, printing names only. Presence does not confirm credential validity.
2. `npm run verify:planner:live` verifies actual Supabase reads/writes and rate-limit functions, then makes three synthetic OpenAI turns to check extraction, corrections and unrelated-question redirection. It deletes its synthetic conversation afterward. This uses a small amount of paid API capacity.
3. `npm run verify:planner:live -- --send-test-email` also sends a synthetic enquiry to the configured internal recipient. Confirm inbox arrival; API acceptance alone cannot prove delivery.
4. In a preview deployment, use the visible chat, reload it, submit a synthetic lead, and verify both `planner_conversations` and individual `planner_messages` in Supabase plus the complete notification email. Check mobile and email-failure retry behavior.

Project ranges remain disabled until Karlo supplies and approves the lower prices. The monthly reference and the published hourly reference are available; neither automatically sets a project quote. Live model tone still needs a human review of several actual conversations. Decide the records-retention schedule before accepting real client data: a session expires after seven days, but stored conversation records are not automatically deleted on expiry.

Do not call the planner ready for public launch until live AI, actual storage and inbox delivery have been verified. The rest of the website can still build; unconfigured production planner requests return a preparation message and Karlo's email.
