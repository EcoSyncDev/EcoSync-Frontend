"use client";

import { useRef, useState } from "react";

export function ExportReportDialog({ period }: { period: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [feedback, setFeedback] = useState("");

  function simulateExport(format: "PDF" | "CSV") {
    // Apenas feedback local: não gera arquivos, não baixa dados e não chama APIs.
    setFeedback(`${format} · ${period}: Exportação demonstrativa — integração será adicionada futuramente.`);
    dialogRef.current?.close();
  }

  return (
    <div>
      <button ref={triggerRef} type="button" onClick={() => { setFeedback(""); dialogRef.current?.showModal(); }} className="min-h-11 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">Exportar relatório</button>
      <p role="status" className="mt-2 text-sm leading-6 text-brand">{feedback}</p>
      <dialog ref={dialogRef} aria-labelledby="export-title" aria-describedby="export-description" onClose={() => triggerRef.current?.focus()} className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-outline bg-white p-6 text-foreground shadow-xl backdrop:bg-black/40">
        <h2 id="export-title" className="text-xl font-semibold text-brand-dark">Exportar relatório</h2>
        <p id="export-description" className="mt-2 text-sm leading-6 text-muted">{period}. Escolha um formato para simular a exportação. Nenhum arquivo será gerado.</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {(["PDF", "CSV"] as const).map((format) => <button key={format} type="button" onClick={() => simulateExport(format)} className="min-h-11 rounded-lg border border-outline px-4 py-3 text-sm font-semibold text-brand-dark hover:bg-brand-light">{format}</button>)}
        </div>
        <button type="button" onClick={() => dialogRef.current?.close()} className="mt-4 min-h-11 rounded-lg border border-outline px-4 py-2 text-sm font-medium text-brand-dark hover:bg-brand-light">Cancelar</button>
      </dialog>
    </div>
  );
}
