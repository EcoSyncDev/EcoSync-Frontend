import type { Metadata } from "next";
import { AuthInstitutional } from "@/components/auth/auth-institutional";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Recuperar senha | EcoSync",
  description: "Recupere o acesso à sua conta EcoSync e continue sua jornada sustentável.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      <AuthInstitutional
        title={<>Volte ao controle da sua <span className="text-brand">jornada sustentável.</span></>}
        description="Informe seu e-mail e enviaremos as instruções para você redefinir sua senha."
      />
      <section aria-labelledby="forgot-password-title" className="flex min-w-0 items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:p-12">
        <div className="w-full max-w-md rounded-3xl border border-outline bg-surface p-6 sm:px-10 sm:py-8">
          <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-brand">RECUPERE SUA SENHA</p>
          <h1 id="forgot-password-title" className="text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl">Esqueceu sua senha?</h1>
          <p className="mt-2 text-sm leading-6 text-muted">Digite o e-mail associado à sua conta.</p>
          <ForgotPasswordForm />
        </div>
      </section>
    </main>
  );
}
