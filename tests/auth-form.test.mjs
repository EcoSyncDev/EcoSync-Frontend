import assert from "node:assert/strict";
import test from "node:test";
import { createModuleLoader } from "./load-typescript.mjs";

function scenario() {
  const load = createModuleLoader();
  return { service: load("@/services/auth-service"), forms: load("@/lib/auth-form") };
}

function fields(values) {
  const data = new FormData();
  for (const [name, value] of Object.entries(values)) data.set(name, value);
  return data;
}

test("login form data forwards only credentials to the service and returns its user", (t) => {
  const { service, forms } = scenario();
  const credentials = { email: "ana@example.com", password: "demo-password" };
  const login = service.login;
  const spy = t.mock.method(service, "login", login);
  const user = forms.loginWithFormData(fields({ ...credentials, remember: "on" }));
  assert.equal(spy.mock.callCount(), 1);
  assert.deepEqual(spy.mock.calls[0].arguments, [credentials]);
  assert.equal(user.email, credentials.email);
  assert.equal(user.password, undefined);
  assert.deepEqual(user, service.getCurrentUser());
});

test("signup form data forwards name, email and password without confirmation", (t) => {
  const { service, forms } = scenario();
  const data = { name: "Ana", email: "ana@example.com", password: "demo-password" };
  const signup = service.signup;
  const spy = t.mock.method(service, "signup", signup);
  const user = forms.signupWithFormData(fields({ ...data, confirmPassword: data.password }));
  assert.equal(spy.mock.callCount(), 1);
  assert.deepEqual(spy.mock.calls[0].arguments, [data]);
  assert.equal(user.name, data.name);
  assert.equal(user.email, data.email);
  assert.equal(user.password, undefined);
  assert.deepEqual(user, service.getCurrentUser());
});

test("mismatched confirmation prevents signup and leaves the session unchanged", (t) => {
  const { service, forms } = scenario();
  const spy = t.mock.method(service, "signup");
  const result = forms.signupWithFormData(fields({ name: "Ana", email: "ana@example.com", password: "demo-password", confirmPassword: "different-password" }));
  assert.equal(result, null);
  assert.equal(spy.mock.callCount(), 0);
  assert.equal(service.getCurrentUser(), null);
});

for (const [operation, helper] of [["login", "loginWithFormData"], ["signup", "signupWithFormData"]]) {
  test(`${operation} failures propagate for the form to handle without returning success`, (t) => {
    const { service, forms } = scenario();
    t.mock.method(service, operation, () => { throw new Error("Service failure"); });
    const data = fields({ name: "Ana", email: "ana@example.com", password: "demo-password", confirmPassword: "demo-password" });
    assert.throws(() => forms[helper](data), /Service failure/);
    assert.equal(service.getCurrentUser(), null);
  });
}
