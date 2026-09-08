import type { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Icon } from "@/components/ui/icon";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-brand-dark">
        Pular para o conteúdo
      </a>
      <Sidebar />
      <div className="min-w-0 lg:ml-64">
        <header className="flex min-h-20 flex-wrap items-center justify-between gap-3 border-b border-outline bg-white px-6 py-4 sm:px-10">
          <span className="text-sm font-medium text-muted">Meu espaço <span className="mx-2 text-outline" aria-hidden="true">/</span> <span className="text-brand-dark">Dashboard</span></span>
          <span className="flex items-center gap-2 text-xs font-medium text-brand">
            <Icon name="leaf" className="size-4" />
            Por um futuro mais verde
          </span>
        </header>
        <main id="main-content" tabIndex={-1} className="mx-auto max-w-7xl px-6 py-8 sm:px-10 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
