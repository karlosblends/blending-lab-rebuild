# Blending Lab Rebuild

Clean static rebuild of the Blending Lab Webflow export. The project keeps the original page paths, copy, metadata, fonts, favicon/webclip, exported imagery, dark visual direction, responsive behavior, and the core interaction patterns without depending on Webflow runtime scripts.

## Structure

- `index.html` and the other `*.html` files are lightweight page entry shells.
- `src/app.js` contains the shared components, page data, routing by filename, metadata updates, and small interactions.
- `src/styles.css` contains the rebuilt visual system.
- `public/assets/images`, `public/assets/fonts`, and `public/assets/videos` contain the exported Webflow assets.
- `webflow-source` contains the untouched uploaded export for reference.
- `design.md` documents the design system extracted from the export.

## Run Locally

From this folder:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

No install step is required.

## Notes

The Webflow interaction file was not reused. Important interactions were recreated with maintainable browser-native code: sticky glass navigation, mobile menu, FAQ accordion, reveal-on-scroll blur/fade, glowing CTA treatment, hover lifts, contact form confirmation, and a before/after slider.
