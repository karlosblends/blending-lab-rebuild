import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../../src/components/Analytics.astro', import.meta.url), 'utf8').match(/<script is:inline[^>]*>([\s\S]*?)<\/script>/)[1];
function setup(hostname = 'blending-lab.com', search = '') {
  const listeners = {}, scripts = [];
  const window = { Cookiebot: { consent: { statistics: false } }, dispatchEvent: () => {}, addEventListener: (key, fn) => listeners[key] = fn };
  window.parent = window;
  const document = { addEventListener: () => {}, documentElement: { lang: 'hr' }, createElement: () => ({}), head: { appendChild: script => scripts.push(script) } };
  vm.runInNewContext(source, { window, document, location: { hostname, search }, Set, Date, URLSearchParams, CustomEvent: class { constructor(type) { this.type = type; } } });
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
  assert.deepEqual(Object.keys(event.bl_parameters).sort(), ['enquiries_received', 'form_id', 'page_language', 'send_to', 'traffic_kind']);
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

test('QA successes cannot increment business enquiries and keep no test identity', () => {
  const { window: w, listeners } = setup('blending-lab.com', '?bl_test=1');
  w.Cookiebot.consent.statistics = true; listeners.CookiebotOnAccept();
  assert.equal(w.blTrack('generate_lead', { form_id: 'questionnaire', name: 'Test Person', email: 'test@example.com' }), true);
  const e = w.dataLayer.at(-1);
  assert.equal(e.bl_event_name, 'qa_generate_lead');
  assert.equal(e.bl_parameters.traffic_kind, 'test');
  assert.equal(e.bl_parameters.email, undefined);
  assert.equal(e.bl_parameters.enquiries_received, 0);
});
test('card events carry categorical answers and progress, never sentence or contact fields', () => {
  const { window: w, listeners } = setup();
  w.Cookiebot.consent.statistics = true; listeners.CookiebotOnAccept();
  for (const event of ['questionnaire_card_view', 'questionnaire_answer', 'questionnaire_undo', 'questionnaire_restart']) {
    w.blTrack(event, { card_id: 'website', card_position: 1, answer: 'yes', cards_answered: 1, cards_total: 6, questionnaire_version: 'offer_v1', sentence: 'Private text', name: 'Person', email: 'private@example.com' });
    const p = w.dataLayer.at(-1).bl_parameters;
    assert.equal(p.card_id, 'website'); assert.equal(p.answer, 'yes'); assert.equal(p.cards_answered, 1);
    assert.equal(p.sentence, undefined); assert.equal(p.name, undefined); assert.equal(p.email, undefined);
  }
});
