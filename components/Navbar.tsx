"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Navbar() {
  const router = useRouter();
  const supabase = createClient();
  const [open, setOpen] = useState(false);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 text-slate-100 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/admin"
            className="min-w-0 truncate text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Admin Dashboard
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
            <Link href="/admin" className="transition hover:text-white">
              Dashboard
            </Link>

            <Link href="/leads" className="transition hover:text-white">
              Leads
            </Link>

            <Link href="/analytics" className="transition hover:text-white">
              Analytics
            </Link>

            <Link href="/settings" className="transition hover:text-white">
              Settings
            </Link>

            <button
              type="button"
              onClick={logout}
              className="rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="inline-flex w-fit shrink-0 items-center justify-center rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-900 md:hidden"
            aria-label="Toggle admin navigation"
            aria-expanded={open}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile Links */}
        {open && (
          <div className="mt-4 grid gap-2 border-t border-slate-800 pt-4 text-sm font-medium text-slate-300 md:hidden">
            <MobileNavLink
              href="/admin"
              label="Dashboard"
              onClick={() => setOpen(false)}
            />

            <MobileNavLink
              href="/leads"
              label="Leads"
              onClick={() => setOpen(false)}
            />

            <MobileNavLink
              href="/analytics"
              label="Analytics"
              onClick={() => setOpen(false)}
            />

            <MobileNavLink
              href="/settings"
              label="Settings"
              onClick={() => setOpen(false)}
            />

            <button
              type="button"
              onClick={logout}
              className="mt-2 w-full rounded-xl bg-red-500 px-4 py-3 text-left font-semibold text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-xl px-3 py-3 transition hover:bg-slate-900 hover:text-white"
    >
      {label}
    </Link>
  );
}