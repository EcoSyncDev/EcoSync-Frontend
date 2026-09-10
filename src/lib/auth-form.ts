import type { LoginCredentials, SignupData } from "@/types/auth";

// A validação nativa dos campos acontece no formulário antes do submit.
export function readLoginCredentials(fields: FormData): LoginCredentials {
  return {
    email: String(fields.get("email") ?? ""),
    password: String(fields.get("password") ?? ""),
  };
}

// null indica confirmação incompatível, antes de qualquer autenticação.
export function readSignupData(fields: FormData): SignupData | null {
  if (fields.get("password") !== fields.get("confirmPassword")) return null;

  return {
    name: String(fields.get("name") ?? ""),
    email: String(fields.get("email") ?? ""),
    password: String(fields.get("password") ?? ""),
  };
}
