"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL ?? "demo@arshialtd.com";
const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD ?? "demo123";

interface LoginFormProps {
  demoMode?: boolean;
}

export default function LoginForm({ demoMode = true }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fillDemoCredentials = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {demoMode && (
        <div className="rounded-lg border border-[#c5a880]/30 bg-[#c5a880]/10 px-4 py-3 text-sm text-gray-300 space-y-2">
          <p className="font-medium text-white">Demo login (no database required)</p>
          <p className="text-xs text-gray-400">
            Email: <span className="text-[#c5a880]">{DEMO_EMAIL}</span>
            {" · "}
            Password: <span className="text-[#c5a880]">{DEMO_PASSWORD}</span>
          </p>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="text-[10px] font-mono uppercase tracking-widest text-[#c5a880] hover:text-white"
          >
            Fill demo credentials
          </button>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-950/30 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-[#c5a880]">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a880]"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-xs font-mono uppercase tracking-widest text-[#c5a880]">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a880]"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-[#c5a880] text-[#0a0a0a] font-display text-xs tracking-widest uppercase font-bold disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
