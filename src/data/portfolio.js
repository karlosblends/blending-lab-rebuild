export const portfolioProfile = {
  name: "Karlo Osman",
  role: "Product designer & design engineer",
  status: "Available for selected collaborations",
  bio: "I design products and websites, then build the frontend so the good decisions survive contact with production.",
  location: "Zagreb, Croatia",
  timezone: "Europe/Zagreb",
  email: "hello@blending-lab.com",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/karlo-osman" },
    { label: "X", href: "https://x.com/karlosblends" },
  ],
};

export const portfolioEntries = [
  {
    slug: "xcare",
    format: "wide",
    summary: "The customer journey and operating system behind an EV warranty business, designed across two and a half years.",
    tags: ["Product design", "Design system", "Embedded"],
    media: [
      "projects/xcare/cover.png",
      "projects/xcare/claims-queue.png",
      "projects/xcare/quote-form-landing.png",
    ],
  },
  {
    slug: "visit-sibenik",
    format: "wide",
    summary: "A tourism website rebuilt as destination infrastructure—four languages, connected content, and a CMS made to hold a whole city.",
    tags: ["Destination platform", "Webflow", "Multilingual CMS"],
    media: [
      "projects/visit-sibenik/cover.jpg",
      "projects/visit-sibenik/gallery-01.jpg",
      "projects/visit-sibenik/gallery-05.jpg",
    ],
  },
  {
    slug: "aspromised",
    format: "standard",
    summary: "A CRO diagnostic product I took from an empty file to a live, paid tool—idea, interface, frontend and all.",
    tags: ["Solo product", "Design + code"],
    media: [
      "projects/aspromised/cover.png",
      "projects/aspromised/gallery-01.png",
      "projects/aspromised/gallery-02.png",
    ],
  },
  {
    slug: "refinance-digital-dashboard",
    format: "standard",
    summary: "A dense broker workspace made legible enough to find the next refinancing opportunity at a glance.",
    tags: ["Fintech", "Product UI"],
    media: [
      "projects/refinance-digital-dashboard/cover.png",
      "projects/refinance-digital-dashboard/gallery-01.png",
      "projects/refinance-digital-dashboard/gallery-02.png",
    ],
  },
  {
    slug: "ny-lon",
    format: "wide",
    summary: "A psychology practice shaped by New York and London, translated into an editorial website with a pulse.",
    tags: ["Art direction", "Webflow", "Motion"],
    media: [
      "projects/ny-lon/cover.png",
      "projects/ny-lon/gallery-01.png",
      "projects/ny-lon/gallery-02.png",
    ],
  },
  {
    slug: "humble-hunters",
    format: "standard",
    summary: "A recruitment group given a sharper voice, a flexible CMS and the kind of motion that knows when to stop.",
    tags: ["Web design", "Webflow"],
    media: [
      "projects/humble-hunters/cover.png",
      "projects/humble-hunters/gallery-01.png",
      "projects/humble-hunters/gallery-02.png",
    ],
  },
  {
    slug: "super-ai",
    format: "standard",
    summary: "A homepage concept that makes enterprise document AI feel understandable before it tries to feel impressive.",
    tags: ["Enterprise AI", "Visual design"],
    media: [
      "projects/super-ai/cover.png",
      "projects/super-ai/gallery-01.png",
      "projects/super-ai/gallery-02.png",
    ],
  },
];

export function getPortfolioProjects(projects = []) {
  const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

  return portfolioEntries
    .map((entry) => {
      const project = projectsBySlug.get(entry.slug);
      return project ? { ...project, portfolio: entry } : null;
    })
    .filter(Boolean);
}
