import { animate } from "motion";

// UIArc's smooth panel / snappy indicator presets, adapted to native details.
// https://uiarc.dev/r/accordion.json
// https://uiarc.dev/r/arc-motion-tokens.json
const smooth = { type: "spring", visualDuration: 0.4, bounce: 0 } as const;
const snappy = { type: "spring", visualDuration: 0.26, bounce: 0.12 } as const;

export function initOfferDisclosures() {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll<HTMLDetailsElement>(".offer-faq-item").forEach(details => {
    const summary = details.querySelector("summary")!;
    const icon = details.querySelector<SVGElement>(".offer-faq-item summary svg");
    let animation: ReturnType<typeof animate> | undefined;
    let closing = false;
    let revision = 0;

    summary.addEventListener("click", event => {
      if (reduced.matches) return; // Keep the native, instantaneous disclosure.
      event.preventDefault();
      const open = closing || !details.open;
      const current = details.getBoundingClientRect().height;
      const thisRevision = ++revision;
      animation?.stop();
      details.style.height = "";
      details.style.overflow = "hidden";
      closing = !open;
      details.open = true; // Keep the answer rendered during its exit.
      const destination = open
        ? details.getBoundingClientRect().height
        : summary.getBoundingClientRect().height;
      details.style.height = `${current}px`;
      if (icon) animate(icon, { transform: `rotate(${open ? 45 : 0}deg)` }, snappy);
      animation = animate(details, { height: destination }, smooth);
      animation.then(() => {
        if (revision !== thisRevision) return;
        details.open = open;
        closing = false;
        details.style.height = "";
        details.style.overflow = "";
        animation = undefined;
      });
    });

    // Also respect programmatic resets (for example after a successful enquiry).
    details.addEventListener("toggle", () => {
      if (!details.open) {
        revision++;
        animation?.stop();
        closing = false;
        details.style.height = "";
        details.style.overflow = "";
        if (icon) icon.style.transform = "rotate(0deg)";
      }
    });
  });
}
