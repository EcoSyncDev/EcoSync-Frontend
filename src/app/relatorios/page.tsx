import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ReportsContent } from "@/components/reports/reports-content";

export const metadata: Metadata = {
  title: "Relatórios | EcoSync",
  description: "Visualize resumos, comparações e a evolução dos seus indicadores sustentáveis.",
};

export default function ReportsPage() {
  return (
    <DashboardShell title="Relatórios">
      <section aria-labelledby="reports-title">
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand">ANÁLISES</p>
        <h1 id="reports-title" className="text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">Relatórios</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">Visualize resumos, compare períodos e acompanhe a evolução dos seus indicadores sustentáveis.</p>
        <ReportsContent />
      </section>
    </DashboardShell>
  );
}
