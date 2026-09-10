"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { DataState } from "@/components/ui/data-state";
import { ExportReportDialog } from "@/components/reports/export-report-dialog";
import { ReportChart } from "@/components/reports/report-chart";
import { ReportComparison } from "@/components/reports/report-comparison";
import { formatReportValue, getReports, reportMetrics, reportPeriods, sumReportPoints, type ReportPeriod } from "@/services/reports-service";

type ReportsStatus = "success" | "loading" | "empty" | "error";

export function ReportsContent() {
  const [period, setPeriod] = useState<ReportPeriod>("month");
  // Para demonstrar os estados localmente, altere apenas o valor inicial.
  const [status] = useState<ReportsStatus>("success");

  if (status !== "success") {
    return (
      <div className="mt-8">
        <DataState
          status={status}
          title={status === "empty" ? "Nenhum relatório disponível" : status === "error" ? "Não foi possível carregar os relatórios" : undefined}
          description={status === "empty" ? "Os relatórios aparecerão aqui quando houver dados suficientes." : undefined}
        />
      </div>
    );
  }

  const data = getReports(period);
  const totals = sumReportPoints(data.points);

  return (
    <div className="mt-8 space-y-6">
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-brand-dark">Período do relatório</legend>
        <div className="flex flex-wrap gap-2">
          {reportPeriods.map((option) => <button key={option.id} type="button" aria-pressed={period === option.id} onClick={() => setPeriod(option.id)} className={`min-h-11 rounded-lg border px-4 py-2 text-sm ${period === option.id ? "border-brand bg-brand-light font-semibold text-brand-dark underline decoration-2 underline-offset-4" : "border-outline bg-surface text-muted hover:bg-brand-light/50"}`}>{option.label}</button>)}
        </div>
      </fieldset>
      <p role="status" className="text-xs leading-5 text-muted">{data.range} · Cenário demonstrativo fixo de setembro de 2026</p>
      <section aria-label="Resumo do período">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {reportMetrics.map((metric) => (
            <div key={metric.id} className="min-w-0 rounded-2xl border border-outline bg-surface p-4 shadow-sm">
              <dt className="flex items-center gap-2 text-xs text-muted"><Icon name={metric.icon} className="size-4 shrink-0 text-brand" />{metric.label}</dt>
              <dd className="mt-3 text-2xl font-semibold tracking-tight text-brand-dark tabular-nums">{formatReportValue(totals[metric.id], metric.id)}{metric.id !== "savings" && <span className="ml-1 text-sm font-medium">{metric.unit}</span>}</dd>
            </div>
          ))}
        </dl>
      </section>
      <ReportComparison current={totals} previous={data.previous} previousLabel={data.previousLabel} />
      <section aria-labelledby="evolution-title" className="min-w-0 rounded-2xl border border-outline bg-surface p-5 shadow-sm">
        <h2 id="evolution-title" className="text-base font-semibold text-brand-dark">Evolução dos indicadores</h2>
        <p className="mt-1 text-sm leading-6 text-muted">{data.grouping} Cada gráfico usa sua própria escala, iniciada em zero.</p>
        {([{ title: "Consumo", ids: ["energy", "water"] }, { title: "Impacto", ids: ["carbon", "savings"] }] as const).map((group) => (
          <div key={group.title} className="mt-5">
            <h3 className="mb-3 text-sm font-semibold text-brand-dark">{group.title}</h3>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {reportMetrics.filter((metric) => group.ids.some((id) => id === metric.id)).map((metric) => <ReportChart key={metric.id} metric={metric.id} title={metric.label} unit={metric.unit} points={data.points} />)}
            </div>
          </div>
        ))}
      </section>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <section aria-labelledby="highlights-title" className="rounded-2xl border border-outline bg-surface p-5 shadow-sm xl:col-span-2">
          <h2 id="highlights-title" className="text-base font-semibold text-brand-dark">Destaques do período</h2>
          <ul className="mt-4 space-y-3">
            {data.highlights.map((highlight) => <li key={highlight} className="flex items-start gap-2 text-sm leading-6 text-muted"><Icon name="leaf" className="mt-1 size-4 shrink-0 text-brand" />{highlight}</li>)}
          </ul>
        </section>
        <section aria-label="Exportação demonstrativa" className="rounded-2xl border border-outline bg-surface p-5 shadow-sm">
          <p className="mb-4 text-sm leading-6 text-muted">Simule a exportação do resumo selecionado em PDF ou CSV.</p>
          <ExportReportDialog key={period} period={data.range} />
        </section>
      </div>
    </div>
  );
}
