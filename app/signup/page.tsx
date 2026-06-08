"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import Navbar from "@/components/Navbarb";

function generateSlug(companyName: string) {
  const baseSlug = companyName
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const randomCode = Math.random().toString(36).substring(2, 6);

  return `${baseSlug}-${randomCode}`;
}

export default function SignupPage() {
  const supabase = createClient();

  const [companyName, setCompanyName] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const previewSlug = useMemo(() => {
    if (!companyName.trim()) return "your-company";

    return companyName
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }, [companyName]);

  const previewUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/request/${previewSlug}`
      : `/request/${previewSlug}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!companyName.trim()) {
      alert("Company name is required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const finalSlug = generateSlug(companyName);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: {
          company_name: companyName.trim(),
          company_phone: companyPhone.trim(),
          company_slug: finalSlug,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    console.log("Signup data:", data);

    alert(
      "Account created. Check your email to confirm your account, then log in."
    );
  }

  return (
    <main className="page-shell min-h-screen">
      <Navbar />

      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10">
        <form
          onSubmit={submit}
          className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-black/30"
        >
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
              ServiceWingman Admin
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              Create Company Account
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Create your company account and get a shareable lead submission
              form for customers.
            </p>
          </div>

          <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">
              Company Info
            </h2>

            <label className="mb-1.5 block text-sm font-medium text-slate-200">
              Company Name
            </label>
            <input
              className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Tampa HVAC"
              required
            />

            <label className="mb-1.5 block text-sm font-medium text-slate-200">
              Company Phone
            </label>
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20"
              type="tel"
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
              placeholder="(813) 555-1234"
            />
          </div>

          <div className="mb-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
            <h2 className="mb-2 text-sm font-semibold text-blue-300">
              Lead Form Preview
            </h2>

            <p className="text-sm text-slate-400">
              Customers will use a link like this to submit service requests:
            </p>

            <p className="mt-3 break-all rounded-xl border border-blue-500/20 bg-slate-950 px-4 py-3 text-sm text-blue-300">
              {previewUrl}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              A short random code will be added when the account is created to
              keep the link unique.
            </p>
          </div>

          <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">
              Login Info
            </h2>

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
              className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />

            <label className="mb-1.5 block text-sm font-medium text-slate-200">
              Confirm Password
            </label>
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="mt-5 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-400 hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}