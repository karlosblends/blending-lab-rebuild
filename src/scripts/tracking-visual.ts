import { animate, type AnimationSequence } from "motion";

export function initTrackingVisuals() {
  document.querySelectorAll<HTMLButtonElement>("[data-tracking-art]").forEach(root => {
    if (root.dataset.initialized) return;
    root.dataset.initialized = "true";
    const el = (name: string) => root.querySelector<HTMLElement>(`.tv-${name}`)!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const hover = matchMedia("(hover: hover)");
    let controls: ReturnType<typeof animate> | undefined;
    let visible = false, substantial = false, disposed = false;
    const reset = () => root.querySelectorAll<HTMLElement>("[style]").forEach(node => node.removeAttribute("style"));
    const allowed = () => visible && !document.hidden && !reduced.matches;
    function start() {
      if (disposed || reduced.matches) return;
      controls?.cancel(); reset(); root.dataset.playback = "playing";
      const ease = [0.22, 1, 0.36, 1] as const;
      const sequence: AnimationSequence = [
        [el("click-view"), { opacity: [0, 1], transform: ["translateY(4px)", "translateY(0px)"] }, { at: .15, duration: .4, ease }],
        [el("hotspot-image"), { opacity: [0, .45], transform: ["scale(.5)", "scale(1)"] }, { at: .9, duration: .5, ease }],
        [el("hotspot-cta"), { opacity: [0, 1], transform: ["scale(.5)", "scale(1)"] }, { at: 1.45, duration: .6, ease }],
        [el("click-tag"), { opacity: [0, 1], transform: ["translateY(3px)", "translateY(0px)"] }, { at: 1.8, duration: .3, ease }],
        [el("click-metric"), { opacity: [0, 1] }, { at: 2, duration: .3 }],
        [el("reach-metric"), { opacity: [0, 1] }, { at: 2.4, duration: .3 }],
        [el("pointer"), { opacity: [0, 1], transform: ["translate(20px, 30px)", "translate(0px, 0px)"] }, { at: 4.5, duration: .55, ease }],
        [el("pointer"), { transform: ["scale(1)", "scale(.85)", "scale(1)"] }, { at: 5.05, duration: .2 }],
        [el("tab-marker"), { transform: ["translateX(0%)", "translateX(100%)"] }, { at: 5.2, duration: .4, ease }],
        [el("tab-click"), { color: ["#f8f8f8", "#919191"] }, { at: 5.2, duration: .25 }],
        [el("tab-results"), { color: ["#919191", "#f8f8f8"] }, { at: 5.2, duration: .25 }],
        [el("click-view"), { opacity: 0, transform: "translateX(-6px)" }, { at: 5.2, duration: .25 }],
        [el("pointer"), { opacity: 0 }, { at: 5.3, duration: .2 }],
        [el("results-view"), { opacity: [0, 1], transform: ["translateX(6px)", "translateX(0px)"] }, { at: 5.45, duration: .35, ease }],
        [el("bar-visits"), { transform: ["scaleX(0)", "scaleX(1)"] }, { at: 5.65, duration: .5, ease }],
        [el("bar-reached"), { transform: ["scaleX(0)", "scaleX(1)"] }, { at: 6.15, duration: .5, ease }],
        [el("bar-sent"), { transform: ["scaleX(0)", "scaleX(1)"] }, { at: 6.65, duration: .4, ease }],
        [el("exit"), { opacity: [0, 1], transform: ["translateY(3px)", "translateY(0px)"] }, { at: 7.2, duration: .35, ease }],
        [el("attribution"), { opacity: [0, 1] }, { at: 7.8, duration: .35 }],
        [el("results-view"), { opacity: 1 }, { at: 10.2, duration: .01 }],
      ];
      controls = animate(sequence, { onComplete: () => { root.dataset.playback = "complete"; } });
      if (!allowed()) { controls.pause(); root.dataset.playback = "paused"; }
    }
    function sync() {
      if (reduced.matches) {
        controls?.cancel(); controls = undefined; reset();
        root.dataset.playback = "reduced"; root.disabled = true;
        return;
      }
      root.disabled = false;
      if (!controls && substantial && !document.hidden) start();
      else if (controls && root.dataset.playback !== "complete") {
        if (allowed()) { controls.play(); root.dataset.playback = "playing"; }
        else { controls.pause(); root.dataset.playback = "paused"; }
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio > 0;
      substantial = entry.intersectionRatio >= .55; sync();
    }, { threshold: [0, .55] });
    const replay = () => { if (root.dataset.playback === "complete" && allowed()) start(); };
    const enter = () => { if (hover.matches) replay(); };
    root.dataset.playback = "idle";
    root.addEventListener("pointerenter", enter); root.addEventListener("focus", replay); root.addEventListener("click", replay);
    document.addEventListener("visibilitychange", sync); reduced.addEventListener("change", sync);
    observer.observe(root); sync();
    document.addEventListener("astro:before-swap", () => {
      disposed = true; controls?.cancel(); observer.disconnect();
      root.removeEventListener("pointerenter", enter); root.removeEventListener("focus", replay); root.removeEventListener("click", replay);
      document.removeEventListener("visibilitychange", sync); reduced.removeEventListener("change", sync);
    }, { once: true });
  });
}
