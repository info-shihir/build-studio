import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma, isDatabaseEnabled } from "@/server/db/prisma";
import { verifyDemoCredentials } from "@/server/auth/demoUser";
import type { AdminRole } from "@/types/admin";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        if (!isDatabaseEnabled()) {
          return verifyDemoCredentials(email, password);
        }

        try {
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user?.passwordHash) return verifyDemoCredentials(email, password);

          const valid = await bcrypt.compare(password, user.passwordHash);
          if (!valid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name ?? user.email,
            role: user.role as AdminRole,
          };
        } catch {
          return verifyDemoCredentials(email, password);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: AdminRole }).role ?? "viewer";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as AdminRole) ?? "viewer";
      }
      return session;
    },
  },
  trustHost: true,
};
