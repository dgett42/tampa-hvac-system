"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";


export default function Navbar() {
  const router = useRouter();
  const supabase = createClient();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login")
    router.refresh();
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