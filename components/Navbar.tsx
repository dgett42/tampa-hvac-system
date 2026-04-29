"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/logout", {
      method: "post"
    });
    router.push("/login")
  }
  return (
    <nav className="w-full border-b p-4 flex justify-between items-center">
      <div className="text-2xl font-semibold mb-4">
        Admin Dashboard
      </div>

      <div className="flex gap-6 text-sm">
        <Link href="/admin">Dashboard</Link>
        <Link href="/leads">Leads</Link>
        <Link href="/analytics">Analytics</Link>
        <Link href="/settings">Settings</Link>
        <button 
            onClick={logout}
            className="bg-red-500 text-white px-2 rounded cursor-pointer hover:bg-red-600 transition"
            >
              Logout
            </button>
      </div>
    </nav>
  );
}