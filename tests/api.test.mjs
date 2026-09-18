import assert from "node:assert/strict";
import test from "node:test";
import { createModuleLoader } from "./load-typescript.mjs";

const { ApiError } = createModuleLoader()("@/lib/api/errors");

test("ApiError accepts a message without optional metadata", () => {
  const error = new ApiError("Dados indisponíveis");
  assert.ok(error instanceof Error);
  assert.ok(error instanceof ApiError);
  assert.equal(error.name, "ApiError");
  assert.equal(error.message, "Dados indisponíveis");
  assert.equal(error.status, undefined);
  assert.equal(error.code, undefined);
});

test("ApiError preserves status and code, independently or together", () => {
  for (const options of [{ status: 503 }, { code: "UNAVAILABLE" }, { status: 503, code: "UNAVAILABLE" }]) {
    const error = new ApiError("Tente novamente", options);
    assert.ok(error instanceof Error);
    assert.equal(error.message, "Tente novamente");
    assert.equal(error.status, options.status);
    assert.equal(error.code, options.code);
  }
});

for (const [label, env, expected] of [
  ["defined", { NEXT_PUBLIC_API_URL: "http://localhost:4000" }, "http://localhost:4000"],
  ["absent", {}, undefined],
  ["surrounded by whitespace", { NEXT_PUBLIC_API_URL: "  http://localhost:4000  " }, "http://localhost:4000"],
  ["empty", { NEXT_PUBLIC_API_URL: "" }, undefined],
  ["whitespace only", { NEXT_PUBLIC_API_URL: "   " }, undefined],
]) {
  test(`API_BASE_URL handles an environment variable that is ${label}`, () => {
    const { API_BASE_URL } = createModuleLoader(env)("@/lib/api/config");
    assert.equal(API_BASE_URL, expected);
  });
}
