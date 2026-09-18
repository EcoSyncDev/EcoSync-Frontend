import type { AuthUser, LoginCredentials, SignupData } from "@/types/auth";

// Sessão demonstrativa local ao módulo, perdida ao recarregar a aplicação.
// Não representa autenticação real; os formulários validam os dados de entrada.
let currentUser: AuthUser | null = null;

export function login({ email }: LoginCredentials): AuthUser {
  currentUser = { id: "mock-user", name: "Usuário demonstrativo", email };
  return { ...currentUser };
}

export function signup({ name, email }: SignupData): AuthUser {
  currentUser = { id: "mock-user", name, email };
  return { ...currentUser };
}

export function logout(): void {
  currentUser = null;
}

export function getCurrentUser(): AuthUser | null {
  return currentUser ? { ...currentUser } : null;
}
