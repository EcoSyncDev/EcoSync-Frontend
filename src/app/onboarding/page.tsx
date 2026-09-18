import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";

export const metadata: Metadata = {
  title: "Primeiros passos | EcoSync",
  description: "Conte como pretende usar o EcoSync e escolha seu principal objetivo sustentável.",
};

export default function OnboardingPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4 py-8 sm:px-8">
      <section aria-labelledby="onboarding-title" className="w-full min-w-0 max-w-2xl rounded-3xl border border-outline bg-surface p-6 sm:p-10">
        <Link href="/" aria-label="EcoSync — início" className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-lg">
          <Image src="/logo-ecosync.png" alt="" width={48} height={48} className="size-12 shrink-0 object-contain" />
          <span className="text-2xl font-semibold tracking-tight text-brand-dark">Eco<span className="text-brand">Sync</span></span>
        </Link>
        <div className="text-center">
          <h1 id="onboarding-title" className="text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl">Vamos personalizar sua experiência</h1>
          <p className="mt-3 text-sm leading-6 text-muted">Conte um pouco sobre como você pretende usar o EcoSync.</p>
        </div>
        <OnboardingForm />
      </section>
    </main>
  );
}
