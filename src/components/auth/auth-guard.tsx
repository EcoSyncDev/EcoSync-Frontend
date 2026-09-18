"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { requiresAuthentication, shouldRedirectAuthenticatedUser } from "@/lib/auth-routes";

// Controle visual da sessão mockada; não substitui autorização no backend.
export function AuthGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, status } = useAuth();
  const isAuthenticated = status === "authenticated" && user !== null;
  const redirectAuthenticated = isAuthenticated && shouldRedirectAuthenticatedUser(pathname);
  const canAccess = !redirectAuthenticated && (!requiresAuthentication(pathname) || isAuthenticated);

  useEffect(() => {
    if (redirectAuthenticated) {
      router.replace("/");
    } else if (!canAccess && status !== "loading") {
      router.replace("/login");
    }
  }, [canAccess, pathname, redirectAuthenticated, router, status]);

  return canAccess ? children : null;
}
