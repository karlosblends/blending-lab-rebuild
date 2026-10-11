// Obvious general-assistance requests never reach the provider. Ambiguous messages
// are classified in the existing brief extraction call before any reply generation.
export function obviousOffTopic(text) {
  if (/\b(?:ignore|override|forget)\b.{0,45}\b(?:instructions|rules|prompt)\b|\b(?:reveal|show|print)\b.{0,30}\b(?:system prompt|api key|internal instructions)\b/i.test(text)) return true;
  const service = /\b(?:website|webflow|landing[ -]page|portfolio|UX|UI|dashboard|interface|design|frontend|front-end)\b/i.test(text);
  const direct = /\b(?:what is|explain|teach me|tell me about|solve|calculate|write me|write a|can you write|give me|generate)\b/i.test(text);
  const unrelated = /\b(?:relativity|quantum|recipe|poem|joke|homework|school project|python script|weather|capital of|algebra|essay)\b/i.test(text);
  return direct && unrelated && !service;
}

export function boundaryTurn(conversation) {
  const closed = (conversation.off_topic_count || 0) >= 1;
  return {
    intent: "off_topic", closed, question: null, brief: conversation.brief,
    reply: closed
      ? "Looks like you're here for something else, so I'll leave this conversation here.\n\nIf a website or product design project comes up, you can reach me at karlo@blending-lab.com."
      : "I keep this chat for websites, product design and work we could do together.\n\nIs there something you're looking to build or improve?",
  };
}

export function nextAction(turn, visitorMessage) {
  if (turn.intent === "off_topic" || turn.closed || turn.brief.fit === "outside_scope") return "none";
  // An explicit request is enough, including an early enquiry with unknown scope.
  const contact = /\b(?:book|schedule|arrange|get on|have)\b.{0,30}\b(?:call|meeting)\b|\b(?:send|submit)\b.{0,35}\b(?:project|enquiry|inquiry|brief|karlo)\b|\b(?:contact karlo|talk to karlo|ready to (?:start|proceed))\b/i.test(visitorMessage);
  const questionnaire = /\b(?:questionnaire|estimator|guided questions)\b|\b(?:work|walk|go)\b.{0,20}\bthrough\b.{0,25}\bquestions\b/i.test(visitorMessage);
  if (contact || questionnaire) return contact && questionnaire ? "both" : contact ? "contact" : "questionnaire";
  // Controls accompany a genuine offered next step, never a discovery question.
  if (!turn.brief.goal || !turn.brief.engagement || turn.question) return "none";
  const offer = /\b(?:would you like|want to|we can|you can|shall we|let's|how about|I suggest|I'd suggest|I'd love|I can)\b/i.test(turn.reply);
  if (!offer) return "none";
  const offersQuestions = /\b(?:questionnaire|estimator|few questions|guided questions)\b/i.test(turn.reply);
  const offersContact = /\b(?:call|meeting|send.{0,20}(?:project|brief)|submit|contact form)\b/i.test(turn.reply);
  return offersQuestions && offersContact ? "both" : offersQuestions ? "questionnaire" : offersContact ? "contact" : "none";
}

export function firstReplyGreeting(reply, messages) {
  if (messages.some(message => message.role === "assistant")) return reply;
  return /^(?:hey|hi|hello|bok|pozdrav)\b/i.test(reply) ? reply : `Hey! ${reply}`;
}
