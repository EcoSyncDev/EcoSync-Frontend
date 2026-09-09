import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { GoalsContent } from "@/components/goals/goals-content";

export const metadata: Metadata = {
  title: "Metas | EcoSync",
  description: "Acompanhe seus objetivos de sustentabilidade e o progresso das suas metas.",
};

export default function GoalsPage() {
  return (
    <DashboardShell title="Metas">
      <section aria-labelledby="goals-page-title">
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand">OBJETIVOS</p>
        <h1 id="goals-page-title" className="text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">Metas</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">Acompanhe seus objetivos de sustentabilidade e cada avanço rumo às suas metas.</p>
        <GoalsContent />
      </section>
    </DashboardShell>
  );
}
