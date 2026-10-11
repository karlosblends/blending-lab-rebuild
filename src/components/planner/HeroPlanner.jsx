import { useEffect, useRef, useState } from "react";
import PlannerInputGlow from "./PlannerInputGlow";
import { ChatComposer } from "../arc/chat-thread/chat-thread";
import { Dialog, DialogContent } from "../arc/dialog/dialog";

export default function HeroPlanner() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);
  const frame = useRef(null);
  const composer = useRef(null);
  const launch = useRef(null);

  useEffect(() => {
    function receive(event) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "blending-planner-ready") {
        setReady(true);
        if (launch.current) frame.current.contentWindow.postMessage({ type: "blending-planner-start", ...launch.current }, window.location.origin);
      }
      if (event.data?.type === "blending-planner-accepted" && event.data.id === launch.current?.id) launch.current = null;
      if (event.data?.type === "blending-planner-close") setOpen(false);
    }
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);
  useEffect(() => {
    if (!open || ready) return;
    const timer = setTimeout(() => setSlow(true), 8000);
    return () => clearTimeout(timer);
  }, [open, ready]);

  return <Dialog open={open} onOpenChange={next => { setOpen(next); if (next) { setReady(false); setSlow(false); } }}>
    <div className="project-planner planner-launch ph-no-capture ph-mask" data-theme="dark" data-accent="neutral">
      <PlannerInputGlow paused={open}><ChatComposer ref={composer} className="planner-hero-composer" allowAttachments={false} maxLength={6000}
        placeholder="What do you have in mind?" labels={{ send: "Start project conversation" }}
        onSend={({ text }) => { launch.current = { id: crypto.randomUUID(), message: text }; setReady(false); setSlow(false); setOpen(true); }} /></PlannerInputGlow>
      <p className="planner-launch-hint">Tell me a little about your project. We’ll work it out together.</p>
    </div>
    <DialogContent className="project-planner planner-modal ph-no-capture ph-mask" data-theme="dark" data-accent="neutral"
      title="Let's talk about your project" aria-describedby={undefined}
      onCloseAutoFocus={event => { event.preventDefault(); composer.current?.focus(); }}>
      <div className="planner-modal-body">
        {!ready ? <div className="planner-modal-loading" role="status"><span>{slow ? "The planner is taking a moment to open." : "Opening our conversation…"}</span>{slow ? <a href="/planner">Open the planner directly</a> : null}</div> : null}
        <iframe ref={frame} className="planner-modal-frame" data-planner-frame title="Blending Lab project conversation" src="/planner?embedded=1" style={{ opacity: ready ? 1 : 0 }} />
      </div>
    </DialogContent>
  </Dialog>;
}
