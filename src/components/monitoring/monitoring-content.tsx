"use client";

import { useState } from "react";
import { IndicatorCard } from "@/components/dashboard/indicator-card";
import { ConsumptionChart } from "@/components/monitoring/consumption-chart";
import { DataState } from "@/components/ui/data-state";
import { getMonitoringData, monitoringPeriods } from "@/services/monitoring-service";
import type { MonitoringPeriod } from "@/types/monitoring";
import type { DataStatus } from "@/types/ui";

const number = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });
const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function MonitoringContent() {
  const [period, setPeriod] = useState<MonitoringPeriod>("30d");
  // Para demonstrar os estados localmente, altere apenas o valor inicial.
  const [status] = useState<DataStatus>("success");

  if (status !== "success") {
    return (
      <div className="mt-8">
        <DataState status={status} />
      </div>
    );
  }

  const data = getMonitoringData(period);
  const label = monitoringPeriods.find((option) => option.id === period)!.label;
  const totals = data.points.reduce((sum, point) => ({ energy: sum.energy + point.energy, water: sum.water + point.water }), { energy: 0, water: 0 });
  const complementary = [
    { label: "CO₂ evitado", value: `${number.format(data.carbonAvoided)} kg` },
    { label: "Economia estimada", value: currency.format(data.savings) },
    { label: "Média diária de energia", value: `${number.format(totals.energy / data.days)} kWh/dia` },
    { label: "Média diária de água", value: `${number.format(totals.water / data.days)} L/dia` },
  ];

  return (
    <div className="mt-8 space-y-6">
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-brand-dark">Período de acompanhamento</legend>
        <div className="flex flex-wrap gap-2">
          {monitoringPeriods.map((option) => (
            <button key={option.id} type="button" aria-pressed={period === option.id} onClick={() => setPeriod(option.id)} className={`min-h-11 rounded-lg border px-4 py-2 text-sm transition-colors ${period === option.id ? "border-brand bg-brand-light font-semibold text-brand-dark underline decoration-2 underline-offset-4" : "border-outline bg-surface text-muted hover:bg-brand-light/50"}`}>
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>
      <p role="status" className="text-xs text-muted">Período selecionado: {label} · Dados demonstrativos</p>
      <section aria-label="Resumo de consumo" className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <IndicatorCard title="Energia" value={`${number.format(totals.energy)} kWh`} description={`Consumo acumulado em ${label}. Média de ${number.format(totals.energy / data.days)} kWh por dia.`} icon="energy" comparison={`${data.energyReduction}% abaixo do período anterior equivalente`} trend="down" />
        <IndicatorCard title="Água" value={`${number.format(totals.water)} L`} description={`Consumo acumulado em ${label}. Média de ${number.format(totals.water / data.days)} L por dia.`} icon="water" comparison={`${data.waterReduction}% abaixo do período anterior equivalente`} trend="down" />
      </section>
      <section aria-labelledby="history-title" className="min-w-0 rounded-2xl border border-outline bg-surface p-5 shadow-sm">
        <h2 id="history-title" className="text-base font-semibold text-brand-dark">Histórico de consumo</h2>
        <p className="mt-1 text-sm leading-6 text-muted">{label} · Gráficos com escalas independentes: energia em kWh e água em litros.</p>
        <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
          <ConsumptionChart title="Energia" unit="kWh" metric="energy" points={data.points} grouping={data.grouping} />
          <ConsumptionChart title="Água" unit="L" metric="water" points={data.points} grouping={data.grouping} />
        </div>
      </section>
      <section aria-labelledby="complementary-title" className="rounded-2xl border border-outline bg-surface p-5 shadow-sm">
        <h2 id="complementary-title" className="text-base font-semibold text-brand-dark">Indicadores complementares</h2>
        <p className="mt-1 text-xs leading-5 text-muted">Estimativas demonstrativas para {label}. Médias calculadas sobre {data.days} dias.</p>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {complementary.map((item) => (
            <div key={item.label} className="min-w-0">
              <dt className="text-xs text-muted">{item.label}</dt>
              <dd className="mt-2 text-lg font-semibold text-brand-dark tabular-nums">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
