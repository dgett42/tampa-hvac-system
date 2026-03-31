"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b p-4 flex justify-between items-center">
      <div className="text-2xl font-semibold mb-4">
        Admin Dashboard
      </div>

      <div className="flex gap-6 text-sm">
        <Link href="/admin">Dashboard</Link>
        <Link href="/leads">Leads</Link>
        <Link href="/analytics">Analytics</Link>
      </div>
    </nav>
  );
}