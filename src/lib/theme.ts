export type ThemePreference = "light" | "dark" | "system";
export const themeStorageKey = "ecosync-theme";
const themeEvent = "ecosync-theme-change";

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

export function applyTheme(preference: ThemePreference) {
  const dark = preference === "dark" || (preference === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.dataset.themePreference = preference;
}

export function getThemePreference(): ThemePreference {
  const value = document.documentElement.dataset.themePreference;
  return isThemePreference(value) ? value : "light";
}

export function subscribeTheme(notify: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => { if (getThemePreference() === "system") applyTheme("system"); };
  const onStorage = (event: StorageEvent) => {
    if (event.key !== themeStorageKey && event.key !== null) return;
    applyTheme(isThemePreference(event.newValue) ? event.newValue : "light");
    notify();
  };
  // Reavalia o sistema caso tenha mudado entre o script inicial e a hidratação.
  applyTheme(getThemePreference());
  media.addEventListener("change", onSystemChange);
  window.addEventListener("storage", onStorage);
  window.addEventListener(themeEvent, notify);
  return () => {
    media.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(themeEvent, notify);
  };
}

export function setThemePreference(theme: ThemePreference) {
  applyTheme(theme);
  try { window.localStorage.setItem(themeStorageKey, theme); } catch {
    // Se o navegador bloquear o armazenamento, a seleção ainda funciona nesta sessão.
  }
  window.dispatchEvent(new Event(themeEvent));
}

// Executado no head antes do conteúdo. Não contém dados fornecidos pelo usuário.
export const themeInitializationScript = `(() => {
  let preference = "light";
  try {
    const saved = localStorage.getItem("${themeStorageKey}");
    if (saved === "light" || saved === "dark" || saved === "system") preference = saved;
  } catch {}
  const dark = preference === "dark" || (preference === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.dataset.themePreference = preference;
})();`;
