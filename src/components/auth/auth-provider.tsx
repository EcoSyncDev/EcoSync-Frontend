"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { getCurrentUser, login as loginService, logout as logoutService, signup as signupService } from "@/services/auth-service";
import type { AuthStatus, AuthUser, LoginCredentials, SignupData } from "@/types/auth";

type AuthContextValue = {
  user: AuthUser | null;
  status: AuthStatus;
  login: (credentials: LoginCredentials) => AuthUser;
  signup: (data: SignupData) => AuthUser;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getCurrentUser);
  const status: AuthStatus = user ? "authenticated" : "unauthenticated";

  function login(credentials: LoginCredentials): AuthUser {
    const nextUser = loginService(credentials);
    setUser(nextUser);
    return nextUser;
  }

  function signup(data: SignupData): AuthUser {
    const nextUser = signupService(data);
    setUser(nextUser);
    return nextUser;
  }

  function logout(): void {
    logoutService();
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, status, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  return context;
}
