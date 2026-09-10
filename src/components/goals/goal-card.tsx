import { Icon } from "@/components/ui/icon";
import type { Goal } from "@/types/goals";

export function GoalCard({ goal }: { goal: Goal }) {
  const percentage = Math.min(100, Math.max(0, goal.progress));

  return (
    <article className={`min-w-0 rounded-2xl border border-outline bg-surface p-5 shadow-sm ${goal.completed ? "border-l-4 border-l-brand" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand"><Icon name={goal.icon} /></span>
          <div className="min-w-0">
            <h3 id={`goal-title-${goal.id}`} className="text-sm font-semibold leading-6 text-brand-dark">{goal.title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted">{goal.description}</p>
          </div>
        </div>
        <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand">{goal.completed && <span aria-hidden="true">✓ </span>}{goal.status}</span>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="text-muted">{goal.currentProgress}</p>
        <span className="font-semibold text-brand tabular-nums">{percentage}%</span>
      </div>
      <div role="progressbar" aria-labelledby={`goal-title-${goal.id}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage} className="mt-3 h-2 overflow-hidden rounded-full bg-track">
        <div className="h-full rounded-full bg-brand" style={{ width: `${percentage}%` }} />
      </div>
      <p className="mt-4 text-xs leading-5 text-muted">{goal.period}</p>
    </article>
  );
}
