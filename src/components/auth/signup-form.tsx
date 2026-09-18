"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { readSignupData } from "@/lib/auth-form";

const inputClassName = "min-h-11 w-full rounded-xl border bg-background px-4 text-base text-foreground placeholder:text-muted";

export function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();
  const [showPasswords, setShowPasswords] = useState(false);
  const [feedback, setFeedback] = useState<"mismatch" | "error" | null>(null);
  const confirmationRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    try {
      const data = readSignupData(new FormData(event.currentTarget));
      if (!data) {
        setFeedback("mismatch");
        confirmationRef.current?.focus();
        return;
      }
      const user = signup(data);
      if (user) router.push("/onboarding");
    } catch {
      setFeedback("error");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} onChange={() => setFeedback(null)} className="mt-6 space-y-3">
        <div>
          <label htmlFor="signup-name" className="mb-2 block text-sm font-medium">Nome</label>
          <input id="signup-name" name="name" type="text" autoComplete="name" required placeholder="Seu nome" className={inputClassName} />
        </div>
        <div>
          <label htmlFor="signup-email" className="mb-2 block text-sm font-medium">E-mail</label>
          <input id="signup-email" name="email" type="email" autoComplete="email" required placeholder="voce@exemplo.com" className={inputClassName} />
        </div>
        <div>
          <label htmlFor="signup-password" className="mb-2 block text-sm font-medium">Senha</label>
          <div className="relative">
            <input id="signup-password" name="password" type={showPasswords ? "text" : "password"} autoComplete="new-password" required minLength={8} aria-describedby="password-hint" placeholder="Crie uma senha" className={`${inputClassName} pr-14`} />
            <button type="button" onClick={() => setShowPasswords((visible) => !visible)} aria-label={showPasswords ? "Ocultar senha e confirmação de senha" : "Mostrar senha e confirmação de senha"} aria-controls="signup-password signup-confirm-password" className="absolute inset-y-0 right-1 flex w-11 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-brand-light hover:text-brand">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true" focusable="false">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                <circle cx="12" cy="12" r="3" />
                {showPasswords && <path d="m3 3 18 18" />}
              </svg>
            </button>
          </div>
          <p id="password-hint" className="mt-2 text-xs leading-5 text-muted">Use pelo menos 8 caracteres.</p>
        </div>
        <div>
          <label htmlFor="signup-confirm-password" className="mb-2 block text-sm font-medium">Confirmar senha</label>
          <input ref={confirmationRef} id="signup-confirm-password" name="confirmPassword" type={showPasswords ? "text" : "password"} autoComplete="new-password" required minLength={8} aria-invalid={feedback === "mismatch" || undefined} aria-describedby={feedback === "mismatch" ? "signup-error" : undefined} placeholder="Repita sua senha" className={inputClassName} />
        </div>
        <p id="signup-error" role="alert" aria-atomic="true" className={feedback ? "rounded-xl border border-outline bg-background p-3 text-sm leading-6 text-foreground" : "sr-only"}>
          {feedback === "mismatch" ? "As senhas não coincidem. Confira a confirmação de senha." : feedback === "error" ? "Não foi possível criar sua conta. Tente novamente." : ""}
        </p>
        <button type="submit" className="min-h-12 w-full cursor-pointer rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-hover">Criar conta</button>
        <p className="text-center text-[0.6875rem] leading-4 text-muted">Ao criar uma conta, você concorda com os Termos de Uso e a Política de Privacidade.</p>
      </form>
      <p className="mt-4 border-t border-outline pt-4 text-center text-sm leading-7 text-muted">
        Já tem uma conta?{" "}
        <Link href="/login" className="inline-block rounded-sm font-semibold text-brand underline-offset-4 hover:underline">Entrar</Link>
      </p>
    </>
  );
}
