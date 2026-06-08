"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-white">
            ServiceWingman
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <Link href="/features" className="transition hover:text-white">
              Features
            </Link>

            <Link href="/pricing" className="transition hover:text-white">
              Pricing
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-white"
            >
              Contact Us
            </Link>

            <Link
              href="/wingmanAi"
              className="transition hover:text-white"
            >
              WingmanAI
            </Link>

            <Link href="/admin" className="transition hover:text-white">
              Login
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="inline-flex w-auto items-center justify-center rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-900 md:hidden "
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="mt-5 grid gap-2 border-t border-slate-800 pt-5 text-sm font-medium text-slate-300 md:hidden">
            <MobileNavLink href="/" label="Home" onClick={() => setOpen(false)} />

            <MobileNavLink
              href="/features"
              label="Features"
              onClick={() => setOpen(false)}
            />

            <MobileNavLink
              href="/contact"
              label="Contact Us"
              onClick={() => setOpen(false)}
            />

            <MobileNavLink
              href="/wingmanAi"
              label="WingmanAI"
              onClick={() => setOpen(false)}
            />

            <MobileNavLink
              href="/admin"
              label="Login"
              onClick={() => setOpen(false)}
            />

            <MobileNavLink
              href="/pricing"
              label="Pricing"
              onClick={() => setOpen(false)}
            />
          </nav>
        )}
      </div>
    </header>
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