import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { resolve, join } from "node:path";
import { randomUUID } from "node:crypto";
import { PlannerError } from "./config.js";

const locks = new Map();
const rateWindows = new Map();
export function databaseHeaders(key) {
  // New Supabase secret keys are not JWTs. Only legacy service-role JWTs use Bearer.
  return { apikey: key, ...(key.startsWith("sb_secret_") ? {} : { Authorization: `Bearer ${key}` }), "Content-Type": "application/json" };
}
async function locked(key, operation) {
  const previous = locks.get(key) || Promise.resolve();
  let release;
  const current = new Promise((done) => { release = done; });
  locks.set(key, current);
  await previous;
  try { return await operation(); }
  finally { release(); if (locks.get(key) === current) locks.delete(key); }
}

export function createStore(config, fetcher = fetch) {
  const remote = Boolean(config.supabaseUrl && config.supabaseKey);
  const directory = resolve(config.localDir || ".local/planner");
  const file = (id) => {
    if (!/^[a-f0-9-]{36}$/.test(id)) throw new PlannerError("Invalid conversation.", 400);
    return join(directory, `${id}.json`);
  };
  async function db(path, init = {}) {
    let response;
    try {
      response = await fetcher(`${config.supabaseUrl.replace(/\/$/, "")}/rest/v1/${path}`, {
        ...init, signal: AbortSignal.timeout(10000),
        headers: { ...databaseHeaders(config.supabaseKey), ...init.headers },
      });
    } catch { throw new PlannerError("Project storage is unavailable. Please retry.", 503); }
    if (response.status === 409) throw new PlannerError("Your conversation changed in another request. Please retry.", 409);
    if (!response.ok) throw new PlannerError("Project storage is unavailable. Please retry.", 503);
    return response.status === 204 ? null : response.json();
  }
  async function get(id) {
    if (remote) {
      const rows = await db(`planner_conversations?id=eq.${encodeURIComponent(id)}&select=data`);
      return rows[0]?.data || null;
    }
    if (config.production) throw new PlannerError("Persistent project storage must be configured.", 503);
    try { return JSON.parse(await readFile(file(id), "utf8")); }
    catch (error) { if (error.code === "ENOENT") return null; throw error; }
  }
  async function save(conversation, expectedVersion) {
    const next = { ...conversation, version: expectedVersion + 1, updated_at: new Date().toISOString() };
    if (remote) {
      const saved = await db("rpc/planner_save", { method: "POST", body: JSON.stringify({ payload: next, expected_version: expectedVersion }) });
      if (!saved) throw new PlannerError("Your conversation changed in another request. Please retry.", 409);
      return next;
    }
    return locked(file(conversation.id), async () => {
      const current = await get(conversation.id);
      if ((current?.version ?? 0) !== expectedVersion) throw new PlannerError("Your conversation changed in another request. Please retry.", 409);
      await mkdir(directory, { recursive: true, mode: 0o700 });
      const temp = `${file(next.id)}.${randomUUID()}.tmp`;
      await writeFile(temp, JSON.stringify(next, null, 2), { mode: 0o600 });
      await rename(temp, file(next.id));
      return next;
    });
  }
  async function rateLimit(key, limit = 20, seconds = 600) {
    if (remote) return db("rpc/planner_consume_rate", { method: "POST", body: JSON.stringify({ rate_key: key, maximum: limit, window_seconds: seconds }) });
    const now = Date.now();
    for (const [id, window] of rateWindows) if (window.reset <= now) rateWindows.delete(id);
    const window = rateWindows.get(key) || { count: 0, reset: now + seconds * 1000 };
    window.count += 1; rateWindows.set(key, window);
    return window.count <= limit;
  }
  return { get, save, rateLimit, mode: remote ? "supabase" : "local" };
}
