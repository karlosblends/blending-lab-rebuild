# Blending Lab Design System

This file summarizes the visual system found in the Webflow export and used by the rebuild. Treat the export as the source of truth when extending the site.

## Pages and Structure

The export contains public pages (`index.html`, `home.html`, `design.html`, `web-design.html`, `google-ads.html`, `projects.html`, `projekti.html`, `contact.html`, `about-me.html`, `try-for-free.html`), case-study/detail pages (`xcelerate-auto-case-study.html`, `xcelerate-auto-admin-portal.html`, `detail_project.html`, blog detail templates), utility/auth pages, and Webflow style-guide/components pages.

The main shared sections are sticky navigation, centered hero, brand strip, large market statement, project showcase, dark bento/details cards, CTA pricing cards, FAQ accordion, contact section, and footer.

## Colors

- `--charcoal #101010`: page background and nav/footer base.
- `--almost-black #171616`: deeper dark surfaces.
- `--cod-gray #1d1c1a`: dark cards and buttons.
- `--coco #1e1d1a`: secondary dark gradient stop.
- `--onyx #303030`: borders.
- `--mine-shaft #3e3e3e`: hover borders.
- `--alabaster #f8f8f8`: primary text and light buttons.
- `--seashell #f1f1f1`: light surfaces.
- `--alto #d6d6d6`: secondary text.
- `--gray #919191`: muted text.
- `--flamingo #f45f26`, `--ember #fc4f1c`, `--cinnamon #e1541d`: orange accent family for CTAs, icons, active nav, and glow.

## Typography

Primary type is local Satoshi Variable, normal and italic. The Webflow export also loaded Playfair Display for some secondary italic/display accents; in the rebuild, Satoshi italic carries those premium emphasis moments unless Playfair is added later.

Typical scale:

- Hero H1: about `4.5rem` to `5rem` desktop, `3rem` mobile.
- H2: about `2.5rem` to `3.35rem`.
- H3: about `2rem`.
- Body: `1rem`, line-height `1.4-1.5`.
- Nav links: `16px`, medium weight.
- Eyebrows: uppercase, muted gray, small, medium weight.

Do not use negative letter spacing. Keep large type reserved for real hero or major section statements.

## Layout and Spacing

- Main max width: `80rem`.
- Medium container: `64rem`.
- Desktop page gutters: about `2.5rem`; mobile gutters: about `1.25rem`.
- Section padding: `5rem` medium, `3rem` mobile.
- Small section padding: `2rem-3.5rem`.
- Major lists use generous vertical gaps, often `4rem`.
- Cards and nav use compact, precise internal padding rather than oversized marketing spacing.

## Surfaces, Cards, Radius

- Global background is dark charcoal with a subtle grid and orange radial hero glow.
- Nav: sticky, centered, glassy `rgba(16,16,16,.6-.76)`, 1px onyx border, 8px radius, blur.
- Cards: dark vertical gradients from `#121212` to `#141414`, 1px onyx border, 8px radius.
- Larger grouped containers may use 12px radius.
- Avoid nested card-on-card layouts.

## Buttons and CTAs

- Primary light button: alabaster background, cod-gray text, pill radius, slight upward hover.
- Gradient/dark CTA: dark gradient pill, thin translucent border, orange glow/ring animation.
- Text CTA: italic, underlined, transparent, used as secondary action.
- Project cards use an arrow-up-right cue and subtle hover lift.

## Imagery and Assets

Reuse exported assets from `public/assets/images`. Important visual anchors:

- Logos: `Logo.svg`, `Logo_1.svg`, `HH-logo.svg`, `xcelerate-logo.svg`, etc.
- Hero/about imagery: `IMG-9214-from-Lightroom-1.jpg`, `About-me.webp`, `Vertical-Hero-Web-Design-1..webp`, `Vertical-Hero-Ads.webp`.
- Project covers: `Xcelerate-Auto-Cover.jpg`, `Project-Showcase-*.png`, `Coming-soon-cover-*.webp`.
- Supporting graphics: `PM-Tool.png`, `Cross-Platform.png`, `Network-lined.png`, `Long-term.png`, orange icon SVGs.

Images should be real/exported assets, not decorative placeholder blobs.

## Responsive Behavior

Breakpoints in the Webflow export cluster around:

- Desktop/base.
- Tablet: max `991px`; desktop nav becomes mobile glass nav, many grids collapse to one column.
- Mobile landscape: max `767px`; type and section padding reduce, forms and image grids become single column.
- Mobile portrait: max `479px`; tighter spacing and single-column layouts.

The rebuild mirrors this with `991px` and `767px` breakpoints.

## Animation Patterns

- Reveal on scroll: starts blurred, transparent, and translated down about 12px; transitions to clear/visible over roughly 0.6s.
- Hover: buttons and project media lift subtly; borders brighten.
- Glowing CTAs: slow orange conic/radial movement inside a pill.
- FAQ: height/expand transition with plus icon rotation.
- Mobile menu: expands under the sticky nav as a dark bordered panel.

If recreating a complex Webflow interaction, prefer the closest subtle browser-native equivalent and document the choice in code only when the decision is not obvious.
