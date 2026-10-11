// Only the rough work and ownership matter before inviting a human conversation.
export function meetingReady(brief) {
  return Boolean(brief.engagement && brief.engagement !== "discovery" && brief.goal &&
    (brief.scope || brief.scope_size && brief.scope_size !== "unknown") &&
    (brief.needs_development !== null || brief.delivery_preference === "undecided") && brief.fit !== "outside_scope");
}

export function closingGuidance(conversation, brief) {
  const alreadyOffered = conversation.messages.some(message => message.role === "assistant" &&
    (message.action === "contact" || message.action === "both" || /\b(?:call|meeting)\b/i.test(message.content)));
  if (alreadyOffered) return "A call has already been offered. If the visitor accepts, direct them to Send project to Karlo with question=null; do not restart discovery. If they decline or ask something, answer it and respect their preference. Do not repeat the invitation mechanically.";
  if (meetingReady(brief)) return "READY FOR A CALL: The rough scope and design/build ownership are understood. Answer the visitor's concern, describe what I can help with briefly, and invite a quick call now in its own paragraph, separated by a blank line. Set question=null. Do not ask another discovery question, even if budget, timing, inspiration, detailed screens or location are missing. The enquiry control lets the visitor arrange the call; it does not book it automatically.";
  return "EARLY CONTEXT: Ask only the crucial missing scope or design/build ownership question. Do not start a long discovery sequence. Budget and timeline are optional, not gates to a call. If the visitor wants to speak now, offer the enquiry path immediately.";
}
