"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { requiresAuthentication } from "@/lib/auth-routes";

// Controle visual da sessão mockada; não substitui autorização no backend.
export function AuthGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, status } = useAuth();
  const canAccess = !requiresAuthentication(pathname) || (status === "authenticated" && user !== null);

  useEffect(() => {
    if (!canAccess && status !== "loading") {
      router.replace("/login");
    }
  }, [canAccess, pathname, router, status]);

  return canAccess ? children : null;
}
