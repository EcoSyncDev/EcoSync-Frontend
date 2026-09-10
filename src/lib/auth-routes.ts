const publicRoutes: readonly string[] = ["/login", "/cadastro", "/esqueci-senha"];

const protectedRoutes: readonly string[] = [
  "/",
  "/monitoramento",
  "/metas",
  "/relatorios",
  "/configuracoes",
  "/onboarding",
];

function normalizePathname(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function isPublicRoute(pathname: string): boolean {
  return publicRoutes.includes(normalizePathname(pathname));
}

// Identifica apenas as rotas protegidas explicitamente cadastradas.
export function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.includes(normalizePathname(pathname));
}

// Rotas desconhecidas também exigem autenticação por padrão; não são públicas.
// Este helper apenas classifica: não protege nem redireciona a navegação.
export function requiresAuthentication(pathname: string): boolean {
  return !isPublicRoute(pathname);
}
