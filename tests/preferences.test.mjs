import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(readFileSync(new URL("../src/services/preferences-service.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

function preferencesBrowser(saved = null, blocked = false) {
  const storage = new Map(saved === null ? [] : [["ecosync-user-preferences", saved]]);
  const localStorage = {
    getItem: (key) => { if (blocked) throw new Error("Blocked"); return storage.get(key) ?? null; },
    setItem: (key, value) => { if (blocked) throw new Error("Blocked"); storage.set(key, value); },
  };
  const context = vm.createContext({ exports: {}, window: { localStorage } });
  vm.runInContext(source, context);
  return { api: context.exports, storage };
}

const defaults = { theme: "light", notificationsEnabled: true, consumptionAlerts: true, goalAlerts: true };
const toPlainObject = (preferences) => JSON.parse(JSON.stringify(preferences));

test("preferences use defaults without saved data and remain safe without window", () => {
  assert.deepEqual(toPlainObject(preferencesBrowser().api.getPreferences()), defaults);
  const context = vm.createContext({ exports: {} });
  vm.runInContext(source, context);
  assert.deepEqual(toPlainObject(context.exports.getPreferences()), defaults);
});

test("preferences read valid persisted data", () => {
  const saved = { theme: "system", notificationsEnabled: false, consumptionAlerts: false, goalAlerts: true };
  assert.deepEqual(toPlainObject(preferencesBrowser(JSON.stringify(saved)).api.getPreferences()), saved);
});

test("preferences update partially and preserve unchanged values", () => {
  const env = preferencesBrowser();
  assert.deepEqual(toPlainObject(env.api.updatePreferences({ theme: "dark", consumptionAlerts: false })), {
    theme: "dark", notificationsEnabled: true, consumptionAlerts: false, goalAlerts: true,
  });
  assert.deepEqual(JSON.parse(env.storage.get("ecosync-user-preferences")), {
    theme: "dark", notificationsEnabled: true, consumptionAlerts: false, goalAlerts: true,
  });
});

test("preferences replace invalid persisted fields with defaults without throwing", () => {
  const invalid = preferencesBrowser('{"theme":"sepia","notificationsEnabled":"yes","consumptionAlerts":false}');
  assert.deepEqual(toPlainObject(invalid.api.getPreferences()), { ...defaults, consumptionAlerts: false });
  assert.doesNotThrow(() => preferencesBrowser("not-json").api.getPreferences());
});
