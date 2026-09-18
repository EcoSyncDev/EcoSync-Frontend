export type UserThemePreference = "light" | "dark" | "system";

export type UserPreferences = {
  theme: UserThemePreference;
  notificationsEnabled: boolean;
  consumptionAlerts: boolean;
  goalAlerts: boolean;
};
