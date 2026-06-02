"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function PublicRequestPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    console.log("slug being sent:", slug);

    const res = await fetch("/api/public-leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug,
        name,
        phone,
        email,
        issue,
        priority,
      }),
    });

    const reponseText = await res.text();
    console.log("status", res.status);
    console.log("response", reponseText);

    setLoading(false);

    if (!res.ok) {
      alert("Something went wrong. Please try again.");
      return;
    }

    setSuccess(true);
    setName("");
    setPhone("");
    setEmail("");
    setIssue("");
    setPriority("medium");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow"
      >
        <h1 className="text-2xl font-bold mb-2 text-black">
          Request HVAC Service
        </h1>

        <p className="text-sm text-slate-500 mb-6">
          Tell us what is going on and we will follow up shortly.
        </p>

        {success && (
          <div className="mb-4 rounded-lg bg-green-100 p-3 text-sm text-green-700">
            Request submitted successfully.
          </div>
        )}

        <label className="block text-sm font-medium mb-1 text-slate-700">
          Name
        </label>
        <input
          className="w-full rounded-lg border p-3 mb-4 text-slate-900"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block text-sm font-medium mb-1 text-slate-700">
          Phone
        </label>
        <input
          className="w-full rounded-lg border p-3 mb-4 text-slate-900"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label className="block text-sm font-medium mb-1 text-slate-700">
          Email
        </label>
        <input
          className="w-full rounded-lg border p-3 mb-4 text-slate-900"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1 text-slate-700">
          Issue
        </label>
        <textarea
          className="w-full rounded-lg border p-3 mb-4 text-slate-900"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          required
        />

        <label className="block text-sm font-medium mb-1 text-slate-700">
          Priority
        </label>
        <select
          className="w-full rounded-lg border p-3 mb-6 text-slate-900"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="emergency">Emergency</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black text-white p-3 font-medium cursor-pointer disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </main>
  );
}
