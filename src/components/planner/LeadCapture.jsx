import { useId } from "react";

export default function LeadCapture({ onSubmit, onCancel, busy, error }) {
  const id = useId();
  function submit(event) {
    event.preventDefault();
    if (busy) return;
    const fields = new FormData(event.currentTarget);
    onSubmit({ name: fields.get("name"), email: fields.get("email"), company: fields.get("company"), website_trap: fields.get("website_trap"), consent: fields.get("consent") === "on" });
  }
  return <form className="planner-lead-form ph-no-capture" onSubmit={submit} aria-labelledby={`${id}-title`} aria-busy={busy}>
    <p id={`${id}-title`}>Send your project to Karlo</p>
    <p className="planner-contact-note">Your project brief and full conversation are included, so you won’t need to explain everything again.</p>
    <label htmlFor={`${id}-name`}>Name<input id={`${id}-name`} name="name" autoComplete="name" required minLength={2} maxLength={120} disabled={busy} autoFocus /></label>
    <label htmlFor={`${id}-email`}>Email<input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} disabled={busy} /></label>
    <label htmlFor={`${id}-company`}>Company or website <span className="planner-contact-note">(optional)</span><input id={`${id}-company`} name="company" autoComplete="organization" maxLength={300} disabled={busy} /></label>
    <div className="planner-honeypot" aria-hidden="true"><label htmlFor={`${id}-trap`}>Leave this empty<input id={`${id}-trap`} name="website_trap" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="planner-consent"><input type="checkbox" name="consent" required disabled={busy} /><span>Send my contact details, brief and conversation to Blending Lab to respond to my enquiry.</span></label>
    <details className="planner-contact-note"><summary>How this chat is used</summary><p>This is an AI planning assistant. Messages are saved to build your brief and, in the live version, sent to OpenAI to generate replies. Contact details entered here are saved with your enquiry and included in the email to Karlo. Please avoid sharing confidential information. <a href="/privacy-policy.html" target="_blank" rel="noreferrer">Privacy policy</a> · <a href="mailto:karlo@blending-lab.com">Contact Karlo</a></p></details>
    {error ? <p role="alert">{error}</p> : null}
    <div className="planner-contact-actions"><button type="submit" className="planner-chat-action" disabled={busy}>{busy ? "Saving your enquiry…" : "Send project"}</button><button type="button" className="planner-chat-action planner-chat-action-secondary" onClick={onCancel} disabled={busy}>Keep chatting</button></div>
  </form>;
}
