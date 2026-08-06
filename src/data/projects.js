export const projectImageSrcsets = {};

const projectAsset = (folder, file) => `projects/${folder}/${file}`;
const projectGallery = (folder, count, extension = "png") =>
  Array.from({ length: count }, (_, index) => projectAsset(folder, `gallery-${String(index + 1).padStart(2, "0")}.${extension}`));

export const projects = [
  {
    title: "XCare",
    slug: "xcare",
    template: "standard",
    description:
      "Two and a half years designing the purchase flow, admin platform, and marketing site for an EV extended warranty product.",
    role: "Product Designer, embedded",
    service: "Product Design",
    deliverables: "Purchase flow, admin platform, client portal, marketing site",
    expertise: "Product design, claims workflows, conversion UX, product communication",
    industry: "Insurtech",
    company:
      "XCare sells extended coverage for electric vehicles, with a digital purchase flow and operational tools for the claims that follow.",
    myRole:
      "Worked as the embedded product designer across the purchase flow, admin platform, client portal, and marketing site.",
    services: ["Product Design", "UX/UI Design", "Design System", "Conversion Optimization", "Internal Tools", "Responsive Design"],
    coverImage: projectAsset("xcare", "cover.png"),
    gallery: [],
    featured: true,
    archived: false,
    caseStudyUrl: "xcare.html",
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
  "xcare",
  "aspromised",
  "humble-hunters",
  "ny-lon",
  "refinance-digital-dashboard",
  "byte-lab",
  "jvcs",
  "caronwall",
  "humble-education",
  "super-ai",
];

const curatedProjectRank = new Map(curatedProjectOrder.map((slug, index) => [slug, index]));

projects.sort((a, b) => (curatedProjectRank.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (curatedProjectRank.get(b.slug) ?? Number.MAX_SAFE_INTEGER));

const caseStudyConfigs = {
  xcare: {
    label: "XCelerate Auto · Product design, 2023-2026",
    headline: "Designing both sides of an EV warranty business",
    summary: "XCare sells extended coverage for electric vehicles. I designed how people buy it and how the team behind it handles the claims that follow.",
    heroTreatment: "immersive",
    heroImage: projectAsset("xcare", "claims-queue.png"),
    heroAlt: "XCare claims queue showing status and adjuster filters",
    intro: false,
    nextProjectSlug: "aspromised",
    context: [
      ["Role", "Product Designer, embedded"],
      ["Duration", "2.5 years, ongoing"],
      ["Surfaces", "Purchase flow, admin platform, client portal, marketing site"],
    ],
    sections: [
      {
        type: "statement",
        eyebrow: "Context",
        title: "A $4,000 promise, sold online",
        body: [
          "XCare covers electric vehicles after the manufacturer warranty runs out. Battery, drive unit, drivetrain, electronics, the expensive parts. A plan costs between $2,000 and $5,000, and the customer is usually buying it for a car worth more than they earn in a year.",
          "That price point sets the terms for everything. Nobody buys a $4,000 warranty on impulse, and nobody forgives a company that makes the claim process painful after taking that money. The product had to be convincing at purchase and calm during a claim, which are two different design problems attached to the same business.",
        ],
      },
      {
        type: "statement",
        eyebrow: "Starting point",
        title: "A product that behaved better than it looked",
        body: [
          "The company was already good at the actual work. Existing customers were happy, the coverage was real, the support was human. What did not exist was any layer between that and the people who had not bought yet.",
          "Flows went straight from an idea to a developer, sometimes by way of a Miro board. They were live and functional, built from a basic UI kit and plain HTML elements, but nothing had been designed in Figma, tested for conversion, or checked against how competitors handled the same decisions. No design system. No mobile work.",
          "Claims ran on a spreadsheet. One master sheet with every field an adjuster might need, scrolling sideways past the edge of the screen.",
        ],
      },
      {
        type: "statement",
        eyebrow: "Approach",
        title: "Three surfaces, one system",
        body: [
          "Most warranty companies treat these as separate departments with separate vendors. Marketing owns the site, a sales team owns the quote, an ops vendor owns the claims software, and the customer feels every seam.",
          "I worked on all three, which meant the same language, the same components, and the same status vocabulary run from the ad click to the adjuster's screen. A plan called XCare Premium on the homepage is called XCare Premium in the checkout and XCare Premium in the claim record an adjuster opens two years later.",
          "That continuity is not a flourish. It is the reason a support rep can read a customer's screen over the phone without asking them what they are looking at.",
        ],
      },
      {
        type: "statement",
        eyebrow: "01 · Purchase flow",
        title: "Buying a warranty without being sold to",
        body: [
          'The extended warranty industry runs on one model: capture the lead, then call it. You enter your details, you get "an agent will contact you shortly," and then you get contacted shortly, repeatedly, for weeks. The category has a bad reputation and this is most of why.',
          "We went the other way. Enter your year, make, model and mileage, and real prices appear on the next screen. No email, no phone number, nothing standing between a person and the number they came for.",
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("xcare", "get-quote-form.png"),
        position: "center top",
        alt: "XCare quote entry screen showing vehicle details with no contact fields",
        caption: "Quote entry. No email, no phone number.",
      },
      {
        type: "statement",
        body: [
          "The reasoning was about trust, not friction. Someone about to spend four thousand dollars on a promise needs evidence early that the company is not playing games. Showing the price with nothing asked in return is the cheapest possible proof that the pricing is fair and the coverage is what it says it is. You earn that at the top of the funnel so it is already established when the money moves.",
          "We still run gated capture on some paid lead gen campaigns, where the job of the page is different. The ungated quote is the product's front door, not a rule applied everywhere.",
          "The rest of the flow follows from that. Five steps, visible from step one: select plan, owner information, car verification, review, payment. Nothing hidden, no surprise step six.",
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("xcare", "plan-selection.png"),
        position: "center top",
        alt: "XCare plan selection screen with coverage terms and pricing",
        caption: "Plan selection. Six coverage terms, all visible at once.",
      },
      {
        type: "itemGrid",
        columns: "rows",
        headingLevel: "h3",
        numbered: true,
        title: "Decisions in the purchase flow",
        items: [
          {
            label: "Plan first, parameters second.",
            text: "Coverage type (full Premium versus battery and drive unit only) is a different product with a different risk profile. Deductible is a dial inside whichever product you picked. Those two were deliberately separated and ordered, because a customer tuning a deductible before understanding what is covered is optimizing the wrong thing.",
          },
          {
            label: "Term length as a grid, not a dropdown.",
            text: "Six coverage terms shown at once, each with its end date, mileage cap, and price. Warranty length is inherently a comparison decision, and anything that forces you to hold one option in memory while looking at the next adds friction to a decision that already has real money attached.",
          },
          {
            label: "Payment structure before the price cards.",
            text: 'One-time payment or eleven monthly installments at zero interest. For a $3,000 purchase, "can I pay this monthly" changes which plan a person even considers, so it comes before the plans rather than at checkout.',
          },
          {
            label: "Coverage explained on demand.",
            text: "Full plan detail lives in an overlay a person opens when they want it, so the main flow stays a decision instead of turning into a brochure.",
          },
        ],
      },
      {
        type: "statement",
        eyebrow: "02 · Claims, both ends",
        title: "The workspace behind the claims",
        body: [
          "Everything sold in the flow above eventually shows up here.",
          'A claim is not a support ticket. It runs for weeks, moves between the customer, a service center, and an adjuster, and stalls constantly for reasons that are nobody\'s fault: parts on backorder, a diagnosis pending, a customer who has not sent photos. The design problem is not "display claims." It is "make it obvious which of the open claims needs a human right now."',
          "The clearest evidence of what was broken came from the adjusters themselves. The master spreadsheet held everything, which meant it was unusable in the two situations that matter most: mid-call with a customer, or mid-claim with a service center. So adjusters quietly built their own private sheets with fewer columns, just enough to work fast. Half the team was operating on a personal copy of the truth.",
          'That is the actual brief. Not "replace the spreadsheet," but "build the stripped-down view they kept recreating by hand, and make it the real one."',
        ],
      },
      {
        type: "itemGrid",
        columns: "rows",
        headingLevel: "h3",
        numbered: true,
        title: "Decisions in the claims work",
        items: [
          {
            label: "Status as the organizing idea.",
            text: "Under Review, Needs More Info, Escalated, Service and Diagnosis, Authorized. Five states, mapped to who is currently blocking rather than to how far along the claim is. A claim in Needs More Info is waiting on the customer. One in Escalated is waiting on us. That distinction is what makes the list actionable instead of merely informative.",
          },
          {
            label: "Notes as a first-class column.",
            text: "Real adjuster notes are short, specific, and non-standard: parts on backorder with an estimated arrival, could not replicate the fault, awaiting photos from the claimant. Forcing that into structured fields would have failed, so notes stayed free text and stayed visible in the list, doing the work of a status the system will never have a field for.",
          },
          {
            label: "Unread activity marked at the row.",
            text: 'A small indicator on the claim ID, so "this customer messaged you and nobody replied" is visible without opening anything. In a queue built around waiting, the most expensive failure is a claim quietly waiting on you.',
          },
          {
            label: "Context next to conversation.",
            text: 'Vehicle and VIN, adjuster, coverage plan, deductible, and policy dates sit alongside the message thread with the customer. An adjuster answering "is this covered" should not have to leave the conversation to find out.',
          },
          {
            label: "Warranty actions, not just claims.",
            text: "A policy has a life beyond claims. Owners add a second driver, sell the car and transfer the coverage, or cancel outright. The marketing site sells transferable coverage as a real advantage over legacy providers, and a promise like that has to be carried out by someone on an ordinary Tuesday. Those actions sit in the same customer record as the claim history, so an adjuster taking a call about a transfer is not opening a second tool to do it.",
          },
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("xcare", "claim-detail.png"),
        position: "center top",
        alt: "XCare claim detail with policy context beside the customer message thread",
        caption: "Claim detail. Policy context sits next to the conversation.",
      },
      {
        type: "fullImage",
        image: projectAsset("xcare", "claim-settings.png"),
        position: "center top",
        alt: "XCare customer record with warranty actions for second driver, transfer and cancellation",
        caption: "Transferring a warranty is a marketing promise on the site and a screen back here.",
      },
      {
        type: "statement",
        title: "The other end of the same claim",
        body: [
          "The customer sees this claim too, from their own side. They start it on their phone, then follow it in their portal: which vehicle, what state it is in, what has been paid, with invoices and health reports as PDFs they can pull themselves instead of emailing someone.",
          "Signing in is keyed to a VIN or contract number rather than an email and password, because the thing a person can find when their car has stopped working is the car, not an account they created two years ago.",
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("xcare", "client-portal-signup.png"),
        position: "center top",
        alt: "XCare portal signup using VIN or contract number",
        caption: "Sign in with the car, not with an account you made two years ago.",
      },
      {
        type: "fullImage",
        image: projectAsset("xcare", "claim-submission-mobile.png"),
        position: "center top",
        alt: "XCare mobile claim submission form",
        caption: "The customer end of the same claim. What gets submitted here is what lands in the queue above.",
      },
      {
        type: "fullImage",
        image: projectAsset("xcare", "client-portal-dashboard.png"),
        position: "center top",
        alt: "XCare customer portal showing vehicles, active claims and claim history",
        caption: "The customer's own view. Same status words as the adjuster's screen.",
      },
      {
        type: "statement",
        body: [
          "The status vocabulary is deliberately identical on both screens. When an adjuster says a claim is under review, that is the exact phrase the customer is already reading. Support calls get shorter when nobody has to translate between two systems that describe the same thing differently.",
          {
            lead: "The payment card.",
            text: "The usual warranty pattern is that the customer pays the repair shop, files for reimbursement, and waits to be made whole on someone else's schedule. A virtual card issued to the customer lets XCare pay the service center directly, which removes the part of a claim where a person is out of pocket for work they already paid for once. That is a decision about how money moves through a claim rather than about screens, and it came out of sitting with the people handling the claims.",
          },
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("xcare", "client-portal-payment-card.png"),
        position: "center top",
        alt: "XCare payment card in the customer portal with past payments",
        caption: "A virtual card, so the service center gets paid directly.",
      },
      {
        type: "statement",
        body: "Both the admin portal and the client portal are in development now, and the design continues alongside them rather than ending at handoff.",
      },
      {
        type: "statement",
        eyebrow: "03 · Marketing site",
        title: "The site that has to explain all of it",
        body: "EV warranty is a genuinely confusing purchase. Most people do not know that many traditional providers exclude the battery, which is the most expensive component in the car and the entire reason they are shopping.",
      },
      {
        type: "fullImage",
        image: projectAsset("xcare", "website-hero.png"),
        position: "center top",
        alt: "XCare homepage with the quote calculator in the hero",
        caption: "The quote calculator sits in the hero, ahead of any argument.",
      },
      {
        type: "statement",
        body: [
          "The site closes that gap fast. The quote calculator sits in the hero, so the primary action is available before any argument is made. Two plans are compared side by side rather than sequentially. A comparison table addresses the exclusion problem directly. The claims process is laid out in four steps on the marketing site, before purchase, because how a warranty behaves when you claim on it is the actual product.",
          "The buying process is spelled out on the site too, ahead of the flow itself. Three steps, and the promise that there is no email capture and no sales call, stated before a person commits to starting. The ungated quote only works as a trust signal if people know it is there.",
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("xcare", "website-purchase-steps.png"),
        position: "center top",
        alt: "XCare site section showing the three-step buying process",
        caption: "The no-capture promise, made on the site before anyone enters the flow.",
      },
      {
        type: "fullImage",
        image: projectAsset("xcare", "website-competitor-comparison.png"),
        position: "center top",
        alt: "XCare comparison table against legacy warranty providers",
        caption: "The battery exclusion problem, addressed directly.",
      },
      {
        type: "statement",
        body: "Campaign landing pages reuse the same components and the same plan language, so a person arriving from an ad and a person arriving from search end up in the same vocabulary.",
      },
      {
        type: "statement",
        eyebrow: "Working model",
        title: "Two and a half years, not a project",
        body: [
          "Two and a half years of continuous work, still ongoing, in their tools and on their timeline.",
          "Small team: me, one developer, one PM, with the CEO, COO, and the adjusters in the room for the decisions that affected them. That size is why the three surfaces are coherent. A studio would have scoped the site, shipped it, and left before anyone discovered that the plan names in the checkout did not match the plan names in the claims database. Staying meant decisions compounded instead of resetting.",
          "It also meant losing arguments sometimes. Early on I pushed back on how much brand red the plan selection screen was carrying. The COO wanted it, we shipped it his way, and I let it go. Six months later, looking at it fresh, I realized my original argument had been the weak one. It was never about the color being loud. It was that red was doing six jobs at once on that screen, and the filters had ended up visually louder than the buy buttons, which is a conversion problem rather than a taste problem. That is a better argument and I did not have it at the time. It is not near the top of their list right now, so the screen still ships as it is.",
        ],
      },
      {
        type: "statement",
        eyebrow: "Next",
        title: "What I would do next",
        body: 'The plan selection screen gives six coverage terms equal weight with no recommended option, leaving a $2,000 spread entirely to the customer\'s judgment. The deductible selector changes the price but does not yet show what it changes it by. The two coverage plans are compared one at a time when the decision is inherently side by side. All three are conversion work, all three are measurable, and all three are on the list.',
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
        position: "center top",
        caption: "Broker dashboard with portfolio and rate signals.",
      },
      {
        type: "twoImage",
        ratio: "primary",
        title: "From portfolio overview to individual action",
        body:
          "The supporting screens carry the same data hierarchy into follow-up workflows.",
        images: [
          { src: projectAsset("refinance-digital-dashboard", "gallery-02.png"), position: "center top" },
          { src: projectAsset("refinance-digital-dashboard", "gallery-03.png"), position: "center top" },
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
        position: "center top",
        scale: "wide",
      },
      {
        type: "twoImage",
        title: "A warm visual system with room for practical detail",
        body:
          "Supporting pages keep the tone warm while leaving space for admissions detail.",
        images: [
          { src: projectAsset("humble-education", "gallery-02.png"), position: "center top" },
          { src: projectAsset("humble-education", "gallery-03.png"), position: "center top" },
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("humble-education", "gallery-04.png"),
        position: "center top",
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
        position: "center 38%",
        caption: "Homepage and recruitment network entry.",
      },
      {
        type: "textImage",
        eyebrow: "System design",
        title: "Bold typography, controlled structure, and maintainable sections",
        body:
          "The CMS structure keeps the bold visual direction maintainable across pages.",
        image: projectAsset("humble-hunters", "gallery-02.png"),
        position: "center top",
        align: "left",
      },
      {
        type: "twoImage",
        images: [
          { src: projectAsset("humble-hunters", "gallery-03.png"), position: "center top" },
          { src: projectAsset("humble-hunters", "gallery-04.png"), position: "center top" },
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("humble-hunters", "gallery-05.png"),
        position: "center top",
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
        position: "center top",
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
        position: "center top",
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
            alt: "NY/LON Psychology homepage using aerial street movement for New York",
            caption: "New York appears through movement, infrastructure, and street-level pressure.",
          },
          {
            src: projectAsset("ny-lon", "gallery-01.png"),
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
        position: "center top",
        alt: "Two mobile screens for NY/LON Psychology showing therapy and consulting pages",
        caption: "Mobile layouts preserve the expressive type scale without making the service pages hard to scan.",
        scale: "wide",
      },
      {
        type: "fullImage",
        image: projectAsset("ny-lon", "gallery-05.png"),
        position: "center top",
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
          { src: projectAsset("super-ai", "gallery-01.png"), position: "center top" },
          { src: projectAsset("super-ai", "gallery-02.png"), position: "center top" },
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("super-ai", "gallery-03.png"),
        position: "center top",
      },
      {
        type: "textImage",
        title: "Responsive states stay part of the story",
        body:
          "Mobile keeps the same hierarchy without shrinking the product story away.",
        image: projectAsset("super-ai", "gallery-04.png"),
        position: "center top",
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
        aspect: "four-three",
        caption: "Ad and landing-page diagnostic workspace.",
      },
      {
        type: "twoImage",
        title: "From input to diagnosis",
        body:
          "The product moves from page input to a prioritized diagnosis.",
        images: [
          { src: projectAsset("aspromised", "gallery-02.png"), aspect: "four-three" },
          { src: projectAsset("aspromised", "gallery-03.png"), aspect: "four-three" },
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("aspromised", "gallery-04.png"),
        aspect: "four-three",
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
        position: "center top",
        scale: "wide",
      },
      {
        type: "twoImage",
        images: [
          { src: projectAsset("byte-lab", "gallery-02.png"), position: "center top" },
          { src: projectAsset("byte-lab", "gallery-03.png"), position: "center top" },
        ],
      },
      {
        type: "twoImage",
        title: "Supporting pages keep the system practical",
        body:
          "Deeper pages keep the hierarchy without repeating one layout.",
        images: [
          { src: projectAsset("byte-lab", "gallery-04.png"), position: "center top" },
          { src: projectAsset("byte-lab", "gallery-05.png"), position: "center top" },
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
        position: "center top",
      },
      {
        type: "textImage",
        title: "A calm shopping flow for a premium product category",
        body:
          "Navigation, product detail, and checkout stay direct so the products remain the focus.",
        image: projectAsset("caronwall", "gallery-02.png"),
        position: "center top",
      },
      {
        type: "twoImage",
        images: [
          { src: projectAsset("caronwall", "gallery-03.png"), position: "center top" },
          { src: projectAsset("caronwall", "gallery-04.png"), position: "center top" },
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
        position: "center top",
      },
      {
        type: "twoImage",
        title: "A visual system carried across page states",
        images: [
          { src: projectAsset("JVCS", "gallery-02.png"), position: "center top" },
          { src: projectAsset("JVCS", "gallery-03.png"), position: "center top" },
        ],
      },
      {
        type: "fullImage",
        image: projectAsset("JVCS", "gallery-04.png"),
        position: "center top",
      },
    ],
  },
};

projects.forEach((project) => {
  const config = caseStudyConfigs[project.slug];
  if (config) project.caseStudy = config;
});
