import { useEffect, useRef, useState } from "react";
import { ChatThread, ChatComposer } from "../arc/chat-thread/chat-thread";
import LeadCapture from "./LeadCapture";
import ProjectQuestions from "./ProjectQuestions";
import { formatChatMessage } from "../../lib/planner/message-format";

const participants = [{ id: "visitor", name: "You" }, { id: "planner", name: "Karlo from Blending Lab", avatar: "/assets/images/memoji.svg" }];
const noReactions = [];
const replyPause = 1200;

async function api(path, body) {
  const response = await fetch(`/api/planner/${path}`, {
    method: body === undefined ? "GET" : "POST", credentials: "same-origin",
    headers: body === undefined ? {} : { "Content-Type": "application/json" },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(65000),
  });
  const data = await response.json();
  if (!response.ok) { const error = new Error(data.error || "Something went wrong. Please retry."); error.status = response.status; throw error; }
  return data;
}

export default function ProjectPlanner() {
  const [conversation, setConversation] = useState(null);
  const [mode, setMode] = useState(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(null);
  const [openedAt, setOpenedAt] = useState(null);
  const [leadOpen, setLeadOpen] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [leadError, setLeadError] = useState("");
  const [launchRequest, setLaunchRequest] = useState(null);
  const launched = useRef(null);
  const composerRef = useRef(null);
  const inFlight = useRef(false);
  const messages = conversation?.messages || [];

  function accept(data) {
    setConversation(data.conversation);
    setMode(data.conversation?.mode || data.mode);
    const last = data.conversation?.messages.at(-1);
    setRetry(last?.role === "user" ? { message: last.content, message_id: last.id, created_at: last.created_at } : null);
  }

  useEffect(() => {
    let active = true;
    setOpenedAt(new Date().toISOString());
    api("session").then((data) => { if (active) accept(data); }).catch((e) => {
      if (active) setError(e.status === 401 ? "Your previous session has expired. Tell me about your project to start a new conversation." : e.message);
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (window.parent === window || new URLSearchParams(window.location.search).get("embedded") !== "1") return;
    document.body.classList.add("planner-embedded");
    function receive(event) {
      if (event.origin !== window.location.origin || event.source !== window.parent || event.data?.type !== "blending-planner-start") return;
      const { id, message } = event.data;
      if (typeof message !== "string" || !message.trim() || message.length > 6000 || !/^[a-f0-9-]{36}$/.test(id || "")) return;
      setLaunchRequest({ id, message });
      window.parent.postMessage({ type: "blending-planner-accepted", id }, window.location.origin);
    }
    function close(event) {
      if (event.key === "Escape") window.parent.postMessage({ type: "blending-planner-close" }, window.location.origin);
    }
    window.addEventListener("message", receive);
    window.addEventListener("keydown", close);
    window.parent.postMessage({ type: "blending-planner-ready" }, window.location.origin);
    return () => { document.body.classList.remove("planner-embedded"); window.removeEventListener("message", receive); window.removeEventListener("keydown", close); };
  }, []);

  useEffect(() => {
    if (loading || !launchRequest || launched.current === launchRequest.id) return;
    launched.current = launchRequest.id;
    // A hero submission starts a new project; previously saved conversations remain in storage.
    send(launchRequest.message, { message: launchRequest.message.trim(), message_id: launchRequest.id, created_at: new Date().toISOString() }, true);
  }, [launchRequest, loading]);

  async function submitLead(contact = {}) {
    if (inFlight.current || !conversation || retry) return;
    inFlight.current = true; setSubmitting(true); setLeadError("");
    try {
      const data = await api("lead", contact);
      accept(data); setLeadOpen(false);
    } catch (e) {
      // A network interruption may happen after the server has saved the enquiry.
      try {
        const saved = await api("session");
        if (saved.conversation?.submitted) { accept(saved); setLeadOpen(false); }
        else setLeadError(e.message);
      } catch { setLeadError(e.message); }
    } finally { setSubmitting(false); inFlight.current = false; }
  }

  async function send(text, previous = null, fresh = false) {
    if (!text.trim() || inFlight.current || loading || retry && !previous) return;
    if (conversation?.closed && !fresh) return;
    setQuestionsOpen(false); setLeadOpen(false);
    if (conversation?.submitted) { setLeadOpen(false); setLeadError(""); }
    inFlight.current = true; setBusy(true); setError("");
    const turn = previous || { message: text.trim(), message_id: crypto.randomUUID(), created_at: new Date().toISOString() };
    setRetry(turn);
    let session = fresh || conversation?.submitted ? null : conversation;
    try {
      if (!session) { const created = await api("session", {}); session = created.conversation; setConversation(session); setMode(session.mode); }
      if (!session.messages.some((m) => m.id === turn.message_id)) {
        setConversation({ ...session, messages: [...session.messages, { id: turn.message_id, role: "user", content: turn.message, created_at: turn.created_at }] });
      }
      // Run the request immediately, but let the typing state breathe before showing a fast reply.
      const [data] = await Promise.all([
        api("message", { message: turn.message, message_id: turn.message_id }),
        new Promise((resolve) => setTimeout(resolve, replyPause)),
      ]);
      accept(data);
    } catch (e) {
      setError(e.name === "TimeoutError" ? "Your reply is taking longer than expected. Retry your message to pick up where you left off." : e.message);
      if (e.status === 401) {
        setConversation(null); setRetry(turn);
        setError("Your session has expired. Retry your last message to start a new project conversation.");
      } else if (session) {
        try {
          const persisted = await api("session"); accept(persisted);
          if (!persisted.conversation?.messages.some((m) => m.id === turn.message_id) || persisted.conversation?.messages.at(-1)?.role !== "assistant") setRetry(turn);
          else setError("");
        } catch { setRetry(turn); }
      } else setRetry(null);
    } finally { setBusy(false); inFlight.current = false; requestAnimationFrame(() => composerRef.current?.focus()); }
  }

  const welcome = "Hey! You must be here because you have some project in mind. Can I know more?"
    + (mode === "demo" ? "\n\nThis prototype uses scripted replies, not live AI. Test submissions show whether an email was sent." : "");
  const threadMessages = openedAt && !loading && !launchRequest && !messages.length && !retry && !busy ? [{ id: "planner-welcome", authorId: "planner", text: welcome, createdAt: messages[0]?.created_at || openedAt }] : [];
  for (const message of messages) {
    threadMessages.push({
      id: message.id, authorId: message.role === "user" ? "visitor" : "planner",
      text: formatChatMessage(message.content), createdAt: message.created_at,
      status: message.role === "user" ? retry?.message_id === message.id ? busy ? "sending" : "failed" : "sent" : undefined,
    });
  }
  if (retry && !messages.some((m) => m.id === retry.message_id)) {
    threadMessages.push({ id: retry.message_id, authorId: "visitor", text: retry.message, createdAt: retry.created_at, status: busy ? "sending" : "failed" });
  }
  if (error && openedAt) threadMessages.push({ id: "planner-error", authorId: "planner", text: error, createdAt: openedAt });
  if (conversation?.submitted && openedAt) threadMessages.push({
    id: "planner-submitted", authorId: "planner", createdAt: messages.at(-1)?.created_at || openedAt,
    text: conversation.notification === "local_inbox" ? "Your test enquiry is saved locally with the brief and full conversation. No email has been sent." : conversation.notification === "sent" ? "Your project is saved and Karlo has been notified with the full conversation." : "Your project is saved. The email notification still needs another attempt.",
    content: !["sent", "local_inbox"].includes(conversation.notification) ? <div className="planner-contact-actions"><button className="planner-chat-action" type="button" disabled={submitting || busy} onClick={() => submitLead()}>{submitting ? "Retrying…" : "Retry email notification"}</button>{leadError ? <p role="alert">{leadError}</p> : null}</div> : null,
  });
  const action = messages.at(-1)?.role === "assistant" ? messages.at(-1).action : "none";
  if (conversation && !conversation.submitted && !conversation.closed && !busy && !retry && !conversation.pending && (questionsOpen || leadOpen || action && action !== "none") && openedAt) threadMessages.push({
    id: "planner-contact", authorId: "planner", createdAt: messages.at(-1)?.created_at || openedAt,
    content: questionsOpen ? <ProjectQuestions key={conversation.id} brief={conversation.brief} onComplete={message => send(message)} /> : leadOpen ? <LeadCapture onSubmit={submitLead} onCancel={() => { setLeadOpen(false); setLeadError(""); requestAnimationFrame(() => composerRef.current?.focus()); }} busy={submitting || busy || Boolean(retry)} error={leadError} /> : <div className="planner-next-step"><p>What would you like to do?</p><div className="planner-contact-actions">
      {["both", "questionnaire"].includes(action) ? <button type="button" className="planner-chat-action planner-chat-action-secondary" disabled={busy || Boolean(retry)} onClick={() => setQuestionsOpen(true)}>Work through a few questions</button> : null}
      {["both", "contact"].includes(action) ? <button type="button" className="planner-chat-action" disabled={busy || Boolean(retry)} onClick={() => setLeadOpen(true)}>Send project to Karlo</button> : null}
    </div></div>,
  });

  return <main className="project-planner ph-no-capture" data-theme="dark" data-accent="neutral" aria-label="Blending Lab project conversation">
    <ChatThread
      className="planner-arc-thread" participants={participants} currentUserId="visitor"
      messages={threadMessages} typing={busy ? ["planner"] : []}
      composer={false} allowAttachments={false} reactions={noReactions} label="Project conversation"
      labels={{ sending: "Saving…", sent: "Saved", failed: "Reply interrupted", typing: () => "The planner is preparing a reply" }}
      onRetry={() => { if (retry) send(retry.message, retry); }}
    />
    <ChatComposer
      key={conversation?.id || "new"} ref={composerRef} className="planner-arc-composer"
      onSend={({ text }) => send(text)} allowAttachments={false} maxLength={6000}
      disabled={busy || submitting || loading || Boolean(retry) || Boolean(conversation?.closed)} labels={{ send: "Send message" }}
      placeholder={conversation?.closed ? "This conversation has ended" : "Tell me about your project…"}
    />
  </main>;
}
