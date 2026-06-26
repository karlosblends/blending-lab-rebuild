import { projects, projectImageSrcsets } from "./data/projects.js";

const img = (name) => `/public/assets/images/${name}`;
const vid = (name) => `/public/assets/videos/${name}`;
const imgSrcset = (name) => (projectImageSrcsets[name] ? projectImageSrcsets[name].split(", ").map((entry) => `${img(entry.split(" ")[0])} ${entry.split(" ")[1]}`).join(", ") : "");
const meta = {
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

const faqs = [
  [
    "Why work with a dedicated design partner instead of an agency?",
    "Agencies charge for their overhead, not just the work. With me, you get senior-level design without account managers, project coordinators, or markup. Whether it's a one-time website or ongoing product design, you work directly with one person who actually does the work.",
  ],
  [
    "How do I know if I need a project or a monthly plan?",
    "If you have a clear, scoped goal like a website redesign, landing page, or pitch deck, a one-time project works well. If your team ships regularly and needs design support across product, web, and marketing, the monthly plan gives you consistent capacity without hiring.",
  ],
  [
    "How does pricing work?",
    "Fixed projects have fixed prices upfront, while ongoing design support is based on monthly retainers. No hourly tracking, no surprise invoices.",
  ],
  [
    "Can we start with a pilot before a monthly retainer?",
    "Yes. A pilot is a focused, paid testing period before committing to a monthly retainer. It gives us a real project to work through together, so you can see the communication, speed, and design quality in practice.",
  ],
];

function ensureHeadAssets() {
  const ensureLink = (rel, href) => {
    if (document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    document.head.append(link);
  };

  ensureLink("icon", img("favicon.png"));
  ensureLink("apple-touch-icon", img("webclip.png"));
}

function setMeta(page) {
  const data = meta[page] || meta["index.html"];
  document.title = data.title || "Blending Lab";
  upsertMeta("description", data.description || "");
  upsertMeta("og:title", data.ogTitle || data.title || "Blending Lab", "property");
  upsertMeta("og:description", data.description || "", "property");
  upsertMeta("twitter:title", data.ogTitle || data.title || "Blending Lab", "property");
  upsertMeta("twitter:description", data.description || "", "property");
  if (data.ogImage) {
    upsertMeta("og:image", data.ogImage, "property");
    upsertMeta("twitter:image", data.ogImage, "property");
  }
}

function upsertMeta(name, content, key = "name") {
  let el = document.head.querySelector(`meta[${key}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, name);
    document.head.append(el);
  }
  el.setAttribute("content", content);
}

function nav(active) {
  const pricingHref = active === "index.html" ? "#work-ways" : "index.html#work-ways";
  const links = [
    ["projects.html", "Projects"],
    [pricingHref, "Pricing"],
    ["design.html", "Design"],
  ];
  const mobileLinks = [...links, ["contact.html", "Contact"]];
  return `
    <nav class="nav" data-nav>
      <div class="nav__bar">
        <div class="nav__links">
          ${links
            .slice(0, 2)
            .map(([href, label]) => `<a class="nav__link ${active === href ? "active" : ""}" href="${href}">${label}</a>`)
            .join("")}
        </div>
        <a class="nav__logo" href="index.html" aria-label="Blending Lab home"><img src="${img("Logo_1.svg")}" alt="Blending Lab"></a>
        <div class="nav__right">
          <a class="nav__link ${active === "design.html" ? "active" : ""}" href="design.html">Design</a>
          <a class="button" href="contact.html">Contact</a>
        </div>
        <button class="nav__toggle" type="button" aria-label="Open menu" aria-expanded="false" data-nav-toggle><span></span></button>
        <div class="nav__mobile-menu">
          ${mobileLinks
            .map(([href, label]) => `<a class="nav__link ${active === href ? "active" : ""}" href="${href}">${label}</a>`)
            .join("")}
        </div>
      </div>
    </nav>`;
}

function hero({ title, lead, primary, secondary, media, eyebrow }) {
  const mediaHtml = media
    ? `<div class="hero__media reveal" style="background-image:url('${img(media.image || "IMG-9214-from-Lightroom-1.jpg")}')">${
        media.video
          ? `<video autoplay muted loop playsinline poster="${media.poster ? vid(media.poster) : img(media.image)}"><source src="${vid(media.video)}" type="video/mp4"></video>`
          : ""
      }</div>`
    : "";
  return `
    <main class="hero">
      <div class="container--medium">
        <div class="hero__content reveal">
          ${eyebrow ? `<div class="eyebrow"><span class="pulse"></span>${eyebrow}</div>` : ""}
          <h1>${title}</h1>
          <p class="hero__lead">${lead}</p>
          <div class="button-row">
            ${primary ? `<a class="glow-button" href="${primary.href}" ${primary.external ? 'target="_blank" rel="noreferrer"' : ""}><span>${primary.label}</span></a>` : ""}
            ${secondary ? `<a class="${secondary.text ? "button button--text" : "button button--ghost"}" href="${secondary.href}" ${secondary.external ? 'target="_blank" rel="noreferrer"' : ""}>${secondary.label}</a>` : ""}
          </div>
        </div>
        ${mediaHtml}
      </div>
    </main>`;
}

function brands() {
  const logos = ["HH-logo.svg", "refinance-logo.svg", "xcelerate-logo.svg", "tmp-logo.svg", "he-logo.svg", "brands-logo.svg"];
  return `
    <section class="section--small reveal">
      <div class="container">
        <div class="section-title">
          <div class="eyebrow">Teams I've helped grow</div>
        </div>
        <div class="brands-strip"><div class="brands-grid">${logos.map((logo) => `<img src="${img(logo)}" alt="">`).join("")}</div></div>
      </div>
    </section>`;
}

function largeText() {
  return `
    <section class="section reveal">
      <div class="container">
        <div class="section-title"><div class="eyebrow"><span class="pulse"></span>Today's market situation</div></div>
        <div class="large-copy">Let's be real. <strong>Hiring a full-time designer</strong> means paying a salary plus all the extra costs that come with it. And agencies? You're paying for their entire team, not just the <strong>work you need</strong>. With me, you get <span class="accent">high-quality design</span> without the <strong>overhead</strong>.</div>
        <div class="mini-grid">
          ${[
            ["Frame-6.svg", "Save money"],
            ["Frame-6-1.svg", "Get world-class design"],
            ["Frame-6-2.svg", "Predictable cost"],
          ]
            .map(([icon, text]) => `<div class="mini-card"><img src="${img(icon)}" alt=""><span>${text}</span></div>`)
            .join("")}
        </div>
      </div>
    </section>`;
}

function projectCard(project) {
  const href = project.caseStudyUrl || "projects.html";
  const image = project.thumbnail || project.coverImage;
  const media = image
    ? `<img src="${img(image)}" ${imgSrcset(image) ? `srcset="${imgSrcset(image)}" sizes="(max-width: 767px) calc(100vw - 2.5rem), calc(100vw - 5rem)"` : ""} alt="" loading="lazy" decoding="async">`
    : `<div class="project-card__placeholder"><span>${project.service || "Project"}</span></div>`;
  return `
    <a class="project-card reveal" href="${href}">
      <div class="project-card__media">${media}</div>
      <div class="project-card__text">
        <h3 class="project-card__title">${project.title}</h3>
        <p>${project.description}</p>
      </div>
    </a>`;
}

function projectsSection({ all = false, heading = "Projects", intro = "Projects built to work as good as they look. Designed to grow with your business." } = {}) {
  const list = all
    ? projects.filter((project) => !project.archived)
    : projects.filter((project) => project.featured && !project.archived);
  return `
    <section class="section section-projects">
      <div class="container">
        <div class="section-title reveal">
          <h2>${heading}</h2>
          <p>${intro}</p>
        </div>
        <div class="projects-list">${list.map(projectCard).join("")}</div>
        ${all ? "" : `<div class="button-row"><a class="glow-button" href="projects.html"><span>All projects</span></a></div>`}
      </div>
    </section>`;
}

function howItWorks() {
  const cards = [
    ["Transparent & Predictable", "No messy email threads or constant hand-holding. I plug into your existing workflow and work from the same priorities as the rest of your team.", "PM-Tool.png"],
    ["Cross-platform design foundation", "One partner for your entire visual ecosystem. I ensure your Product, Marketing Site, and Sales Decks are perfectly consistent.", "Cross-Platform.png"],
    ["Extended network when needed", "Get access to trusted specialists for advanced development or animation - all under one point of contact.", "Network-lined.png"],
    ["Built for long-term collaboration", "Work with one designer who understands your brand and plans ahead with you over time.", "Long-term.png"],
  ];
  return `
    <section class="section">
      <div class="container">
        <h2 class="reveal">How it <em>works</em></h2>
        <div class="bento" style="margin-top:2rem">
          ${cards
            .map((c, i) => `<article class="card ${i === 0 ? "card--wide" : ""} reveal"><h4>${c[0]}</h4><p>${c[1]}</p><img class="decor" src="${img(c[2])}" alt=""></article>`)
            .join("")}
        </div>
      </div>
    </section>`;
}

function workWays() {
  return `
    <section class="section" id="work-ways">
      <div class="container">
        <h2 class="reveal">Two ways to <em>work together</em></h2>
        <div class="split-cards" style="margin-top:2rem">
          <article class="cta-card reveal">
            <div><h3>One-time project</h3></div>
            <div><p>Get an estimated price range for your website, landing page, or digital product in under 2 minutes.</p><div class="button-row" style="justify-content:flex-start"><a class="button" href="https://blending-estimator.lovable.app/estimate?path=project" target="_blank" rel="noreferrer">Get an estimate →</a></div></div>
          </article>
          <article class="cta-card second reveal">
            <div><h3>Looking for a design partner?</h3></div>
            <div><p>See how ongoing design support works and what to expect investment-wise.</p><div class="button-row" style="justify-content:flex-start"><a class="button" href="https://blending-estimator.lovable.app/estimate?path=retainer" target="_blank" rel="noreferrer">Explore pricing →</a></div></div>
          </article>
        </div>
      </div>
    </section>`;
}

function faqSection(items = faqs, title = "Frequently asked questions") {
  return `
    <section class="section">
      <div class="container">
        <div class="faq-layout">
          <h2 class="reveal">${title}</h2>
          <div class="faq-list reveal">
            ${items
              .map(
                ([q, a]) => `
                <div class="faq-item">
                  <button class="faq-question" type="button"><span>${q}</span><span class="faq-icon">+</span></button>
                  <div class="faq-answer"><div><p>${a}</p></div></div>
                </div>`
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>`;
}

function contactSection({ croatian = false } = {}) {
  return `
    <section id="contact-section" class="section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-side reveal">
            <div>
              <h2>${croatian ? "Pokrenimo razgovor" : "Let's get in"} ${croatian ? "" : "<em>touch</em>"}</h2>
              <p class="hero__lead">${croatian ? "Imate projekt, pitanje ili ideju? Javite se i vidimo koji je najbolji sljedeći korak." : "Hit me up if you’re wishing to discuss a project, have general questions or thinking about a partnership."}</p>
            </div>
            <div class="contact-cards">
              <a class="contact-card" href="mailto:hello@blending-lab.com"><img src="${img("Frame-6_1.svg")}" alt=""><span><span class="muted">E-mail</span><br>hello@blending-lab.com</span></a>
              <a class="contact-card" href="https://www.linkedin.com/in/karlo-osman" target="_blank" rel="noreferrer"><img src="${img("Frame-6-1_1.svg")}" alt=""><span><span class="muted">LinkedIn</span><br>@karloosman</span></a>
            </div>
          </div>
          <div class="form-card reveal">
            <h2>${croatian ? "Spremni za ozbiljniju online prisutnost?" : "Build something great"}</h2>
            <form data-contact-form action="https://formspree.io/f/xpqgddeg" method="POST" style="margin-top:2rem">
              <input type="hidden" name="_subject" value="New Blending Lab website inquiry">
              <div class="form-grid">
                <div><label>${croatian ? "Ime i prezime" : "First and last name"}</label><input name="name" required placeholder="${croatian ? "Ivan Horvat" : "John Doe"}"></div>
                <div><label>${croatian ? "E-mail adresa" : "Email Address"}</label><input name="email" type="email" required placeholder="${croatian ? "ivan.horvat@gmail.com" : "john.doe@acme.com"}"></div>
                <div><label>${croatian ? "Tvrtka" : "Company"}</label><input name="company" placeholder="${croatian ? "Naziv tvrtke" : "Company name"}"></div>
                <div><label>${croatian ? "Budžet" : "Budget"}</label><input name="budget" placeholder="${croatian ? "Okvirni budžet" : "Estimated budget"}"></div>
                <div class="field--full"><label>${croatian ? "Poruka" : "Message"}</label><textarea name="message" required placeholder="${croatian ? "Podijelite što vam je na umu..." : "Share the idea, product, or challenge you’re working on…"}"></textarea></div>
              </div>
              <p class="form-note" data-form-status role="status" aria-live="polite"></p>
              <div class="button-row" style="justify-content:flex-start"><button class="button" type="submit">Submit</button></div>
            </form>
          </div>
        </div>
      </div>
    </section>`;
}

function footer() {
  return `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__grid">
          <div>
            <img class="footer__logo" src="${img("Logo.svg")}" alt="Blending Lab">
            <p class="footer__muted" style="font-size:1.1rem;margin-top:1rem">No big teams, no extra costs. Just great design.</p>
            <div class="socials">
              <a href="https://www.linkedin.com/in/karlo-osman" target="_blank" rel="noreferrer"><img src="${img("linkedin.svg")}" alt="LinkedIn"></a>
              <a href="https://x.com/karlosblends" target="_blank" rel="noreferrer"><img src="${img("social_x.svg")}" alt="X"></a>
            </div>
          </div>
          <div class="footer__links"><span class="footer__muted">Pages</span><a href="index.html">Home</a><a href="projects.html">Projects</a><a href="contact.html">Contact</a></div>
          <div class="footer__links"><span class="footer__muted">Legal</span><a href="privacy-policy.html">Privacy policy</a><a href="privacy-policy.html">Tems and Conditions</a></div>
        </div>
        <div class="footer__bottom">2026 Blending Lab. All rights reserved.</div>
      </div>
    </footer>`;
}

function homePage() {
  return `
    ${nav("index.html")}
    ${hero({
      title: "You’re a few clicks away from having a dedicated designer for your projects.",
      lead: "No payroll, no long-term commitment - just high-quality design when you need it. Think of me as your in-house designer, but without the extra costs.",
      primary: { label: "Let's talk", href: "contact.html" },
      secondary: { label: "Free Audit", href: "try-for-free.html" },
      media: { image: "IMG-9214-from-Lightroom-1.jpg" },
    })}
    ${brands()}
    ${largeText()}
    ${projectsSection()}
    ${howItWorks()}
    ${workWays()}
    ${faqSection()}
    ${blogPreview()}
    ${contactSection()}
    ${footer()}`;
}

function blogPreview() {
  return `
    <section class="section">
      <div class="container">
        <div class="section-title reveal">
          <h2>Blog</h2>
          <p>A collection of design insights, UX thinking, and practical perspectives on building better digital products.</p>
        </div>
      </div>
    </section>`;
}

function designPage() {
  return `
    ${nav("design.html")}
    ${hero({
      title: "In-house level design, without the in-house designer cost",
      lead: "Your product challenges, handled by a single designer just an email away. Let’s talk about your needs and how we can work together.",
      primary: { label: "Book a free 30-min call", href: "https://calendly.com/hello-blending-lab/discovery-call", external: true },
      secondary: { label: "Ask a question", href: "#contact-section", text: true },
    })}
    ${challengePanel()}
    ${projectsSection({ heading: "Case Study", intro: "" })}
    ${expectations("What can you expect from <em>our partnership</em>?", "Image_before.jpg")}
    ${contactSection()}
    ${footer()}`;
}

function challengePanel() {
  const items = [
    ["Box.svg", "Flexibility and Adaptability", "Freelancers adjust to your workload and project needs, scaling up or down without the delays of agency processes."],
    ["Price-tag.svg", "Pay for output, not a seat", "You pay for expertise, not overhead. No salaries, benefits, or office costs. Just the design work you need."],
    ["Focus.svg", "Business-Focused Design", "Get targeted design solutions that align with your business goals and drive real results, helping you move forward faster."],
    ["Key-Square.svg", "No Long-Term Commitment", "Hire only when needed, with the added benefit of flexible retainer options for consistent, long-term support."],
  ];
  return `
    <section class="section">
      <div class="container">
        <div class="feature-panel reveal">
          <div class="feature-panel__image" style="background-image:url('${img("Orange-Graphic.svg")}')"></div>
          <div><img src="${img("Emoji_happy.svg")}" alt="" style="width:72px;margin-bottom:1rem"><h2>Why SaaS teams hire a design partner instead of going in-house</h2><p class="hero__lead">Hiring a full-time designer means salary, benefits, management, and months of ramp-up. Working with me, you get senior product design from day one, at a fraction of the cost, with zero HR overhead.</p></div>
        </div>
        <div class="feature-grid" style="margin-top:1rem">${items.map(([icon, title, text]) => `<div class="feature-item reveal"><img src="${img(icon)}" alt=""><h4>${title}</h4><p>${text}</p></div>`).join("")}</div>
      </div>
    </section>`;
}

function expectations(title, imageName = "IMG-9041-from-Lightroom-min.jpg") {
  const items = [
    "Clear pricing, expectations and term document",
    "Product design trends and the thinking behind them",
    "UX and Competitor Research Options",
    "Flexible support options for ongoing design needs",
  ];
  return `
    <section class="section">
      <div class="container">
        <div class="feature-panel reveal">
          <div class="feature-panel__image" style="background-image:url('${img(imageName)}')"></div>
          <div>
            <h3>${title}</h3>
            <div class="service-grid" style="margin-top:1.5rem">${items.map((item, i) => `<div class="feature-item"><img src="${img(`${i + 1}.svg`)}" alt=""><h4>${item}</h4></div>`).join("")}</div>
          </div>
        </div>
      </div>
    </section>`;
}

function webDesignPage() {
  return `
    ${nav("design.html")}
    ${hero({
      title: "Great web design starts with the right approach",
      lead: "Websites that feel polished, explain the offer clearly, and create the trust people need before they reach out.",
      primary: { label: "Book a free 30-min call", href: "https://calendly.com/hello-blending-lab/discovery-call", external: true },
      secondary: { label: "Ask a question", href: "#contact-section", text: true },
      media: { image: "Vertical-Hero-Web-Design-1..webp" },
    })}
    ${simpleFeatures("Identifying a common challenge", [
      ["building.svg", "Clarity first", "A site should quickly explain what you do, who it is for, and why visitors should care."],
      ["user-search.svg", "User journeys", "Pages are shaped around how buyers scan, compare, and decide."],
      ["Webflow.svg", "Clean Webflow builds", "Layouts are built so your team can keep improving after launch."],
      ["design.svg", "Strong visual system", "Brand, UI, and conversion sections work together without feeling generic."],
    ])}
    ${projectsSection({ all: true, heading: "Work", intro: "" })}
    ${expectations("What can you expect from a web design project?", "Vertical-Hero-Web-Design-1..webp")}
    ${contactSection()}
    ${footer()}`;
}

function googleAdsPage() {
  return `
    ${nav("design.html")}
    ${hero({
      title: "Google Ads makes your phone ring. A lot.",
      lead: "At Blending Lab, we blend innovation and precision in Google Ads. Elevate your online presence with expert strategies and clear landing page journeys.",
      primary: { label: "Let's talk", href: "contact.html" },
      media: { image: "Vertical-Hero-Ads.webp" },
    })}
    ${simpleFeatures("Why Google Ads?", [
      ["Pulse.svg", "Fast results", "Reach people who are already searching for what you offer."],
      ["Focus.svg", "PPC expertise", "Campaigns are structured around intent, relevance, and performance."],
      ["Coins.svg", "Budget control", "Spend is controlled, visible, and optimized around real outcomes."],
    ])}
    ${processSection()}
    ${contactSection()}
    ${footer()}`;
}

function simpleFeatures(title, items) {
  return `
    <section class="section">
      <div class="container">
        <div class="section-title reveal"><h2>${title}</h2></div>
        <div class="feature-grid">${items.map(([icon, heading, text]) => `<div class="feature-item reveal"><img src="${img(icon)}" alt=""><h4>${heading}</h4><p>${text}</p></div>`).join("")}</div>
      </div>
    </section>`;
}

function processSection() {
  const steps = [
    ["process-step-1.svg", "Deep understanding", "We map your offer, market, and goals before building the campaign."],
    ["process-step-2.svg", "Launch and learn", "Campaigns and landing pages go live with the tracking needed to improve."],
    ["process-step-3.svg", "Optimize", "We keep refining toward better leads, lower waste, and clearer results."],
  ];
  return simpleFeatures("The process", steps);
}

function projectsPage({ croatian = false } = {}) {
  return `
    ${nav("projects.html")}
    ${hero({
      title: croatian ? "Projekti" : "From concept to creation - browse my best work",
      lead: croatian ? "Odabrani primjeri radova koji spajaju dizajn, jasnoću i preciznu izvedbu." : "A compact look at recent product, web, and design-system work.",
      primary: { label: croatian ? "Pokrenimo razgovor" : "Let's talk", href: croatian ? "#contact-section" : "contact.html" },
    })}
    ${projectsSection({ all: true, heading: croatian ? "Projekti" : "Projects", intro: "" })}
    ${contactSection({ croatian })}
    ${footer()}`;
}

function contactPage() {
  return `
    ${nav("contact.html")}
    <main class="contact-page">
    ${contactSection()}
    ${footer()}
    </main>`;
}

function aboutPage() {
  return `
    ${nav("about-me.html")}
    ${hero({
      title: "Hey there, I'm Karlo. This is the perfect page to get to know me.",
      lead: "Scroll through and get to know me better. I'm sharing my distinctive career journey, passions, and personal insights.",
      primary: { label: "Let's get in touch", href: "#contact-section" },
      media: { image: "About-me.webp" },
    })}
    <section class="section"><div class="container"><div class="feature-panel reveal"><div class="feature-panel__image" style="background-image:url('${img("IMG-9041-from-Lightroom-min.jpg")}')"></div><div><h2>I dedicated time to self-discovery.</h2><p class="hero__lead">I went from being unsure about my future to starting in advertising, thinking that was my path. But over time, I shifted to design - now my work helps businesses grow while giving me the freedom to do what I love.</p></div></div></div></section>
    ${contactSection()}
    ${footer()}`;
}

function tryFreePage() {
  return `
    ${nav("try-for-free.html")}
    ${hero({
      title: "Get one screen redesigned for free.",
      lead: "Share your context, I’ll redesign it and send it back. No commitment.",
      primary: { label: "Start free redesign", href: "contact.html" },
    })}
    <section class="section"><div class="container"><div class="section-title reveal"><h2>Before & After</h2></div><div class="before-after reveal" data-before-after><img src="${img("Image_before.jpg")}" alt="Before"><img class="after" src="${img("Image_after.jpg")}" alt="After"><input type="range" min="0" max="100" value="50" aria-label="Before after slider"></div></div></section>
    ${projectsSection({ all: true, heading: "Other projects", intro: "" })}
    ${footer()}`;
}

function croHomePage() {
  return `
    ${nav("home.html")}
    ${hero({
      title: "Vaša vizija. Naš dizajn.",
      lead: "Stranice koje jasno komuniciraju vrijednost, izgledaju profesionalno i ostavljaju pravi dojam.",
      primary: { label: "Pokrenimo razgovor", href: "#contact-section" },
      media: { image: "IMG-9214-from-Lightroom-1.jpg" },
    })}
    ${projectsSection({ all: true, heading: "Projekti", intro: "" })}
    ${workWays()}
    ${simpleFeatures("Zašto baš Blending Lab", [
      ["Book-call.svg", "Jasan proces", "Suradnja je strukturirana, pregledna i usmjerena na konkretan ishod."],
      ["presention-chart.svg", "Poslovni fokus", "Dizajn ne postoji sam za sebe, već podržava prodaju, povjerenje i rast."],
      ["Webflow.svg", "Brza izvedba", "Webflow omogućuje kvalitetan launch i lakše održavanje nakon njega."],
    ])}
    ${faqSection(faqs, "Često postavljana pitanja")}
    ${contactSection({ croatian: true })}
    ${footer()}`;
}

function webStraniceAdsPage() {
  return `
    ${nav("web-stranice-ads.html")}
    ${hero({
      title: "Tražite osobu za izradu web stranica? Na pravom ste mjestu.",
      lead: "Tražite vrhunskog partnera za izradu web stranice? Na tržištu je puno konkurencije, stoga nema smisla zadovoljiti se lošom web stranicom.",
      primary: { label: "Zatražite ponudu", href: "#contact-section" },
      media: { image: "Vertical-Hero-Web-Design-1..webp" },
    })}
    ${simpleFeatures("Dizajn i izrada web stranice", [
      ["design.svg", "Dizajn", "Jasna struktura, moderan vizualni sustav i stranice koje grade povjerenje."],
      ["Webflow.svg", "Webflow", "Izvedba u sustavu koji se može brzo ažurirati i širiti."],
      ["google-ads.svg", "Google Ads", "Kampanje i landing stranice mogu raditi zajedno prema istom cilju."],
    ])}
    ${projectsSection({ all: true, heading: "Projekti", intro: "" })}
    ${processSection()}
    ${contactSection({ croatian: true })}
    ${footer()}`;
}

function caseStudy({ admin = false } = {}) {
  const title = admin ? "XCelerate Claims Admin Portal" : "XCelerate Auto Product Redesign Case Study";
  const subtitle = admin
    ? "Claims Management Admin Portal"
    : "Warranty Purchase Process";
  const cover = admin ? "Project-Showcase-1.png" : "Xcelerate-Auto-Cover.jpg";
  const gallery = admin
    ? ["Project-Showcase-1.png", "Project-Showcase-2.png", "Project-Showcase-3.png"]
    : ["Project-Showcase-1.png", "Project-Showcase-2.png", "Project-Showcase-3.png", "Project-Showcase-4.png"];
  return `
    ${nav("projects.html")}
    <main class="case-hero section">
      <div class="container">
        <div class="hero__content reveal"><h2>${title}</h2><h3 class="muted">${subtitle}</h3></div>
        <div class="case-cover reveal" style="background-image:url('${img(cover)}')"></div>
        <div class="case-meta-grid reveal">
          <div class="case-meta"><span class="muted">Client</span><h4>XCelerate Auto</h4></div>
          <div class="case-meta"><span class="muted">Work</span><h4>UX/UI Design</h4></div>
          <div class="case-meta"><span class="muted">Focus</span><h4>${admin ? "Admin workflows" : "Product redesign"}</h4></div>
        </div>
      </div>
    </main>
    <section class="section"><div class="container"><div class="rich-text reveal"><h2>${admin ? "Final Thoughts" : "Warranty Purchase Process"}</h2><p>${admin ? "The admin portal work focused on simplifying claims management, communication, approvals, and operational visibility for internal teams." : "The redesign focused on making EV warranty comparison clearer, improving product understanding, and giving the brand a modern interface that can grow over time."}</p></div><div class="image-grid" style="margin-top:2rem">${gallery.map((g) => `<img class="reveal" src="${img(g)}" alt="">`).join("")}</div></div></section>
    ${contactSection()}
    ${footer()}`;
}

function standardProjectPage(project) {
  if (!project) return placeholderPage("projects.html");
  const cover = project.coverImage
    ? `<div class="case-cover reveal" style="background-image:url('${img(project.coverImage)}')"></div>`
    : `<div class="case-cover case-cover--empty reveal"><span>Cover image coming soon</span></div>`;
  const gallery = project.gallery && project.gallery.length
    ? `<div class="image-grid" style="margin-top:2rem">${project.gallery.map((g) => `<img class="reveal" src="${img(g)}" alt="">`).join("")}</div>`
    : "";
  return `
    ${nav("projects.html")}
    <main class="case-hero section">
      <div class="container">
        <div class="hero__content reveal">
          <h2>${project.title}</h2>
          <p class="hero__lead">${project.description}</p>
        </div>
        ${cover}
        <div class="case-meta-grid case-meta-grid--two reveal">
          <div class="case-meta"><span class="muted">Service</span><h4>${project.service}</h4></div>
          <div class="case-meta"><span class="muted">Industry</span><h4>${project.industry}</h4></div>
        </div>
      </div>
    </main>
    <section class="section">
      <div class="container">
        <div class="rich-text reveal">
          <h2>About the project</h2>
          <p>${project.about}</p>
          <h2>The company</h2>
          <p>${project.company}</p>
        </div>
        ${gallery}
      </div>
    </section>
    ${contactSection()}
    ${footer()}`;
}

function privacyPage() {
  return `
    ${nav("privacy-policy.html")}
    <main class="section"><div class="container"><div class="rich-text reveal"><h2>Privacy Policy</h2><p>Explore Blending Lab's Privacy Policy and Terms & Conditions. Learn how we protect your data and outline the rules for website usage. Your digital experience, secured.</p><p>Information submitted through contact forms is used to respond to your inquiry and provide relevant project communication. Analytics and cookie tools may be used to understand site performance and improve the experience.</p><h2>Terms & Conditions</h2><p>By using this website, you agree to use the content and contact forms responsibly. Project terms, deliverables, timelines, and pricing are agreed separately before work begins.</p></div></div></main>
    ${footer()}`;
}

function utilityPage(page) {
  const titles = {
    "log-in.html": "Log in",
    "sign-up.html": "Sign up",
    "reset-password.html": "Reset Password",
    "update-password.html": "Update Password",
    "access-denied.html": "Access Denied",
    "user-account.html": "My Account",
  };
  const title = titles[page] || "Blending Lab";
  return `
    <div class="utility-wrap">
      <div class="utility-card">
        <img src="${img("Logo.svg")}" alt="Blending Lab" style="width:54px">
        <h2>${title}</h2>
        <p class="muted">This utility page was preserved from the Webflow export. Connect it to your authentication provider before production use.</p>
        <form><label>Email</label><input type="email" placeholder="john.doe@acme.com"><label>Password</label><input type="password" placeholder="••••••••"><div class="button-row" style="justify-content:flex-start"><button class="button" type="button">${title}</button></div></form>
        <a class="muted" href="index.html">Back home</a>
      </div>
    </div>`;
}

function styleGuidePage() {
  return `
    ${nav("style-guide.html")}
    <main class="section"><div class="container"><div class="rich-text reveal"><h1>Style Guide</h1><h2>Colors</h2><p>Charcoal, almost black, alabaster, gray, and flamingo orange form the core palette.</p><h2>Buttons</h2><p><a class="button" href="#">Default button</a> <a class="glow-button" href="#"><span>Glowing CTA</span></a></p><h2>Cards</h2></div><div class="feature-grid">${["UX/UI Design", "Webflow Development", "Presentation Design", "Google Ads"].map((x) => `<div class="feature-item"><h4>${x}</h4><p>Reusable dark card sample.</p></div>`).join("")}</div></div></main>
    ${footer()}`;
}

function placeholderPage(page) {
  const heading = page.includes("blog") ? "Blog" : page.includes("component") || page === "components.html" ? "Components" : "Happy client, great project";
  return `
    ${nav(page)}
    ${hero({ title: heading, lead: "This page path was preserved from the Webflow export and rebuilt with the shared Blending Lab visual system.", primary: { label: "Back home", href: "index.html" } })}
    ${contactSection()}
    ${footer()}`;
}

function renderPage(page) {
  const warrantyProject = projects.find((project) => project.slug === "xcelerate-auto-warranty-purchase-process");
  const routes = {
    "index.html": homePage,
    "": homePage,
    "design.html": designPage,
    "web-design.html": webDesignPage,
    "google-ads.html": googleAdsPage,
    "projects.html": () => projectsPage(),
    "projekti.html": () => projectsPage({ croatian: true }),
    "contact.html": contactPage,
    "about-me.html": aboutPage,
    "try-for-free.html": tryFreePage,
    "home.html": croHomePage,
    "web-stranice-ads.html": webStraniceAdsPage,
    "xcelerate-auto-case-study.html": () => standardProjectPage(warrantyProject),
    "xcelerate-auto-admin-portal.html": () => caseStudy({ admin: true }),
    "privacy-policy.html": privacyPage,
    "style-guide.html": styleGuidePage,
    "components.html": styleGuidePage,
    "log-in.html": () => utilityPage("log-in.html"),
    "sign-up.html": () => utilityPage("sign-up.html"),
    "reset-password.html": () => utilityPage("reset-password.html"),
    "update-password.html": () => utilityPage("update-password.html"),
    "access-denied.html": () => utilityPage("access-denied.html"),
    "user-account.html": () => utilityPage("user-account.html"),
  };
  const renderer = routes[page] || (() => placeholderPage(page));
  document.getElementById("app").innerHTML = `<div class="page">${renderer()}</div>`;
}

function attachBehavior() {
  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-nav-toggle]");
    if (toggle) {
      const nav = toggle.closest("[data-nav]");
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    }

    const faqButton = event.target.closest(".faq-question");
    if (faqButton) {
      faqButton.closest(".faq-item").classList.toggle("open");
    }

    const anchorLink = event.target.closest('a[href^="#"]');
    if (anchorLink) {
      const targetId = anchorLink.getAttribute("href").slice(1);
      const target = targetId ? document.getElementById(targetId) : null;
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", `#${targetId}`);
      }
    }
  });

  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-form-status]");
      const submit = form.querySelector('button[type="submit"]');
      const endpoint = form.getAttribute("action");
      if (!endpoint) return;

      const originalLabel = submit ? submit.textContent : "";
      if (status) {
        status.textContent = "";
        status.classList.remove("is-error", "is-success");
      }
      if (submit) {
        submit.disabled = true;
        submit.textContent = "Sending...";
      }

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Form submission failed");

        form.reset();
        if (status) {
          status.textContent = "Thanks! Your message has been sent.";
          status.classList.add("is-success");
        }
      } catch (error) {
        if (status) {
          status.textContent = "Something went wrong. Please try again or email hello@blending-lab.com.";
          status.classList.add("is-error");
        }
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.textContent = originalLabel;
        }
      }
    });
  });

  document.querySelectorAll("[data-before-after]").forEach((slider) => {
    const input = slider.querySelector("input");
    const update = () => slider.style.setProperty("--split", `${input.value}%`);
    input.addEventListener("input", update);
    update();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  const heroMedia = document.querySelector(".hero__media");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (heroMedia && !reduceMotion.matches) {
    let ticking = false;
    const updateHeroMediaScale = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const travel = Math.max(1, heroMedia.offsetTop * 0.72);
      const progress = Math.min(1, Math.max(0, scrollY / travel));
      const eased = 1 - Math.pow(1 - progress, 3);
      const scale = 0.8 + eased * 0.2;
      heroMedia.style.setProperty("--hero-media-scale", scale.toFixed(4));
      ticking = false;
    };
    const requestHeroMediaScale = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateHeroMediaScale);
      }
    };
    updateHeroMediaScale();
    window.addEventListener("scroll", requestHeroMediaScale, { passive: true });
    window.addEventListener("resize", requestHeroMediaScale);
  } else if (heroMedia) {
    heroMedia.style.setProperty("--hero-media-scale", "1");
  }
}

const page = window.location.pathname.split("/").pop() || "index.html";
ensureHeadAssets();
setMeta(page);
renderPage(page);
attachBehavior();
