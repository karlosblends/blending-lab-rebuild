import test from "node:test";
import assert from "node:assert/strict";
import { questionnaireSteps, questionnaireMessage } from "../../src/lib/planner/questionnaire.js";

test("project questions adapt to the service and leave answered discovery fields alone", () => {
  const website = questionnaireSteps({}, { service: "website" });
  assert.equal(website.find(step => step.id === "scope").type, "checkbox");
  assert.ok(website.some(step => step.id === "content"));
  const product = questionnaireSteps({ engagement: "product", goal: "Improve dashboard", delivery_preference: "design_only", timeline: "Not decided", market: "local" });
  assert.equal(product.find(step => step.id === "scope").type, "input");
  for (const key of ["service", "goals", "delivery", "content", "timeline", "location"]) assert.ok(!product.some(step => step.id === key));
});

test("selected answers become readable visitor context without inventing skipped answers or prices", () => {
  const answers = { service: "website", business: "Wedding photographer", goals: ["Build trust", "Bring in enquiries"], scope: ["Portfolio or case studies", "Enquiry form"], priority: 2 };
  const message = questionnaireMessage(questionnaireSteps({}, answers), answers);
  assert.match(message, /A website or landing page/);
  assert.match(message, /Build trust, Bring in enquiries/);
  assert.match(message, /Exploring an idea/);
  assert.doesNotMatch(message, /date you're aiming|business based|€|price is|Ready to get started/);
});
