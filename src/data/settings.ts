export type DemoProfile = { name: string; email: string; organization: string };

export const initialProfile: DemoProfile = {
  name: "Equipe EcoSync",
  email: "equipe@ecosync.demo",
  organization: "EcoSync",
};

export const preferenceFields = [
  { id: "energy", label: "Unidade de energia", options: ["kWh", "MWh"] },
  { id: "water", label: "Unidade de água", options: ["Litros", "Metros cúbicos"] },
  { id: "period", label: "Período padrão", options: ["7 dias", "30 dias", "3 meses", "12 meses"] },
  { id: "language", label: "Idioma", options: ["Português (Brasil)"] },
] as const;

export type Preferences = Record<(typeof preferenceFields)[number]["id"], string>;
export const initialPreferences: Preferences = {
  energy: "kWh", water: "Litros", period: "30 dias", language: "Português (Brasil)",
};

export const notificationOptions = [
  { id: "consumption", label: "Alertas de consumo elevado" },
  { id: "goals", label: "Metas próximas do prazo" },
  { id: "reports", label: "Relatório mensal" },
  { id: "recommendations", label: "Novas recomendações sustentáveis" },
] as const;
export type Notifications = Record<(typeof notificationOptions)[number]["id"], boolean>;
export const initialNotifications: Notifications = {
  consumption: true, goals: true, reports: true, recommendations: false,
};

export const appearanceOptions = [
  { id: "light", label: "Claro" },
  { id: "system", label: "Sistema" },
] as const;
export type Appearance = (typeof appearanceOptions)[number]["id"];

export const privacyDetails = [
  { label: "Dados demonstrativos", value: "Ativos" },
  { label: "Última sincronização", value: "09/09/2026, 09:00 — simulação" },
  { label: "Integrações", value: "Nenhuma conectada" },
] as const;
