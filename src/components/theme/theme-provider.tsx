"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { getThemePreference, setThemePreference, subscribeTheme, type ThemePreference } from "@/lib/theme";

const ThemeContext = createContext<{ theme: ThemePreference; setTheme: (theme: ThemePreference) => void } | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemePreference, () => "light" as const);
  return <ThemeContext.Provider value={{ theme, setTheme: setThemePreference }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme deve ser usado dentro de ThemeProvider.");
  return context;
}
