import { useEffect, useRef } from "react";

// Cursor-angle technique inspired by Manu Arora's MIT-licensed Glowing Effect:
// https://ui.aceternity.com/components/glowing-effect
// Kept local to the Arc composer, with an always-on idle orbit and studio palette.
export default function PlannerInputGlow({ children, paused = false }) {
  const container = useRef(null);
  const angle = useRef(0);

  useEffect(() => {
    const element = container.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousTime = 0;
    let visible = true;
    let hovering = false;
    let target = angle.current;
    let bounds;

    function update(time) {
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 0;
      previousTime = time;
      if (hovering) {
        // Take the shortest path across the zero-degree seam; settle gently.
        const difference = ((target - angle.current) % 360 + 540) % 360 - 180;
        angle.current += difference * (1 - Math.exp(-elapsed / 150));
      } else angle.current += elapsed * 360 / 12000;
      element.style.setProperty("--planner-glow-angle", `${angle.current % 360}deg`);
      frame = requestAnimationFrame(update);
    }
    function sync() {
      cancelAnimationFrame(frame);
      previousTime = 0;
      if (!paused && visible && !document.hidden && !reducedMotion.matches) frame = requestAnimationFrame(update);
    }
    function enter(event) {
      if (event.pointerType === "touch") return;
      bounds = element.getBoundingClientRect();
      hovering = true;
      move(event);
    }
    function move(event) {
      if (!hovering || !bounds) return;
      target = Math.atan2(event.clientY - bounds.top - bounds.height / 2, event.clientX - bounds.left - bounds.width / 2) * 180 / Math.PI + 90;
    }
    function leave() { hovering = false; }
    function refreshBounds() { if (hovering) bounds = element.getBoundingClientRect(); }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(element);
    element.addEventListener("pointerenter", enter);
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", leave);
    window.addEventListener("resize", refreshBounds, { passive: true });
    window.addEventListener("scroll", refreshBounds, { passive: true });
    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      element.removeEventListener("pointerenter", enter);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", refreshBounds);
      window.removeEventListener("scroll", refreshBounds);
      document.removeEventListener("visibilitychange", sync);
      reducedMotion.removeEventListener("change", sync);
    };
  }, [paused]);

  return <div ref={container} className="planner-input-glow">
    <span className="planner-input-glow-halo" aria-hidden="true" />
    <span className="planner-input-glow-border" aria-hidden="true" />
    {children}
  </div>;
}
