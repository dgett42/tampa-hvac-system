"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow"
      >
        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
        <p className="text-sm text-slate-500 mb-6">
          Sign in to manage HVAC leads.
        </p>

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          className="w-full rounded-lg border p-3 mb-4"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          className="w-full rounded-lg border p-3 mb-6"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full rounded-lg bg-black text-white p-3 font-medium cursor-pointer disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </main>
  );
}