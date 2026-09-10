import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export function AuthInstitutional({ title, description }: { title: ReactNode; description: string }) {
  return (
    <section aria-label="EcoSync: dados para um futuro sustentável" className="relative flex min-w-0 flex-col overflow-hidden px-6 pt-8 sm:px-12 lg:border-r lg:border-outline lg:bg-surface lg:px-14 lg:py-12 xl:px-20">
      <Link href="/" aria-label="EcoSync — início" className="relative z-10 mx-auto flex w-fit items-center gap-3 rounded-lg lg:mx-0">
        <Image src="/logo-ecosync.png" alt="" width={48} height={48} className="size-12 shrink-0 object-contain" />
        <span className="text-2xl font-semibold tracking-tight text-brand-dark">Eco<span className="text-brand">Sync</span></span>
      </Link>

      <div className="relative z-10 mx-auto hidden w-full max-w-lg flex-1 flex-col justify-center py-16 lg:flex">
        <p className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-brand">
          <Icon name="leaf" className="size-4" /> CADA ESCOLHA IMPORTA
        </p>
        <h2 className="text-4xl leading-tight font-semibold tracking-tight text-brand-dark xl:text-[2.75rem]">
          {title}
        </h2>
        <p className="mt-6 max-w-md text-base leading-7 text-muted">
          {description}
        </p>
        <div aria-hidden="true" className="relative mt-8 flex h-44 items-center justify-center">
          <div className="absolute size-44 rounded-full border border-brand/20" />
          <div className="absolute size-32 rounded-full border border-brand/30 bg-brand-light/40" />
          <div className="flex size-20 items-center justify-center rounded-full border border-brand/20 bg-brand-light text-brand">
            <Icon name="leaf" className="size-9" />
          </div>
          <span className="absolute left-[15%] top-5 rounded-2xl border border-outline bg-surface p-3 text-brand"><Icon name="water" /></span>
          <span className="absolute right-[15%] bottom-5 rounded-2xl border border-outline bg-surface p-3 text-brand"><Icon name="energy" /></span>
          <span className="absolute right-[23%] top-7 size-2 rounded-full bg-brand/40" />
          <span className="absolute bottom-7 left-[23%] size-2 rounded-full bg-brand/40" />
        </div>
      </div>
      <p className="relative z-10 hidden text-xs text-muted lg:block">Consumo consciente. Impacto positivo.</p>
    </section>
  );
}
