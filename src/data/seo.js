export const seo = {
  "index.html": {
    title: "Product Design Partner for Fast-Moving SaaS Teams | Blending Lab",
    description:
      "Fractional product design for SaaS and AI teams that need a reliable partner, not another freelancer. Clear flows, clean UI, Webflow builds, and support that actually moves product and growth forward.",
    ogTitle: "Blending Lab - digital studio for web design, no-code tools and Google Ads",
    ogImage: "https://drive.google.com/file/d/1AtsFFFK9I_hqWu3sF-YfUVnZpPY89oE7/view?usp=sharing",
  },
  "design.html": {
    title: "Design Services for SaaS, Startups & Digital Products | Blending Lab",
    description:
      "Design services for startups and SaaS companies - product design, Webflow development, and presentation design in flexible hour packages.",
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
  "privacy-policy.html": {
    title: "Privacy Policy",
    description:
      "Explore Blending Lab's Privacy Policy and Terms & Conditions. Learn how we protect your data and outline the rules for website usage. Your digital experience, secured.",
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
  "xcelerate-auto-case-study.html": {
    title: "XCelerate Auto Case Study",
    description:
      "Case study of XCare, Xcelerate Auto’s EV warranty product—covering UX strategy, product design, and a fresh digital experience built for growth.",
  },
  "xcelerate-auto-admin-portal.html": {
    title: "Blending Lab - XCelerate Admin Portal - Case Study",
    description:
      "UX/UI case study for XCelerate Auto’s internal claims admin portal, focused on improving EV warranty claim management, communication workflows, operational visibility, and usability for internal teams",
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
  if (project) {
    return {
      title: seo[project.caseStudyUrl]?.title || `${project.title} | Blending Lab`,
      description: project.description,
    };
  }

  return seo[page] || seo["index.html"];
}
