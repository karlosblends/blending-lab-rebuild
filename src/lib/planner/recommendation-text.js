const euro = (value) => new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);

// Keep chat readable; the full assumptions, process and factors remain in the saved recommendation.
export function recommendationText(r) {
  const investment = !r.budget
    ? "Pricing needs Karlo's review; no approved range is available for this scope yet."
    : r.budget.period === "month"
      ? `Monthly plan reference: ${euro(r.budget.min)}/month, for approximately ${r.capacity.hours_per_week} hours a week.`
      : `Indicative investment: ${euro(r.budget.min)}–${euro(r.budget.max)}`;
  return [
    "A possible starting point", r.title,
    "", `Focus: ${r.visitor_scope}`,
    "", "Likely scope", ...r.scope.map((item) => `• ${item}`),
    "", investment,
    ...(r.placeholder ? ["Example pricing for this prototype; not approved Blending Lab rates."] : []),
    r.duration ? `Estimated duration: ${r.duration.min}–${r.duration.max} weeks` : "Timing needs a scope and availability review with Karlo.",
    r.disclaimer,
    ...(r.review_required ? ["Technical responsibilities need review before this scope can be agreed."] : []),
    "", `Possible process: ${r.process.join(" → ")}.`,
    `Assumes: ${r.assumptions.slice(0, 2).join("; ")}.`,
    "What can change the scope: more flows, content, user roles or integrations; ready content and an existing UI system can reduce the work.",
  ].join("\n");
}
