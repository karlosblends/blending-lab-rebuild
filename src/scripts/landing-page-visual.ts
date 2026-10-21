import { animate, type AnimationSequence } from "motion";

export function initLandingPageVisuals() {
  document.querySelectorAll<HTMLButtonElement>("[data-landing-page-art]").forEach(root => {
    if (root.dataset.initialized) return;
    root.dataset.initialized = "true";
    const el = (name: string) => root.querySelector<HTMLElement>(`.lp-${name}`)!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const hover = matchMedia("(hover: hover)");
    const replayLabel = root.getAttribute("aria-label")!;
    let controls: ReturnType<typeof animate> | undefined;
    let visible = false, substantial = false, disposed = false;
    const reset = () => root.querySelectorAll<HTMLElement>("[style]").forEach(node => node.removeAttribute("style"));
    const allowed = () => visible && !document.hidden && !reduced.matches;

    function start() {
      if (disposed || reduced.matches) return;
      controls?.cancel();
      reset();
      root.dataset.playback = "playing";
      const ease = [0.22, 1, 0.36, 1] as const;
      // The frame and section heights never change. Only the internal page scrolls.
      const sequence: AnimationSequence = [
        [el("outline"), { opacity: [1, 0] }, { at: .25, duration: .7 }],
        [el("heading"), { opacity: [0, 1], transform: ["translateY(5px)", "translateY(0px)"] }, { at: .2, duration: .5, ease }],
        [el("description"), { opacity: [0, 1] }, { at: .38, duration: .4 }],
        [el("image"), { opacity: [0, 1], clipPath: ["inset(0 0 100% 0 round 5px)", "inset(0 0 0% 0 round 5px)"] }, { at: .42, duration: .65, ease }],
        [el("cta"), { opacity: [0, 1], transform: ["translateY(4px)", "translateY(0px)"] }, { at: .65, duration: .4, ease }],
        [el("pointer"), { opacity: [0, 1], transform: ["translate(65px, 22px)", "translate(18px, 0px)"] }, { at: 2.6, duration: .6, ease }],
        [el("cta"), { backgroundColor: ["#f45f26", "#fc743f"] }, { at: 3.05, duration: .15 }],
        [el("cta"), { transform: ["scale(1)", "scale(.96)", "scale(1)"] }, { at: 3.2, duration: .2 }],
        [el("pointer"), { opacity: 0 }, { at: 3.4, duration: .2 }],
        [el("track"), { transform: ["translateY(0px)", "translateY(-292px)"] }, { at: 3.45, duration: .7, ease }],
        [el("name").querySelector(".lp-value")!, { opacity: [0, 1], transform: ["translateY(3px)", "translateY(0px)"] }, { at: 4.5, duration: .2 }],
        [el("email").querySelector(".lp-value")!, { opacity: [0, 1], transform: ["translateY(3px)", "translateY(0px)"] }, { at: 4.85, duration: .2 }],
        [el("message"), { borderColor: ["#383838", "#737373", "#383838"] }, { at: 5.05, duration: 1.1 }],
        [el("pointer"), { opacity: [0, 1], transform: ["translate(60px, -35px)", "translate(18px, 0px)"] }, { at: 6.4, duration: .55, ease }],
        [el("submit"), { backgroundColor: ["#f45f26", "#fc743f"] }, { at: 6.85, duration: .15 }],
        [el("submit"), { transform: ["scale(1)", "scale(.96)", "scale(1)"] }, { at: 7.05, duration: .2 }],
        [el("pointer"), { opacity: 0 }, { at: 7.25, duration: .15 }],
        [el("form-title"), { opacity: [1, 0], transform: ["translateY(0px)", "translateY(-5px)"] }, { at: 7.25, duration: .25 }],
        [el("submit-label"), { opacity: [1, 0] }, { at: 7.25, duration: .15 }],
        [el("submit"), { width: [128, 44], height: [30, 44], marginLeft: [-64, -22], top: [246, 76], borderRadius: [5, 22], backgroundColor: ["#fc743f", "#292929"] }, { at: 7.4, duration: .65, ease }],
        [el("check"), { opacity: [0, 1] }, { at: 7.8, duration: .3 }],
        [el("confirmation"), { opacity: [0, 1], transform: ["translateY(5px)", "translateY(0px)"] }, { at: 7.9, duration: .35, ease }],
        [el("confirmation"), { opacity: 1 }, { at: 9.1, duration: .01 }],
      ];
      root.querySelectorAll<HTMLElement>(".lp-word").forEach((word, i) => {
        sequence.push([word, { opacity: [0, 1] }, { at: 5.15 + i * .09, duration: .12 }]);
      });
      root.querySelectorAll<HTMLElement>(".lp-field").forEach((field, i) => {
        sequence.push([field, { opacity: [1, 0], transform: ["translateY(0px)", "translateY(-5px)"] }, { at: 7.25 + i * .05, duration: .25 }]);
      });
      controls = animate(sequence, { onComplete: () => { root.dataset.playback = "complete"; } });
      if (!allowed()) { controls.pause(); root.dataset.playback = "paused"; }
    }
    function sync() {
      if (reduced.matches) {
        controls?.cancel(); controls = undefined; reset();
        root.dataset.playback = "reduced"; root.disabled = true;
        root.setAttribute("aria-label", root.dataset.staticLabel!);
        return;
      }
      root.disabled = false;
      root.setAttribute("aria-label", replayLabel);
      if (!controls && substantial && !document.hidden) start();
      else if (controls && root.dataset.playback !== "complete") {
        if (allowed()) { controls.play(); root.dataset.playback = "playing"; }
        else { controls.pause(); root.dataset.playback = "paused"; }
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio > 0;
      substantial = entry.intersectionRatio >= .55;
      sync();
    }, { threshold: [0, .55] });
    const replay = () => { if (root.dataset.playback === "complete" && allowed()) start(); };
    const enter = () => { if (hover.matches) replay(); };
    root.dataset.playback = "idle";
    root.addEventListener("pointerenter", enter);
    root.addEventListener("focus", replay);
    root.addEventListener("click", replay);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    observer.observe(root); sync();
    document.addEventListener("astro:before-swap", () => {
      disposed = true; controls?.cancel(); observer.disconnect();
      root.removeEventListener("pointerenter", enter); root.removeEventListener("focus", replay); root.removeEventListener("click", replay);
      document.removeEventListener("visibilitychange", sync); reduced.removeEventListener("change", sync);
    }, { once: true });
  });
}
