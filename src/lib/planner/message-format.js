// Keep older replies readable too, without rewriting the saved conversation.
export function formatChatMessage(text) {
  if (!text || typeof Intl.Segmenter !== "function") return text;
  if (text.startsWith("Here are my answers to the project questions:")) text = text.replace(/(?<!\n)\n(?!\n)/g, "\n\n");
  const segmenter = new Intl.Segmenter(undefined, { granularity: "sentence" });
  return text.split(/\n\s*\n/).map(paragraph => {
    if (paragraph.length < 180 || paragraph.includes("\n")) return paragraph;
    const sentences = [...segmenter.segment(paragraph)].map(item => item.segment.trim());
    const parts = [];
    let current = "";
    let count = 0;
    for (const sentence of sentences) {
      const question = /[?？]$/.test(sentence);
      if (current && (count >= 2 || current.length + sentence.length > 240 || question)) {
        parts.push(current); current = ""; count = 0;
      }
      current += `${current ? " " : ""}${sentence}`;
      count += 1;
    }
    if (current) parts.push(current);
    return parts.join("\n\n");
  }).join("\n\n");
}
