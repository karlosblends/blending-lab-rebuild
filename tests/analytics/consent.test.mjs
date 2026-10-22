import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../../src/components/Analytics.astro', import.meta.url), 'utf8').match(/<script is:inline[^>]*>([\s\S]*?)<\/script>/)[1];
function setup(hostname = 'blending-lab.com') {
  const listeners = {}, scripts = [];
  const window = { Cookiebot: { consent: { statistics: false } }, addEventListener: (key, fn) => listeners[key] = fn };
  window.parent = window;
  const document = { documentElement: { lang: 'hr' }, createElement: () => ({}), head: { appendChild: script => scripts.push(script) } };
  vm.runInNewContext(source, { window, document, location: { hostname }, Set, Date });
  return { window, scripts, listeners };
}
test('no tag or events before consent; grants load once; withdrawal stops events', () => {
  const { window: w, scripts, listeners } = setup();
  w.blTrack('generate_lead', { form_id: 'contact' });
  assert.equal(scripts.length, 0);
  assert.equal(w.dataLayer.filter(x => x.event === 'bl_event').length, 0);
  w.Cookiebot.consent.statistics = true;
  listeners.CookiebotOnConsentReady(); listeners.CookiebotOnAccept();
  assert.equal(scripts.length, 1);
  w.blTrack('generate_lead', { form_id: 'contact', email: 'private@example.com', message: 'private', placement: 'private@example.com' });
  const event = w.dataLayer.at(-1);
  assert.equal(event.bl_event_name, 'generate_lead');
  assert.deepEqual(Object.keys(event.bl_parameters).sort(), ['form_id', 'page_language', 'send_to']);
  w.Cookiebot.consent.statistics = false; listeners.CookiebotOnDecline();
  const count = w.dataLayer.length;
  w.blTrack('generate_lead', { form_id: 'contact' });
  assert.equal(w.dataLayer.length, count);
  w.Cookiebot.consent.statistics = true; listeners.CookiebotOnAccept();
  assert.equal(scripts.length, 1);
});
test('previews and local development never load production analytics', () => {
  for (const host of ['localhost', 'preview.vercel.app']) {
    const { window: w, scripts } = setup(host);
    assert.equal(w.blTrack, undefined); assert.equal(scripts.length, 0);
  }
});
test('unknown event names are rejected', () => {
  const { window: w, listeners } = setup();
  w.Cookiebot.consent.statistics = true; listeners.CookiebotOnAccept();
  const count = w.dataLayer.length;
  w.blTrack('private_message', { message: 'private' });
  assert.equal(w.dataLayer.length, count);
});
