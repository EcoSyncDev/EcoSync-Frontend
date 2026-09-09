import { IndicatorCard } from "@/components/dashboard/indicator-card";
import { dashboardIndicators } from "@/data/dashboard-indicators";

export function DashboardIndicators() {
  return (
    <section aria-labelledby="indicators-title" className="mt-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 id="indicators-title" className="text-base font-semibold text-brand-dark">Indicadores do período</h2>
        <p className="text-xs text-muted">Mês atual · Dados demonstrativos</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardIndicators.map((indicator) => (
          <IndicatorCard key={indicator.id} {...indicator} />
        ))}
      </div>
    </section>
  );
}
