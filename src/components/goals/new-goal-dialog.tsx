"use client";

import { useRef, type FormEvent } from "react";

export function NewGoalDialog({ onDemoCreated }: { onDemoCreated: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const fieldClassName = "mt-2 min-h-11 w-full min-w-0 rounded-lg border border-outline bg-white px-3 py-2 text-sm text-brand-dark";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Demonstração: não envia dados, não persiste e não modifica a lista mockada.
    dialogRef.current?.close();
    onDemoCreated();
  }

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => dialogRef.current?.showModal()} className="min-h-11 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">Nova meta</button>
      <dialog ref={dialogRef} aria-labelledby="new-goal-title" aria-describedby="new-goal-description" onClose={() => { formRef.current?.reset(); triggerRef.current?.focus(); }} className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-outline bg-white p-5 text-foreground shadow-xl backdrop:bg-black/40 sm:p-6">
        <h2 id="new-goal-title" className="text-xl font-semibold text-brand-dark">Nova meta</h2>
        <p id="new-goal-description" className="mt-2 text-sm leading-6 text-muted">Formulário demonstrativo. Os dados não serão salvos nem adicionados à lista.</p>
        <form ref={formRef} onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="goal-type" className="text-sm font-medium text-brand-dark">Tipo da meta</label>
            <select id="goal-type" name="type" required defaultValue="energy" className={fieldClassName}>
              <option value="energy">Energia — redução em %</option>
              <option value="water">Água — economia em litros</option>
              <option value="carbon">CO₂ — emissões evitadas em kg</option>
            </select>
          </div>
          <div>
            <label htmlFor="goal-name" className="text-sm font-medium text-brand-dark">Título</label>
            <input id="goal-name" name="title" type="text" required maxLength={120} placeholder="Ex.: Economizar água" className={fieldClassName} />
          </div>
          <div>
            <label htmlFor="goal-value" className="text-sm font-medium text-brand-dark">Valor da meta</label>
            <input id="goal-value" name="value" type="number" required min="0.01" step="0.01" aria-describedby="goal-value-help" className={fieldClassName} />
            <p id="goal-value-help" className="mt-1 text-xs leading-5 text-muted">Use a unidade indicada no tipo da meta: %, litros ou kg.</p>
          </div>
          <div>
            <label htmlFor="goal-deadline" className="text-sm font-medium text-brand-dark">Prazo</label>
            <input id="goal-deadline" name="deadline" type="date" required className={fieldClassName} />
          </div>
          <div className="flex flex-wrap justify-end gap-3 border-t border-outline pt-4">
            <button type="button" onClick={() => dialogRef.current?.close()} className="min-h-11 rounded-lg border border-outline px-4 py-2 text-sm font-medium text-brand-dark hover:bg-brand-light">Cancelar</button>
            <button type="submit" className="min-h-11 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">Criar meta</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
