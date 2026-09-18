import assert from "node:assert/strict";
import test from "node:test";
import { createModuleLoader } from "./load-typescript.mjs";

const { readLoginCredentials, readSignupData } = createModuleLoader()("@/lib/auth-form");

function fields(values) {
  const data = new FormData();
  for (const [name, value] of Object.entries(values)) data.set(name, value);
  return data;
}

test("login fields produce only credentials, ignoring remember and unrelated fields", () => {
  const credentials = { email: "ana@example.com", password: "demo-password" };
  const result = readLoginCredentials(fields({ ...credentials, remember: "on", name: "Ana" }));
  assert.deepEqual(result, credentials);
});

test("signup fields produce name, email and password without confirmation", () => {
  const data = { name: "Ana", email: "ana@example.com", password: "demo-password" };
  const result = readSignupData(fields({ ...data, confirmPassword: data.password, remember: "on" }));
  assert.deepEqual(result, data);
});

test("mismatched or missing confirmation does not produce signup data", () => {
  const data = { name: "Ana", email: "ana@example.com", password: "demo-password" };
  assert.equal(readSignupData(fields({ ...data, confirmPassword: "different-password" })), null);
  assert.equal(readSignupData(fields(data)), null);
});

test("reading fields preserves their values and does not mutate the form data", () => {
  const data = { name: " Ana ", email: "ana@example.com", password: " demo-password " };
  const form = fields({ ...data, confirmPassword: data.password });
  const before = [...form.entries()];
  assert.deepEqual(readLoginCredentials(form), { email: data.email, password: data.password });
  const result = readSignupData(form);
  assert.deepEqual(result, data);
  result.name = "Changed";
  assert.deepEqual([...form.entries()], before);
  assert.deepEqual(readSignupData(form), data);
});

test("missing fields retain empty-string defaults for native form validation", () => {
  assert.deepEqual(readLoginCredentials(new FormData()), { email: "", password: "" });
  assert.deepEqual(readSignupData(fields({ password: "demo-password", confirmPassword: "demo-password" })), {
    name: "", email: "", password: "demo-password",
  });
});
