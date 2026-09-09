import { formatReportValue, reportComparison, reportMetrics, type ReportValues } from "@/data/reports";

export function ReportComparison({ current, previous, previousLabel }: { current: ReportValues; previous: ReportValues; previousLabel: string }) {
  return (
    <section aria-labelledby="comparison-title" className="rounded-2xl border border-outline bg-surface p-5 shadow-sm">
      <h2 id="comparison-title" className="text-base font-semibold text-brand-dark">Comparação de desempenho</h2>
      <p className="mt-1 text-sm leading-6 text-muted">Período anterior: {previousLabel}. Menor consumo e maior impacto positivo representam melhora.</p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {reportMetrics.map((metric) => {
          const comparison = reportComparison(current[metric.id], previous[metric.id], metric.lowerIsBetter);
          const percent = comparison.percent === null ? "Sem base percentual" : `${comparison.percent > 0 ? "+" : ""}${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(comparison.percent)}%`;
          return (
            <article key={metric.id} className="min-w-0 rounded-xl border border-outline p-4">
              <h3 className="text-sm font-medium text-brand-dark">{metric.label}</h3>
              <p className={`mt-3 text-xl font-semibold tabular-nums ${comparison.status === "Melhora" ? "text-brand" : "text-brand-dark"}`}>{percent}</p>
              <p className="mt-1 text-xs font-medium text-brand-dark">{comparison.status}</p>
              <dl className="mt-4 space-y-2 text-xs leading-5">
                <div><dt className="text-muted">Anterior</dt><dd className="text-brand-dark">{formatReportValue(previous[metric.id], metric.id)}{metric.id !== "savings" && ` ${metric.unit}`}</dd></div>
                <div><dt className="text-muted">Atual</dt><dd className="text-brand-dark">{formatReportValue(current[metric.id], metric.id)}{metric.id !== "savings" && ` ${metric.unit}`}</dd></div>
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}
