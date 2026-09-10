import { login, signup } from "@/services/auth-service";
import type { AuthUser, LoginCredentials, SignupData } from "@/types/auth";

// A validação nativa dos campos acontece no formulário antes do submit.
export function loginWithFormData(fields: FormData): AuthUser {
  const credentials: LoginCredentials = {
    email: String(fields.get("email") ?? ""),
    password: String(fields.get("password") ?? ""),
  };
  return login(credentials);
}

// null indica confirmação incompatível; nesse caso o serviço não é chamado.
export function signupWithFormData(fields: FormData): AuthUser | null {
  if (fields.get("password") !== fields.get("confirmPassword")) return null;

  const data: SignupData = {
    name: String(fields.get("name") ?? ""),
    email: String(fields.get("email") ?? ""),
    password: String(fields.get("password") ?? ""),
  };
  return signup(data);
}
