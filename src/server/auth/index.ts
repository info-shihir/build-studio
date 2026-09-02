import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { getAuthSecret } from "./secret";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: getAuthSecret(),
});
