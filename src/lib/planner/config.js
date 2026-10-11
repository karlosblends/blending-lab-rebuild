export function plannerConfig() {
  const env = { ...import.meta.env, ...process.env };
  const production = env.VERCEL === "1" || env.NODE_ENV === "production";
  return {
    production,
    apiKey: env.OPENAI_API_KEY,
    model: env.OPENAI_MODEL || "gpt-4.1-mini",
    demo: !production && !env.OPENAI_API_KEY,
    supabaseUrl: env.SUPABASE_URL,
    supabaseKey: env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY,
    localDir: env.PLANNER_DATA_DIR || ".local/planner",
    resendKey: env.RESEND_API_KEY,
    emailFrom: env.PLANNER_EMAIL_FROM,
    emailTo: env.PLANNER_EMAIL_TO || "karlo@blending-lab.com",
    demoEstimates: !production && env.PLANNER_DEMO_ESTIMATES === "true",
  };
}

export class PlannerError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}

export function assertConfigured(config) {
  if (Boolean(config.supabaseUrl) !== Boolean(config.supabaseKey)) throw new PlannerError("Project storage is not fully configured.", 503);
  if (config.production && (!config.apiKey || !config.supabaseUrl || !config.supabaseKey || !config.resendKey || !config.emailFrom || !config.emailTo)) {
    throw new PlannerError("The project planner is being prepared. Please contact karlo@blending-lab.com in the meantime.", 503);
  }
}
