import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import { AuthInstitutional } from "@/components/auth/auth-institutional";

export const metadata: Metadata = {
  title: "Login | EcoSync",
  description: "Entre no EcoSync para acompanhar seu consumo, suas metas e seu impacto ambiental.",
};

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      <AuthInstitutional
        title={<>Transforme dados em decisões <span className="text-brand">mais sustentáveis.</span></>}
        description="Acompanhe seu consumo, alcance suas metas e entenda seu impacto ambiental. Um passo de cada vez, rumo a um futuro mais verde."
      />

      <section aria-labelledby="login-title" className="flex min-w-0 items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:p-12">
        <div className="w-full max-w-md rounded-3xl border border-outline bg-surface p-6 sm:px-10 sm:py-8">
          <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-brand">ACESSE SUA CONTA</p>
          <h1 id="login-title" className="text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl">Bem-vindo de volta</h1>
          <p className="mt-2 text-sm leading-6 text-muted">Entre para continuar sua jornada sustentável.</p>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
