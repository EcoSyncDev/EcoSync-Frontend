import { Icon } from "@/components/ui/icon";
import type { EnvironmentalImpact } from "@/types/dashboard";

export function EnvironmentalImpactCard({ progress, label, carbonAvoided, waterSaved, comparison }: EnvironmentalImpact) {
  const percentage = Math.min(100, Math.max(0, progress));

  return (
    <section aria-labelledby="impact-title" className="min-w-0 rounded-2xl border border-outline bg-surface p-5 shadow-sm">
      <h2 id="impact-title" className="text-base font-semibold text-brand-dark">Impacto</h2>
      <p className="mt-1 text-sm text-muted">Mês atual · Dados demonstrativos</p>
      <div role="img" aria-label={`${label}: ${percentage}%`} className="relative mx-auto mt-5 size-36">
        <svg aria-hidden="true" viewBox="0 0 120 120" className="size-full -rotate-90" fill="none" strokeWidth="9">
          <circle cx="60" cy="60" r="51" className="stroke-track" />
          <circle cx="60" cy="60" r="51" pathLength="100" strokeDasharray={`${percentage} 100`} strokeLinecap="round" className="stroke-brand" />
        </svg>
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-3xl font-semibold tracking-tight text-brand-dark tabular-nums">{percentage}%</span>
      </div>
      <p className="mt-3 text-center text-sm font-medium text-brand-dark">{label}</p>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <dt className="flex items-center gap-2 text-muted"><Icon name="leaf" className="size-4 text-brand" />CO₂ evitado</dt>
          <dd className="font-semibold text-brand-dark tabular-nums">{carbonAvoided}</dd>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <dt className="flex items-center gap-2 text-muted"><Icon name="water" className="size-4 text-brand" />Água economizada</dt>
          <dd className="font-semibold text-brand-dark tabular-nums">{waterSaved}</dd>
        </div>
      </dl>
      <p className="mt-5 flex items-start gap-2 border-t border-outline pt-4 text-xs font-medium leading-5 text-brand">
        <Icon name="trendUp" className="mt-0.5 size-4 shrink-0" />
        {comparison}
      </p>
    </section>
  );
}
