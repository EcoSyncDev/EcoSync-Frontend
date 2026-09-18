import type { Metadata } from "next";
import { AuthInstitutional } from "@/components/auth/auth-institutional";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Cadastro | EcoSync",
  description: "Crie sua conta no EcoSync para acompanhar consumo, metas e impacto ambiental em um só lugar.",
};

export default function SignupPage() {
  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      <AuthInstitutional
        title={<>Comece hoje uma jornada <span className="text-brand">mais sustentável.</span></>}
        description="Crie sua conta para acompanhar consumo, metas e impacto ambiental em um só lugar."
      />
      <section aria-labelledby="signup-title" className="flex min-w-0 items-center justify-center px-4 py-8 sm:px-8 lg:px-12">
        <div className="w-full max-w-md rounded-3xl border border-outline bg-surface p-6 sm:px-10 sm:py-8">
          <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-brand">CRIE SUA CONTA</p>
          <h1 id="signup-title" className="text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl">Comece com o EcoSync</h1>
          <p className="mt-2 text-sm leading-6 text-muted">Crie sua conta e comece sua jornada.</p>
          <SignupForm />
        </div>
      </section>
    </main>
  );
}
