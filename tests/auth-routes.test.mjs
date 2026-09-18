import assert from "node:assert/strict";
import test from "node:test";
import { createModuleLoader } from "./load-typescript.mjs";

const { isPublicRoute, isProtectedRoute, requiresAuthentication, shouldRedirectAuthenticatedUser } = createModuleLoader()("@/lib/auth-routes");

const publicPaths = ["/login", "/cadastro", "/esqueci-senha"];
const protectedPaths = ["/", "/monitoramento", "/metas", "/relatorios", "/configuracoes", "/onboarding"];

for (const pathname of ["/login", "/cadastro"]) {
  test(`${pathname} redirects authenticated users, including with a trailing slash`, () => {
    assert.equal(shouldRedirectAuthenticatedUser(pathname), true);
    assert.equal(shouldRedirectAuthenticatedUser(`${pathname}/`), true);
    assert.equal(isPublicRoute(pathname), true);
  });
}

test("password recovery remains accessible to authenticated users", () => {
  assert.equal(shouldRedirectAuthenticatedUser("/esqueci-senha"), false);
  assert.equal(shouldRedirectAuthenticatedUser("/esqueci-senha/"), false);
  assert.equal(isPublicRoute("/esqueci-senha"), true);
});

test("protected routes do not redirect authenticated users away", () => {
  for (const pathname of protectedPaths) {
    assert.equal(shouldRedirectAuthenticatedUser(pathname), false);
    assert.equal(isProtectedRoute(pathname), true);
  }
});

test("authenticated redirects use exact routes, not unknown paths or descendants", () => {
  for (const pathname of ["/desconhecida", "/login-extra", "/login/ajuda", "/cadastro/novo", "/LOGIN", ""]) {
    assert.equal(shouldRedirectAuthenticatedUser(pathname), false);
  }
});

for (const pathname of publicPaths) {
  test(`${pathname} is public and does not require authentication`, () => {
    assert.equal(isPublicRoute(pathname), true);
    assert.equal(isProtectedRoute(pathname), false);
    assert.equal(requiresAuthentication(pathname), false);
  });
}

for (const pathname of protectedPaths) {
  test(`${pathname} is explicitly protected and requires authentication`, () => {
    assert.equal(isPublicRoute(pathname), false);
    assert.equal(isProtectedRoute(pathname), true);
    assert.equal(requiresAuthentication(pathname), true);
  });
}

test("unknown routes are not registered but conservatively require authentication", () => {
  for (const pathname of ["/desconhecida", "/desconhecida/", ""]) {
    assert.equal(isPublicRoute(pathname), false);
    assert.equal(isProtectedRoute(pathname), false);
    assert.equal(requiresAuthentication(pathname), true);
  }
});

test("a single trailing slash preserves the classification of known routes", () => {
  for (const pathname of publicPaths) {
    assert.equal(isPublicRoute(`${pathname}/`), true);
    assert.equal(isProtectedRoute(`${pathname}/`), false);
    assert.equal(requiresAuthentication(`${pathname}/`), false);
  }
  for (const pathname of protectedPaths.filter((path) => path !== "/")) {
    assert.equal(isPublicRoute(`${pathname}/`), false);
    assert.equal(isProtectedRoute(`${pathname}/`), true);
    assert.equal(requiresAuthentication(`${pathname}/`), true);
  }
});

test("route matching is exact and does not treat prefixes or descendants as public", () => {
  for (const pathname of ["/login-extra", "/login/ajuda", "/cadastro/novo", "/LOGIN", "/metas/nova"]) {
    assert.equal(isPublicRoute(pathname), false);
    assert.equal(isProtectedRoute(pathname), false);
    assert.equal(requiresAuthentication(pathname), true);
  }
});
