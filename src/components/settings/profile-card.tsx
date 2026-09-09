"use client";

import { useRef, useState, type FormEvent } from "react";
import type { DemoProfile } from "@/data/settings";

const fields = [
  { key: "name", label: "Nome", type: "text", autocomplete: "name" },
  { key: "email", label: "E-mail", type: "email", autocomplete: "email" },
  { key: "organization", label: "Organização", type: "text", autocomplete: "organization" },
] as const;

export function ProfileCard({ profile, onSave }: { profile: DemoProfile; onSave: (profile: DemoProfile) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [draft, setDraft] = useState(profile);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextProfile = { name: draft.name.trim(), email: draft.email.trim(), organization: draft.organization.trim() };
    if (!nextProfile.name || !nextProfile.email || !nextProfile.organization) {
      setError("Preencha todos os campos com um valor válido.");
      return;
    }
    // Altera apenas o estado da página; não persiste nem atualiza o perfil global.
    onSave(nextProfile);
    dialogRef.current?.close();
    setFeedback("Perfil atualizado nesta demonstração. As alterações serão descartadas ao sair ou recarregar.");
  }

  return (
    <section aria-labelledby="profile-title" className="min-w-0 rounded-2xl border border-outline bg-white p-5 shadow-sm">
      <h2 id="profile-title" className="text-base font-semibold text-brand-dark">Perfil</h2>
      <dl className="mt-5 space-y-4 text-sm">
        {fields.map((field) => <div key={field.key}><dt className="text-xs text-muted">{field.label}</dt><dd className="mt-1 break-words font-medium text-brand-dark">{profile[field.key]}</dd></div>)}
        <div><dt className="text-xs text-muted">Tipo de perfil</dt><dd className="mt-1 font-medium text-brand-dark">Demonstrativo</dd></div>
      </dl>
      <button ref={triggerRef} type="button" onClick={() => { setDraft({ ...profile }); setError(""); setFeedback(""); dialogRef.current?.showModal(); }} className="mt-5 min-h-11 rounded-lg border border-outline px-4 py-2 text-sm font-medium text-brand-dark hover:bg-brand-light">Editar perfil</button>
      <p role="status" className="mt-2 text-sm leading-6 text-brand">{feedback}</p>
      <dialog ref={dialogRef} aria-labelledby="edit-profile-title" aria-describedby="edit-profile-description" onClose={() => triggerRef.current?.focus()} className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-outline bg-white p-6 text-foreground shadow-xl backdrop:bg-black/40">
        <h2 id="edit-profile-title" className="text-xl font-semibold text-brand-dark">Editar perfil</h2>
        <p id="edit-profile-description" className="mt-2 text-sm leading-6 text-muted">As alterações ficam apenas nesta página durante a demonstração.</p>
        <form onSubmit={saveProfile} className="mt-5 space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label htmlFor={`profile-${field.key}`} className="text-sm font-medium text-brand-dark">{field.label}</label>
              <input id={`profile-${field.key}`} name={field.key} type={field.type} autoComplete={field.autocomplete} required maxLength={field.key === "email" ? 254 : 120} value={draft[field.key]} onChange={(event) => { setDraft({ ...draft, [field.key]: event.target.value }); setError(""); }} className="mt-2 min-h-11 w-full min-w-0 rounded-lg border border-outline bg-white px-3 py-2 text-sm text-brand-dark" />
            </div>
          ))}
          <p role="alert" className="text-sm text-brand-dark">{error}</p>
          <div className="flex flex-wrap justify-end gap-3 border-t border-outline pt-4">
            <button type="button" onClick={() => dialogRef.current?.close()} className="min-h-11 rounded-lg border border-outline px-4 py-2 text-sm font-medium text-brand-dark hover:bg-brand-light">Cancelar</button>
            <button type="submit" className="min-h-11 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">Salvar perfil</button>
          </div>
        </form>
      </dialog>
    </section>
  );
}
