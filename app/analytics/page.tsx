"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Navbar from "@/components/Navbar";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
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

const STATUS_ORDER = ["new", "contacted", "booked", "closed", "lost"] as const;

const PIE_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AnalyticsPage() {
  const supabase = createClient();

  const [leads, setLeads] = useState<Lead[]>([]);
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

  const analytics = useMemo(() => {
    const normalizedLeads = leads.map((lead) => ({
      ...lead,
      status: (lead.status || "new").trim().toLowerCase(),
      priority: (lead.priority || "medium").trim().toLowerCase(),
      service_type: lead.service_type || "Not specified",
    }));

    const totalLeads = normalizedLeads.length;

    const newLeads = normalizedLeads.filter((lead) => lead.status === "new");
    const contactedLeads = normalizedLeads.filter(
      (lead) => lead.status === "contacted"
    );
    const bookedLeads = normalizedLeads.filter(
      (lead) => lead.status === "booked"
    );
    const closedLeads = normalizedLeads.filter(
      (lead) => lead.status === "closed"
    );
    const lostLeads = normalizedLeads.filter((lead) => lead.status === "lost");

    const totalRevenue = closedLeads.reduce(
      (sum, lead) => sum + (lead.revenue || 0),
      0
    );

    const averageJobValue =
      closedLeads.length > 0 ? totalRevenue / closedLeads.length : 0;

    const bookedRate =
      totalLeads > 0 ? (bookedLeads.length / totalLeads) * 100 : 0;

    const closeRate =
      totalLeads > 0 ? (closedLeads.length / totalLeads) * 100 : 0;

    const lostRate =
      totalLeads > 0 ? (lostLeads.length / totalLeads) * 100 : 0;

    const emergencyLeads = normalizedLeads.filter(
      (lead) => lead.priority === "emergency"
    );

    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    const leadsThisWeek = normalizedLeads.filter(
      (lead) => new Date(lead.created_at) >= sevenDaysAgo
    );

    const closedThisWeek = closedLeads.filter(
      (lead) => new Date(lead.created_at) >= sevenDaysAgo
    );

    const revenueThisWeek = closedThisWeek.reduce(
      (sum, lead) => sum + (lead.revenue || 0),
      0
    );

    const revenueSeries = getLastNDays(14).map((day) => ({
      ...day,
      revenue: 0,
      closed: 0,
      leads: 0,
    }));

    for (const lead of normalizedLeads) {
      const date = new Date(lead.created_at);
      const day = formatChartDate(date);

      const index = revenueSeries.findIndex((item) => item.date === day);

      if (index !== -1) {
        revenueSeries[index].leads += 1;

        if (lead.status === "closed") {
          revenueSeries[index].closed += 1;
          revenueSeries[index].revenue += lead.revenue || 0;
        }
      }
    }

    const pipelineData = STATUS_ORDER.map((status) => ({
      name: capitalize(status),
      value: normalizedLeads.filter((lead) => lead.status === status).length,
    }));

    const priorityData = ["emergency", "high", "medium", "low"]
      .map((priority) => ({
        name: capitalize(priority),
        value: normalizedLeads.filter((lead) => lead.priority === priority)
          .length,
      }))
      .filter((item) => item.value > 0);

    const serviceTypeMap = new Map<
      string,
      { name: string; leads: number; closed: number; revenue: number }
    >();

    for (const lead of normalizedLeads) {
      const service = lead.service_type || "Not specified";

      if (!serviceTypeMap.has(service)) {
        serviceTypeMap.set(service, {
          name: service,
          leads: 0,
          closed: 0,
          revenue: 0,
        });
      }

      const current = serviceTypeMap.get(service);

      if (current) {
        current.leads += 1;

        if (lead.status === "closed") {
          current.closed += 1;
          current.revenue += lead.revenue || 0;
        }
      }
    }

    const serviceTypeData = Array.from(serviceTypeMap.values())
      .sort((a, b) => b.leads - a.leads)
      .slice(0, 8);

    const recentClosed = [...closedLeads]
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 5);

    return {
      totalLeads,
      newLeads,
      contactedLeads,
      bookedLeads,
      closedLeads,
      lostLeads,
      totalRevenue,
      averageJobValue,
      bookedRate,
      closeRate,
      lostRate,
      emergencyLeads,
      leadsThisWeek,
      closedThisWeek,
      revenueThisWeek,
      revenueSeries,
      pipelineData,
      priorityData,
      serviceTypeData,
      recentClosed,
    };
  }, [leads]);

  return (
    <main className="page-shell min-h-screen">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-400">
              ServiceWingman Analytics
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Analytics
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
              Review lead performance, revenue trends, close rates, service
              demand, and pipeline health.
            </p>
          </div>

          <button
            type="button"
            onClick={loadLeads}
            disabled={loading}
            className="w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
          >
            {loading ? "Refreshing..." : "Refresh Analytics"}
          </button>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-400">
            Loading analytics...
          </div>
        ) : (
          <>
            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="Total Revenue"
                value={`$${analytics.totalRevenue.toLocaleString()}`}
                description="Revenue from closed leads"
              />

              <MetricCard
                label="Revenue Last 7 Days"
                value={`$${analytics.revenueThisWeek.toLocaleString()}`}
                description={`${analytics.closedThisWeek.length} closed this week`}
              />

              <MetricCard
                label="Average Job Value"
                value={`$${analytics.averageJobValue.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 0,
                  }
                )}`}
                description="Average revenue per closed lead"
              />

              <MetricCard
                label="Close Rate"
                value={`${analytics.closeRate.toFixed(1)}%`}
                description={`${analytics.closedLeads.length} closed of ${analytics.totalLeads} total`}
              />
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MiniMetric
                label="Leads This Week"
                value={analytics.leadsThisWeek.length.toString()}
              />
              <MiniMetric
                label="Booked Leads"
                value={analytics.bookedLeads.length.toString()}
              />
              <MiniMetric
                label="Emergency Leads"
                value={analytics.emergencyLeads.length.toString()}
              />
              <MiniMetric
                label="Lost Rate"
                value={`${analytics.lostRate.toFixed(1)}%`}
              />
            </div>

            <div className="mb-6 grid gap-6 xl:grid-cols-2">
              <ChartCard
                title="Revenue Last 14 Days"
                description="Revenue from leads marked closed."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.revenueSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                    <YAxis allowDecimals={false} stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      labelStyle={{ color: "#f8fafc" }}
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
                    />
                    <Bar dataKey="revenue" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard
                title="Leads vs Closed Jobs"
                description="Daily lead volume compared to closed jobs."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.revenueSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                    <YAxis allowDecimals={false} stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      labelStyle={{ color: "#f8fafc" }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="leads"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="closed"
                      stroke="#22c55e"
                      strokeWidth={3}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            <div className="mb-6 grid gap-6 xl:grid-cols-3">
              <ChartCard
                title="Pipeline Breakdown"
                description="Current lead count by status."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.pipelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                    <YAxis allowDecimals={false} stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      labelStyle={{ color: "#f8fafc" }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard
                title="Priority Mix"
                description="Lead urgency breakdown."
              >
                {analytics.priorityData.length === 0 ? (
                  <EmptyChartMessage message="No priority data yet." />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analytics.priorityData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                      >
                        {analytics.priorityData.map((entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={tooltipStyle}
                        labelStyle={{ color: "#f8fafc" }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </ChartCard>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-white">
                    Recent Closed Jobs
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Latest jobs marked closed with revenue.
                  </p>
                </div>

                {analytics.recentClosed.length === 0 ? (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-sm text-slate-400">
                    No closed jobs yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {analytics.recentClosed.map((lead) => (
                      <div
                        key={lead.id}
                        className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-white">
                              {lead.name || "No name"}
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                              {lead.service_type || "No service type"}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {formatDate(lead.created_at)}
                            </p>
                          </div>

                          <p className="shrink-0 font-semibold text-green-300">
                            ${(lead.revenue || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white">
                  Service Type Performance
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  See which HVAC services generate the most leads, closed jobs,
                  and revenue.
                </p>
              </div>

              {analytics.serviceTypeData.length === 0 ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center text-sm text-slate-400">
                  No service type data yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead className="border-b border-slate-800 text-slate-400">
                      <tr>
                        <th className="py-3 pr-4 font-medium">Service Type</th>
                        <th className="py-3 pr-4 font-medium">Leads</th>
                        <th className="py-3 pr-4 font-medium">Closed</th>
                        <th className="py-3 pr-4 font-medium">Close Rate</th>
                        <th className="py-3 pr-4 font-medium">Revenue</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-800">
                      {analytics.serviceTypeData.map((service) => {
                        const serviceCloseRate =
                          service.leads > 0
                            ? (service.closed / service.leads) * 100
                            : 0;

                        return (
                          <tr key={service.name}>
                            <td className="py-3 pr-4 font-medium text-white">
                              {service.name}
                            </td>
                            <td className="py-3 pr-4 text-slate-300">
                              {service.leads}
                            </td>
                            <td className="py-3 pr-4 text-slate-300">
                              {service.closed}
                            </td>
                            <td className="py-3 pr-4 text-slate-300">
                              {serviceCloseRate.toFixed(1)}%
                            </td>
                            <td className="py-3 pr-4 font-semibold text-green-300">
                              ${service.revenue.toLocaleString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20">
              <h2 className="text-lg font-semibold text-white">
                Quick Summary
              </h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <SummaryItem
                  label="Total Leads"
                  value={analytics.totalLeads.toString()}
                />
                <SummaryItem
                  label="Closed Jobs"
                  value={analytics.closedLeads.length.toString()}
                />
                <SummaryItem
                  label="Revenue Per Closed Job"
                  value={`$${analytics.averageJobValue.toFixed(0)}`}
                />
                <SummaryItem
                  label="Booked Rate"
                  value={`${analytics.bookedRate.toFixed(1)}%`}
                />
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

const tooltipStyle = {
  backgroundColor: "#020617",
  border: "1px solid #334155",
  borderRadius: "12px",
  color: "#f8fafc",
};

function MetricCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20">
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-white">
        {value}
      </p>
      <p className="mt-2 text-xs leading-5 text-slate-500">{description}</p>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
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

      <div className="h-72 w-full">{children}</div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function EmptyChartMessage({ message }: { message: string }) {
  return (
    <div className="flex h-full items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 text-sm text-slate-400">
      {message}
    </div>
  );
}

function getLastNDays(days: number) {
  const out: { date: string }[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);

    out.push({
      date: formatChartDate(date),
    });
  }

  return out;
}

function formatChartDate(date: Date) {
  return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

function formatDate(date: string | null) {
  if (!date) return "No date";

  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}