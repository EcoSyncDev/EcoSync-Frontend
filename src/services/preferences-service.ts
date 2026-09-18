import type { UserPreferences, UserThemePreference } from "@/types/preferences";

export const preferencesStorageKey = "ecosync-user-preferences";
const preferencesEvent = "ecosync-preferences-change";

export const DEFAULT_USER_PREFERENCES: Readonly<UserPreferences> = {
  theme: "light",
  notificationsEnabled: true,
  consumptionAlerts: true,
  goalAlerts: true,
};

let memoryPreferences: UserPreferences = { ...DEFAULT_USER_PREFERENCES };

function isThemePreference(value: unknown): value is UserThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizePreferences(value: unknown): UserPreferences {
  if (!isRecord(value)) return { ...DEFAULT_USER_PREFERENCES };
  return {
    theme: isThemePreference(value.theme) ? value.theme : DEFAULT_USER_PREFERENCES.theme,
    notificationsEnabled: typeof value.notificationsEnabled === "boolean" ? value.notificationsEnabled : DEFAULT_USER_PREFERENCES.notificationsEnabled,
    consumptionAlerts: typeof value.consumptionAlerts === "boolean" ? value.consumptionAlerts : DEFAULT_USER_PREFERENCES.consumptionAlerts,
    goalAlerts: typeof value.goalAlerts === "boolean" ? value.goalAlerts : DEFAULT_USER_PREFERENCES.goalAlerts,
  };
}

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function getPreferences(): UserPreferences {
  const storage = getStorage();
  if (!storage) return { ...memoryPreferences };
  try {
    const saved = storage.getItem(preferencesStorageKey);
    memoryPreferences = saved === null ? { ...DEFAULT_USER_PREFERENCES } : normalizePreferences(JSON.parse(saved));
  } catch {
    // Local persistence is temporary until this service is connected to the backend.
  }
  return { ...memoryPreferences };
}

export function updatePreferences(changes: Partial<UserPreferences>): UserPreferences {
  memoryPreferences = normalizePreferences({ ...getPreferences(), ...changes });
  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(preferencesStorageKey, JSON.stringify(memoryPreferences));
    } catch {
      // Keep the update in memory when the browser blocks storage.
    }
  }
  if (typeof window !== "undefined") window.dispatchEvent(new Event(preferencesEvent));
  return { ...memoryPreferences };
}

export function subscribePreferences(notify: () => void) {
  if (typeof window === "undefined") return () => {};
  const onStorage = (event: StorageEvent) => {
    if (event.key === preferencesStorageKey) notify();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(preferencesEvent, notify);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(preferencesEvent, notify);
  };
}
