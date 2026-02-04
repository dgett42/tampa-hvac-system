"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    issue: "",
    priority: "medium",
  });

  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);

  const { error } = await supabase.from("leads").insert([
    {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      issue: form.issue.trim(),
      priority: form.priority,
    },
  ]);

  if (error) {
    console.error(error);
    alert(error.message || "Failed to submit");
    setLoading(false);
    return;
  }

  // 👇 ADD THIS PART
  await fetch("/api/sms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: form.name,
      phone: form.phone,
      issue: form.issue,
      priority: form.priority,
    }),
  });

  alert("Submitted!");

  setForm({
    name: "",
    phone: "",
    email: "",
    issue: "",
    priority: "medium",
  });

  setLoading(false);
}

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Tampa HVAC Service Request</h1>
        <p className="text-sm text-gray-600 mt-1">
          Fill this out and we’ll contact you ASAP.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            className="w-full rounded-lg border p-2"
            placeholder="Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            className="w-full rounded-lg border p-2"
            placeholder="Phone *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <input
            className="w-full rounded-lg border p-2"
            placeholder="Email (optional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <select
            className="w-full rounded-lg border p-2"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="emergency">Emergency</option>
          </select>

          <textarea
            className="w-full rounded-lg border p-2"
            placeholder="Describe the issue *"
            rows={4}
            value={form.issue}
            onChange={(e) => setForm({ ...form, issue: e.target.value })}
            required
          />

          <button
            className="w-full rounded-lg bg-black text-white p-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Request Service"}
          </button>
        </form>
      </div>
    </main>
  );
}
