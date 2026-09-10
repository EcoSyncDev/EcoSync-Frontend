"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

const profiles = ["Residência", "Empresa", "Escola", "Outro"];
const goals = [
  "Reduzir consumo de energia",
  "Economizar água",
  "Diminuir impacto ambiental",
  "Acompanhar metas sustentáveis",
];
const optionClassName = "flex min-h-12 min-w-0 cursor-pointer items-center gap-3 rounded-xl border border-outline bg-background p-3 text-sm leading-6 transition-colors hover:border-brand has-checked:border-brand has-checked:bg-brand-light has-checked:font-medium";

export function OnboardingForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-6">
      <div>
        <label htmlFor="space-name" className="mb-2 block text-sm font-medium">Nome do negócio ou residência</label>
        <input id="space-name" name="spaceName" type="text" required pattern=".*\S.*" title="Informe um nome com pelo menos um caractere diferente de espaço." placeholder="Ex.: EcoTech, Minha Casa..." className="min-h-12 w-full rounded-xl border bg-background px-4 text-base text-foreground placeholder:text-muted" />
      </div>

      <fieldset className="min-w-0">
        <legend className="mb-3 text-sm font-medium">Tipo de perfil</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {profiles.map((profile, index) => (
            <label key={profile} htmlFor={`profile-${index}`} className={optionClassName}>
              <input id={`profile-${index}`} name="profile" type="radio" value={profile} required className="size-4 shrink-0 accent-brand" />
              <span>{profile}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className="mb-3 text-sm font-medium">Objetivo principal</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {goals.map((goal, index) => (
            <label key={goal} htmlFor={`goal-${index}`} className={optionClassName}>
              <input id={`goal-${index}`} name="goal" type="radio" value={goal} required className="size-4 shrink-0 accent-brand" />
              <span>{goal}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-3">
        <button type="submit" className="min-h-12 w-full cursor-pointer rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-hover">Continuar para o dashboard</button>
        <div className="text-center">
          <Link href="/" className="inline-flex min-h-11 items-center rounded-sm text-sm text-muted underline-offset-4 hover:underline">Pular por enquanto</Link>
        </div>
      </div>
    </form>
  );
}
