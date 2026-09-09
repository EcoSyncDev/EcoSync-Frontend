import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SettingsContent } from "@/components/settings/settings-content";

export const metadata: Metadata = {
  title: "Configurações | EcoSync",
  description: "Ajuste seu perfil, preferências e opções do EcoSync.",
};

export default function SettingsPage() {
  return (
    <DashboardShell title="Configurações">
      <section aria-labelledby="settings-title">
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand">PREFERÊNCIAS</p>
        <h1 id="settings-title" className="text-3xl font-semibold tracking-tight text-brand-dark sm:text-4xl">Configurações</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">Ajuste seu perfil, suas preferências e as opções do sistema para acompanhar sua jornada sustentável.</p>
        <SettingsContent />
      </section>
    </DashboardShell>
  );
}
