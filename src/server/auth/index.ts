import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const devFallbackSecret = "arshia-global-bd-dev-auth-secret-do-not-use-in-production";

function resolveAuthSecret(): string | undefined {
  return process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret:
    resolveAuthSecret() ??
    (process.env.NODE_ENV === "production" ? undefined : devFallbackSecret),
});
