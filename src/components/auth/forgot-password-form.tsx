"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="recovery-email" className="mb-2 block text-sm font-medium">E-mail</label>
          <input id="recovery-email" name="email" type="email" autoComplete="email" required placeholder="voce@exemplo.com" onChange={() => setSubmitted(false)} className="min-h-12 w-full rounded-xl border bg-background px-4 text-base text-foreground placeholder:text-muted" />
        </div>
        <button type="submit" className="min-h-12 w-full cursor-pointer rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-hover">Enviar instruções</button>
        <p className="text-xs leading-5 text-muted">Esta é uma demonstração. Nenhum e-mail será enviado.</p>
        <p role="status" aria-live="polite" aria-atomic="true" className={submitted ? "rounded-xl border border-outline bg-brand-light p-3 text-sm leading-6 text-foreground" : "sr-only"}>
          {submitted ? "Se existir uma conta com este e-mail, enviaremos as instruções de recuperação." : ""}
        </p>
      </form>
      <p className="mt-4 border-t border-outline pt-4 text-center text-sm leading-7 text-muted">
        Lembrou sua senha?{" "}
        <Link href="/login" className="inline-block rounded-sm font-semibold text-brand underline-offset-4 hover:underline">Voltar para o login</Link>
      </p>
    </>
  );
}
