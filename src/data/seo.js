export const siteSeo = {
  title: "Blending Lab — Design + code, from one person",
  description:
    "Product design and websites, designed and hand-coded by one person. You get the design and the working, production-ready code — no handoff, no builder lock-in, no team markup.",
  ogTitle: "Blending Lab — Design + code, from one person",
  ogImage: "https://www.blending-lab.com/og-image/og-image.jpg",
};

export const seo = {
  "index.html": {
    title: siteSeo.title,
    description: siteSeo.description,
    ogTitle: siteSeo.ogTitle,
    ogImage: siteSeo.ogImage,
  },
  "about.html": {
    title: "About Blending Lab | Design that ships",
    description:
      "Meet Karlo Osman: a design engineer who designs products and websites, then hand-codes the frontend so the approved design is what ships.",
  },
  "design.html": {
    title: "About Blending Lab | Design that ships",
    description:
      "The old design page has moved to the new Blending Lab About page.",
  },
  "web-design.html": {
    title: "Blending Lab - Web design services",
    description:
      "Experience the synergy of web design and flawless Webflow integration at Blending Lab. Discover how we harmonize creativity and technology. Explore our portfolio now.",
  },
  "google-ads.html": {
    title: "Blending Lab - Google Ads services",
    description:
      "At Blending Lab, we blend innovation and precision in Google Ads. Elevate your online presence with our expert strategies. Explore our success stories now.",
  },
  "contact.html": { title: "Blending Lab - Contact us and let's get started" },
  "projects.html": { title: "Blending Lab - Browse our latest projects and let's work" },
  "about-me.html": {
    title: "Blending Lab | About Karlo",
    description:
      "Scroll through and get to know me better. I'm sharing my distinctive career journey, passions, and personal insights.",
  },
  "try-for-free.html": {
    title: "Try a Free Screen Redesign | Blending Lab",
    description:
      "Get one of your product or landing page screens redesigned for free. Share your context, I’ll redesign it and send it back. No commitment.",
  },
  "estimate.html": {
    title: "Project Estimate | Blending Lab",
    description: "Estimate a one-time project or ongoing design partnership with Blending Lab.",
  },
  "privacy-policy.html": {
    title: "Privacy Policy | Blending Lab",
    description:
      "Read the Blending Lab Privacy Policy, including how website inquiries, the project estimator, analytics, service providers, and privacy rights are handled.",
  },
  "terms.html": {
    title: "Terms & Conditions | Blending Lab",
    description:
      "Read the Terms & Conditions for using the Blending Lab website, including website use, services, estimates, intellectual property, privacy, and liability.",
  },
  "home.html": {
    title: "Web stranice koje podižu kredibilitet i skraćuju put do klijenata | Blending Lab",
    description:
      "Stranice koje jasno komuniciraju vrijednost, izgledaju profesionalno i ostavljaju pravi dojam. Fokus na povjerenju, jasnom vođenju korisnika i rezultatima koje B2B tržište očekuje.",
  },
  "projekti.html": {
    title: "Blending Lab | Web projekti i digitalna rješenja",
    description:
      "Odabrani primjeri radova koji spajaju dizajn, jasnoću i preciznu izvedbu. Web rješenja koja grade povjerenje i ističu vaš brend.",
  },
  "web-stranice-ads.html": {
    title: "Izrada vrhunskih web stranica - Blending Lab",
    description:
      "Tražite vrhunskog partnera za izradu web stranice? Na tržištu je jako puno konkurencije, stoga nema smisla zadovoljiti se s lošom web stranicom. Na pravom ste mjestu za vrhunsku uslugu.",
  },
  "xcare.html": {
    title: "XCare — Designing both sides of an EV warranty business | Blending Lab",
    description:
      "Two and a half years designing the purchase flow, admin platform, and marketing site for XCare, an EV extended warranty product.",
    ogTitle: "XCare — Designing both sides of an EV warranty business",
    ogImage: "https://www.blending-lab.com/og-image/og-xcare.jpg",
  },
  "xcelerate-auto-case-study.html": {
    title: "XCare — Designing both sides of an EV warranty business | Blending Lab",
    description:
      "Two and a half years designing the purchase flow, admin platform, and marketing site for XCare, an EV extended warranty product.",
    ogTitle: "XCare — Designing both sides of an EV warranty business",
    ogImage: "https://www.blending-lab.com/og-image/og-xcare.jpg",
  },
  "xcelerate-auto-admin-portal.html": {
    title: "XCare — Designing both sides of an EV warranty business | Blending Lab",
    description:
      "Two and a half years designing the purchase flow, admin platform, and marketing site for XCare, an EV extended warranty product.",
    ogTitle: "XCare — Designing both sides of an EV warranty business",
    ogImage: "https://www.blending-lab.com/og-image/og-xcare.jpg",
  },
  "detail_project.html": { title: "Blending Lab" },
  "components.html": { title: "Components" },
  "style-guide.html": { title: "Style Guide" },
  "detail_blog-posts.html": { title: "" },
  "detail_blog-posts-global.html": { title: "Blending Lab" },
  "log-in.html": { title: "Blending Lab" },
  "sign-up.html": { title: "Blending Lab" },
  "reset-password.html": { title: "Blending Lab" },
  "update-password.html": { title: "Blending Lab" },
  "access-denied.html": { title: "Blending Lab" },
  "user-account.html": { title: "Blending Lab" },
};

export function getSeo(page, project) {
  const pageSeo = project ? seo[project.caseStudyUrl] : seo[page];

  return {
    ...siteSeo,
    ...pageSeo,
    title: pageSeo?.title || siteSeo.title,
    description: pageSeo?.description || siteSeo.description,
    ogTitle: pageSeo?.ogTitle || pageSeo?.title || siteSeo.ogTitle,
    ogImage: pageSeo?.ogImage || siteSeo.ogImage,
  };
}
