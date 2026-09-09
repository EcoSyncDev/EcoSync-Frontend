"use client";

import { useState } from "react";
import { GoalCard } from "@/components/goals/goal-card";
import { NewGoalDialog } from "@/components/goals/new-goal-dialog";
import { filterGoals, goalFilters, goalsSummary, type GoalFilter } from "@/data/goals";

export function GoalsContent() {
  const [filter, setFilter] = useState<GoalFilter>("all");
  const [feedback, setFeedback] = useState("");
  const visibleGoals = filterGoals(filter);
  const summary = [
    { label: "Metas ativas", value: goalsSummary.active },
    { label: "Metas concluídas", value: goalsSummary.completed },
    { label: "Progresso médio das ativas", value: `${goalsSummary.average}%` },
    { label: "Melhor desempenho das ativas", value: goalsSummary.best },
  ];

  return (
    <div className="mt-8 space-y-6">
      <section aria-label="Resumo das metas">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summary.map((item) => (
            <div key={item.label} className="min-w-0 rounded-2xl border border-outline bg-surface p-4 shadow-sm">
              <dt className="text-xs leading-5 text-muted">{item.label}</dt>
              <dd className="mt-2 text-2xl font-semibold text-brand-dark tabular-nums">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section aria-labelledby="my-goals-title">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 id="my-goals-title" className="text-base font-semibold text-brand-dark">Minhas metas</h2>
            <p className="mt-1 text-sm text-muted">Objetivos e prazos demonstrativos</p>
          </div>
          <NewGoalDialog onDemoCreated={() => setFeedback("Simulação concluída. Nenhuma meta foi salva; a lista demonstrativa permanece igual.")} />
        </div>
        <p role="status" className="mt-3 text-sm leading-6 text-brand">{feedback}</p>
        <fieldset className="mt-4">
          <legend className="mb-3 text-sm font-medium text-brand-dark">Filtrar por status</legend>
          <div className="flex flex-wrap gap-2">
            {goalFilters.map((option) => (
              <button key={option.id} type="button" aria-pressed={filter === option.id} onClick={() => setFilter(option.id)} className={`min-h-11 rounded-lg border px-4 py-2 text-sm ${filter === option.id ? "border-brand bg-brand-light font-semibold text-brand-dark underline decoration-2 underline-offset-4" : "border-outline bg-surface text-muted hover:bg-brand-light/50"}`}>{option.label}</button>
            ))}
          </div>
        </fieldset>
        <p role="status" className="mt-4 text-xs text-muted">{visibleGoals.length} {visibleGoals.length === 1 ? "meta exibida" : "metas exibidas"}</p>
        <ul className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
          {visibleGoals.map((goal) => <li key={goal.id} className="min-w-0"><GoalCard goal={goal} /></li>)}
        </ul>
      </section>
    </div>
  );
}
