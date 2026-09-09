"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Icon, type IconName } from "@/components/ui/icon";

const navigation: { label: string; icon: IconName; href?: string }[] = [
  { label: "Dashboard", icon: "dashboard", href: "/" },
  { label: "Monitoramento", icon: "monitoring", href: "/monitoramento" },
  { label: "Metas", icon: "target", href: "/metas" },
  { label: "Relatórios", icon: "report", href: "/relatorios" },
  { label: "Configurações", icon: "settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-outline bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col lg:overflow-y-auto lg:border-r lg:border-b-0">
      <Link href="/" aria-label="EcoSync — início" className="mx-6 my-7 flex w-fit items-center gap-3 rounded-lg">
        <Image
          src="/logo-ecosync.png"
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 object-contain"
        />
        <span className="text-2xl font-semibold tracking-tight text-brand-dark">Eco<span className="text-brand">Sync</span></span>
      </Link>
      <nav aria-label="Navegação principal" className="px-4 pb-5 lg:mt-8">
        <p className="mb-3 px-3 text-[11px] font-semibold tracking-[0.16em] text-muted">PRINCIPAL</p>
        <ul className="grid grid-cols-1 gap-1 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 lg:gap-2">
          {navigation.map(({ label, icon, href }) => (
            <li key={label}>
              {href ? (
                <Link href={href} aria-current={pathname === href ? "page" : undefined} className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm transition-colors hover:bg-brand-light/70 ${pathname === href ? "bg-brand-light font-semibold text-brand-dark" : "text-muted"}`}>
                  <Icon name={icon} className={`size-5 shrink-0 ${pathname === href ? "text-brand" : ""}`} />
                  {label}
                  {pathname === href && <span className="ml-auto size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />}
                </Link>
              ) : (
                <button type="button" disabled title="Em breve" aria-label={`${label} — em breve`} className="flex min-h-12 w-full cursor-not-allowed items-center gap-3 rounded-xl px-3 text-left text-sm text-muted">
                  <Icon name={icon} className="size-5 shrink-0" />
                  {label}
                </button>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 px-3 text-xs leading-5 text-muted">Novas seções em breve.</p>
      </nav>
      <div className="mt-auto hidden border-t border-outline p-5 lg:block">
        <div className="flex items-center gap-3 rounded-xl bg-background p-3">
          <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-semibold text-brand">ES</span>
          <div>
            <p className="text-sm font-medium text-brand-dark">Equipe EcoSync</p>
            <p className="mt-0.5 text-xs text-muted">Perfil demonstrativo</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
