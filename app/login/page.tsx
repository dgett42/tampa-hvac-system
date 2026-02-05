"use client";

import { getSupabase } from "@/lib/supabaseClient";

const supabase = getSupabase();

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Wrong password");
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm border rounded-2xl p-6">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="text-sm text-gray-600 mt-1">
          Enter the admin password to continue.
        </p>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <input
            className="w-full rounded-lg border p-2"
            placeholder="Admin password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="w-full rounded-lg bg-black text-white p-2 disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
