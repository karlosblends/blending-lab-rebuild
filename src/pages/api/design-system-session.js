export const prerender = false;

const cookieName = "bl_design_system";
const encoder = new TextEncoder();
const digest = async (value) => {
  const buffer = await crypto.subtle.digest("SHA-256", encoder.encode(`blending-lab-design-system:${value}`));
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");
};
const matches = (left = "", right = "") => {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
};
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "private, no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });

export async function POST({ request, cookies }) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return json({ error: "This endpoint only accepts JSON requests." }, 415);
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return json({ error: "Invalid request." }, 400);

  if (body.intent === "logout") {
    cookies.delete(cookieName, { path: "/" });
    return json({ ok: true });
  }

  const configuredPassword = import.meta.env.DESIGN_SYSTEM_PASSWORD;
  if (!configuredPassword) return json({ error: "Protection has not been configured yet." }, 503);

  const expectedToken = await digest(configuredPassword);
  const submittedToken = typeof body.password === "string" && body.password ? await digest(body.password) : "";
  if (!matches(submittedToken, expectedToken)) return json({ error: "That password doesn’t match." }, 401);

  cookies.set(cookieName, expectedToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: !import.meta.env.DEV,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return json({ ok: true });
}
