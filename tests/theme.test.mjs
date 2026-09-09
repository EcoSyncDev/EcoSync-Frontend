import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(readFileSync(new URL("../src/lib/theme.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

function browser(saved = null, systemDark = false, blocked = false) {
  const storage = new Map(saved === null ? [] : [["ecosync-theme", saved]]);
  const localStorage = {
    getItem: (key) => { if (blocked) throw new Error("Blocked"); return storage.get(key) ?? null; },
    setItem: (key, value) => { if (blocked) throw new Error("Blocked"); storage.set(key, value); },
  };
  const classes = new Set();
  const document = { documentElement: { dataset: {}, classList: { toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name) } } };
  const media = Object.assign(new EventTarget(), { matches: systemDark });
  const window = Object.assign(new EventTarget(), { localStorage, matchMedia: () => media });
  const context = vm.createContext({ exports: {}, document, window, localStorage, Event });
  vm.runInContext(source, context);
  const api = context.exports;
  vm.runInContext(api.themeInitializationScript, context);
  return { api, storage, classes, media, window };
}

test("initial script restores saved preferences before React, with safe defaults", () => {
  for (const [saved, system, expected] of [["dark", false, true], ["light", true, false], ["system", true, true], ["system", false, false], ["invalid", true, false], [null, true, false]]) {
    const env = browser(saved, system);
    assert.equal(env.classes.has("dark"), expected);
    assert.equal(env.api.getThemePreference(), saved === "invalid" || saved === null ? "light" : saved);
  }
});

test("selection persists and survives a new page load", () => {
  const env = browser();
  let changes = 0;
  const unsubscribe = env.api.subscribeTheme(() => changes++);
  env.api.setThemePreference("dark");
  assert.equal(env.classes.has("dark"), true);
  assert.equal(changes, 1);
  assert.equal(browser(env.storage.get("ecosync-theme")).classes.has("dark"), true);
  env.api.setThemePreference("light");
  assert.equal(env.classes.has("dark"), false);
  unsubscribe();
});

test("system changes affect only System, and subscriptions clean up", () => {
  const env = browser("system");
  const unsubscribe = env.api.subscribeTheme(() => {});
  env.media.matches = true;
  env.media.dispatchEvent(new Event("change"));
  assert.equal(env.classes.has("dark"), true);
  env.api.setThemePreference("light");
  env.media.dispatchEvent(new Event("change"));
  assert.equal(env.classes.has("dark"), false);
  env.api.setThemePreference("dark");
  env.media.matches = false;
  env.media.dispatchEvent(new Event("change"));
  assert.equal(env.classes.has("dark"), true);
  env.api.setThemePreference("system");
  unsubscribe();
  env.media.matches = true;
  env.media.dispatchEvent(new Event("change"));
  assert.equal(env.classes.has("dark"), false);
});

test("storage events synchronize tabs and storage failures do not break selection", () => {
  const env = browser();
  const unsubscribe = env.api.subscribeTheme(() => {});
  env.window.dispatchEvent(Object.assign(new Event("storage"), { key: "ecosync-theme", newValue: "dark" }));
  assert.equal(env.classes.has("dark"), true);
  env.window.dispatchEvent(Object.assign(new Event("storage"), { key: null, newValue: null }));
  assert.equal(env.classes.has("dark"), false);
  unsubscribe();
  const blocked = browser(null, true, true);
  assert.doesNotThrow(() => blocked.api.setThemePreference("system"));
  assert.equal(blocked.classes.has("dark"), true);
});

test("dark palette provides readable text, buttons and control boundaries", () => {
  const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
  const dark = css.match(/:root\.dark\s*\{([^}]+)\}/)[1];
  const colors = Object.fromEntries([...dark.matchAll(/--([\w-]+):\s*(#[\da-f]{6})/g)].map((match) => [match[1], match[2]]));
  const luminance = (hex) => {
    const rgb = hex.slice(1).match(/../g).map((channel) => {
      const value = parseInt(channel, 16) / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  const contrast = (a, b) => {
    const values = [luminance(colors[a]), luminance(colors[b])].sort((x, y) => y - x);
    return (values[0] + 0.05) / (values[1] + 0.05);
  };
  for (const text of ["foreground", "brand-dark", "muted", "brand"]) {
    for (const background of ["surface", "background", "brand-light"]) assert.ok(contrast(text, background) >= 4.5, `${text}/${background}`);
  }
  assert.ok(contrast("on-brand", "brand") >= 4.5);
  assert.ok(contrast("on-brand", "brand-hover") >= 4.5);
  assert.ok(contrast("control-outline", "surface") >= 3);
});
