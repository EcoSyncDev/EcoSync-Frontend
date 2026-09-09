import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { MonitoringContent } from "@/components/monitoring/monitoring-content";

export const metadata: Metadata = {
  title: "Monitoramento | EcoSync",
  description: "Acompanhe o consumo de energia, água e indicadores ambientais ao longo do tempo.",
};

export default function MonitoringPage() {
  return (
    <DashboardShell title="Monitoramento">
      <section aria-labelledby="monitoring-title">
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand">ACOMPANHAMENTO</p>
        <h1 id="monitoring-title" className="text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">Monitoramento</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">Acompanhe seu consumo de energia e água e a evolução dos seus indicadores ambientais ao longo do tempo.</p>
        <MonitoringContent />
      </section>
    </DashboardShell>
  );
}
