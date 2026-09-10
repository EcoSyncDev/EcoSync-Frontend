import type { SustainableGoal } from "@/services/dashboard-service";

export function SustainableGoalsCard({ goals }: { goals: readonly SustainableGoal[] }) {
  return (
    <section aria-labelledby="goals-title" className="min-w-0 rounded-2xl border border-outline bg-surface p-5 shadow-sm xl:col-span-2">
      <h2 id="goals-title" className="text-base font-semibold text-brand-dark">Metas sustentáveis</h2>
      <p className="mt-1 text-sm text-muted">Mês atual · Dados demonstrativos</p>
      <ul className="mt-5 divide-y divide-outline">
        {goals.map((goal) => {
          const percentage = Math.min(100, Math.max(0, goal.progress));

          return (
            <li key={goal.id} className="py-5 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 id={`goal-${goal.id}`} className="text-sm font-medium text-brand-dark">{goal.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{goal.description}</p>
                </div>
                <span className="rounded-full bg-brand-light px-2.5 py-1 text-xs font-medium text-brand">{goal.status}</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div
                  role="progressbar"
                  aria-labelledby={`goal-${goal.id}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={percentage}
                  className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-track"
                >
                  <div className="h-full rounded-full bg-brand" style={{ width: `${percentage}%` }} />
                </div>
                <span className="w-9 shrink-0 text-right text-sm font-semibold text-brand tabular-nums">{percentage}%</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
