// Fictional business and demonstration events, never client results or live tracking.
const business = { name: "Klima Forma", domain: "klima-forma.example" };
export const serviceExample = {
  hr: {
    ...business,
    search: "ugradnja klime zagreb", sponsored: "Sponzorirano",
    headline: "Ugradnja klima uređaja", tagline: "Za ugodan dom, cijele godine.",
    adHeadline: "Ugradnja i servis klima", adDescription: "Od odabira uređaja do ugradnje.", adExtra: " Zatražite ponudu za svoj prostor.",
    call: "Pozovi Klima Formu", incoming: "Dolazni poziv", caller: "Potencijalni klijent", source: "Putem Google Adsa", connected: "Poziv uspostavljen",
    cta: "Zatraži ponudu", formTitle: "Zatražite ponudu.", nameLabel: "Vaše ime", emailLabel: "E-mail adresa", messageLabel: "Što vam je potrebno?",
    customer: "Ana", email: "ana@example.com", message: "Trebam klimu za stan od 60 m².", send: "Pošalji upit", sent: "Upit je poslan", reply: "Javit ćemo vam se.",
    demo: "Primjer", trackingTitle: "Odakle dolaze upiti?", formEvent: "Upit za ugradnju", formOrigin: "Landing stranica", callEvent: "Poziv iz oglasa", callOrigin: "Google Ads", countLabel: "Kontakti", attribution: "Povezano s Google Ads kampanjom",
    dashboard: { clicks: "Klikovi", enquiries: "Upiti", clickTitle: "Na što posjetitelji klikaju?", clickLabel: "Klikova na ponudu", reachLabel: "Došlo do obrasca", funnelTitle: "Put od posjeta do upita", visits: "Posjeta", reached: "Do obrasca", sent: "Poslanih upita", left: "otišlo bez upita", ads: "6 od 8 upita: Google Ads", clickCount: "18 klikova" },
    trackingLabel: "Ponovi demonstracijski dashboard izmišljene tvrtke Klima Forma: mjesta klikova, dolazak do obrasca, odlazak bez upita i izvori upita."
  },
  en: {
    ...business,
    search: "AC installation near me", sponsored: "Sponsored",
    headline: "Air conditioning, expertly installed", tagline: "A comfortable home, all year round.",
    adHeadline: "Air conditioning installation", adDescription: "From choosing your unit to installation.", adExtra: " Request a quote for your home.",
    call: "Call Klima Forma", incoming: "Incoming call", caller: "Potential customer", source: "From Google Ads", connected: "Call connected",
    cta: "Get a quote", formTitle: "Request a quote.", nameLabel: "Your name", emailLabel: "Email address", messageLabel: "What do you need?",
    customer: "Ana", email: "ana@example.com", message: "I need AC for a 60 m² apartment.", send: "Send enquiry", sent: "Enquiry sent", reply: "We’ll be in touch.",
    demo: "Example", trackingTitle: "Where do enquiries come from?", formEvent: "Installation enquiry", formOrigin: "Landing page", callEvent: "Call from the ad", callOrigin: "Google Ads", countLabel: "New contacts", attribution: "Attributed to the Google Ads campaign",
    dashboard: { clicks: "Clicks", enquiries: "Enquiries", clickTitle: "What do visitors click?", clickLabel: "Clicks on the quote button", reachLabel: "Reached the form", funnelTitle: "From visits to enquiries", visits: "Visits", reached: "Reached the form", sent: "Enquiries sent", left: "left without enquiring", ads: "6 of 8 enquiries: Google Ads", clickCount: "18 clicks" },
    trackingLabel: "Replay the fictional Klima Forma demonstration dashboard: click locations, form reach, exits without enquiry and enquiry sources."
  }
};
export function getServiceExample(lang: string) { return lang === "en" ? serviceExample.en : serviceExample.hr; }
