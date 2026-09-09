import { DashboardShell } from "@/components/dashboard/dashboard-shell";

import { DashboardIndicators } from "@/components/dashboard/dashboard-indicators";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { DashboardActivity } from "@/components/dashboard/dashboard-activity";

export default function Home() {
  return (
    <DashboardShell>
      <section aria-labelledby="dashboard-title">
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand">VISÃO GERAL</p>
        <h1 id="dashboard-title" className="text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">Dashboard</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
          Acompanhe sua jornada sustentável e cada passo rumo a um futuro mais verde.
        </p>
        <DashboardIndicators />
        <DashboardOverview />
        <DashboardActivity />
      </section>
    </DashboardShell>
  );
}
