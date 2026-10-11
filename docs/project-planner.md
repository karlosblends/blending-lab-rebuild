# Blending Lab project planner

The homepage hero replaces its two CTA buttons with the existing Arc chat composer. Sending opens a centered Arc dialog over a blurred backdrop and transfers the text into a fresh planner conversation. The input has a continuously circling orange/amber/peach/rose gradient border that follows the cursor on hover; there is no separate open link. The submitted text is the first message, with a short greeting attached to the first actual reply. The dialog embeds the same analytics-free `/planner` page. A same-origin, parent/frame-checked handshake passes the initial message in memory, not in a URL; request IDs prevent duplicate launches. Escape works inside the embedded chat, close restores focus to the hero input, and Radix manages the modal focus trap and page scroll lock. The hero entry and modal are blocked from PostHog replay and autocapture. Only the homepage uses this entry; other hero CTAs remain available.

Open `/planner` locally. The main site navigation also links to it. The page uses the installed `@uiarc/chat-thread` and `ChatComposer`, with contact capture inside a chat bubble: no page header, starter cards or brief sidebar. At an appropriate next step, visitors can choose **Send project to Karlo** and provide name, email and optional company/website. An explicit request for a call or guided questions can reveal the relevant control even for an early enquiry. Otherwise controls accompany an offered next step with a known project goal/service and no pending discovery question. The buttons sit beneath “What would you like to do?” and disappear while a reply is pending, on off-topic redirects or after closure. The form explains that the brief and full conversation are included. A useful enquiry can be submitted before every brief field is complete. The existing `/estimate` calculator is still available.

Visitors can optionally choose **Work through a few questions** inside the chat. The questionnaire uses installed Arc radio groups, checkboxes, inputs and a readiness slider, with grouped Back/Continue controls and a review before sending. Questions adapt to website or product work and omit discovery fields already in the brief. Unanswered questions and untouched sliders do not become invented answers. Submitted answers are saved as a normal visitor message and extracted into the brief; unfinished form answers stay in memory until closed or reloaded. No numeric estimate is invented by the form. The separately hosted `/estimate` calculator has not been imported into this repository.

The live voice follows Karlo's October 11 sales-call examples: first-person, curious and conversational, with 'we' for proposed studio work. Recommendations remain structured internally, but reports are appended to chat only when the visitor asks for a summary. Personal anecdotes, bookings and unapproved prices remain off limits.

UIArc source lives in `src/components/arc/`. Its messages are controlled by the persisted planner state; attachments, reactions and read receipts are disabled. The composer disables while a reply is pending and enforces the backend's character limit. A minimum 1.2-second typing pause prevents instant replies; the network request runs during the pause, so slow replies get no extra delay. The installed foundation tokens are scoped to `.project-planner`. The theme uses Satoshi, dark mode and the component's neutral styling with client bubbles set to `#BEBEBE`. The placeholder is 14px and shares the field's symmetric vertical padding; mobile entered text stays 16px to avoid iOS focus zoom.

## Business logic and knowledge

The reviewable business draft is in [planner/business-guide.md](planner/business-guide.md). Its runtime counterparts are:

- `src/lib/planner/business-knowledge.js`: sourced facts, case-study roles, confirmed direction and explicitly proposed advice.
- `src/lib/planner/conversation-policy.js`: assistant identity, tone, question selection, corrections, scope/fit decisions and boundaries.
- `src/lib/planner/pricing-rules.js`: independently approved commercial references and scoped market rules.
- `src/lib/planner/knowledge.js`: brief defaults, recommendation composition and explainable completeness signals.

Karlo confirmed both project and ongoing routes, active acceptance of design-only, standalone Webflow development, complete design-and-build sites and small component work, Croatia as the local market, landing-page starting anchors of €800 local / €1,200 global, and a €2,000/month reference for approximately 20 hours/week globally or locally. Landing-page upper bounds and delivery inclusions are still pending. Service-specific component, Webflow, product and full-website ranges and delivery durations still need definition. Initial pricing should stay accessible while real booking and delivery evidence is gathered.

On 9 October Karlo requested lower ranges than the proposal; replacement figures are pending. All project package prices remain disabled, with separate scope/delivery/technology rules ready for each service. The published hourly reference is read from `src/data/service-price-list.js` when requested, without calculating a project quote from guessed hours. Karlo selects a suitable fee and billing model in the proposal.

The model never writes numerical commercial estimates. An approved application rule can append a range, or the confirmed monthly reference and capacity. Unapproved project ranges stay off by default. Unknown/declined budget is recorded without repeated questioning; qualification describes completeness and service relevance, not inferred seriousness.

Each live turn first extracts a validated brief, then writes a reply using that brief and the business knowledge. The reply cannot overwrite extracted facts. Both OpenAI requests share a timeout; standalone Webflow implementation is normalized as build-only, and declined budget or timing answers are preserved.

## Local prototype

Run `npm run dev`. Without an OpenAI key, development uses an explicitly labelled scripted demo. It supports selected discovery paths, business FAQs, case-study questions, corrections, market recognition and monthly-reference questions. It is not a natural-language model; arbitrary phrasing and other languages still need live-model evaluation.

With Supabase configured, conversations and individual messages persist in its private tables. Development without Supabase falls back to ignored `.local/planner/` files. A private capability cookie protects resume access. The API key never reaches the browser.

`PLANNER_DEMO_ESTIMATES=true` explicitly enables the old unapproved project fixtures **only locally**. They are always labelled as examples. Approved rules override fixtures. The obsolete `PLANNER_PRICING_APPROVED` flag has no effect; a flag cannot approve a price table. Production can run without project estimates and show the scope-review path instead.

## Production setup

Follow [planner/account-setup.md](planner/account-setup.md). Set server-only `OPENAI_API_KEY`, optionally `OPENAI_MODEL`, `SUPABASE_URL` and `SUPABASE_SECRET_KEY` (legacy `SUPABASE_SERVICE_ROLE_KEY` is supported). Apply `supabase/migrations/202610060001_project_planner.sql`. The planner refuses production requests without its model, durable storage and notification settings; local disk fallback is development-only. No public Supabase credentials or OpenAI key are exposed.

For notifications, configure `RESEND_API_KEY` and `PLANNER_EMAIL_FROM` on a verified sending domain. `PLANNER_EMAIL_TO` defaults to the confirmed work address `karlo@blending-lab.com`. Submission saves the complete lead before notification, and retries avoid duplicates. Missing local email credentials save to a local inbox and never claim an email was sent. Failed email shows a retry control inside the chat. Reloading restores submission status; typing after submission starts a new conversation. Session expiry offers a fresh conversation rather than trapping message retry.

The welcome uses Karlo's conversational greeting. The contact step's expandable "How this chat is used" note identifies the AI planner, explains message storage and OpenAI processing, discloses full-transcript inclusion and links to the updated privacy notice. The assistant answers honestly about its identity when asked. The planner page excludes Google Analytics and PostHog, including replay. The necessary private resume cookie expires after seven days; saved database records do not automatically expire. A business retention/deletion schedule remains a launch decision.

Mutating routes require same-origin JSON and limit body/message size. IP-based request limits use distributed storage in production, and each conversation has a turn cap. Optimistic versions and pending leases prevent concurrent replies from overwriting one another. Production rate limits rely on Vercel's overwritten forwarded-IP header.

## Verification

`npm run test:planner` covers API session privacy, message persistence, retries, early lead submission, notification failure/retry, server-only database authentication, unknown/declined answers, FAQ preservation, scope/fit corrections, market selection and pricing gates. Build with `npm run build` and check TypeScript with `npx tsc --noEmit`.

`npm run check:planner` reports missing configuration by name without printing keys. After accounts are connected, `npm run verify:planner:live` tests actual database/RPC calls and three synthetic OpenAI turns, then deletes the test conversation. Add `-- --send-test-email` to test Resend acceptance; verify inbox arrival separately. Mocked tests and a demo-browser pass do not establish live-provider readiness.

## Conversation boundaries

Obvious unrelated requests (including relativity explanations, school Python scripts and instruction overrides) receive a fixed redirect without an OpenAI call. Other messages are classified in the existing brief-extraction request before prose generation; off-topic classifications preserve the brief and skip the reply-generation call. A second off-topic attempt after the redirect politely closes the conversation. A relevant project reply resets the counter; small talk does not. Closure persists in the conversation JSON, disables the input on reload and is enforced by the message endpoint. Retrying the closing message remains idempotent. Existing per-IP and per-conversation limits also apply. This prevents further calls within a closed conversation, rather than promising to prevent every new-session abuse attempt.

The input border uses a local decorative wrapper around the existing Arc composer. Animation does not update React state and pauses when offscreen, the page is hidden or the modal is open. Reduced-motion preferences keep the border static. No new dependencies or AI calls are needed for this effect. Cursor-angle behavior is inspired by the [Aceternity Glowing Effect](https://ui.aceternity.com/components/glowing-effect), with an idle orbit and Blending Lab palette.
