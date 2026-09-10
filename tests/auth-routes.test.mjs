import assert from "node:assert/strict";
import test from "node:test";
import { createModuleLoader } from "./load-typescript.mjs";

const { isPublicRoute, isProtectedRoute, requiresAuthentication } = createModuleLoader()("@/lib/auth-routes");

const publicPaths = ["/login", "/cadastro", "/esqueci-senha"];
const protectedPaths = ["/", "/monitoramento", "/metas", "/relatorios", "/configuracoes", "/onboarding"];

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
