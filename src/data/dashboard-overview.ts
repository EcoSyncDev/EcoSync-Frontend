// Dados demonstrativos, sem integração com o backend.
export const energyConsumption = [
  { day: "Seg", kwh: 32 },
  { day: "Ter", kwh: 41 },
  { day: "Qua", kwh: 36 },
  { day: "Qui", kwh: 48 },
  { day: "Sex", kwh: 44 },
  { day: "Sáb", kwh: 29 },
  { day: "Dom", kwh: 24 },
] as const;

export const environmentalImpact = {
  progress: 72,
  label: "Meta sustentável do mês",
  carbonAvoided: "32,8 kg",
  waterSaved: "580 L",
  comparison: "8 pontos percentuais acima do mês anterior",
} as const;
