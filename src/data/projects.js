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
