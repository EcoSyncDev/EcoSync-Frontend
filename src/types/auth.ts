export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthStatus = "authenticated" | "unauthenticated" | "loading";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignupData = {
  name: string;
  email: string;
  password: string;
};
