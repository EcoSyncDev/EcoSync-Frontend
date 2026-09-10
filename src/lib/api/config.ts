// NEXT_PUBLIC_ torna esta URL pública e a incorpora ao bundle no build; não use segredos.
// Sem configuração, permanece indefinida até que uma API seja disponibilizada.
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.trim() || undefined;
