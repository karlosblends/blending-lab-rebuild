// Every published version keeps its original prices and publication timestamp.
export const priceList = {
  publicationEnabled: true,
  legalName: "Blending Lab, obrt za digitalne usluge, vl. Karlo Osman",
  address: "Voćarska cesta 28c, Zagreb, Hrvatska",
  locationCode: "U01",
  locationType: "studio",
  currency: "EUR",
  vatNote: "Blending Lab nije u sustavu PDV-a. Navedene cijene su konačne.",
  // Keep every published version here; append a version instead of replacing it.
  versions: [
    {
      number: 1,
      publishedAt: "2026-10-08T11:57:16+02:00",
      services: [
        {
          name: "Dizajn i razvoj — rad po satu",
          scope: "UX/UI dizajn, dizajn web stranica i razvoj, uz dogovoreni opseg rada.",
          unit: "sat",
          price: 40,
          referencePrice: 40,
          referenceDate: "2026-09-10",
          specialSale: "",
        },
      ],
    },
  ],
};

export const currentPriceList = priceList.versions.at(-1);

export function isPriceListPublishable(list = priceList) {
  return Boolean(
    list.publicationEnabled && list.legalName.trim() && list.address.trim() &&
    list.versions.length && list.versions.every((version) =>
      Number.isInteger(version.number) && version.number > 0 &&
      version.publishedAt && Number.isFinite(Date.parse(version.publishedAt)) &&
      version.services.length && version.services.every((service) =>
        service.name.trim() && service.unit.trim() &&
        Number.isFinite(service.price) && service.price >= 0 &&
        Number.isFinite(service.referencePrice) && service.referencePrice >= 0 &&
        /^\d{4}-\d{2}-\d{2}$/.test(service.referenceDate)
      )
    )
  );
}

export function formatPrice(value) {
  return new Intl.NumberFormat("hr-HR", {
    style: "currency", currency: "EUR", minimumFractionDigits: 2,
  }).format(value);
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("hr-HR", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Zagreb",
  }).format(new Date(value));
}

const csvCell = (value) => `"${String(value).replaceAll('"', '""')}"`;

export function priceListCsv(version = currentPriceList) {
  const rows = [
    ["naziv_usluge", "opseg_usluge", "jedinica_mjere", "valuta", "maloprodajna_cijena", "posebni_oblik_prodaje", "sidrena_cijena", "referentni_datum"],
    ...version.services.map((service) => [
      service.name, service.scope, service.unit, priceList.currency,
      service.price.toFixed(2), service.specialSale,
      service.referencePrice.toFixed(2), service.referenceDate,
    ]),
  ];
  return "\uFEFF" + rows.map((row) => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
}

export function priceListFilename(version = currentPriceList, list = priceList) {
  if (!list.address.trim() || !version.publishedAt) {
    return `NACRT_Blending_Lab_cjenik_${String(version.number).padStart(3, "0")}.csv`;
  }
  const clean = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replaceAll("đ", "d").replaceAll("Đ", "D").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Zagreb", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date(version.publishedAt)).map(({ type, value }) => [type, value]));
  return `${clean(list.locationType)}_${clean(list.address)}_${clean(list.locationCode)}_${String(version.number).padStart(3, "0")}_${parts.year}${parts.month}${parts.day}_${parts.hour}${parts.minute}${parts.second}.csv`;
}
