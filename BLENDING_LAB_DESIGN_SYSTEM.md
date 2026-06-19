# Blending Lab Design System

Use this document as the portable design-system brief for rebuilding, extending, or prompting Blending Lab interfaces across AI platforms. The implemented source of truth is `src/styles.css` for visual rules and `src/app.js` for component/content patterns. This file translates those choices into an AI-ready specification.

## Brand Direction

Blending Lab is a premium, independent design partner brand. The site should feel sharp, calm, direct, and quietly luxurious. It is not a startup template, agency landing page, or playful SaaS UI.

The experience is dark, spacious, minimal, and editorial. Use restrained motion, precise spacing, soft borders, warm orange accents, and large confident typography. Prioritize fidelity over novelty.

## Core Principles

- Do not redesign the site. Match the existing Blending Lab visual language.
- Keep pages dark, sparse, and intentional.
- Use orange only as an accent, not as a dominant theme.
- Avoid decorative blobs, generic gradients, glassmorphism excess, and stock SaaS patterns.
- Use real project imagery, product mockups, logo strips, and interface screenshots.
- Preserve generous vertical spacing and strong alignment.
- Keep cards simple: dark fills, subtle borders, modest radii, clear typography.
- Use subtle luxury motion: slow reveals, small lifts, and scroll-linked scale where appropriate.

## Color Tokens

Primary background:

- `charcoal`: `#101010`
- `almost-black`: `#171616`
- `cod-gray`: `#1d1c1a`
- `coco`: `#1e1d1a`

Surface colors:

- `card-dark`: `#121212`
- `card-warm`: `#191818`
- `surface-raised`: `#232220`
- `onyx`: `#303030`
- `mine-shaft`: `#3e3e3e`

Text:

- `white`: `#ffffff`
- `alabaster`: `#f8f8f8`
- `seashell`: `#f1f1f1`
- `alto`: `#d6d6d6`
- `gray`: `#919191`
- `muted-copy`: `#a2a2a2`

Accent:

- `flamingo`: `#f45f26`
- `ember`: `#fc4f1c`
- `cinnamon`: `#e1541d`

Border:

- Default border: `1px solid #303030`
- Soft border: `1px solid rgba(255, 255, 255, 0.12)`
- Accent border: `1px solid #fc4f1c`

## Typography

Primary typeface:

- Satoshi Variable
- Use `Satoshi-Variable.woff2` and `Satoshi-VariableItalic.woff2`
- Fallback: `Inter`, `Arial`, sans-serif

Serif accent:

- Use Georgia only for italic emphasis words inside large headings, such as `work together` or `touch`.
- Serif should appear as an accent, never as the main type system.

Base:

- Body size: `14px`
- Body line-height: `20px`
- Body weight: `400`
- Letter spacing: `0`

Heading scale:

- H1: `clamp(3rem, 6vw, 5rem)`, line-height `1.08`, weight `500`
- H2: `clamp(2.25rem, 4.2vw, 3rem)`, line-height `1.2`, weight `500`
- H3: `clamp(1.45rem, 2.3vw, 2rem)`, line-height `1.18`, weight `500`
- H4: `1.25rem`, line-height `1.25`, weight `600`

Large editorial copy:

- Size: `clamp(2.3rem, 3.1vw, 2.8rem)`
- Line-height: `1.2`
- Weight: `500`
- Default color: `#a2a2a2`
- Emphasized words: `#f8f8f8`
- Accent words: `#fc4f1c`

Paragraphs:

- Size: `1rem`
- Line-height: `1.5`
- Color: `#d6d6d6` or `#919191`

## Layout

Main container:

- Max width: `95.5rem`
- Desktop horizontal gutters: `2.5rem` each side
- Mobile horizontal gutters: `1.25rem` each side

Medium container:

- Max width: `72rem`

Sections:

- Default vertical padding: `clamp(3rem, 6vw, 5rem)`
- Small section padding: `clamp(2rem, 4vw, 3.5rem)`

Background:

- Global page background: `#101010`
- Use a subtle fixed grid background from `hero-grid_gradient.svg`
- Grid should be visible but quiet, never high contrast.

Spacing feel:

- Hero and major sections should breathe.
- Cards should have compact internal padding but large surrounding whitespace.
- Avoid crowded stacked content, especially in FAQ and pricing/CTA areas.

## Navigation

Desktop nav:

- Sticky at top.
- Centered floating bar.
- Width: about `640px`
- Height: about `72px`
- Background: `rgba(16,16,16,0.78)`
- Backdrop blur: `16px`
- Border: `1px solid #303030`
- Radius: `8px`
- Layout: left links, centered logo, right links/button.

Logo:

- Orange square mark, about `48px`.
- Must remain centered in the nav.

Contact button:

- Light fill `#f8f8f8`
- Dark text `#1d1c1a`
- Pill shape.

Mobile nav:

- Hide desktop links.
- Use a compact toggle.
- Open menu as a dark bordered dropdown.

## Buttons

Primary button:

- Background: `#f8f8f8`
- Text: `#1d1c1a`
- Border radius: pill
- Padding: roughly `.75rem 2rem`
- Font weight: `600`
- Hover: subtle upward movement and slightly dimmer light background.

Ghost button:

- Transparent/dark fill.
- Light text.
- Soft border.
- Inner shadow is acceptable if very subtle.

Text button:

- Transparent.
- Underlined.
- May use italic styling for editorial actions.

## Cards

Default card:

- Background: linear gradient from `#121212` to `#141414`
- Border: `1px solid #303030`
- Radius: `8px`
- Padding: about `2rem 1.4rem`
- Overflow hidden when containing visual assets.

Large CTA cards:

- Background: `#191818`
- Radius: `16px`
- No visible border or only an extremely subtle one.
- Desktop height: about `480px`
- Padding: `32px`
- Internal layout: icon at top, heading aligned consistently, body/button anchored near bottom.

Icon chips:

- Size: `36px` to `56px` depending on card.
- Dark square or orange circular treatment.
- Orange icon accent.

## Hero

Hero composition:

- Centered text block.
- Large H1, three-line rhythm on desktop.
- Supporting copy centered, max width around `58rem`.
- Two centered CTA buttons.
- Hero image below, centered and wide.

Hero image:

- Width: `min(100%, 54rem)`
- Minimum height: `clamp(19rem, 31vw, 28rem)`
- Radius: `12px`
- Background image should cover.
- Starts at `80%` scale and subtly scales to `100%` while scrolling through the viewport.
- Motion should feel expensive and slow, not bouncy.

## Logo Strip

Section label:

- Uppercase, muted gray, centered.

Logo container:

- Dark surface `#121212`
- Border `1px solid #303030`
- Radius `8px`
- Padding around `30px`

Desktop layout:

- Six logos in one row.
- Equal columns.
- Generous gaps.
- Logos are grayscale/light and visually balanced.

Mobile:

- Two or three columns depending on viewport.

## Project Showcase

Project section:

- Centered heading and muted subtitle.
- Large media-first cards.

Project media:

- Large rounded rectangle.
- Radius: `8px`
- Use real screenshots/videos.
- Min height should feel cinematic on desktop.
- Avoid cropping important UI details.

Project text row:

- Desktop uses two columns: title left, description right.
- Title uses large white text with an orange external-link arrow.
- Description is muted gray and concise.

Hover:

- Very subtle lift only.

## How It Works Bento

Section heading:

- `How it works`
- The word `works` uses italic serif styling.

Desktop grid:

- Six-column layout.
- Two rows.
- Gap: `1rem`
- Left top card spans four columns.
- Right card spans two columns and two rows.
- Bottom-left card spans two columns.
- Bottom-middle card spans two columns.

Card content:

- Heading top-left.
- Paragraph underneath.
- Visual asset anchored toward the bottom/right depending on card.

Specific visual rhythm:

- Transparent & Predictable: wide card with project-management board artwork on the right.
- Cross-platform design foundation: tall card with Figma/presentation/Webflow-style icons near lower half.
- Extended network when needed: lower-left card with connected portraits/linework.
- Built for long-term collaboration: lower-middle card with roadmap/timeline artwork at bottom.

Mobile:

- Stack cards in one column.
- Preserve all images, but reduce their dominance.
- Cards should remain at least around `22rem` tall.

## Work Ways / Pricing CTA

Section heading:

- `Two ways to work together`
- `work together` should use italic serif styling.

Card layout:

- Two equal cards on desktop.
- Cards align horizontally with matching heading baselines.
- Headings sit at the same vertical position.
- Body copy and buttons anchor to the bottom row.

Card headings:

- `One-time project`
- `Looking for a design partner?`
- Size around `clamp(1.9rem, 2.15vw, 2.4rem)`
- Weight `500`

CTA buttons:

- Right aligned inside each card on desktop.
- Bottom aligned.

Mobile:

- Stack cards.
- Keep headings aligned within their own cards.
- Avoid overly tall empty cards on very small screens.

## FAQ

Desktop layout:

- Two columns.
- Left: heading.
- Right: accordion.
- Gap: about `5rem`.

Question button:

- Border: `1px solid #303030`
- Open state border: `#fc4f1c`
- Radius: `12px`
- Padding: about `1.25rem 1.5rem`
- Large question text around `1.5rem`

Answer:

- Must have visible breathing room below the question.
- Open answer top margin: about `1.35rem`
- Copy should be readable, not compressed against the question.

Icon:

- Plus rotates into a close mark when open.
- Keep icon aligned to the top/right of multi-line questions.

## Contact

Contact layout:

- Two columns on desktop.
- Left: editorial heading and contact methods.
- Right: form card.

Heading:

- `Let's get in touch`
- `touch` uses italic serif styling.

Contact cards:

- Dark background.
- Border `1px solid #303030`
- Radius `8px`
- Icon square around `56px`.

Form card:

- Background `#121212`
- Border `1px solid #303030`
- Radius `8px`
- Inputs use underline style.
- Submit button is full-width and light.

Footer:

- Dark bordered container.
- Grid layout with brand, pages, legal, services.
- Keep it quiet and utilitarian.

## Motion

Default reveal:

- Start opacity `0`, translateY about `12px`, blur about `12px`.
- Animate to opacity `1`, translateY `0`, blur `0`.
- Duration around `.6s`.

Hero image:

- Scroll-linked scale from `0.8` to `1`.
- Use easing so it feels gradual.

Hover:

- Buttons and project cards may lift by a few pixels.
- Avoid springy, playful, or exaggerated motion.

Reduced motion:

- Disable scroll-linked scaling and reveal transitions.
- Show content immediately.

## Responsive Rules

Below `991px`:

- Collapse complex grids to one column.
- Hide desktop nav links and show mobile toggle.
- Logo strip becomes three columns.
- Bento cards stack.
- Footer becomes two columns.

Below `767px`:

- H1 around `3rem`.
- H2 around `2.25rem`.
- Containers use smaller gutters.
- Logo strip becomes two columns.
- CTA cards become shorter and tighter.
- FAQ question text reduces to around `1.15rem`.
- Footer stacks more tightly.

## Asset Guidance

Use existing Blending Lab assets first:

- Hero portrait/photo: `IMG-9214-from-Lightroom-1.jpg`
- Grid background: `hero-grid_gradient.svg`
- Bento artwork: `PM-Tool.png`, `Cross-Platform.png`, `Network-lined.png`, `Long-term.png`
- Project media: existing project images and videos in `public/assets/images` and `public/assets/videos`
- Fonts: Satoshi variable font files in `public/assets/fonts`

Do not replace real visuals with abstract illustrations unless explicitly requested.

## AI Prompt Snippet

When giving this design system to another AI tool, include this instruction:

> Build in the Blending Lab design system. Use a dark premium editorial interface with Satoshi typography, charcoal backgrounds, subtle grid texture, warm orange accents, precise spacing, restrained cards, and real product/project imagery. Do not redesign the brand. Match the existing site's typography, spacing, card styling, bento layout, project showcase rhythm, and subtle scroll/reveal motion. Prefer fidelity over new abstractions.

## Implementation Source

Canonical implementation files:

- `src/styles.css`: visual tokens, typography, layout, components, responsiveness, motion.
- `src/app.js`: content structure, component composition, behavior, and scroll animation.
- `design.md`: earlier design-system extraction notes.

For future edits, update `src/styles.css` first, then reflect stable decisions in this document.
