export const offerQuestions = {
  hr: [
    { id: "website", need: "landing", title: "Imate web, ali upiti ne dolaze?", description: "Ljudi mogu vidjeti što nudite, ali rijetko naprave sljedeći korak.", phrase: "prodajni landing page" },
    { id: "offer", need: "landing", title: "Nova ponuda još nema svoju stranicu?", description: "Pokrećete uslugu, proizvod ili akciju koja se izgubi na postojećem webu.", phrase: "prodajni landing page" },
    { id: "traffic", need: "ads", title: "Pravi ljudi teško dolaze do vas?", description: "Želite se pojaviti baš kada netko traži ono što nudite.", phrase: "Google Ads kampanju koja dovodi prave ljude" },
    { id: "ads", need: "ads", title: "Plaćate klikove, ali ne vidite rezultat?", description: "Oglasi troše budžet, a upita je malo ili dolaze od pogrešnih ljudi.", phrase: "Google Ads kampanju koja dovodi prave ljude" },
    { id: "analytics", need: "tracking", title: "Ne znate odakle dolaze vaši upiti?", description: "Teško je odlučiti gdje ulagati kada ne vidite što donosi kontakte.", phrase: "jasno praćenje upita" },
    { id: "improvements", need: "ongoing", title: "Nakon objave sve je ostalo isto?", description: "Web i kampanje rade, ali nitko ih redovito ne pregledava i poboljšava.", phrase: "redovita poboljšanja stranice i kampanje" },
  ],
  en: [
    { id: "website", need: "landing", title: "A website, but very few enquiries?", description: "People can see what you offer, but rarely take the next step.", phrase: "a sales landing page" },
    { id: "offer", need: "landing", title: "A new offer without its own page?", description: "You’re launching a service, product or promotion that gets lost on your existing site.", phrase: "a sales landing page" },
    { id: "traffic", need: "ads", title: "Struggling to reach the right people?", description: "You want to show up when someone searches for what you offer.", phrase: "a Google Ads campaign that reaches the right people" },
    { id: "ads", need: "ads", title: "Paying for clicks without results?", description: "Ads use up your budget, but enquiries are scarce or unsuitable.", phrase: "a Google Ads campaign that reaches the right people" },
    { id: "analytics", need: "tracking", title: "Unsure where enquiries come from?", description: "It’s hard to decide where to invest when you can’t see what brings contacts.", phrase: "clear enquiry tracking" },
    { id: "improvements", need: "ongoing", title: "Has everything stood still since launch?", description: "The website and campaigns are running, but nobody regularly reviews and improves them.", phrase: "ongoing page and campaign improvements" },
  ],
};

// Several situations may point to the same service; mention it only once.
export function selectedNeeds(questions, answers) {
  const seen = new Set();
  return questions.filter(question => {
    if (answers[question.id] !== "left" || seen.has(question.need)) return false;
    seen.add(question.need);
    return true;
  });
}

export function needsSentence(needs, lang = "hr") {
  if (!needs.length) return lang === "hr" ? "Trebam …" : "I need …";
  const phrases = needs.map(item => item.phrase);
  const last = phrases.pop();
  return `${lang === "hr" ? "Trebam " : "I need "}${phrases.length ? phrases.join(", ") + (lang === "hr" ? " i " : " and ") : ""}${last}.`;
}
