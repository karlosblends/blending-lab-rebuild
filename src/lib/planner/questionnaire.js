const options = (...labels) => labels.map(label => ({ value: label, label }));

// Answer controls are fixed, reviewable questions. The model never invents form markup.
export function questionnaireSteps(brief = {}, answers = {}) {
  const service = answers.service || brief.engagement;
  const website = ["website", "webflow"].includes(service);
  return [
    ...(!brief.engagement || brief.engagement === "discovery" ? [{ id: "service", type: "radio", label: "What are you thinking of?", options: [
      { value: "website", label: "A website or landing page" }, { value: "product", label: "Improve an existing product" },
      { value: "new_product", label: "Design a new product" }, { value: "webflow", label: "Build existing designs in Webflow" },
      { value: "components", label: "A few design components" }, { value: "discovery", label: "Still figuring that out" },
    ] }] : []),
    { id: "business", type: "input", label: "What do you do?", hint: "A little context helps. You can skip anything we've already covered.", placeholder: "Wedding photography, for example…" },
    ...(!brief.goal ? [{ id: "goals", type: "checkbox", label: website ? "What should your website help with?" : "What would you like this work to help with?", hint: "Pick whatever matters to you.", options: website ? options("Build trust", "Show pricing, terms and availability", "Make it easier for people to find me", "Tell my story", "Bring in enquiries", "I just need a website so I have one", "I'm not sure yet") : options("Make things easier to use", "Improve the visual design", "Add something new", "Make the design more consistent", "I'm not sure yet") }] : []),
    { id: "scope", type: website ? "checkbox" : "input", label: website ? "What do you want on the site?" : "Where should we start?", hint: website ? "This is a starting point. We can keep it small." : "A dashboard, onboarding flow or a few components, for example.", placeholder: "The first thing you'd like to work on…", ...(website ? { options: options("One simple page", "Homepage", "Portfolio or case studies", "About page", "Services and pricing", "Enquiry form", "Online booking", "Blog or articles", "I'm not sure yet") } : {}) },
    ...(!brief.delivery_preference && service !== "discovery" ? [{ id: "delivery", type: "radio", label: "Do you need design, development or both?", options: options("Design only — we have someone to build it", "Design and development", "Development from existing designs", "I'm not sure yet") }] : []),
    ...(website ? [{ id: "content", type: "radio", label: "What do you have ready?", options: options("Brand, images and copy are ready", "Some of it — I'll need a hand with the rest", "We're starting from scratch", "I'm not sure yet") }] : []),
    { id: "priority", type: "scale", label: "How are you feeling about this project?", hint: "It's fine to just be exploring.", labels: ["Just looking around", "Exploring an idea", "Considering my options", "Ready to plan it", "Ready to get started"] },
    ...(!brief.timeline ? [{ id: "timeline", type: "input", label: "Is there a date you're aiming for?", placeholder: "No rush, or a particular month…", hint: "Leave this blank if you haven't decided." }] : []),
    ...(!brief.market ? [{ id: "location", type: "input", label: "Where is your business based?", placeholder: "Country…", hint: "This helps us use the right market when discussing pricing." }] : []),
  ];
}

export function questionnaireMessage(steps, answers) {
  const entries = steps.flatMap(step => {
    const value = answers[step.id];
    if (value === undefined || value === "" || Array.isArray(value) && !value.length) return [];
    const text = step.type === "scale" ? step.labels[value - 1] : step.type === "radio" ? step.options.find(option => option.value === value)?.label : Array.isArray(value) ? value.join(", ") : value;
    return text ? [`${step.label} ${text}`] : [];
  });
  return `Here are my answers to the project questions:\n\n${entries.join("\n\n")}\n\nWhat would you suggest as a starting point?`;
}
