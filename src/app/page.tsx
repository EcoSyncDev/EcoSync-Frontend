import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function Home() {
  return (
    <DashboardShell>
      <section aria-labelledby="dashboard-title">
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand">VISÃO GERAL</p>
        <h1 id="dashboard-title" className="text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">Dashboard</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
          Acompanhe sua jornada sustentável e cada passo rumo a um futuro mais verde.
        </p>
        <section aria-label="Conteúdo futuro do dashboard" className="mt-8 flex min-h-80 items-center justify-center rounded-2xl border border-dashed border-outline bg-white/60 px-6 py-16 text-center lg:min-h-[440px]">
          <div className="max-w-sm">
            <p className="text-sm font-medium text-brand-dark">Seu panorama sustentável começa aqui</p>
            <p className="mt-2 text-sm leading-6 text-muted">Em breve, este espaço reunirá o acompanhamento da sua jornada.</p>
          </div>
        </section>
      </section>
    </DashboardShell>
  );
}
