import type { UserPreferences, UserThemePreference } from "@/types/preferences";

export const preferencesStorageKey = "ecosync-user-preferences";

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
    // Armazenamento local Ã© temporÃ¡rio; a futura integraÃ§Ã£o substituirÃ¡ esta camada pelo backend.
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
      // MantÃ©m a alteraÃ§Ã£o em memÃ³ria se o navegador bloquear o armazenamento.
    }
  }
  return { ...memoryPreferences };
}
