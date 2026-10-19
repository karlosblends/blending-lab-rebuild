import "../text-reveal.css";

export function initTextReveals() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const headings = Array.from(document.querySelectorAll("h1, h2")).filter((heading) =>
    !heading.closest(".legal-page__content, .karlo-shell, astro-island, dialog, [data-no-text-reveal]") &&
    !heading.querySelector("a, button, input, [data-fill-statement]") &&
    heading.textContent.trim()
  );

  const observer = !reducedMotion.matches && "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove("is-text-pending");
        entry.target.classList.add("is-text-visible");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 })
    : null;

  for (const heading of headings) {
    // A heading gets one motion treatment, without a second blur on its parent.
    let host = heading;
    while (host && host !== document.body) {
      if (host.matches(".reveal, [data-reveal]")) host.classList.add("reveal--text-host");
      host = host.parentElement;
    }

    if (heading.hasAttribute("data-text-reveal") || !observer) continue;
    const accessible = document.createElement("span");
    accessible.className = "text-reveal__accessible";
    const visual = document.createElement("span");
    visual.className = "text-reveal__visual";
    visual.setAttribute("aria-hidden", "true");
    // Keep emphasis and deliberate line breaks intact in both copies.
    for (const child of heading.childNodes) accessible.append(child.cloneNode(true));
    visual.append(...heading.childNodes);

    const walker = document.createTreeWalker(visual, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    const count = textNodes.reduce((total, node) => total + (node.textContent.match(/\S+/g)?.length || 0), 0);
    const step = Math.min(65, 420 / Math.max(count - 1, 1));
    let index = 0;
    for (const node of textNodes) {
      const fragment = document.createDocumentFragment();
      for (const part of node.textContent.split(/(\s+)/)) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          fragment.append(document.createTextNode(part));
          continue;
        }
        const clip = document.createElement("span");
        clip.className = "text-reveal__clip";
        const word = document.createElement("span");
        word.className = "text-reveal__word";
        word.style.setProperty("--word-delay", `${index++ * step}ms`);
        word.textContent = part;
        clip.append(word);
        fragment.append(clip);
      }
      node.replaceWith(fragment);
    }
    heading.replaceChildren(accessible, visual);
    heading.classList.add("text-reveal", "is-text-pending");
    heading.setAttribute("data-text-reveal", "");
    observer.observe(heading);
  }

  // Keep the original continuous hero gradient across independently moving words.
  const gradients = headings.filter((heading) => heading.matches(".hero__heading-gradient.text-reveal"));
  const updateGradients = () => {
    const measurements = gradients.map((heading) => {
      const bounds = heading.getBoundingClientRect();
      return { heading, width: bounds.width, words: Array.from(heading.querySelectorAll(".text-reveal__word"),
        (word) => ({ word, x: word.getBoundingClientRect().left - bounds.left })) };
    });
    for (const { heading, width, words } of measurements) {
      heading.style.setProperty("--title-width", `${width}px`);
      for (const { word, x } of words) word.style.setProperty("--word-x", `${-x}px`);
    }
  };
  if (gradients.length) {
    updateGradients();
    document.fonts.ready.then(updateGradients);
    const resizeObserver = new ResizeObserver(updateGradients);
    gradients.forEach((heading) => resizeObserver.observe(heading));
  }
  reducedMotion.addEventListener("change", () => {
    if (!reducedMotion.matches) return;
    observer?.disconnect();
    headings.forEach((heading) => heading.classList.remove("is-text-pending"));
  });
}
