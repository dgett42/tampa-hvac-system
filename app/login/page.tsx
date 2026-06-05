"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import Navbar from "@/components/Navbarb";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    console.log("Attempting login with email:", email);
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

    window.location.href = "/admin";
  }

  return (
  <main className="page-shell flex min-h-screen items-center justify-center px-4 py-10">
    <Navbar />
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10">
      <form
      onSubmit={submit}
      className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-black/30"
      >
      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
          ServiceWingman Admin
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-white">
          Admin Login
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Sign in to manage HVAC leads, follow-ups, and customer requests.
        </p>
      </div>

      <label className="mb-1.5 block text-sm font-medium text-slate-200">
        Email
      </label>
      <input
        className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
      />

      <label className="mb-1.5 block text-sm font-medium text-slate-200">
        Password
      </label>
      <input
        className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Log In"}
      </button>

      <p className="mt-5 text-center text-sm text-slate-400">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-blue-400 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  </section>
  </main>
  );
}