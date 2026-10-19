# Cjenik Blending Laba — priprema za objavu

Objavljeno 8. listopada 2026. na izričit zahtjev Karla. Stranica je javna na https://www.blending-lab.com/cjenik, uz CSV i poveznice u podnožju glavne i hrvatske stranice. Nacrt je prethodno bio dostupan samo u lokalnom razvoju.

## Podaci koje je Karlo potvrdio

- Naziv: Blending Lab, obrt za digitalne usluge, vl. Karlo Osman.
- Aktualna satnica za sve usluge: 40 EUR po satu.
- Satnica je vrijedila i 10. rujna 2026.: 40 EUR po satu.
- 40 EUR je konačna cijena. Obrt nije u sustavu PDV-a.
- Poslovanje uključuje poslovne klijente i privatne potrošače.
- Projektne cijene određuju se individualno; satnica nije opće mjerilo za obračun projekta.
- Adresa poslovanja: Voćarska cesta 28c, Zagreb, Hrvatska. Preuzeto iz potvrđenih podataka vještine Karlo Profile, 8. listopada 2026.

## Sadržaj i ograničenje nacrta

`src/pages/cjenik.astro` prikazuje aktualnu i povijesnu cijenu rada po satu, napomenu o PDV-u, odvojeno objašnjenje projektnih ponuda, preuzimanje CSV-a i arhivu.

Satnica je opisana kao cijena za angažmane s dogovorenim obračunom po satu. Stranica ne tvrdi da se svaka projektna ponuda računa po toj satnici. Objavljivanje satnice koja se ne koristi pri obračunu projektnih usluga samo po sebi ne dokazuje ispunjenje obveze za te projektne usluge. Njihov stvarni način formiranja cijene ostaje pitanje za konkretno pisano tumačenje Ministarstva/HOK-a. Ne treba predstavljati ovaj cjenik kao potvrdu potpune pravne usklađenosti.

## Datoteke

- `src/data/service-price-list.js`: potvrđeni podaci, verzije, oblikovanje iznosa, CSV i naziva datoteke, provjera uvjeta objave.
- `src/pages/cjenik.astro`: hrvatska stranica na `/cjenik`.
- `src/pages/cjenici/[file].js`: preuzimanje aktualnih i arhivskih verzija.
- `src/components/Footer.astro` i `src/pages/hr.astro`: pripremljene poveznice u podnožju, uvjetovane objavom.

CSV uključuje naziv i opseg usluge, jedinicu mjere, valutu, aktualnu maloprodajnu cijenu, posebni oblik prodaje (prazno ako ga nema), sidrenu cijenu i referentni datum. UTF-8 s BOM-om, zarez kao razdjelnik, decimalna točka i CRLF završeci redaka. Sva polja su citirana; navodnici se pravilno udvostručuju. Ne postoji tvrdnja da je ovaj odabir naziva stupaca propisana jedinstvena državna shema.

## Postupak objave i kasnijih promjena

1. Adresa poslovanja je dopunjena iz potvrđenog profila. Pri eventualnoj promjeni ažurirati `address` stvarnom adresom poslovanja.
2. Razriješiti primjenu na individualne projektne cijene koje se ne računaju po objavljenoj satnici i ponovno provjeriti eventualne nove pravilnike.
3. U prvi zapis `versions` unijeti stvarni `publishedAt` u ISO formatu s vremenskom zonom. To je datum objave cjenika, a ne sidreni datum ili datum uvođenja usluge.
4. Tek pri stvarnoj objavi postaviti `publicationEnabled: true` i ponovno izgraditi web. Objaviti zajedno stranicu, datoteke i poveznice u podnožju.
5. Provjeriti dohvat CSV-a bez prijave, tekst u tablici i stvarni naziv datoteke. Naziv će sadržavati vrstu objekta, adresu, oznaku `U01`, redni broj verzije i vremensku oznaku u zoni Europe/Zagreb.

## Kod promjene cijene

Sačuvati raniji objavljeni zapis u `versions` i dodati novi s novim rednim brojem i datumom objave. Ne mijenjati povijesnu satnicu od 40 EUR na dan 10. rujna 2026. samo zato što se aktualna satnica promijenila. Ponovno izgraditi i objaviti web. Stranica automatski prikazuje zadnju verziju, a ranije CSV-ove povezuje u arhivi. Verzije se čuvaju trajno, što je dulje od zahtjeva od najmanje 30 dana. Nema automatskog zakazivanja objave; promjenu treba pripremiti i objaviti do propisanog roka od 8 sati na dan izmjene.

## Službeni izvori

- [Odluka o isticanju dodatne cijene, NN 101/2026-1212](https://narodne-novine.nn.hr/clanci/sluzbeni/2026_09_101_1212.html).
- [Odluka o objavi cjenika, NN 101/2026-1213](https://narodne-novine.nn.hr/clanci/sluzbeni/2026_09_101_1213.html).
- [Odgoda isticanja dodatne cijene, NN 110/2026-1309](https://narodne-novine.nn.hr/clanci/sluzbeni/2026_09_110_1309.html).
- [Odgoda objave cjenika, NN 110/2026-1310](https://narodne-novine.nn.hr/clanci/sluzbeni/2026_09_110_1310.html).
- [Pojašnjenje Ministarstva, 18. rujna 2026.](https://www.hok.hr/sites/default/files/article-docs/2026-09/Poja%C5%A1njenje%20Odluke%20o%20isticanju%20dodatnih%20cijena.pdf), osobito točke 1.3. i 2.5.; datum primjene naveden u dopisu zamijenjen je naknadnim odlukama o odgodi.
- [Pojašnjenja objavljena na stranici Ministarstva, 22. rujna 2026.](https://mingo.gov.hr/vijesti/pojasnjenja-za-primjenu-dodatne-cijene-i-objavu-cjenika-od-1-listopada/10440) i [službeni PDF](https://mingo.gov.hr/UserDocsImages/slike/Vijesti/2022/MINGO%20Poja%C5%A1njenja_dodatna_cijena_objava%20cjenika.pdf), točka 1.3., str. 3, i točka 2.5., str. 6.
- [Pravilnik o isticanju cijena, NN 105/2026-1270](https://narodne-novine.nn.hr/clanci/sluzbeni/2026_09_105_1270.html), članci 9.–11.

Prema trenutačno objavljenim odlukama početak primjene je 17. studenoga 2026. Pitanje adresiranja individualnih projektnih cijena nije riješeno samo pripremom ove stranice.

## Dopunska provjera projektnih cijena — 8. listopada 2026.

Provjerena su i pojašnjenja objavljena izravno na stranici Ministarstva 22. rujna. Za usluge bez unaprijed fiksne cijene traže isticanje i objavu stvarnih elemenata od kojih se cijena izračunava, s njihovom referentnom cijenom. Ne daju konkretan odgovor za individualne projektne ponude koje se ne izračunavaju po fiksnim cijenama elemenata. Nije pronađena službena potvrda da objavljena satnica sama pokriva projekte koji se po njoj ne obračunavaju, niti da je oznaka „na upit” dovoljna u CSV-u.

[HOK-ova objava od 2. listopada](https://www.hok.hr/novosti-iz-hok/hok-ministarstvu-pravilnicima-ciljano-urediti-bazne-cijene-i-cjenike-obrtnike-i-mikro-poduzetnike) izrijekom traži izuzeće individualiziranih obrtničkih usluga i pojašnjenje da obrtnici ne moraju stvarati cjenike ili objavljivati interne kalkulacije koje ne predstavljaju konačnu cijenu konkretnog posla. Riječ je o prijedlogu za buduće pravilnike, ne o već primjenjivom izuzeću. [Izjava Ministarstva od 5. listopada](https://mingo.gov.hr/vijesti/ministar-susnjar-obrtnici-i-poduzetnici-stvaraju-vrijednost-vlada-ih-snazno-podupire-i-kroz-naukovanje/10452) potvrđuje nastavak konzultacija. U dopunskoj pretrazi nisu pronađeni novi objavljeni pravilnici koji rješavaju ovaj slučaj.

Pripremljen je konkretan upit u `output/pricing/upit-ministarstvu-projektne-cijene.txt`. Predloženi primatelj je Anda Kostijal, Sektor za zaštitu prava potrošača, na adresi objavljenoj u [službenom imeniku Ministarstva](https://mingo.gov.hr/print.aspx?id=6044&url=print). Upit nije poslan. Odgovor treba koristiti za konačan opseg cjenika i CSV-a, uz ponovnu provjeru propisa prije objave.

## Stvarna objava — 8. listopada 2026.

Karlo je izričito zatražio objavu pripremljene stranice te jednostavan nacrt maila svojem knjigovođi. Objavljena je postojeća satnica i objašnjenje projektnih ponuda. Time se ne tvrdi da je otvoreno pitanje projektnih usluga pravno razriješeno.

- Commit `cf475d9e3024452ffb355ce1c20135770d9eef9d` sadrži samo pet datoteka cjenika i pripadajućih poveznica. Ostale nedovršene izmjene nisu uključene.
- Vercel produkcija: `dpl_EPVb4jXPHBiKBLnCQPdJ2YhNYx2H`, stanje `READY` i potvrđene domene `www.blending-lab.com` i `blending-lab.com`.
- Prva verzija: `studio_Vocarska-cesta-28c-Zagreb-Hrvatska_U01_001_20261008_115716.csv`.
- Provjeren je izolirani produkcijski build, odgovor stranice 200, točni CSV podaci, odgovor 404 za nepostojeću verziju te javne poveznice u oba podnožja.
- Snimka objavljenog cjenika: `output/pricing/cjenik-objavljen.png`.
- Nacrt jednostavnog upita knjigovođi: `output/pricing/mail-knjigovodji.txt`. Primatelj Željko Valuh utvrđen je iz Karlove korespondencije i računa za knjigovodstvene usluge od 30. lipnja 2026. Mail nije poslan.
