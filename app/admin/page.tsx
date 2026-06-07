"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Navbar from "@/components/Navbar";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from "recharts";

export default function AdminPage() {
  const supabase = createClient();

  type Lead = {
  id: string;
  name: string;
  phone: string;
  status: string;
  created_at: string;
  priority: string;
  issue: string;
  revenue: number | null;
  user_id?: string;
  company_id?: string;
};

  const [leads, setLeads] = useState<Lead[]>([]);
  const [revenueInputs, setRevenueInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  async function loadLeads() {
  if (!supabase) {
    console.error("Supabase client not ready");
    return;
  }

  setLoading(true);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("User not logged in:", userError);
    setLeads([]);
    setLoading(false);
    return;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("company_id")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.company_id) {
    console.error("No company profile found:", profileError);
    setLeads([]);
    setLoading(false);
    return;
  }

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("company_id", profile.company_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("loadLeads error:", error);
    setLoading(false);
    return;
  }

  setLeads((data as Lead[]) ?? []);
  setLoading(false);
}
  useEffect(() => {
    loadLeads();
  }, []);

  const totalLeads = leads.length;

const booked = leads.filter(l => l.status === "booked").length;
const closed = leads.filter(l => l.status === "closed").length;

const conversionRate =
  totalLeads > 0 ? ((closed / totalLeads) * 100).toFixed(1) : "0";

const emergencyCount = leads.filter(l => l.priority === "emergency").length;

const now = new Date();
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(now.getDate() - 7);

const thisWeek = leads.filter(l => {
  return new Date(l.created_at) >= sevenDaysAgo;
}).length;

// revenue Per closed lead. 
const totalRevenue = leads
  .filter(l => l.status === "closed")
  .reduce((sum, l) => sum + (l.revenue || 0), 0); 

function lastNDays(n: number) {
  const out: { date: string; count: number }[] = [];
  const now = new Date();

  for (let i = n ; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
    out.push({ date: key.slice(5), count: 0 }); // show MM-DD
  }
  return out;
}

const series = lastNDays(7);

// count leads into buckets
for (const lead of leads) {
  const d = new Date(lead.created_at);
  const day = `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const idx = series.findIndex((x) => x.date === day);
  if (idx !== -1) series[idx].count += 1;
}

const newCount = leads.filter(l => l.status === "new").length;
const contacted = leads.filter(l => l.status === "contacted").length;
const lost = leads.filter(l => l.status === "lost").length;

const bookedRate = totalLeads > 0 ? ((booked / totalLeads) * 100).toFixed(1) : "0";
const closeRate = booked > 0 ? ((closed / booked) * 100).toFixed(1) : "0";
const emergencyPct = totalLeads > 0 ? ((emergencyCount / totalLeads) * 100).toFixed(1) : "0";

const statusSeries = [
  { name: "New", value: newCount },
  { name: "Contacted", value: contacted },
  { name: "Booked", value: booked },
  { name: "Closed", value: closed },
  { name: "Lost", value: lost },
];

function getStatusClass(status: string) {
  switch (status) {
    case "new":
      return "border-blue-500/30 bg-blue-500/10 text-blue-300";
    case "contacted":
      return "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
    case "booked":
      return "border-green-500/30 bg-green-500/10 text-green-300";
    case "closed":
      return "border-slate-500/30 bg-slate-500/10 text-slate-300";
    case "lost":
      return "border-red-500/30 bg-red-500/10 text-red-300";
    default:
      return "border-slate-700 bg-slate-900 text-slate-300";
  }
}

function getPriorityClass(priority: string) {
  switch (priority) {
    case "emergency":
      return "bg-red-500/10 text-red-300 border-red-500/30";
    case "high":
      return "bg-orange-500/10 text-orange-300 border-orange-500/30";
    case "medium":
      return "bg-blue-500/10 text-blue-300 border-blue-500/30";
    case "low":
      return "bg-slate-500/10 text-slate-300 border-slate-500/30";
    default:
      return "bg-slate-500/10 text-slate-300 border-slate-500/30";
  }
}


  return (
  <main className="page-shell min-h-screen">
    <Navbar />

    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-400">
            ServiceWingman Admin
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
            Track new leads, monitor your sales pipeline, and keep follow-ups
            organized from one place.
          </p>
        </div>

        <button
          type="button"
          onClick={loadLeads}
          disabled={loading}
          className="w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Leads" value={totalLeads.toString()} />
        <StatCard label="Conversion Rate" value={`${conversionRate}%`} />
        <StatCard label="This Week" value={thisWeek.toString()} />
        <StatCard label="Est. Revenue" value={`$${totalRevenue.toLocaleString()}`} />
      </div>

      {/* Charts */}
      <div className="mb-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              Leads Last 7 Days
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Daily lead volume from recent submissions.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                <YAxis allowDecimals={false} stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "#f8fafc",
                  }}
                  labelStyle={{ color: "#f8fafc" }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">
              Pipeline Breakdown
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Current leads by pipeline stage.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis allowDecimals={false} stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "#f8fafc",
                  }}
                  labelStyle={{ color: "#f8fafc" }}
                />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid gap-3 text-sm text-slate-400 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              Booked rate:{" "}
              <span className="font-semibold text-white">{bookedRate}%</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              Close rate:{" "}
              <span className="font-semibold text-white">{closeRate}%</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              Emergency:{" "}
              <span className="font-semibold text-white">{emergencyPct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leads */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Recent Leads</h2>
            <p className="mt-1 text-sm text-slate-400">
              Review incoming requests and update each lead status.
            </p>
          </div>

          <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-sm text-slate-300">
            {totalLeads} total
          </span>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center text-slate-400">
            Loading leads...
          </div>
        ) : leads.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center">
            <p className="font-medium text-white">No leads yet</p>
            <p className="mt-2 text-sm text-slate-400">
              New HVAC requests will appear here once customers submit the form.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-lg font-semibold text-white">
                        {lead.name}
                      </h3>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getPriorityClass(
                          lead.priority
                        )}`}
                      >
                        {lead.priority}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-col gap-1 text-sm text-slate-400 sm:flex-row sm:gap-4">
                      <span>{lead.phone}</span>
                      <span>
                        {new Date(lead.created_at).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  <select
                    value={lead.status}
                    onChange={async (e) => {
                      await supabase
                        .from("leads")
                        .update({ status: e.target.value })
                        .eq("id", lead.id);

                      loadLeads();
                    }}
                    className={`w-full rounded-xl border px-3 py-2 text-sm font-medium outline-none md:w-auto ${getStatusClass(
                      lead.status
                    )}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="booked">Booked</option>
                    <option value="closed">Closed</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>

                <p className="mt-4 max-h-40 overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm leading-6 text-slate-300">
                  {lead.issue}
                </p>

                {lead.status === "closed" && (
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="Enter revenue"
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20"
                      value={
                        revenueInputs[lead.id] ??
                        (lead.revenue?.toString() ?? "")
                      }
                      onChange={(e) => {
                        setRevenueInputs((prev) => ({
                          ...prev,
                          [lead.id]: e.target.value,
                        }));
                      }}
                    />

                    <button
                      type="button"
                      className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400 sm:w-auto"
                      onClick={async () => {
                        const raw = revenueInputs[lead.id] ?? "";
                        const value = Number(raw);

                        if (raw.trim() === "" || Number.isNaN(value)) {
                          alert("Enter a valid revenue amount");
                          return;
                        }

                        const { error } = await supabase
                          .from("leads")
                          .update({ revenue: value })
                          .eq("id", lead.id);

                        if (error) {
                          console.error("Revenue update failed:", error);
                          alert(error.message);
                          return;
                        }

                        loadLeads();
                      }}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  </main>
);

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20">
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-white">
        {value}
      </p>
    </div>
  );
}

}


