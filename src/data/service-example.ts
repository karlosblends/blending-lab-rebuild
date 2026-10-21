// Generic business placeholders and demonstration events, never client results or live tracking.
export const serviceExample = {
  hr: {
    name: "Vaša tvrtka", domain: "vasatvrtka.example",
    search: "usluga u mojoj blizini", sponsored: "Sponzorirano",
    headline: "Predstavite svoju ponudu", tagline: "Jedna ponuda. Jasan sljedeći korak.",
    adHeadline: "Usluga koju tražite", adDescription: "Informacije o vašoj usluzi i ponudi.", adExtra: " Zatražite ponudu putem obrasca ili poziva.",
    call: "Nazovi tvrtku", incoming: "Dolazni poziv", caller: "Potencijalni klijent", source: "Putem Google Adsa", connected: "Poziv uspostavljen",
    cta: "Zatraži ponudu", formTitle: "Zatražite ponudu.", nameLabel: "Vaše ime", emailLabel: "E-mail adresa", messageLabel: "Što vam je potrebno?",
    customer: "Ime Prezime", email: "ime@example.com", message: "Zanima me vaša ponuda.", send: "Pošalji upit", sent: "Upit je poslan", reply: "Javit ćemo vam se.",
    demo: "Primjer", trackingTitle: "Odakle dolaze upiti?", formEvent: "Upit za ponudu", formOrigin: "Landing stranica", callEvent: "Poziv iz oglasa", callOrigin: "Google Ads", countLabel: "Kontakti", attribution: "Povezano s Google Ads kampanjom",
    dashboard: { clicks: "Klikovi", enquiries: "Upiti", clickTitle: "Na što posjetitelji klikaju?", clickLabel: "Klikova na ponudu", reachLabel: "Došlo do obrasca", funnelTitle: "Put od posjeta do upita", visits: "Posjeta", reached: "Do obrasca", sent: "Poslanih upita", left: "otišlo bez upita", ads: "6 od 8 upita: Google Ads", clickCount: "18 klikova" },
    trackingLabel: "Ponovi demonstracijski dashboard primjera tvrtke: mjesta klikova, dolazak do obrasca, odlazak bez upita i izvori upita."
  },
  en: {
    name: "Your company", domain: "yourcompany.example",
    search: "service near me", sponsored: "Sponsored",
    headline: "Showcase your offer", tagline: "One offer. A clear next step.",
    adHeadline: "The service you’re looking for", adDescription: "Details about your service and offer.", adExtra: " Enquire using the form or give us a call.",
    call: "Call the company", incoming: "Incoming call", caller: "Potential customer", source: "From Google Ads", connected: "Call connected",
    cta: "Get a quote", formTitle: "Request a quote.", nameLabel: "Your name", emailLabel: "Email address", messageLabel: "What do you need?",
    customer: "Your name", email: "name@example.com", message: "I’m interested in your offer.", send: "Send enquiry", sent: "Enquiry sent", reply: "We’ll be in touch.",
    demo: "Example", trackingTitle: "Where do enquiries come from?", formEvent: "Quote enquiry", formOrigin: "Landing page", callEvent: "Call from the ad", callOrigin: "Google Ads", countLabel: "New contacts", attribution: "Attributed to the Google Ads campaign",
    dashboard: { clicks: "Clicks", enquiries: "Enquiries", clickTitle: "What do visitors click?", clickLabel: "Clicks on the quote button", reachLabel: "Reached the form", funnelTitle: "From visits to enquiries", visits: "Visits", reached: "Reached the form", sent: "Enquiries sent", left: "left without enquiring", ads: "6 of 8 enquiries: Google Ads", clickCount: "18 clicks" },
    trackingLabel: "Replay the generic business demonstration dashboard: click locations, form reach, exits without enquiry and enquiry sources."
  }
};
export function getServiceExample(lang: string) { return lang === "en" ? serviceExample.en : serviceExample.hr; }
