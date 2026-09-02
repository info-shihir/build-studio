/**
 * NextAuth requires AUTH_SECRET. In development, fall back to a local-only default
 * so demo login works without manual .env setup. Production must set AUTH_SECRET.
 */
export function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (secret) return secret;

  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET must be set in production.");
  }

  return "arshia-global-bd-dev-auth-secret-do-not-use-in-production";
}
