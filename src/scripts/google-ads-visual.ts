import { animate, type AnimationSequence } from "motion";

export function initGoogleAdsVisuals() {
  document.querySelectorAll<HTMLButtonElement>("[data-google-ads-art]").forEach(root => {
    if (root.dataset.initialized) return;
    root.dataset.initialized = "true";
    const el = (name: string) => root.querySelector<HTMLElement>(`.ga-${name}`)!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const hover = matchMedia("(hover: hover)");
    let controls: ReturnType<typeof animate> | undefined;
    let visible = false;
    let substantial = false;
    let started = false;
    let width = root.clientWidth;
    let disposed = false;
    const reset = () => root.querySelectorAll<HTMLElement>("[style]").forEach(node => node.removeAttribute("style"));
    const allowed = () => visible && !document.hidden && !reduced.matches;

    function start() {
      if (disposed || reduced.matches) return;
      controls?.stop();
      root.dataset.playback = "playing";
      reset();
      const panel = el("panel"), pill = el("call-asset"), phone = el("phone");
      const w = root.clientWidth, finalW = Math.min(204, w - 8);
      const initialW = panel.offsetWidth, pillLeft = pill.offsetLeft, phoneLeft = phone.offsetLeft;
      const pointerStart = Math.min(w - 25, 228);
      const pointerEnd = Math.min(pillLeft + 126, w - 30);
      const ease = [0.22, 1, 0.36, 1] as const;
      const sequence: AnimationSequence = [
        [el("search"), { opacity: [0, 1], y: [4, 0] }, { at: 0, duration: .3 }],
        [panel, { opacity: [0, 1], y: [9, 0] }, { at: .75, duration: .45, ease }],
        [el("fragments"), { opacity: [0, .16] }, { at: 1, duration: .4 }],
        [el("pointer"), { opacity: [0, 1], left: [pointerStart, pointerEnd], top: [304, 282] }, { at: 2.55, duration: .65, ease }],
        [pill, { backgroundColor: ["#292929", "#3b3b3b"] }, { at: 3.15, duration: .2 }],
        [el("pointer"), { scale: [1, .86, 1] }, { at: 3.35, duration: .22 }],
        [el("pointer"), { opacity: 0 }, { at: 3.62, duration: .18 }],
        [el("ad-content"), { opacity: [1, 0], y: [0, -8] }, { at: 3.6, duration: .2 }],
        [el("call-label"), { opacity: [1, 0] }, { at: 3.6, duration: .16 }],
        [el("search"), { opacity: 0, y: -6 }, { at: 3.6, duration: .35 }],
        [el("fragments"), { opacity: 0 }, { at: 3.6, duration: .25 }],
        [panel, { width: [initialW, finalW], height: [254, 270], left: [4, (w - finalW) / 2], top: [62, 52], borderRadius: [12, 24], boxShadow: ["0 14px 24px -14px rgb(0 0 0 / .6)", "0 20px 30px -16px rgb(0 0 0 / .8)"] }, { at: 3.65, duration: .8, ease }],
        [pill, { left: [pillLeft, 0], top: [205, 0], width: [pill.offsetWidth, finalW], height: [33, 270], borderRadius: [20, 24], backgroundColor: ["#3b3b3b", "#1b1b1b"], borderColor: ["#555555", "#1b1b1b"] }, { at: 3.65, duration: .8, ease }],
        [phone, { left: [phoneLeft, finalW / 2 + 27.5], top: [213, 213.5] }, { at: 3.65, duration: .8, ease }],
        [el("incoming"), { opacity: [0, 1], y: [5, 0] }, { at: 4.25, duration: .3, ease }],
        [el("accept"), { opacity: [0, 1], scale: [.9, 1] }, { at: 4.25, duration: .3, ease }],
        [el("ring-one"), { opacity: [0, .4, 0], scale: [1, 1.5] }, { at: 4.6, duration: .4 }],
        [el("ring-two"), { opacity: [0, .4, 0], scale: [1, 1.5] }, { at: 5.2, duration: .4 }],
        [el("accept"), { scale: [1, .88, 1] }, { at: 5.85, duration: .25 }],
        [phone, { rotate: [0, -12, 0] }, { at: 5.85, duration: .25 }],
        [el("incoming"), { opacity: 0 }, { at: 6.05, duration: .2 }],
        [el("connected"), { opacity: [0, 1], y: [5, 0] }, { at: 6.15, duration: .3 }],
        [el("accept"), { x: [0, -36] }, { at: 6.05, duration: .45, ease }],
        [phone, { left: [finalW / 2 + 27.5, finalW / 2 - 8.5] }, { at: 6.05, duration: .45, ease }],
        [el("time-one"), { opacity: [0, 1] }, { at: 6.15, duration: .01 }],
        [el("time-one"), { opacity: 0 }, { at: 7.15, duration: .01 }],
        [el("time-two"), { opacity: [0, 1] }, { at: 7.15, duration: .01 }],
        [el("time-two"), { opacity: 0 }, { at: 8.15, duration: .01 }],
        [el("time-three"), { opacity: [0, 1] }, { at: 8.15, duration: .01 }],
        [el("connected"), { opacity: 1 }, { at: 8.7, duration: .01 }],
      ];
      root.querySelectorAll<HTMLElement>(".ga-char").forEach((char, i) => {
        sequence.push([char, { opacity: [0, 1] }, { at: .12 + i * .028 + (i > 6 ? .1 : 0) + (i > 11 ? .09 : 0), duration: .015 }]);
      });
      root.querySelectorAll<HTMLElement>(".ga-wave > span").forEach((bar, i) => {
        const peak = .35 + (4 - Math.abs(4 - i)) * .15;
        sequence.push([bar, { scaleY: [.2, peak, .25, peak * .8, .2, peak, .2] }, { at: 6.3 + (i % 3) * .06, duration: 1.9, ease: "easeInOut" }]);
      });
      started = true;
      root.dataset.playback = "playing";
      controls = animate(sequence, { onComplete: () => { root.dataset.playback = "complete"; } });
      if (!allowed()) { controls.pause(); root.dataset.playback = "paused"; }
    }
    function sync() {
      if (reduced.matches) {
        controls?.stop(); controls = undefined; reset();
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
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0]; visible = entry.isIntersecting && entry.intersectionRatio > 0;
      substantial = entry.intersectionRatio >= .55;
      sync();
    }, { threshold: [0, .55] });
    const replay = () => { if (root.dataset.playback === "complete" && allowed()) start(); };
    const enter = () => { if (hover.matches) replay(); };
    const resize = new ResizeObserver(() => {
      if (Math.abs(root.clientWidth - width) < 1) return;
      width = root.clientWidth;
      if (started && !reduced.matches && root.dataset.playback !== "complete") start();
    });
    root.dataset.playback = "idle";
    root.addEventListener("pointerenter", enter);
    root.addEventListener("focus", replay);
    root.addEventListener("click", replay);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    observer.observe(root); resize.observe(root); sync();
    document.addEventListener("astro:before-swap", () => {
      disposed = true; controls?.stop(); observer.disconnect(); resize.disconnect();
      document.removeEventListener("visibilitychange", sync); reduced.removeEventListener("change", sync);
    }, { once: true });
  });
}
