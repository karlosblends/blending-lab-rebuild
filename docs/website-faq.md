# Saved website FAQ

The FAQ section is no longer rendered on public website pages because the project planner handles visitor questions.

The original questions and answers are preserved in `src/data/faqs.js`. The reusable section remains in `src/components/FaqSection.astro`, along with its styles, accordion behavior and design-system specimen.

To restore it, import `FaqSection` and `{ faqs }` in `src/components/PageRenderer.astro`, then add `<FaqSection items={faqs} />` before the contact section on the homepage. The legacy `home.html` page previously used the same content with `title="Često postavljana pitanja"`. The legacy `src/app.js` also retains its FAQ content and renderer, without calls from public page templates.
