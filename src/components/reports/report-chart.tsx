import { formatReportValue, type ReportMetric, type ReportPoint } from "@/services/reports-service";

export function ReportChart({ metric, title, unit, points }: { metric: ReportMetric; title: string; unit: string; points: readonly ReportPoint[] }) {
  const maximum = Math.max(1, ...points.map((point) => point[metric]));

  return (
    <figure className="min-w-0 rounded-xl border border-outline p-4">
      <figcaption className="mb-4 text-sm font-medium text-brand-dark">{title} <span className="text-xs font-normal text-muted">({unit})</span></figcaption>
      <ul aria-label={`${title}: valores por intervalo`} className="space-y-3">
        {points.map((point) => (
          <li key={point.label} className="text-xs">
            <div className="mb-1.5 flex flex-wrap justify-between gap-2">
              <span className="text-muted">{point.label}</span>
              <span className="font-medium text-brand-dark tabular-nums">{formatReportValue(point[metric], metric)}{metric !== "savings" && ` ${unit}`}</span>
            </div>
            <div aria-hidden="true" className="h-2 rounded-full bg-track">
              <div className="h-full rounded-full bg-brand" style={{ width: `${(point[metric] / maximum) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}
