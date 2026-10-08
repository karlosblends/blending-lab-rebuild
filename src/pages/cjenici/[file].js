import { priceList, isPriceListPublishable, priceListFilename, priceListCsv } from "../../data/service-price-list.js";

export const prerender = false;

export function GET({ params }) {
  if (import.meta.env.PROD && !isPriceListPublishable()) {
    return new Response("Not found", { status: 404 });
  }
  const version = priceList.versions.find((entry) => priceListFilename(entry) === params.file);
  if (!version) return new Response("Not found", { status: 404 });
  return new Response(priceListCsv(version), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${priceListFilename(version)}"`,
      "X-Robots-Tag": "noindex",
      "Cache-Control": "no-store",
    },
  });
}
