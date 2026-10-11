import test from "node:test";
import assert from "node:assert/strict";
import { NodeApp } from "astro/app/node";
import config from "../../astro.config.mjs";
import { route } from "../../src/lib/planner/http.js";

function forwardedRequest(host, origin = `https://${host}`) {
  return NodeApp.createRequest({
    method: "POST", url: "/api/planner/session", socket: {},
    headers: { host: "internal.vercel.invalid", "x-forwarded-host": host, "x-forwarded-proto": "https", origin },
  }, { skipBody: true, allowedDomains: config.security.allowedDomains });
}

test("Vercel preserves the public HTTPS origin for planner requests", async () => {
  for (const { hostname: host } of config.security.allowedDomains) {
    const request = forwardedRequest(host);
    assert.equal(new URL(request.url).origin, `https://${host}`);
    const response = await route({ request }, () => new Response("accepted"), { rate: false });
    assert.equal(response.status, 200);
  }
});

test("planner still rejects foreign origins and untrusted forwarded hosts", async () => {
  const response = await route({ request: forwardedRequest("blending-lab.com", "https://evil.example") }, () => new Response("accepted"), { rate: false });
  assert.equal(response.status, 403);
  for (const host of ["evil.example", "blending-lab.com.evil.example", "other-project.vercel.app"]) {
    assert.notEqual(new URL(forwardedRequest(host).url).hostname, host);
  }
});
