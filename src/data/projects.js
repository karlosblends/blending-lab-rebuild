export const projectImageSrcsets = {};

const projectAsset = (folder, file) => `projects/${folder}/${file}`;
const projectGallery = (folder, count, extension = "png") =>
  Array.from({ length: count }, (_, index) => projectAsset(folder, `gallery-${String(index + 1).padStart(2, "0")}.${extension}`));

export const projects = [
  {
    title: "XCare Admin Portal",
    slug: "xcare-admin-portal",
    template: "standard",
    description:
      "An internal platform for support and operations teams to manage warranty claims, customer information, and daily workflows with greater clarity.",
    role: "Product Designer",
    service: "Product Design",
    deliverables: "Admin Dashboard, Internal Platform, Design System",
    expertise: "Dashboard Design, Internal Tools, Information Architecture",
    industry: "Insurtech",
    company:
      "The XCare Admin Portal is an internal platform used by support and operations teams to manage warranty claims, customer information and day-to-day workflows.",
    myRole:
      "Designed the administration platform from the ground up, including dashboards, claims management, detailed workflows and reusable interface components. The focus was on organizing complex operational data into clear, scalable interfaces that improve efficiency for internal teams while supporting the continued growth of the platform.",
    services: ["Product Design", "UX/UI Design", "Dashboard Design", "Design System", "Information Architecture", "Internal Tools"],
    coverImage: projectAsset("xcare-admin-portal", "cover.png"),
    gallery: projectGallery("xcare-admin-portal", 4),
    featured: true,
    archived: false,
    caseStudyUrl: "xcelerate-auto-admin-portal.html",
  },
  {
    title: "XCare Warranty Purchase Process",
    slug: "xcare-warranty-purchase-process",
    template: "standard",
    description:
      "A multi-step EV warranty purchase flow designed around clearer decisions, stronger trust, and improved conversion.",
    role: "Product Designer",
    service: "Product Design",
    deliverables: "Multi-step Purchase Flow, Design System, A/B Testing",
    expertise: "User Flows, CRO, Product UX, Design Systems",
    industry: "Insurtech",
    company:
      "The warranty purchase process is the core conversion flow of the XCare platform, guiding customers from vehicle selection to policy purchase through a streamlined digital experience.",
    myRole:
      "Designed a multi-step purchase flow focused on clarity, trust and conversion. The project involved simplifying complex warranty decisions into an intuitive experience, supported by extensive research, iterative design, reusable design system components and ongoing A/B testing. Every screen was refined to reduce friction while helping customers confidently select the right coverage.",
    services: ["Product Design", "UX/UI Design", "User Flows", "Design System", "Conversion Optimization", "Responsive Design"],
    coverImage: projectAsset("xcare-warranty-purchase-process", "cover.png"),
    gallery: projectGallery("xcare-warranty-purchase-process", 4),
    featured: true,
    archived: false,
    caseStudyUrl: "xcare-warranty-purchase-process.html",
    legacyUrls: ["xcelerate-auto-case-study.html"],
  },
  {
    title: "XCare Website",
    slug: "xcare-website",
    template: "standard",
    description:
      "An evolving customer-facing website and landing page system for explaining EV warranty products and improving conversion.",
    role: "Product Designer",
    service: "Product Design",
    deliverables: "Website, Landing Pages, Design System, CRO",
    expertise: "Product Design, Design Systems, Conversion Optimization, A/B Testing",
    industry: "Insurtech",
    company:
      "XCare provides extended warranty plans for electric vehicles across the United States, helping owners protect themselves against unexpected repair costs through a fully digital purchasing experience.",
    myRole:
      "Designed and continuously evolved the customer-facing website as part of an ongoing product partnership. My work spans landing pages, feature launches, conversion-focused improvements and a growing design system that supports rapid iteration. Every release is informed by user behavior, experimentation and close collaboration with product, marketing and development teams, with the goal of making complex warranty products easier to understand and purchase.",
    services: ["Product Design", "UX/UI Design", "Design System", "Conversion Optimization", "Landing Pages", "Responsive Design"],
    coverImage: projectAsset("xcare-website", "cover.png"),
    gallery: projectGallery("xcare-website", 4),
    featured: true,
    archived: false,
    caseStudyUrl: "xcare-website.html",
  },
  {
    title: "Refinance Digital Dashboard",
    slug: "refinance-digital-dashboard",
    template: "standard",
    description:
      "A CRM-style fintech dashboard for helping brokers monitor loan rates, client portfolios, and refinancing opportunities at a glance.",
    role: "Product Designer",
    service: "Product Design",
    deliverables: "CRM Dashboard, Data Visualization, Internal Platform",
    expertise: "Dashboard Design, CRM UX, Information Architecture, Data Visualization",
    industry: "Fintech",
    company:
      "Refinance Digital is a fintech platform that helps mortgage and loan brokers monitor changing interest rates and identify refinancing opportunities for their clients. The platform streamlines daily operations by bringing customer data, loan information and market changes into a single workspace.",
    myRole:
      "Designed a CRM-style dashboard that enables brokers to efficiently manage their daily workflow. The interface was built around clear information hierarchy, helping users track loan rates, monitor client portfolios and identify refinancing opportunities at a glance. The project focused on creating an intuitive, data-driven experience that supports fast decision making while remaining scalable as the platform evolves.",
    services: ["Product Design", "UX/UI Design", "Dashboard Design", "CRM Design", "Information Architecture", "Data Visualization", "Responsive Design"],
    coverImage: projectAsset("refinance-digital-dashboard", "cover.png"),
    gallery: projectGallery("refinance-digital-dashboard", 3),
    featured: true,
    archived: false,
    caseStudyUrl: "refinance-digital-dashboard.html",
  },
  {
    title: "Humble Education",
    slug: "humble-education",
    template: "standard",
    description:
      "A modern Webflow website and CMS for helping international students understand and navigate studying abroad.",
    role: "UX/UI Designer & Webflow Developer",
    service: "UX/UI Design",
    deliverables: "Marketing Website, CMS, Custom Animations",
    expertise: "Visual Design, Webflow Development, CMS, Motion Design",
    industry: "Education",
    company:
      "Humble Education helps international students navigate the process of studying in Croatia and across Europe. From university admissions to visa guidance, the company provides personalized support that makes studying abroad more accessible and less overwhelming for students from around the world.",
    myRole:
      "Designed the complete website in Figma and developed it in Webflow with a fully manageable CMS. The visual direction focused on creating a modern, approachable experience that would resonate with a younger audience while reinforcing trust throughout the application journey. The project follows the broader Humble brand language through playful layouts, custom animations and responsive interactions, resulting in a website that feels both engaging and easy to navigate.",
    services: ["UX/UI Design", "Web Design", "Webflow Development", "CMS", "Responsive Design", "Custom Animations"],
    coverImage: projectAsset("humble-education", "cover.png"),
    gallery: projectGallery("humble-education", 4),
    featured: false,
    archived: false,
    caseStudyUrl: "humble-education.html",
  },
  {
    title: "Humble Hunters",
    slug: "humble-hunters",
    template: "standard",
    description:
      "A polished marketing website and CMS for a recruitment group built around bold typography, structured layouts, and refined interactions.",
    role: "UX/UI Designer & Webflow Developer",
    service: "UX/UI Design",
    deliverables: "Marketing Website, CMS, Custom Animations",
    expertise: "Visual Design, Webflow Development, CMS, Motion Design",
    industry: "Recruitment",
    company:
      "Humble Hunters is the parent company behind several specialized brands, providing recruitment and talent solutions across multiple industries. The company positions itself through a modern, forward-thinking identity that reflects innovation, precision and long-term partnerships.",
    myRole:
      "Designed the website in Figma and developed it in Webflow with a scalable CMS and custom animations. The design embraces a clean visual language with bold typography, structured layouts and refined interactions to communicate the company's modern positioning. Every section was designed to feel polished, intuitive and easy to maintain as the website continues to grow.",
    services: ["UX/UI Design", "Web Design", "Webflow Development", "CMS", "Responsive Design", "Custom Animations"],
    coverImage: projectAsset("humble-hunters", "cover.png"),
    gallery: projectGallery("humble-hunters", 5, "png"),
    featured: true,
    archived: false,
    caseStudyUrl: "humble-hunters.html",
  },
  {
    title: "NY/LON Psychology",
    slug: "ny-lon",
    template: "standard",
    description:
      "A bold, cinematic Webflow website for a psychology practice shaped by New York, London, and the people who move between them.",
    role: "Lead Designer, Strategist, Art Director & Webflow Developer",
    service: "UX/UI Design",
    deliverables: "Strategy, UX/UI Design, Art Direction, Motion Design, Webflow Development",
    expertise: "Editorial Web Design, Service Architecture, Webflow, Motion Direction",
    industry: "Psychology / Mental Health / Professional Services",
    platform: "Webflow",
    company:
      "NY/LON Psychology is a practice serving individuals, clinicians, and organizations across New York and London.",
    myRole:
      "Led strategy, design, art direction, copy direction, motion direction, Webflow development, SEO foundations, and launch for a psychology website that needed to feel intelligent, international, emotionally aware, and distinct from the conventions of the category.",
    services: ["Strategy", "UX/UI Design", "Art Direction", "Copy Direction", "Motion Design", "Webflow Development", "SEO", "Launch"],
    coverImage: projectAsset("ny-lon", "cover.png"),
    gallery: projectGallery("ny-lon", 5),
    featured: true,
    archived: false,
    caseStudyUrl: "ny-lon-psychology.html",
    liveUrl: "https://www.nylonpsychology.com",
    liveLabel: "Visit live website →",
  },
  {
    title: "super.AI",
    slug: "super-ai",
    template: "standard",
    description:
      "A homepage concept for an enterprise AI platform, designed to make a technical document-processing product feel clear and approachable.",
    role: "UX/UI Designer",
    service: "UX/UI Design",
    deliverables: "Homepage Concept, Responsive UI",
    expertise: "Web Design, Enterprise Product Communication, Visual Hierarchy",
    industry: "Artificial Intelligence",
    company:
      "super.AI develops enterprise AI solutions for intelligent document processing, helping organizations automate complex document workflows through advanced AI technology. Their platform is used by businesses across industries to process large volumes of documents with greater speed and accuracy.",
    myRole:
      "Created the visual design for the homepage with a strong focus on communicating a highly technical product through a clean, approachable interface. The design combines light and dark sections to create visual rhythm while highlighting key product capabilities and reinforcing the company's position as a leader in AI-powered document automation.",
    services: ["UX/UI Design", "Web Design", "Landing Page Design", "Responsive Design"],
    coverImage: projectAsset("super-ai", "cover.png"),
    gallery: projectGallery("super-ai", 4, "png"),
    featured: true,
    archived: false,
    caseStudyUrl: "super-ai.html",
  },
  {
    title: "AsPromised",
    slug: "aspromised",
    template: "standard",
    description:
      "A CRO tool that scores how well a landing page keeps its ad's promise — conceived, designed, coded, and shipped solo, from idea to live payments.",
    role: "Founder, Designer & Developer",
    service: "SaaS Product",
    deliverables: "Live SaaS Product, CRO Diagnostic Tool, Payments",
    expertise: "Product Design, Front-end Development, CRO, Payments",
    industry: "Conversion Optimization",
    pageIntro:
      "AsPromised is a conversion tool I took end to end on my own: idea, product design, front-end code, and a live payment flow. Users paste an ad and a landing page, and it returns a prioritized diagnosis of where the page breaks the ad's promise — grounded in ten published CRO frameworks, with its reasoning shown instead of hidden in a black box.",
    proofLine:
      "The point of this project isn't a pixel-perfect UI — it's range. One person carrying a real product from a blank page to something live and paid, designing and building every layer.",
    services: ["Product Strategy", "Product Design", "Front-end Development", "CRO", "Payment Flow", "Solo Build"],
    coverImage: projectAsset("aspromised", "cover.png"),
    gallery: projectGallery("aspromised", 4),
    featured: true,
    archived: false,
    caseStudyUrl: "aspromised.html",
    liveUrl: "https://aspromised.io/",
    liveLabel: "Try it live →",
  },
  {
    title: "Byte Lab",
    slug: "byte-lab",
    template: "standard",
    description:
      "A targeted website redesign for an embedded systems company, focused on clearer information architecture and stronger conversion paths.",
    role: "UX/UI Designer",
    service: "UX/UI Design",
    deliverables: "Website Redesign, Information Architecture",
    expertise: "UX/UI Design, Conversion Optimization, Content Hierarchy",
    industry: "Technology",
    company:
      "Byte Lab is an engineering company specializing in embedded systems, IoT development and electronic product design. They help businesses transform hardware concepts into market-ready products through engineering, prototyping and manufacturing expertise.",
    myRole:
      "Worked alongside a performance marketing agency to refine the existing website through targeted UX and UI improvements. The redesign focused on improving information architecture, strengthening content hierarchy and creating clearer conversion paths while preserving the company's established visual identity.",
    services: ["UX/UI Design", "Website Redesign", "Information Architecture", "Conversion Optimization", "Responsive Design"],
    coverImage: projectAsset("byte-lab", "cover.png"),
    gallery: projectGallery("byte-lab", 5),
    featured: true,
    archived: false,
    caseStudyUrl: "byte-lab.html",
  },
  {
    title: "Caronwall",
    slug: "caronwall",
    template: "standard",
    description:
      "A premium Webflow Ecommerce experience for an automotive store, built around clear product presentation and a frictionless purchase flow.",
    role: "Webflow Developer",
    service: "Webflow Development",
    deliverables: "Ecommerce Website, CMS",
    expertise: "Webflow Ecommerce, Responsive Development, Purchase Flow",
    industry: "Automotive Ecommerce",
    company:
      "Caronwall was an automotive e-commerce brand focused on premium products for car enthusiasts. The online store was designed to showcase products clearly while providing a seamless purchasing experience from discovery to checkout.",
    myRole:
      "Developed the complete e-commerce website in Webflow Ecommerce. The focus was on creating a clean shopping experience with intuitive navigation, clear product presentation and a frictionless checkout flow. The website was fully responsive and designed to keep attention on the products while maintaining a premium visual appearance.",
    services: ["Webflow Development", "Webflow Ecommerce", "Responsive Design", "CMS"],
    coverImage: projectAsset("caronwall", "cover.png"),
    gallery: projectGallery("caronwall", 4, "png"),
    featured: false,
    archived: false,
    caseStudyUrl: "caronwall.html",
  },
  {
    title: "JVCS",
    slug: "jvcs",
    template: "standard",
    description:
      "A futuristic marketing website concept for a global workforce brand, built around a black-and-blue identity and motion-led interface direction.",
    role: "UX/UI Designer",
    service: "UX/UI Design",
    deliverables: "Marketing Website, Custom Animations",
    expertise: "Visual Design, Motion Design, Responsive UI",
    industry: "Recruitment",
    company:
      "JVCS is part of the Humble ecosystem, connecting businesses with global recruitment and workforce solutions. The company wanted a digital presence that reflected innovation, technology and international reach.",
    myRole:
      "Designed the complete website in Figma with a visual direction centered around a futuristic black-and-blue identity. The interface combines bold layouts, custom animations and subtle motion to reinforce the company's technology-focused positioning while maintaining clarity and usability across all devices.",
    services: ["UX/UI Design", "Web Design", "Responsive Design", "Custom Animations"],
    coverImage: projectAsset("JVCS", "cover.png"),
    gallery: projectGallery("JVCS", 4, "png"),
    featured: false,
    archived: false,
    caseStudyUrl: "jvcs.html",
  },
];

// Curated for breadth: alternate client, project type, and visual/problem framing rather than chronology.
const curatedProjectOrder = [
  "xcare-admin-portal",
  "humble-hunters",
  "ny-lon",
  "xcare-warranty-purchase-process",
  "refinance-digital-dashboard",
  "xcare-website",
  "aspromised",
  "byte-lab",
  "jvcs",
  "caronwall",
  "humble-education",
  "super-ai",
];

const curatedProjectRank = new Map(curatedProjectOrder.map((slug, index) => [slug, index]));

projects.sort((a, b) => (curatedProjectRank.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (curatedProjectRank.get(b.slug) ?? Number.MAX_SAFE_INTEGER));

const caseStudyConfigs = {
  "xcare-admin-portal": {
    label: "XCare · Internal product design",
    headline: "Designing the internal platform behind XCare",
    summary: "Support and operations workspace for warranty claims, customer records, messages, and daily case work.",
    heroTreatment: "immersive",
    intro: {
      eyebrow: "Operating context",
      title: "Claims, customers, and daily decisions in one workspace",
      body:
        "The admin portal brings claims, customer records, messages, and approvals into one internal workspace.",
    },
    context: [
      ["Role", "Product Designer"],
      ["Scope", "Admin platform, claims workflows, design system"],
      ["Focus", "Internal tools, information architecture, operations UX"],
    ],
    sections: [
      {
        type: "fullImage",
        image: projectAsset("xcare-admin-portal", "gallery-01.png"),
        caption: "Claims overview with status filters.",
      },
      {
        type: "textImage",
        eyebrow: "Workflow design",
        title: "Status, ownership, and next action stay visible.",
        body:
          "Detail screens keep the current state of the case close to the customer and policy context.",
        image: projectAsset("xcare-admin-portal", "gallery-02.png"),
        caption: "Claim detail with customer and policy context.",
        scale: "wide",
      },
      {
        type: "twoImage",
        ratio: "primary",
        title: "A system of connected operational views",
        body:
          "The same structure carries across messages, claim details, and operational views.",
        images: [
          { src: projectAsset("xcare-admin-portal", "gallery-03.png") },
          { src: projectAsset("xcare-admin-portal", "gallery-04.png") },
        ],
      },
    ],
  },
  "xcare-warranty-purchase-process": {
    label: "XCare · Purchase flow",
    headline: "Clarifying the EV warranty purchase journey",
    summary: "A responsive purchase flow for vehicle entry, plan selection, and checkout.",
    heroTreatment: "immersive",
    intro: {
      eyebrow: "Conversion context",
      title: "A multi-step decision with real financial weight",
      body:
        "The purchase flow moves from vehicle details to plan selection and checkout, with product detail introduced only where it matters.",
    },
    context: [
      ["Role", "Product Designer"],
      ["Scope", "Purchase flow, design system, A/B testing"],
      ["Focus", "User flows, trust, conversion UX"],
    ],
    sections: [
      {
        type: "fullImage",
        eyebrow: "Sequence",
        title: "From vehicle entry to plan selection",
        body:
          "Plan differences, pricing, and checkout stay visible as the customer moves through the flow.",
        image: projectAsset("xcare-warranty-purchase-process", "gallery-01.png"),
        caption: "Vehicle details and quote entry.",
      },
      {
        type: "twoImage",
        ratio: "primary",
        title: "Coverage selection and purchase states",
        body: "Related steps are shown in one aligned grid so the flow reads as a connected product.",
        images: [
          { src: projectAsset("xcare-warranty-purchase-process", "gallery-02.png"), caption: "Coverage selection." },
          { src: projectAsset("xcare-warranty-purchase-process", "gallery-03.png"), caption: "Checkout state." },
        ],
      },
      {
        type: "fullImage",
        size: "bleed",
        image: projectAsset("xcare-warranty-purchase-process", "gallery-04.png"),
        caption: "Mobile owner details and purchase guidance.",
      },
    ],
  },
  "xcare-website": {
    label: "XCare · Website system",
    headline: "A website system for XCare's EV warranty product",
    summary: "A customer-facing website and landing-page system for explaining EV warranty products.",
    heroTreatment: "contained",
    intro: {
      eyebrow: "Marketing and product overlap",
      title: "A website that has to explain, reassure, and convert",
      body:
        "The website supports education, landing pages, product launches, and conversion experiments for XCare.",
    },
    context: [
      ["Role", "Product Designer"],
      ["Scope", "Website, landing pages, design system, CRO"],
      ["Focus", "Product communication and conversion"],
    ],
    sections: [
      {
        type: "textImage",
        eyebrow: "Communication design",
        title: "Turning a complicated product into a clearer first impression",
        body:
          "The homepage puts coverage, price, and quote entry close together instead of hiding them behind long copy.",
        image: projectAsset("xcare-website", "gallery-01.png"),
        scale: "wide",
      },
      {
        type: "twoImage",
        title: "Landing pages as part of the product system",
        body:
          "Campaign pages reuse the core product language while staying focused on one offer.",
        images: [
          { src: projectAsset("xcare-website", "gallery-02.png") },
          { src: projectAsset("xcare-website", "gallery-03.png") },
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("xcare-website", "gallery-04.png"),
        caption: "Mobile quote and education states.",
      },
    ],
  },
  "refinance-digital-dashboard": {
    label: "Refinance Digital · Fintech dashboard",
    headline: "Designing a broker dashboard for rate-aware decisions",
    summary: "A CRM-style dashboard for rates, client portfolios, and refinancing opportunities.",
    heroTreatment: "immersive",
    intro: {
      eyebrow: "Product context",
      title: "A data-heavy workspace for daily broker decisions",
      body:
        "Refinance Digital helps brokers monitor loan rates, client portfolios, and refinancing opportunities from one dashboard.",
    },
    context: [
      ["Role", "Product Designer"],
      ["Scope", "CRM dashboard, data visualization, internal platform"],
      ["Focus", "Information architecture and decision support"],
    ],
    sections: [
      {
        type: "fullImage",
        image: projectAsset("refinance-digital-dashboard", "gallery-01.png"),
        caption: "Broker dashboard with portfolio and rate signals.",
      },
      {
        type: "twoImage",
        ratio: "primary",
        title: "From portfolio overview to individual action",
        body:
          "The supporting screens carry the same data hierarchy into follow-up workflows.",
        images: [
          { src: projectAsset("refinance-digital-dashboard", "gallery-02.png") },
          { src: projectAsset("refinance-digital-dashboard", "gallery-03.png") },
        ],
      },
    ],
  },
  "humble-education": {
    label: "Humble Education · Webflow website",
    headline: "Designing a clearer path for students studying abroad",
    summary: "A Webflow website and CMS for international student guidance.",
    heroTreatment: "contained",
    intro: {
      eyebrow: "Website context",
      title: "A service website built around trust and orientation",
      body:
        "Humble Education helps international students navigate admissions, visas, and studying abroad.",
    },
    context: [
      ["Role", "UX/UI Designer and Webflow Developer"],
      ["Scope", "Marketing website, CMS, custom animations"],
      ["Focus", "Visual design, Webflow development, CMS"],
    ],
    sections: [
      {
        type: "textImage",
        eyebrow: "Content structure",
        title: "Making the process feel less overwhelming",
        body:
          "The layout turns a complicated service into a clearer path of information and action.",
        image: projectAsset("humble-education", "gallery-01.png"),
        scale: "wide",
      },
      {
        type: "twoImage",
        title: "A warm visual system with room for practical detail",
        body:
          "Supporting pages keep the tone warm while leaving space for admissions detail.",
        images: [
          { src: projectAsset("humble-education", "gallery-02.png") },
          { src: projectAsset("humble-education", "gallery-03.png") },
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("humble-education", "gallery-04.png"),
      },
    ],
  },
  "humble-hunters": {
    label: "Humble Hunters · Recruitment website",
    headline: "A sharper website system for a recruitment group",
    summary: "A marketing website and CMS for a multi-brand recruitment group.",
    heroTreatment: "immersive",
    intro: {
      eyebrow: "Brand and website",
      title: "A polished digital presence for a multi-brand recruitment group",
      body:
        "Humble Hunters needed a modern website language that could scale through Webflow CMS and reusable page patterns.",
    },
    context: [
      ["Role", "UX/UI Designer and Webflow Developer"],
      ["Scope", "Marketing website, CMS, custom animations"],
      ["Focus", "Visual hierarchy, Webflow development, motion"],
    ],
    sections: [
      {
        type: "fullImage",
        image: projectAsset("humble-hunters", "gallery-01.png"),
        caption: "Homepage and recruitment network entry.",
      },
      {
        type: "textImage",
        eyebrow: "System design",
        title: "Bold typography, controlled structure, and maintainable sections",
        body:
          "The CMS structure keeps the bold visual direction maintainable across pages.",
        image: projectAsset("humble-hunters", "gallery-02.png"),
        align: "left",
      },
      {
        type: "twoImage",
        images: [
          { src: projectAsset("humble-hunters", "gallery-03.png") },
          { src: projectAsset("humble-hunters", "gallery-04.png") },
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("humble-hunters", "gallery-05.png"),
      },
    ],
  },
  "ny-lon": {
    label: "NY/LON Psychology · Webflow website",
    headline: "A psychology website that refuses to look like one.",
    summary:
      "A bold, cinematic digital identity for a psychology practice shaped by New York, London, and the people who move between them.",
    heroTreatment: "immersive",
    heroImage: projectAsset("ny-lon", "cover.png"),
    heroAlt: "NY/LON Psychology homepage with large serif typography over an aerial city crossing",
    intro: {
      eyebrow: "Website and art direction",
      title: "Psychology between two cities",
      body:
        "NY/LON Psychology needed a website that could hold therapy, clinical supervision, consulting, and Mental Health First Aid training without looking like a conventional therapy template. The direction leaned into real New York and London imagery, oversized serif typography, controlled motion, and clear paths into the practice.",
    },
    context: [
      ["Role", "Lead designer, strategist, art director, and Webflow developer"],
      ["Scope", "Strategy, UX/UI, art direction, Webflow, motion, SEO"],
      ["Focus", "Service architecture and cinematic visual direction"],
    ],
    sections: [
      {
        type: "fullImage",
        image: projectAsset("ny-lon", "gallery-02.png"),
        fit: "interface-contain",
        background: "warm",
        padding: "tight",
        alt: "NY/LON Psychology website section pairing New York and London photography",
        caption: "A homepage section connects the NY/LON point of view with clear service paths.",
      },
      {
        type: "textImage",
        eyebrow: "Visual language",
        title: "A different kind of psychology website",
        body:
          "Instead of soft wellness cues, the site uses deep electric blue, warm neutral surfaces, large editorial type, and city photography with a more observational tone. The result feels premium and culturally specific without becoming cold or clinical.",
        image: projectAsset("ny-lon", "gallery-04.png"),
        fit: "interface-contain",
        background: "cool",
        padding: "tight",
        alt: "NY/LON Psychology about section showing deep blue brand color and service positioning",
        caption: "The about section sets the tone for a practice shaped by more than one kind of psychological work.",
        align: "left",
      },
      {
        type: "twoImage",
        title: "New York and London as texture",
        body:
          "The photography avoids postcard landmarks and generic therapy imagery. Transit, infrastructure, architecture, and street-level movement give the site a sense of place without making it feel like a tourism brand.",
        images: [
          {
            src: projectAsset("ny-lon", "cover.png"),
            fit: "visual-cover",
            background: "warm",
            padding: "tight",
            alt: "NY/LON Psychology homepage using aerial street movement for New York",
            caption: "New York appears through movement, infrastructure, and street-level pressure.",
          },
          {
            src: projectAsset("ny-lon", "gallery-01.png"),
            fit: "visual-cover",
            background: "warm",
            padding: "tight",
            alt: "NY/LON Psychology supervision page with London bridge photography",
            caption: "London is shown through architecture, transit, and night-time city texture.",
          },
        ],
      },
      {
        type: "textImage",
        eyebrow: "Responsive design",
        title: "Keeping the character on smaller screens",
        body:
          "Large typography and expressive layouts were adapted deliberately for mobile rather than simply scaled down. Service pages keep their editorial rhythm while staying readable and direct.",
        image: projectAsset("ny-lon", "gallery-03.png"),
        fit: "interface-contain",
        background: "warm",
        padding: "tight",
        alt: "Two mobile screens for NY/LON Psychology showing therapy and consulting pages",
        caption: "Mobile layouts preserve the expressive type scale without making the service pages hard to scan.",
        scale: "wide",
      },
      {
        type: "fullImage",
        image: projectAsset("ny-lon", "gallery-05.png"),
        fit: "interface-contain",
        background: "warm",
        padding: "tight",
        alt: "NY/LON Psychology contact page with locations and inquiry form",
        caption: "The contact page keeps the editorial identity intact while making inquiry paths practical.",
      },
    ],
  },
  "super-ai": {
    label: "super.AI · Enterprise homepage concept",
    headline: "Making an enterprise AI product feel easier to understand",
    summary: "A homepage concept for an enterprise AI document-processing platform.",
    heroTreatment: "contained",
    intro: {
      eyebrow: "Homepage concept",
      title: "A technical product needed a clearer front door",
      body:
        "The homepage concept turns intelligent document processing into a clearer product story.",
    },
    context: [
      ["Role", "UX/UI Designer"],
      ["Scope", "Homepage concept, responsive UI"],
      ["Focus", "Enterprise product communication"],
    ],
    sections: [
      {
        type: "twoImage",
        title: "A homepage paced between explanation and proof",
        body:
          "The page moves between product explanation and proof surfaces.",
        images: [
          { src: projectAsset("super-ai", "gallery-01.png") },
          { src: projectAsset("super-ai", "gallery-02.png") },
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("super-ai", "gallery-03.png"),
      },
      {
        type: "textImage",
        title: "Responsive states stay part of the story",
        body:
          "Mobile keeps the same hierarchy without shrinking the product story away.",
        image: projectAsset("super-ai", "gallery-04.png"),
        scale: "crop",
      },
    ],
  },
  aspromised: {
    label: "AsPromised · Solo SaaS product",
    headline: "Taking a CRO diagnostic product from idea to live payments",
    summary: "A live SaaS product for diagnosing gaps between ads and landing pages.",
    heroTreatment: "immersive",
    intro: {
      eyebrow: "Solo product build",
      title: "One product carried from blank page to live checkout",
      body:
        "AsPromised is a live CRO diagnostic tool with product design, frontend, and payments handled end to end.",
    },
    context: [
      ["Role", "Founder, designer and developer"],
      ["Scope", "Product strategy, UI, frontend, payment flow"],
      ["Focus", "CRO diagnostics and product execution"],
    ],
    sections: [
      {
        type: "fullImage",
        image: projectAsset("aspromised", "gallery-01.png"),
        fit: "interface-contain",
        aspect: "four-three",
        background: "aspromised",
        padding: "comfortable",
        caption: "Ad and landing-page diagnostic workspace.",
      },
      {
        type: "twoImage",
        title: "From input to diagnosis",
        body:
          "The product moves from page input to a prioritized diagnosis.",
        images: [
          { src: projectAsset("aspromised", "gallery-02.png"), fit: "interface-contain", aspect: "four-three", background: "aspromised", padding: "comfortable" },
          { src: projectAsset("aspromised", "gallery-03.png"), fit: "interface-contain", aspect: "four-three", background: "aspromised", padding: "comfortable" },
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("aspromised", "gallery-04.png"),
        fit: "interface-contain",
        aspect: "four-three",
        background: "aspromised",
        padding: "comfortable",
      },
    ],
  },
  "byte-lab": {
    label: "Byte Lab · Website redesign",
    headline: "Refining an engineering website around clearer conversion paths",
    summary: "A targeted website redesign for an embedded systems company.",
    heroTreatment: "contained",
    intro: {
      eyebrow: "Website redesign",
      title: "A technical company needed sharper structure without losing credibility",
      body:
        "Byte Lab needed clearer information architecture for embedded systems, IoT, and electronic product work.",
    },
    context: [
      ["Role", "UX/UI Designer"],
      ["Scope", "Website redesign, information architecture"],
      ["Focus", "Content hierarchy and conversion"],
    ],
    sections: [
      {
        type: "textImage",
        eyebrow: "Information architecture",
        title: "Making engineering expertise easier to navigate",
        body:
          "Technical services and proof points are organized around faster evaluation.",
        image: projectAsset("byte-lab", "gallery-01.png"),
        scale: "wide",
      },
      {
        type: "twoImage",
        images: [
          { src: projectAsset("byte-lab", "gallery-02.png") },
          { src: projectAsset("byte-lab", "gallery-03.png") },
        ],
      },
      {
        type: "twoImage",
        title: "Supporting pages keep the system practical",
        body:
          "Deeper pages keep the hierarchy without repeating one layout.",
        images: [
          { src: projectAsset("byte-lab", "gallery-04.png") },
          { src: projectAsset("byte-lab", "gallery-05.png") },
        ],
      },
    ],
  },
  caronwall: {
    label: "Caronwall · Webflow Ecommerce",
    headline: "Building a premium ecommerce experience around product clarity",
    summary: "A Webflow Ecommerce build for a premium automotive store.",
    heroTreatment: "contained",
    intro: {
      eyebrow: "Ecommerce context",
      title: "A store experience designed to keep attention on the product",
      body:
        "Caronwall needed a clean Webflow Ecommerce build for product presentation, browsing, and checkout.",
    },
    context: [
      ["Role", "Webflow Developer"],
      ["Scope", "Ecommerce website, CMS"],
      ["Focus", "Responsive build and purchase flow"],
    ],
    sections: [
      {
        type: "fullImage",
        image: projectAsset("caronwall", "gallery-01.png"),
      },
      {
        type: "textImage",
        title: "A calm shopping flow for a premium product category",
        body:
          "Navigation, product detail, and checkout stay direct so the products remain the focus.",
        image: projectAsset("caronwall", "gallery-02.png"),
      },
      {
        type: "twoImage",
        images: [
          { src: projectAsset("caronwall", "gallery-03.png") },
          { src: projectAsset("caronwall", "gallery-04.png") },
        ],
      },
    ],
  },
  jvcs: {
    label: "JVCS · Recruitment website concept",
    headline: "A motion-led website direction for a global workforce brand",
    summary: "A futuristic marketing website concept for a global workforce brand.",
    heroTreatment: "immersive",
    intro: {
      eyebrow: "Website concept",
      title: "A technology-forward identity translated into a website system",
      body:
        "JVCS needed a digital direction for a global recruitment and workforce brand.",
    },
    context: [
      ["Role", "UX/UI Designer"],
      ["Scope", "Marketing website, custom animations"],
      ["Focus", "Visual design, motion direction, responsive UI"],
    ],
    sections: [
      {
        type: "fullImage",
        image: projectAsset("JVCS", "gallery-01.png"),
      },
      {
        type: "twoImage",
        title: "A visual system carried across page states",
        images: [
          { src: projectAsset("JVCS", "gallery-02.png") },
          { src: projectAsset("JVCS", "gallery-03.png") },
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("JVCS", "gallery-04.png"),
      },
    ],
  },
};

projects.forEach((project) => {
  const config = caseStudyConfigs[project.slug];
  if (config) project.caseStudy = config;
});
