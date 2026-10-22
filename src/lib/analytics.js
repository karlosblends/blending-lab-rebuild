// Only fixed event names and categorical metadata belong in analytics.
// Never pass contact fields, planner messages, brief text, or conversation IDs.
export const events = new Set(['generate_lead', 'form_start', 'form_error', 'booking_click', 'email_click', 'phone_click', 'portfolio_select', 'estimate_start', 'planner_start', 'questionnaire_start', 'questionnaire_complete', 'cta_click', 'scroll_depth']);
export function track(name, parameters = {}) {
  if (typeof window === 'undefined' || !events.has(name)) return;
  try {
    const owner = window.parent !== window && window.parent.location.origin === window.location.origin ? window.parent : window;
    owner.blTrack?.(name, parameters);
  } catch { /* Cross-origin frames cannot forward analytics. */ }
}
