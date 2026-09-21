// Provisional Croatian landing-page copy. Keep revisions here until the page copy is approved.
export const hrContent = {
  nav: [
    ["#radovi", "Radovi"],
    ["#pristup", "Pristup"],
    ["#tim", "Tim"],
    ["#kontakt", "Kontakt"],
  ],
  hero: {
    eyebrow: "Blending Lab · Zagreb",
    title: "Kad firma preraste svoj web, to se vidi.",
    lead:
      "Ponekad se firma promijeni, a web ostane isti. Ponekad više ne radi svoj posao. A ponekad nikad nije ni postojao. Gradimo digitalna iskustva koja jasno pokazuju tko ste danas.",
  },
  situations: [
    ["01", "Firma se promijenila. Web nije.", "Ponuda, publika i ambicije otišle su dalje, ali prvi digitalni dojam još uvijek priča staru priču."],
    ["02", "Web postoji, ali je postao teret.", "Teško ga je ažurirati, ključne informacije su skrivene, a osoba koja ga je izradila više nije dostupna."],
    ["03", "Kvaliteta se ne vidi online.", "Klijenti dobiju ozbiljnu uslugu, ali web im prije prvog razgovora daje sasvim drukčiji signal."],
    ["04", "Prodajni tim nema dobru podlogu.", "Web ne objašnjava dovoljno jasno što nudite, kome pomažete i zašto bi vam se netko javio."],
  ],
  layers: [
    ["Strategija", "Prvo definiramo kome se obraćamo, što mora biti jasno i koju odluku stranica treba olakšati."],
    ["Sadržaj", "Struktura i poruke nastaju prije dekoracije, kako bi svaka sekcija imala razlog postojanja."],
    ["Dizajn", "Vizualni sustav daje karakter, ritam i povjerenje bez oslanjanja na generičke predloške."],
    ["Development", "Dizajn pretvaramo u brz, responzivan i održiv proizvod, precizno izveden do zadnjeg ekrana."],
    ["Tehnologija", "Alate i arhitekturu biramo prema stvarnim zahtjevima, sadržaju i planovima za rast."],
  ],
  services: [
    ["Marketinški webovi", "Za tvrtke koje trebaju jasnije pozicioniranje, ozbiljniji digitalni dojam i bolju prodajnu priču."],
    ["Webshopovi", "Od sadržaja i arhitekture ponude do dizajna i izvedbe kupovnog iskustva."],
    ["Digitalni proizvodi", "Korisnička sučelja, portali i interni alati koji složene zadatke čine razumljivima."],
    ["Integracije i automatizacije", "Povezivanje sustava i procesa tamo gdje ručni rad više nema smisla."],
    ["Google Ads nakon objave", "Dodatna podrška za dovođenje relevantnog prometa kada je nova stranica spremna."],
  ],
  process: [
    ["01", "Upoznavanje i kontekst", "Ciljevi, publika, ponuda i postojeći materijali."],
    ["02", "Struktura i sadržaj", "Arhitektura stranice i poruke koje vode razgovor."],
    ["03", "Dizajn", "Vizualni smjer i ključni ekrani prije pune izvedbe."],
    ["04", "Development", "Responzivna izrada, sadržaj i potrebne integracije."],
    ["05", "Testiranje i objava", "Završna provjera na uređajima i kontrolirano puštanje uživo."],
  ],
};

export const hrProjects = [
  {
    title: "Visit Šibenik",
    eyebrow: "Turizam · digitalna platforma",
    description: "Višejezična destinacijska platforma koja povezuje priče, doživljaje, događanja, lokalne poslovne subjekte i praktično planiranje posjeta.",
    url: "https://www.visitsibenik.hr/",
    images: Array.from({ length: 5 }, (_, i) => `/assets/projects/visit-sibenik/gallery-${String(i + 1).padStart(2, "0")}.jpg`),
  },
  {
    title: "Humble Hunters",
    eyebrow: "Tehnologija · zapošljavanje",
    description: "Kompletan marketinški web i sustav sadržaja za grupu koja gradi specijalizirane međunarodne recruitment brendove.",
    images: Array.from({ length: 5 }, (_, i) => `/assets/projects/humble-hunters/gallery-${String(i + 1).padStart(2, "0")}.png`),
  },
  {
    title: "NY/LON Psychology",
    eyebrow: "Profesionalne usluge · međunarodno tržište",
    description: "Strategija, sadržaj, art direkcija, dizajn i razvoj za praksu koja radi između New Yorka i Londona.",
    url: "https://www.nylonpsychology.com/",
    images: Array.from({ length: 5 }, (_, i) => `/assets/projects/ny-lon/gallery-${String(i + 1).padStart(2, "0")}.png`),
  },
  {
    title: "Caronwall",
    eyebrow: "E-commerce · automotive",
    description: "Premium webshop fokusiran na preglednu prezentaciju proizvoda i jednostavan put od otkrivanja do kupnje.",
    url: "https://caronwall.webflow.io/",
    images: Array.from({ length: 4 }, (_, i) => `/assets/projects/caronwall/gallery-${String(i + 1).padStart(2, "0")}.png`),
  },
  {
    title: "Byte Lab",
    eyebrow: "Tehnologija · embedded systems",
    description: "Jasnija struktura i snažniji prodajni putevi za inženjersku tvrtku koja radi na granici hardvera i softvera.",
    url: "https://www.byte-lab.com/",
    images: Array.from({ length: 5 }, (_, i) => `/assets/projects/byte-lab/gallery-${String(i + 1).padStart(2, "0")}.png`),
  },
  {
    title: "AsPromised",
    eyebrow: "SaaS · conversion optimization",
    description: "Alat za procjenu koliko landing page drži obećanje oglasa — od ideje i proizvoda do koda i naplate.",
    url: "https://aspromised.io/",
    images: Array.from({ length: 4 }, (_, i) => `/assets/projects/aspromised/gallery-${String(i + 1).padStart(2, "0")}.png`),
  },
  {
    title: "JVCS",
    eyebrow: "Recruitment · međunarodno tržište",
    description: "Futuristički marketinški web za globalni workforce brend, oblikovan kroz snažan vizualni identitet i motion-led smjer sučelja.",
    url: "https://jvcs.webflow.io/",
    images: Array.from({ length: 4 }, (_, i) => `/assets/projects/JVCS/gallery-${String(i + 1).padStart(2, "0")}.png`),
  },
];
