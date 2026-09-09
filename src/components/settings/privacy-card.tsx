"use client";

import { useRef } from "react";
import { privacyDetails } from "@/data/settings";

export function PrivacyCard() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <section aria-labelledby="privacy-title" className="min-w-0 rounded-2xl border border-outline bg-white p-5 shadow-sm">
      <h2 id="privacy-title" className="text-base font-semibold text-brand-dark">Dados e privacidade</h2>
      <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {privacyDetails.map((item) => <div key={item.label}><dt className="text-xs text-muted">{item.label}</dt><dd className="mt-1 text-sm leading-6 text-brand-dark">{item.value}</dd></div>)}
      </dl>
      <button ref={triggerRef} type="button" onClick={() => dialogRef.current?.showModal()} className="mt-5 min-h-11 rounded-lg border border-outline px-4 py-2 text-sm font-medium text-brand-dark hover:bg-brand-light">Gerenciar dados</button>
      <dialog ref={dialogRef} aria-labelledby="manage-data-title" aria-describedby="manage-data-description" onClose={() => triggerRef.current?.focus()} className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-outline bg-white p-6 text-foreground shadow-xl backdrop:bg-black/40">
        <h2 id="manage-data-title" className="text-xl font-semibold text-brand-dark">Gerenciar dados</h2>
        <p id="manage-data-description" className="mt-3 text-sm leading-6 text-muted">A integração com backend será adicionada futuramente. Esta demonstração utiliza apenas dados fictícios e não realiza sincronização, exclusão ou conexão com serviços externos.</p>
        <button type="button" onClick={() => dialogRef.current?.close()} className="mt-5 min-h-11 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">Fechar</button>
      </dialog>
    </section>
  );
}
