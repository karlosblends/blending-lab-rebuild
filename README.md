# Blending Lab Rebuild

Astro migration of the Blending Lab website. The project keeps the original page paths, copy, metadata, fonts, favicon/webclip, exported imagery, dark visual direction, responsive behavior, and the core interaction patterns while moving the active build into a component-based Astro structure.

## Structure

- `src/pages` contains the Astro routes.
- `src/components` contains shared pieces such as the header, footer, project cards, galleries, project pages, and contact form.
- `src/layouts/BaseLayout.astro` contains the SEO wrapper and shared browser behavior.
- `src/data/projects.js` remains the project source of truth.
- `src/styles.css` contains the preserved visual system.
- `public/assets/images`, `public/assets/fonts`, `public/assets/videos`, and `public/assets/projects` contain site assets.
- `legacy-static` contains a snapshot of the pre-Astro root HTML/CSS/JS implementation for rollback/reference.
- `webflow-source` contains the untouched uploaded export for reference.
- `design.md` documents the design system extracted from the export.

## Run Locally

From this folder:

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:4321
```

Build for production:

```bash
npm run build
```

## Notes

The Webflow interaction file is not used by the Astro build. Important interactions are preserved with maintainable browser-native code: sticky glass navigation, mobile menu, FAQ accordion, reveal-on-scroll blur/fade, glowing CTA treatment, hover lifts, contact form confirmation, and a before/after slider.
