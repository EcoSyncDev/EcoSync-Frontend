import type { ConsumptionPoint } from "@/services/monitoring-service";

type ConsumptionChartProps = {
  title: string;
  unit: string;
  metric: "energy" | "water";
  points: readonly ConsumptionPoint[];
  grouping: string;
};

export function ConsumptionChart({ title, unit, metric, points, grouping }: ConsumptionChartProps) {
  const maximum = Math.max(1, ...points.map((point) => point[metric]));
  const number = new Intl.NumberFormat("pt-BR");

  return (
    <figure className="min-w-0 rounded-xl border border-outline p-4">
      <figcaption>
        <h3 className="text-sm font-semibold text-brand-dark">{title} <span className="font-normal text-muted">({unit})</span></h3>
        <p className="mt-1 text-xs leading-5 text-muted">{grouping}</p>
      </figcaption>
      <ul aria-label={`${title} em ${unit}`} className="mt-5 grid h-56 min-w-0 gap-1 sm:gap-3" style={{ gridTemplateColumns: `repeat(${points.length}, minmax(0, 1fr))` }}>
        {points.map((point) => (
          <li key={point.label} aria-label={`${point.label}: ${number.format(point[metric])} ${unit}`} className="grid min-w-0 grid-rows-[1fr_2rem]">
            <div aria-hidden="true" className="flex items-end justify-center border-b border-outline">
              <div className={`relative w-full max-w-12 rounded-t-md ${metric === "energy" ? "bg-brand" : "bg-brand/70"}`} style={{ height: `${(point[metric] / maximum) * 82}%` }}>
                <span className="absolute inset-x-0 -top-6 text-center text-[10px] font-medium text-brand-dark tabular-nums sm:text-xs">{number.format(point[metric])}</span>
              </div>
            </div>
            <span aria-hidden="true" className="pt-3 text-center text-[10px] text-muted sm:text-xs">{point.label}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
