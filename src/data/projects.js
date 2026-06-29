export const projectImageSrcsets = {
  "Xcelerate-Auto-Cover.jpg":
    "Xcelerate-Auto-Cover-p-800.jpg 800w, Xcelerate-Auto-Cover-p-1600.jpg 1600w, Xcelerate-Auto-Cover-p-2600.jpg 2600w, Xcelerate-Auto-Cover-p-3200.jpg 3200w",
  "Project-Showcase-1.png":
    "Project-Showcase-1-p-800.png 800w, Project-Showcase-1-p-1600.png 1600w, Project-Showcase-1-p-2600.png 2600w",
  "Project-Showcase-2.png":
    "Project-Showcase-2-p-800.png 800w, Project-Showcase-2-p-1600.png 1600w, Project-Showcase-2-p-2600.png 2600w",
  "Project-Showcase-3.png":
    "Project-Showcase-3-p-800.png 800w, Project-Showcase-3-p-1600.png 1600w, Project-Showcase-3-p-2600.png 2600w",
  "Project-Showcase-4.png":
    "Project-Showcase-4-p-800.png 800w, Project-Showcase-4-p-1600.png 1600w, Project-Showcase-4-p-2600.png 2600w",
};

const projectAsset = (folder, file) => `projects/${folder}/${file}`;
const projectGallery = (folder, count) =>
  Array.from({ length: count }, (_, index) => projectAsset(folder, `gallery-${String(index + 1).padStart(2, "0")}.webp`));

export const projects = [
  {
    title: "XCelerate Auto Admin Portal",
    slug: "xcare-admin-portal",
    template: "custom",
    description:
      "Designed an internal claims management platform for XCelerate Auto that helps admin teams manage EV warranty claims, communication, approvals, and operational workflows more efficiently.",
    service: "UX/UI Design",
    industry: "Insurtech",
    about:
      "The XCelerate Claims Admin Portal was designed as an internal operational platform used by claims teams to manage EV warranty claims more efficiently. The goal was to create a system that reduced friction for non-technical admin users handling large volumes of customer communication, repair workflows, approvals, and claim tracking daily.",
    company:
      "XCelerate Auto is an EV-focused warranty and financing company headquartered in Texas, focused on simplifying ownership and protection for electric vehicle drivers.",
    coverImage: projectAsset("xcare-admin-portal", "cover.webp"),
    gallery: projectGallery("xcare-admin-portal", 4),
    featured: true,
    archived: false,
    caseStudyUrl: "xcelerate-auto-admin-portal.html",
  },
  {
    title: "XCelerate Auto Warranty Purchase Process",
    slug: "xcare-warranty-purchase-process",
    template: "standard",
    description:
      "Redesigned the XCare warranty purchase flow to reduce drop-off across an information-heavy 6-step process, clarify plan selection, improve trust, and create a smoother path from landing page to checkout.",
    service: "UX/UI Design",
    industry: "Insurtech",
    about:
      "The heart of the XCare business is their warranty offering. Purchasing a warranty involves a 6-step process, including vehicle information input, selecting a plan, entering owner and car details, legal confirmation, and payment as the final step. This project focused on streamlining the process to minimize customer drop-offs across the information-heavy steps. The goal was to ensure users do not lose interest during the input phases, especially when presented with pricing options. By refining the entire process, from the initial landing page to checkout, the work aimed to create a smoother, more intuitive user experience and improve conversion rates.",
    company:
      "Xcelerate Auto is a leader in leasing, financing, and warranty solutions tailored for the electric vehicle market. Headquartered in McKinney, Texas, the company focuses exclusively on EVs, with a mission to drive the widespread adoption of clean energy transportation.",
    coverImage: projectAsset("xcare-warranty-purchase-process", "cover.webp"),
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
    // TODO: Replace placeholder copy with final project description.
    description:
      "A portfolio project for XCare focused on presenting the brand, product value, and customer journey through a polished digital experience.",
    service: "UX/UI Design",
    industry: "Insurtech",
    // TODO: Replace placeholder copy with final project context.
    about: "Coming soon.",
    // TODO: Replace placeholder copy with final company description if needed.
    company: "Coming soon.",
    coverImage: projectAsset("xcare-website", "cover.webp"),
    gallery: projectGallery("xcare-website", 4),
    featured: true,
    archived: false,
    caseStudyUrl: "xcare-website.html",
  },
  {
    title: "Refinance Digital Dashboard",
    slug: "refinance-digital-dashboard",
    template: "standard",
    // TODO: Replace placeholder copy with final project description.
    description:
      "A digital dashboard concept focused on making refinance-related information easier to scan, understand, and act on.",
    service: "UX/UI Design",
    industry: "Fintech",
    // TODO: Replace placeholder copy with final project context.
    about: "Coming soon.",
    // TODO: Replace placeholder copy with final company description.
    company: "Coming soon.",
    coverImage: projectAsset("refinance-digital-dashboard", "cover.webp"),
    gallery: projectGallery("refinance-digital-dashboard", 3),
    featured: true,
    archived: false,
    caseStudyUrl: "refinance-digital-dashboard.html",
  },
  {
    title: "Humble Education",
    slug: "humble-education",
    template: "standard",
    // TODO: Replace placeholder copy with final project description.
    description:
      "A digital experience for Humble Education focused on presenting the organization, its offering, and its content with a clear visual system.",
    service: "UX/UI Design",
    industry: "Education",
    // TODO: Replace placeholder copy with final project context.
    about: "Coming soon.",
    // TODO: Replace placeholder copy with final company description.
    company: "Coming soon.",
    coverImage: projectAsset("humble-education", "cover.webp"),
    gallery: projectGallery("humble-education", 4),
    featured: false,
    archived: false,
    caseStudyUrl: "humble-education.html",
  },
  {
    title: "Byte Lab",
    slug: "byte-lab",
    template: "standard",
    // TODO: Replace placeholder copy with final project description.
    description:
      "A technology-focused portfolio project for Byte Lab, presenting the product experience through a clean digital interface and supporting visual system.",
    service: "UX/UI Design",
    industry: "Technology",
    // TODO: Replace placeholder copy with final project context.
    about: "Coming soon.",
    // TODO: Replace placeholder copy with final company description.
    company: "Coming soon.",
    coverImage: projectAsset("byte-lab", "cover.webp"),
    gallery: projectGallery("byte-lab", 5),
    featured: true,
    archived: false,
    caseStudyUrl: "byte-lab.html",
  },
];
