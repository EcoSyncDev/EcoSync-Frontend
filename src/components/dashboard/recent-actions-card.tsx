import { Icon } from "@/components/ui/icon";
import type { RecentAction } from "@/services/dashboard-service";

export function RecentActionsCard({ actions }: { actions: readonly RecentAction[] }) {
  return (
    <section aria-labelledby="recent-actions-title" className="min-w-0 rounded-2xl border border-outline bg-surface p-5 shadow-sm">
      <h2 id="recent-actions-title" className="text-base font-semibold text-brand-dark">Ações recentes</h2>
      <p className="mt-1 text-sm text-muted">Últimas atividades · Dados demonstrativos</p>
      <ul className="mt-5 divide-y divide-outline">
        {actions.map((action) => (
          <li key={action.id} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-light text-brand">
              <Icon name={action.icon} className="size-4" />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-medium leading-5 text-brand-dark">{action.title}</h3>
              <p className="mt-1 text-xs leading-5 text-muted">{action.category}</p>
              <p className="mt-1 text-xs leading-5 text-muted">{action.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
