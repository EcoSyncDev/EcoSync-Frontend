"use client";

import type { DataStatus } from "@/types/ui";

type DataStateProps = {
  title?: string;
  description?: string;
} & (
  | { status: Exclude<DataStatus, "success" | "error">; onRetry?: never }
  | { status: "error"; onRetry?: () => void }
);

const messages = {
  loading: {
    title: "Carregando dados",
    description: "Aguarde enquanto as informações são carregadas.",
  },
  empty: {
    title: "Nenhum dado disponível",
    description: "Assim que houver informações de consumo, elas aparecerão aqui.",
  },
  error: {
    title: "Não foi possível carregar os dados",
    description: "Tente novamente em alguns instantes.",
  },
};

export function DataState({ status, title, description, onRetry }: DataStateProps) {
  return (
    <div className="rounded-2xl border border-outline bg-surface p-5 shadow-sm">
      <div role={status === "error" ? "alert" : "status"} aria-atomic="true">
        <h2 className="text-base font-semibold text-brand-dark">{title ?? messages[status].title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted">{description ?? messages[status].description}</p>
      </div>
      {status === "loading" && (
        <div role="group" aria-busy="true" aria-label="Dados em carregamento" className="mt-5">
          <div aria-hidden="true" className="grid grid-cols-1 gap-4 motion-safe:animate-pulse md:grid-cols-2">
            {[0, 1].map((item) => (
              <div key={item} className="space-y-3 rounded-xl border border-outline p-4">
                <div className="h-3 w-1/3 rounded bg-outline" />
                <div className="h-7 w-1/2 rounded bg-outline" />
                <div className="h-3 w-3/4 rounded bg-outline" />
              </div>
            ))}
          </div>
        </div>
      )}
      {status === "error" && onRetry && (
        <button type="button" onClick={onRetry} className="mt-4 min-h-11 cursor-pointer rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
          Tentar novamente
        </button>
      )}
    </div>
  );
}
