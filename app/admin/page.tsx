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
  Legend,
} from "recharts";

type Lead = {
  id: string;
  company_id?: string;
  user_id?: string;

  name: string;
  phone: string | null;
  email: string | null;

  street_address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  property_type: string | null;

  service_type: string | null;
  priority: string | null;
  preferred_date: string | null;
  preferred_time: string | null;

  system_type: string | null;
  system_age: string | null;
  system_brand: string | null;
  last_maintenance: string | null;

  issue: string | null;
  issue_started: string | null;
  current_temp: string | null;
  access_notes: string | null;

  sms_consent: boolean | null;
  authorized: boolean | null;

  status: string;
  revenue: number | null;
  created_at: string;
};

type FormattedLeadSeries = {
  date: string;
  count: number;
};

type StatusSeries = {
  name: string;
  value: number;
};

export default function AdminPage() {
  const supabase = createClient();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [revenueInputs, setRevenueInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  async function loadLeads() {
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

  const newCount = leads.filter((lead) => lead.status === "new").length;
  const contacted = leads.filter((lead) => lead.status === "contacted").length;
  const booked = leads.filter((lead) => lead.status === "booked").length;
  const closed = leads.filter((lead) => lead.status === "closed").length;
  const lost = leads.filter((lead) => lead.status === "lost").length;

  const conversionRate =
    totalLeads > 0 ? ((closed / totalLeads) * 100).toFixed(1) : "0";

  const emergencyCount = leads.filter(
    (lead) => lead.priority === "emergency"
  ).length;

  const emergencyPct =
    totalLeads > 0 ? ((emergencyCount / totalLeads) * 100).toFixed(1) : "0";

  const bookedRate =
    totalLeads > 0 ? ((booked / totalLeads) * 100).toFixed(1) : "0";

  const closeRate = booked > 0 ? ((closed / booked) * 100).toFixed(1) : "0";

  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const thisWeek = leads.filter((lead) => {
    return new Date(lead.created_at) >= sevenDaysAgo;
  }).length;

  const totalRevenue = leads
    .filter((lead) => lead.status === "closed")
    .reduce((sum, lead) => sum + (lead.revenue || 0), 0);

  const series = getLastNDays(7);

  for (const lead of leads) {
    const date = new Date(lead.created_at);
    const day = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;

    const index = series.findIndex((item) => item.date === day);

    if (index !== -1) {
      series[index].count += 1;
    }
  }

  const statusSeries: StatusSeries[] = [
    { name: "New", value: newCount },
    { name: "Contacted", value: contacted },
    { name: "Booked", value: booked },
    { name: "Closed", value: closed },
    { name: "Lost", value: lost },
  ];

  return (
    <main className="page-shell min-h-screen">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-400">
              ServiceWingman Admin
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Dashboard
            </h1>
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

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Leads" value={totalLeads.toString()} />
          <StatCard label="Conversion Rate" value={`${conversionRate}%`} />
          <StatCard label="This Week" value={thisWeek.toString()} />
          <StatCard
            label="Est. Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
          />
        </div>

        <div className="mb-6 grid gap-6 xl:grid-cols-2">
          <ChartCard
            title="Leads Last 7 Days"
            description="Daily lead volume from recent form submissions."
          >
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
          </ChartCard>

          <ChartCard
            title="Pipeline Breakdown"
            description="Current lead count by pipeline stage."
          >
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
          </ChartCard>
        </div>

        <div className="mb-6 grid gap-3 text-sm text-slate-400 sm:grid-cols-3">
          <MiniMetric label="Booked Rate" value={`${bookedRate}%`} />
          <MiniMetric label="Close Rate" value={`${closeRate}%`} />
          <MiniMetric label="Emergency Leads" value={`${emergencyPct}%`} />
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Recent Leads
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Review service requests and update each lead as it moves through
                the pipeline.
              </p>
            </div>

            <span className="w-fit rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-sm text-slate-300">
              {totalLeads} total
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center text-slate-400">
              Loading leads...
            </div>
          ) : leads.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 text-center">
              <p className="font-medium text-white">No leads yet</p>

              <p className="mt-2 text-sm text-slate-400">
                New HVAC requests will appear here once customers submit the
                public service form.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {leads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  revenueInput={
                    revenueInputs[lead.id] ?? lead.revenue?.toString() ?? ""
                  }
                  setRevenueInput={(value) => {
                    setRevenueInputs((prev) => ({
                      ...prev,
                      [lead.id]: value,
                    }));
                  }}
                  onStatusChange={async (status) => {
                    const { error } = await supabase
                      .from("leads")
                      .update({ status })
                      .eq("id", lead.id);

                    if (error) {
                      console.error("Status update failed:", error);
                      alert(error.message);
                      return;
                    }

                    loadLeads();
                  }}
                  onRevenueSave={async () => {
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
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function LeadCard({
  lead,
  revenueInput,
  setRevenueInput,
  onStatusChange,
  onRevenueSave,
}: {
  lead: Lead;
  revenueInput: string;
  setRevenueInput: (value: string) => void;
  onStatusChange: (status: string) => void;
  onRevenueSave: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
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
              {formatValue(lead.priority)}
            </span>

            {lead.service_type && (
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-300">
                {lead.service_type}
              </span>
            )}
          </div>

          <div className="mt-2 grid gap-1 text-sm text-slate-400 sm:grid-cols-2">
            <span>Phone: {formatValue(lead.phone)}</span>
            <span>Email: {formatValue(lead.email)}</span>
            <span>
              Submitted:{" "}
              {new Date(lead.created_at).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span>
              Preferred:{" "}
              {lead.preferred_date || lead.preferred_time
                ? `${lead.preferred_date || "No date"} ${
                    lead.preferred_time || ""
                  }`
                : "Not provided"}
            </span>
          </div>
        </div>

        <select
          value={lead.status}
          onChange={(e) => onStatusChange(e.target.value)}
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

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <InfoPanel title="Service Address">
          <InfoRow label="Street" value={lead.street_address} />
          <InfoRow label="City" value={lead.city} />
          <InfoRow label="State" value={lead.state} />
          <InfoRow label="ZIP" value={lead.zip_code} />
          <InfoRow label="Property" value={lead.property_type} />
        </InfoPanel>

        <InfoPanel title="System Details">
          <InfoRow label="System Type" value={lead.system_type} />
          <InfoRow label="System Age" value={lead.system_age} />
          <InfoRow label="Brand" value={lead.system_brand} />
          <InfoRow label="Maintenance" value={lead.last_maintenance} />
          <InfoRow label="Indoor Temp" value={lead.current_temp} />
        </InfoPanel>

        <InfoPanel title="Request Details">
          <InfoRow label="Issue Started" value={lead.issue_started} />
          <InfoRow label="Priority" value={lead.priority} />
          <InfoRow
            label="SMS Consent"
            value={lead.sms_consent ? "Yes" : "No"}
          />
          <InfoRow
            label="Authorized"
            value={lead.authorized ? "Yes" : "No"}
          />
        </InfoPanel>
      </div>

      <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <h4 className="mb-2 text-sm font-semibold text-white">
          Issue Description
        </h4>

        <p className="max-h-48 overflow-y-auto whitespace-pre-wrap text-sm leading-6 text-slate-300">
          {lead.issue || "No issue description provided."}
        </p>
      </div>

      {lead.access_notes && (
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h4 className="mb-2 text-sm font-semibold text-white">
            Access Notes
          </h4>

          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
            {lead.access_notes}
          </p>
        </div>
      )}

      {lead.status === "closed" && (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            inputMode="decimal"
            placeholder="Enter revenue"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20"
            value={revenueInput}
            onChange={(e) => setRevenueInput(e.target.value)}
          />

          <button
            type="button"
            className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400 sm:w-auto"
            onClick={onRevenueSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

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

function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>

        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>

      <div className="h-64 w-full">{children}</div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
      <p className="text-slate-500">{label}</p>

      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function InfoPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h4 className="mb-3 text-sm font-semibold text-white">{title}</h4>

      <div className="space-y-2">{children}</div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | null | undefined;
}) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-slate-500">{label}</span>

      <span className="text-right font-medium text-slate-300">
        {formatValue(value)}
      </span>
    </div>
  );
}

function getLastNDays(n: number): FormattedLeadSeries[] {
  const out: FormattedLeadSeries[] = [];
  const now = new Date();

  for (let i = n; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);

    const key = date.toISOString().slice(0, 10);

    out.push({
      date: key.slice(5),
      count: 0,
    });
  }

  return out;
}

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

function getPriorityClass(priority: string | null) {
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

function formatValue(value: string | number | boolean | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return value;
}