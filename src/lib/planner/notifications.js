import { PlannerError } from "./config.js";

export function notificationText(conversation) {
  const r = conversation.recommendation;
  return [
    `New Blending Lab project enquiry: ${conversation.contact.name}`,
    `Email: ${conversation.contact.email}`, `Company / website: ${conversation.contact.company || "Not supplied"}`,
    `Conversation: ${conversation.id}`, `Project: ${conversation.brief.project_type || "Not yet clear"}`,
    `Summary: ${conversation.project_summary}`,
    `Likely scope: ${r?.scope.join(", ") || conversation.brief.scope || "Needs discovery"}`,
    `Indicative range: ${r?.budget ? `EUR ${r.budget.min}–${r.budget.max}${r.budget.period === "month" ? "/month" : ""} (not a quote)` : "Needs scope review"}`,
    `Estimated duration: ${r?.duration ? `${r.duration.min}–${r.duration.max} weeks` : "Needs scope review"}`,
    `Visitor's timing: ${conversation.brief.timeline || "Unknown"}`, `Visitor's budget: ${conversation.brief.budget || "Unknown"}`,
    `Working model: ${conversation.brief.working_model || "Not decided"}`,
    `Fit review: ${conversation.brief.fit || "Not assessed"}; technical review: ${conversation.brief.technical_review ? "needed" : "not flagged"}`,
    `Uncertainties: ${(conversation.brief.uncertainties || []).join(", ") || "None recorded"}`,
    `Lead signal: ${conversation.lead_quality.level} (based on brief completeness, not inferred intent)`,
    `Missing information: ${conversation.missing_information.join(", ") || "None"}`,
    `Pricing knowledge: ${r?.pricing_version || "No estimate"}${r?.placeholder ? " — PROTOTYPE FIXTURES" : ""}`,
    "", "Full conversation:", ...conversation.messages.map((m) => `${m.role === "user" ? "Visitor" : "Planner"}: ${m.content}`),
  ].join("\n\n");
}

export async function notify(conversation, config, fetcher = fetch) {
  if (!config.resendKey || !config.emailFrom || !config.emailTo) {
    if (config.production) throw new PlannerError("Email notification is not configured.", 503);
    // The submitted record itself is the durable local inbox. Never claim an email was sent.
    return { status: "local_inbox", created_at: new Date().toISOString() };
  }
  const response = await fetcher("https://api.resend.com/emails", {
    method: "POST", signal: AbortSignal.timeout(12000),
    headers: { Authorization: `Bearer ${config.resendKey}`, "Content-Type": "application/json", "Idempotency-Key": `planner-lead/${conversation.id}` },
    body: JSON.stringify({
      from: config.emailFrom, to: [config.emailTo], reply_to: conversation.contact.email,
      subject: `Project enquiry: ${(conversation.brief.project_type || "Discovery").replace(/[\r\n]/g, " ").slice(0, 100)}`,
      text: notificationText(conversation),
    }),
  });
  if (!response.ok) throw new PlannerError("Your project is saved, but the email notification needs another attempt.", 502);
  const result = await response.json();
  return { status: "sent", email_id: result.id, created_at: new Date().toISOString() };
}
