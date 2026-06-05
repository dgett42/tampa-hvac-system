"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import Navbar from "@/components/Navbarb";

export default function SignupPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    console.log("Signup data:", data);
    alert("Account created. Check your email to confirm your account, then log in.");
  }

  return (
    <main className="page-shell flex min-h-screen items-center justify-center px-4 py-10">
        <Navbar />
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow"
      >
        <h1 className="text-2xl font-bold mb-2 text-black">Create Account</h1>

        <p className="text-sm text-slate-500 mb-6">
          Create an account to access the HVAC dashboard.
        </p>

        <label className="block text-sm font-medium mb-1 text-slate-700">
          Email
        </label>
        <input
          className="w-full rounded-lg border border-blue-500 p-3 mb-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1 text-slate-700">
          Password
        </label>
        <input
          className="w-full rounded-lg border border-blue-500 p-3 mb-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1 text-slate-700">
          Confirm Password
        </label>
        <input
          className="w-full rounded-lg border border-blue-500 p-3 mb-6 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black text-white p-3 font-medium cursor-pointer disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-sm text-slate-500 mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}