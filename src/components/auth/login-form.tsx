"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { readLoginCredentials } from "@/lib/auth-form";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasError(false);
    try {
      const credentials = readLoginCredentials(new FormData(event.currentTarget));
      const user = login(credentials);
      if (user) router.push("/");
    } catch {
      setHasError(true);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} onChange={() => setHasError(false)} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">E-mail</label>
          <input id="email" name="email" type="email" autoComplete="username" required placeholder="voce@exemplo.com" className="min-h-12 w-full rounded-xl border bg-background px-4 text-base text-foreground placeholder:text-muted" />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium">Senha</label>
          <div className="relative">
            <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required placeholder="Digite sua senha" className="min-h-12 w-full rounded-xl border bg-background pr-14 pl-4 text-base text-foreground placeholder:text-muted" />
            <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"} aria-controls="password" className="absolute inset-y-1 right-1 flex w-11 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-brand-light hover:text-brand">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true" focusable="false">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                <circle cx="12" cy="12" r="3" />
                {showPassword && <path d="m3 3 18 18" />}
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
          <label htmlFor="remember" className="flex min-h-11 cursor-pointer items-center gap-2">
            <input id="remember" name="remember" type="checkbox" className="size-4 shrink-0 accent-brand" />
            Lembrar de mim
          </label>
          <Link href="/esqueci-senha" className="inline-flex min-h-11 items-center rounded-sm font-medium text-brand underline-offset-4 hover:underline">Esqueci minha senha</Link>
        </div>

        <button type="submit" className="min-h-12 w-full cursor-pointer rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-hover">Entrar</button>
        <p role="alert" aria-atomic="true" className={hasError ? "rounded-xl border border-outline bg-brand-light p-3 text-sm leading-6 text-foreground" : "sr-only"}>
          {hasError ? "Não foi possível entrar. Tente novamente." : ""}
        </p>
      </form>

      <div className="my-5 flex items-center gap-4 text-xs text-muted">
        <span aria-hidden="true" className="h-px flex-1 bg-outline" />
        <span>ou</span>
        <span aria-hidden="true" className="h-px flex-1 bg-outline" />
      </div>
      <p className="text-center text-sm leading-7 text-muted">
        Ainda não tem uma conta?{" "}
        <Link href="/cadastro" className="inline-block rounded-sm font-semibold text-brand underline-offset-4 hover:underline">Criar conta</Link>
      </p>
      <p id="recuperacao-senha" tabIndex={-1} className="mt-5 hidden rounded-xl border border-outline bg-background p-3 text-sm leading-6 text-muted target:block">
        A recuperação de senha estará disponível quando a autenticação for implementada.
      </p>
    </>
  );
}
