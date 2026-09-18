import type { EnergyConsumptionPoint } from "@/types/dashboard";

type EnergyConsumptionCardProps = {
  data: readonly EnergyConsumptionPoint[];
};

export function EnergyConsumptionCard({ data }: EnergyConsumptionCardProps) {
  const scaleMax = Math.max(10, Math.ceil(Math.max(...data.map(({ kwh }) => kwh)) / 10) * 10);

  return (
    <section aria-labelledby="energy-title" className="min-w-0 rounded-2xl border border-outline bg-surface p-5 shadow-sm xl:col-span-2">
      <h2 id="energy-title" className="text-base font-semibold text-brand-dark">Consumo de energia</h2>
      <p className="mt-1 text-sm text-muted">Últimos 7 dias</p>
      <figure className="mt-6">
        <figcaption className="mb-3 text-xs text-muted">Consumo diário em kWh · Dados demonstrativos</figcaption>
        <div className="flex gap-3">
          <div aria-hidden="true" className="mb-8 flex w-5 shrink-0 flex-col justify-between text-right text-xs text-muted tabular-nums">
            <span>{scaleMax}</span>
            <span>{scaleMax / 2}</span>
            <span>0</span>
          </div>
          <ul aria-label="Consumo de energia por dia" className="grid h-64 min-w-0 flex-1 gap-2 sm:gap-4" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
            {data.map(({ day, kwh }) => (
              <li key={day} aria-label={`${day}: ${kwh} kWh`} className="grid min-w-0 grid-rows-[1fr_2rem]">
                <div aria-hidden="true" className="flex items-end justify-center border-b border-outline bg-linear-to-t from-track/40 to-transparent">
                  <div className="relative w-full max-w-12 rounded-t-md bg-brand" style={{ height: `${(kwh / scaleMax) * 100}%` }}>
                    <span className="absolute inset-x-0 top-2 text-center text-xs font-semibold text-on-brand tabular-nums">{kwh}</span>
                  </div>
                </div>
                <span aria-hidden="true" className="pt-3 text-center text-xs text-muted">{day}</span>
              </li>
            ))}
          </ul>
        </div>
      </figure>
    </section>
  );
}
