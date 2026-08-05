# Blending Lab Rebuild

Astro migration of the Blending Lab website. The project keeps the original page paths, copy, metadata, fonts, favicon/webclip, exported imagery, dark visual direction, responsive behavior, and the core interaction patterns while moving the active build into a component-based Astro structure.

## Structure

- `src/pages` contains the Astro routes.
- `src/components` contains shared pieces such as the header, footer, project cards, galleries, project pages, and contact form.
- `src/layouts/BaseLayout.astro` contains the SEO wrapper and shared browser behavior.
- Sanity is the CMS source when configured; `src/data/projects.js` remains a local fallback.
- `src/styles.css` contains the preserved visual system.
- `public/assets/images`, `public/assets/fonts`, `public/assets/videos`, and `public/assets/projects` contain site assets.
- `legacy-static` contains a snapshot of the pre-Astro root HTML/CSS/JS implementation for rollback/reference.
- `webflow-source` contains the untouched uploaded export for reference.
- `design.md` documents the design system extracted from the export.
- `sanity/schemas` contains the Sanity Studio project schema.

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

## Sanity CMS

Copy `.env.example` to `.env` and add your Sanity values:

```bash
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

When those values exist, the Astro dev server mounts Sanity Studio at:

```text
http://localhost:4321/studio
```

The site queries Sanity for `project` documents at build time. If Sanity is not configured or the query fails, the build falls back to `src/data/projects.js`.

To import the current local project content into Sanity:

```bash
npm run sanity:export-projects > sanity/projects.ndjson
npx sanity dataset import sanity/projects.ndjson production --replace
```

After the first Studio visit, add the local and production site URLs as allowed CORS origins in Sanity with credentials enabled.

## Notes

The Webflow interaction file is not used by the Astro build. Important interactions are preserved with maintainable browser-native code: sticky glass navigation, mobile menu, FAQ accordion, reveal-on-scroll blur/fade, glowing CTA treatment, hover lifts, contact form confirmation, and a before/after slider.
