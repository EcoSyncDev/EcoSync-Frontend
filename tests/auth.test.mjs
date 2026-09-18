import assert from "node:assert/strict";
import test from "node:test";
import { createModuleLoader } from "./load-typescript.mjs";

// Um módulo novo por cenário mantém as sessões independentes da ordem dos testes.
const createAuth = () => createModuleLoader()("@/services/auth-service");

test("auth starts without a current user", () => {
  assert.equal(createAuth().getCurrentUser(), null);
});

test("login returns only user fields and makes the user available in the session", () => {
  const auth = createAuth();
  const user = auth.login({ email: "ana@example.com", password: "demo-password" });
  assert.deepEqual(Object.keys(user).sort(), ["email", "id", "name"]);
  assert.ok(user.id.length > 0);
  assert.ok(user.name.length > 0);
  assert.equal(user.email, "ana@example.com");
  assert.equal(user.password, undefined);
  assert.deepEqual(auth.getCurrentUser(), user);
});

test("logout clears the current user and can be repeated", () => {
  const auth = createAuth();
  auth.login({ email: "ana@example.com", password: "demo-password" });
  auth.logout();
  assert.equal(auth.getCurrentUser(), null);
  auth.logout();
  assert.equal(auth.getCurrentUser(), null);
});

test("signup returns the supplied name and email without retaining the password", () => {
  const auth = createAuth();
  const data = { name: "Ana", email: "ana@example.com", password: "signup-password" };
  const user = auth.signup(data);
  assert.ok(user.id.length > 0);
  assert.equal(user.name, data.name);
  assert.equal(user.email, data.email);
  assert.deepEqual(Object.keys(user).sort(), ["email", "id", "name"]);
  assert.deepEqual(auth.getCurrentUser(), user);
  assert.equal(auth.getCurrentUser().password, undefined);
  data.password = "changed-password";
  data.name = "Changed";
  assert.equal(auth.getCurrentUser().name, "Ana");
  assert.equal(auth.getCurrentUser().password, undefined);
});

test("returned user objects cannot mutate the internal session or add a password", () => {
  const auth = createAuth();
  const user = auth.signup({ name: "Ana", email: "ana@example.com", password: "demo-password" });
  user.name = "Changed";
  user.password = "injected-password";
  const current = auth.getCurrentUser();
  current.email = "changed@example.com";
  current.password = "injected-password";
  assert.equal(auth.getCurrentUser().name, "Ana");
  assert.equal(auth.getCurrentUser().email, "ana@example.com");
  assert.equal(auth.getCurrentUser().password, undefined);
});

test("login and logout sequences replace the current user without reviving old sessions", () => {
  const auth = createAuth();
  for (const email of ["ana@example.com", "bia@example.com"]) {
    auth.login({ email, password: "demo-password" });
    assert.equal(auth.getCurrentUser().email, email);
    auth.logout();
    assert.equal(auth.getCurrentUser(), null);
  }
});

test("signup replaces an existing mock session and logout also clears signup", () => {
  const auth = createAuth();
  auth.login({ email: "ana@example.com", password: "demo-password" });
  const user = auth.signup({ name: "Bia", email: "bia@example.com", password: "signup-password" });
  assert.deepEqual(auth.getCurrentUser(), user);
  assert.equal(auth.getCurrentUser().email, "bia@example.com");
  auth.logout();
  assert.equal(auth.getCurrentUser(), null);
});

test("a fresh module does not restore another module's session", () => {
  const auth = createAuth();
  auth.login({ email: "ana@example.com", password: "demo-password" });
  const freshAuth = createAuth();
  assert.equal(freshAuth.getCurrentUser(), null);
  assert.equal(auth.getCurrentUser().email, "ana@example.com");
});
