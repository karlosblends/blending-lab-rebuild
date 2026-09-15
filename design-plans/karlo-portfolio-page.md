# A standalone Karlo portfolio inside Blending Lab

Written against: `39f64a2`

## Evidence chain

- Surface: current `/projects` and project detail routes rendered through `src/pages/[page].astro` and `src/components/PageRenderer.astro`
- Problem: the current portfolio is a conventional Blending Lab marketing page with the shared floating navigation, large hero, a single-column list of uniform `3840 × 2028` covers, contact form, and site footer. It does not behave like a compact personal introduction or preserve a personal frame while browsing case studies.
- Design evidence: `BLENDING_LAB_DESIGN_SYSTEM.md`, `src/styles.css`, the supplied desktop screenshot, and the live `lucaslima.design` reference inspected at a `1280 × 720` viewport
- Owner: new personal portfolio routes and components; existing project records remain the content owner
- Scope and affected surfaces: add a standalone personal portfolio at `/karlo` plus personal case-study routes at `/karlo/[slug]`; preserve the existing homepage, `/projects`, `/about`, and current case-study URLs
- Uncertainty: confirm the CV URL, availability statement, and the final six-project edit before launch

## Design language

- Keep Blending Lab's Satoshi typeface, charcoal foundation (`#101010`), alabaster text (`#f8f8f8`), warm orange accent (`#fc4f1c`), quiet borders, restrained radii, and precise motion.
- Remove the agency/marketing-page framing from this surface: no standard floating Blending Lab navigation, sales hero, package language, contact form, or large site footer.
- Translate the reference composition rather than its styling: a persistent identity rail on the left, a larger scrollable work canvas on the right, compact tabs, and a mixed editorial grid.
- The voice is first-person singular, direct, slightly odd, and specific. Avoid `we`, `our team`, generic service claims, and agency-style conversion copy.

## Measured reference patterns

- At `1280px`, the reference uses a fixed `282px` profile rail and a `998px` content region: roughly a `22 / 78` split.
- Its desktop work grid uses two equal columns with `16px` gaps. Full-width cards are `3:1`; half-width cards are `4:3`; an occasional portrait card is `2:3`.
- Below `1000px`, the fixed rail becomes a normal top profile header. Below `540px`, the work grid becomes one column and media settles at `4:3`.
- Case studies retain the same profile rail and replace the tab bar with a compact Work → Project breadcrumb, which keeps the personal context intact.

## Design decision

Build a separate personal presentation layer that shares project facts and case-study content with Blending Lab. Do not duplicate project records or fork copy into a second CMS collection. The personal portfolio gets its own routes, layout, short project summaries, preview media, interaction rules, and case-study shell; the existing Blending Lab pages remain unchanged.

Use a curated six-project first release rather than all ten projects. The provisional edit is:

1. XCare — depth, systems, long-term embedded product work
2. AsPromised — idea-to-live-product range and design engineering
3. Refinance Digital Dashboard — dense product UI and information hierarchy
4. NY/LON Psychology — brand, editorial web design, and art direction
5. Humble Hunters — polished marketing design and Webflow execution
6. super.AI — enterprise AI communication and visual design

Keep `/projects` as the complete archive and optionally expose it through a low-emphasis `More work at Blending Lab ↗` link.

## Information architecture

### `/karlo` — Work

- Left profile rail: portrait/avatar, name, role line, one-sentence positioning, availability, email, LinkedIn, X, CV, location/local time, and a small Blending Lab affiliation.
- Right header: `Work` and `About` only for the first release. Do not ship empty Playground, Writing, or Photography tabs.
- Work intro: a short `Selected work` label, not a second oversized marketing hero.
- Project grid: one wide anchor project, two half cards, another wide card, two half cards, then a small personal/end card.
- End card: one offbeat personal sentence plus a direct email CTA. Keep it compact; no full marketing contact form.

### `/karlo/about` — About

- The same profile rail and compact navigation.
- A concise personal narrative: how Karlo moved from advertising into design, why design and frontend belong together, how he works with teams, and what he is curious about now.
- One landscape portrait, one short timeline, a compact capability list, and a small `Elsewhere / Currently` block.
- Link back into selected work rather than repeating project cards.

### `/karlo/[slug]` — Case study

- Retain the personal rail.
- Replace the portfolio tabs with `Work → Project name` and a visible back action.
- Reuse the existing case-study narrative, facts, gallery, lightbox, live link, and next-project logic.
- Use the personal surface's narrower editorial type scale and quiet chapter navigation, while preserving project-specific art direction.
- `Next project` stays within `/karlo/[slug]`; any external live-product link is clearly marked.

## Reuse

- Tokens and typography: `src/styles.css` and `BLENDING_LAB_DESIGN_SYSTEM.md`
- Project source: `getProjects()` in `src/lib/sanity.js`, with `src/data/projects.js` as the current fallback
- Case-study content model and render behavior: `src/components/StandardProjectPage.astro`
- Image path handling: `src/lib/assets.js`
- Existing portrait assets: `public/assets/images/karlo-landscape-office.png`, `About-me.webp`, and `circle-karlo.png`
- Existing project source imagery: `public/assets/projects/[slug]/`
- Exemplar: the current About page already proves first-person voice and a person-led identity without needing a new brand system

The new primitive is a `PortfolioLayout` because the existing `BaseLayout` + `Header` + `Footer` composition cannot express a full-height personal rail without turning every Blending Lab page into the new portfolio. It belongs under `src/layouts/` and is shared by Work, About, and personal case-study routes.

## Asset plan

Yes: create portfolio-specific covers and preview frames. The existing covers are all approximately `1.89:1`, while the proposed grid needs `3:1`, `4:3`, and optionally `2:3`; the current gallery images range from roughly `1.17:1` to `1.62:1`. Blindly cropping them would hide product context and make hover swaps jump.

Do not remake everything before the layout is approved. Prototype the grid with current assets first, lock the six-project order and card slots, then art-direct only the assets that ship.

For each selected project, prepare:

- one cover composed for its assigned desktop slot (`3:1` for wide or `4:3` for half-width)
- two alternate preview frames at the exact same ratio and visual registration as the cover
- one `4:3` mobile composition when the desktop artwork does not crop safely
- meaningful alt text and a stable focal point/hotspot

Suggested working exports:

- wide: `2400 × 800` WebP or AVIF
- grid: `1600 × 1200` WebP or AVIF
- optional portrait: `1200 × 1800` WebP or AVIF
- mobile art direction: `1200 × 900` WebP or AVIF

Keep source masters lossless, but serve responsive transformed variants. Store local fallback assets under `public/assets/portfolio/[slug]/` using semantic names such as `cover-wide`, `preview-product`, and `preview-detail`, not `image-1` or layout-dependent CMS field names.

## Interaction plan

- Project preview: on hover-capable pointers, divide the media area into three horizontal zones. Moving across the card selects cover/preview 2/preview 3 with a `180–240ms` opacity transition. Keep every frame in the same crop and position so the change feels like a snap, not a re-layout.
- On pointer leave, return to the cover. The whole card remains one link; image switching never captures clicks.
- Keyboard focus: show the cover plus a clear focus ring and `View case` label. Do not require hover to reveal project identity.
- Touch: use a static cover in v1. Do not make the first tap change an image and the second tap open the case study.
- Card feedback: quiet border/contrast change, a small image scale (`≤ 1.015`), and a `View case` cursor/label. Avoid large lifts and elastic motion.
- Page entry: restrained stagger on navigation and cards. Case-study navigation can use the View Transitions API when available, with normal navigation as the fallback.
- Respect `prefers-reduced-motion`: disable frame crossfades, scaling, stagger, and view transitions while keeping all content and links usable.
- Load only the cover initially. Preload the first alternate on hover-capable devices when the card approaches the viewport; lazy-load the final frame to protect mobile data and Largest Contentful Paint.

## Content model

Keep core project facts in the existing project document. Add a semantic nested object only if the external Studio schema is available:

- `portfolioPreview.summary` — the shorter, more personal grid description
- `portfolioPreview.tags[]` — two or three useful descriptors
- `portfolioPreview.media[]` — ordered cover and alternate preview images, each with alt text and hotspot
- `portfolioPreview.mobileMedia` — optional art-directed mobile image

Do not add CMS fields named `wideCard`, `threeColumn`, `orangeCard`, or `hoverImage2`. Grid span and visual rhythm belong to the portfolio component and curated order, not the content record.

Because no Sanity schema is present in this repository, the first implementation can keep route order and preview overrides in `src/data/portfolio.js` while still joining each entry to its existing project by slug. If the Studio repository becomes available, migrate those overrides into the nested object and keep a `coalesce()` fallback during the transition.

## Copy workshop

Resolve the following before final art direction:

1. Public route: use `/karlo` unless a neutral `/portfolio` URL is deliberately preferred.
2. One-line identity: what Karlo does without a title stack.
3. Point of view: the belief that connects product thinking, visual design, and frontend code.
4. Availability: open to projects, embedded partnerships, full-time roles, or a deliberate combination.
5. Six short case summaries: problem + Karlo's contribution + proof, in two sentences maximum.
6. Personal texture: two or three details that feel real but remain professional.
7. Primary action: email, book a call, or download CV. Use only one as the dominant action.

Working voice direction: precise, candid, lightly mischievous. Prefer concrete lines such as `I design the interface, then stay around long enough to make it behave` over broad claims such as `creating impactful digital experiences`.

## Changes

1. `src/pages/karlo/index.astro`
   - Change: add the standalone Work route, fetch projects through `getProjects()`, join them to the curated personal portfolio configuration, and render the new shell and grid.
   - Preserve: current `/projects` route and all existing project URLs.
   - Verify: the page reads as a personal introduction before the first scroll and lists only the curated projects.

2. `src/pages/karlo/about.astro`
   - Change: add the compact personal About route using the same shell.
   - Preserve: existing `/about` and `/about-me` pages.
   - Verify: navigation between Work and About preserves the profile context and clearly shows the active route.

3. `src/pages/karlo/[slug].astro`
   - Change: generate personal case-study routes from existing, non-archived project slugs.
   - Preserve: canonical project data and existing live-project links.
   - Verify: invalid or archived slugs are not generated; next-project links stay in the personal route family.

4. `src/layouts/PortfolioLayout.astro`
   - Change: own the profile rail, personal navigation slot, content region, metadata, and responsive stacking behavior.
   - Preserve: Blending Lab tokens and global accessibility behavior.
   - Verify: at desktop the rail is sticky/fixed and approximately 24–28% of the viewport; at tablet/mobile it becomes a compact header without independent scrolling traps.

5. `src/components/portfolio/ProfileRail.astro`, `PortfolioNav.astro`, `PortfolioGrid.astro`, and `PortfolioCard.astro`
   - Change: implement the personal identity, curated editorial grid, card semantics, preview-frame interaction, and end card.
   - Preserve: one semantic link per project card, visible titles in the DOM, keyboard focus, and descriptive image alternatives.
   - Verify: hover is enhancement-only and every card works with JavaScript disabled.

6. `src/components/portfolio/PortfolioCaseStudy.astro` plus a shared case-study content renderer extracted from `src/components/StandardProjectPage.astro`
   - Change: separate reusable case-study content from the current Blending Lab page chrome, then render it inside either the existing site shell or the personal shell.
   - Preserve: current headings, section order, gallery behavior, lightbox, context facts, live link, and current case-study visual output.
   - Verify: pixel-compare at least XCare and one fallback-generated case study before and after the extraction.

7. `src/data/portfolio.js`
   - Change: hold the curated slug order, personal summary overrides, preview media paths, and optional mobile media until equivalent Sanity fields are available.
   - Preserve: project titles, roles, long descriptions, and case-study bodies in their current owners.
   - Verify: no full project or case-study record is copied into this file.

8. `src/lib/sanity.js`
   - Change: when the Studio schema exists, project the semantic `portfolioPreview` fields including image metadata, `_key`, alt text, crop, and hotspot; keep fallbacks for local data.
   - Preserve: current fallback behavior when Sanity is unavailable.
   - Verify: a failed Sanity request still produces a complete portfolio from local project data.

9. `src/styles/portfolio.css` and the portfolio-specific client script colocated with the card component
   - Change: implement the isolated personal surface, grid breakpoints, interaction states, and reduced-motion behavior.
   - Preserve: `src/styles.css` as the owner of shared brand tokens; avoid global selectors that alter existing pages.
   - Verify: `/`, `/projects`, `/about`, and existing case studies are visually unchanged.

10. `src/data/seo.js`
    - Change: add personal Work/About metadata and per-project personal-route metadata. Choose canonical URLs deliberately so duplicate case-study content does not compete in search.
    - Preserve: existing Blending Lab metadata.
    - Verify: title, description, Open Graph image, canonical URL, and social preview are correct for all three route types.

## Delivery phases

### Phase 1 — Narrative and edit

- Confirm route, audience, availability, dominant CTA, and six-project order.
- Rewrite the profile statement and six grid summaries in the personal voice.
- Decide which case-study claims need proof or anonymization.

### Phase 2 — Visual prototype

- Build the desktop shell and mixed grid with current assets.
- Create two directions using the same structure: `Quiet technical` and `Warm editorial`.
- Choose one direction after reviewing the first viewport, one wide card, one half card, and mobile profile header.

### Phase 3 — Asset production

- Art-direct the selected project covers against their final slots.
- Produce two registered hover frames per selected project and mobile alternates only where needed.
- Compress and test responsive delivery before polishing motion.

### Phase 4 — Work and About routes

- Implement the personal layout, navigation, profile rail, Work grid, About page, and responsive behavior.
- Add keyboard, touch, reduced-motion, loading, and empty/failure states.

### Phase 5 — Personal case-study shell

- Extract reusable case-study content rendering.
- Add `/karlo/[slug]`, chapter navigation, personal next-project links, and canonical metadata.
- Verify existing case studies did not regress.

### Phase 6 — Motion, QA, and launch

- Tune preview snapping, entry motion, cursor labels, and route transitions.
- Test real content at desktop, laptop, tablet, and narrow mobile sizes.
- Check performance with all preview images, then ship and review analytics after real sharing.

## Scope

- Inherit: global font files, color tokens, asset helpers, project records, case-study content, and current analytics/consent behavior.
- Verify: base layout body classes, global reveal scripts, lightbox ownership, SEO canonicals, PostHog page capture, and any `:has()` styles that could reach the new routes.
- Exclude: redesigning the Blending Lab homepage, replacing `/projects`, rewriting every case study, adding a blog/CMS writing system, multilingual portfolio support, or building empty reference-site sections in v1.

## Validation

- Product: send `/karlo` to someone with no prior context; within the first viewport they should be able to name who Karlo is, what he does, the kind of work shown, and how to contact him.
- Interface: verify Work, About, six project cards, hover zones, keyboard focus, direct card activation, back navigation, next project, external links, lightbox, and reduced motion at `1440 × 900`, `1280 × 720`, `1024 × 768`, `768 × 1024`, `390 × 844`, and `320 × 568`.
- Content extremes: long project names, missing alternate previews, missing CV, unavailable status, projects without a full `caseStudy`, and a failed Sanity request.
- System: confirm shared tokens and project data are reused and that no second project collection or global card system was introduced.
- Repository: `npm run build` → all existing and new static routes generate without errors.
- Repository: inspect the generated route list → `/karlo`, `/karlo/about`, and each curated `/karlo/[slug]` exist while current routes remain.
- Performance: test the first load and hover preload behavior; alternates must not all download eagerly on mobile.
- Accessibility: keyboard-only navigation, visible focus, meaningful headings/links, image alternatives, contrast, no hover-only information, and no motion when reduced motion is requested.

## Success criteria

- The first viewport reads as Karlo, not an agency.
- The grid feels visibly more current than the existing uniform project list while remaining recognizably Blending Lab.
- A visitor can move from Work into a case study and back without losing the personal portfolio frame.
- Each selected card has an art-directed cover and two stable preview frames; mobile never depends on hover.
- Project facts and long-form case-study copy have one source of truth.
- Existing Blending Lab routes and visuals remain unchanged.

## Stop conditions

- Stop the CMS migration if the Sanity Studio/schema repository is not available; use the local portfolio override layer instead of guessing at an external schema.
- Stop extracting the case-study renderer if it changes current case-study output in ways that cannot be isolated and regression-tested.
- Stop adding preview frames if the project card order or ratios are still changing; art direction follows the locked grid.

## Design documentation

- After acceptance and validation: add a `Personal portfolio surface` section to `BLENDING_LAB_DESIGN_SYSTEM.md` documenting the approved shell, type scale, grid rhythm, interaction behavior, and explicit differences from the main marketing site.
