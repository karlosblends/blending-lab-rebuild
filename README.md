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
- The standalone Sanity Studio and schema live in the sibling folder `../studio-blending-lab-website`.

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

The project and dataset are configured by default. To override them for another environment, copy `.env.example` to `.env`:

```bash
PUBLIC_SANITY_PROJECT_ID=13xgtq6v
PUBLIC_SANITY_DATASET=production
```

The Astro site reads published `project` documents from Sanity at build time. The Studio stays standalone and is not mounted inside Astro.

Run the Studio from its sibling folder:

```bash
cd ../studio-blending-lab-website
npm run dev
```

The Studio runs at `http://localhost:3333` by default.

The site queries published Sanity `project` documents at build time. The public project ID and production dataset are configured by default; environment variables can override them. If the dataset is empty or a query fails, the build falls back to `src/data/projects.js`.

To perform a one-time import of the current local project content into an empty dataset:

```bash
npm run sanity:export-projects > /tmp/blending-lab-projects.ndjson
cd ../studio-blending-lab-website
npx sanity dataset import /tmp/blending-lab-projects.ndjson production
```

The exporter generates fresh public document IDs. Do not rerun this import against a dataset that already contains these projects, because it would create duplicates.

Only add credentialed CORS origins for Studio or authenticated browser requests on domains you control. Static Astro builds fetch content server-side and do not need frontend CORS access.

## Notes

The Webflow interaction file is not used by the Astro build. Important interactions are preserved with maintainable browser-native code: sticky glass navigation, mobile menu, FAQ accordion, reveal-on-scroll blur/fade, glowing CTA treatment, hover lifts, contact form confirmation, and a before/after slider.
