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
  name: string;
  phone: string;
  email: string | null;
  status: string;
  created_at: string;
  priority: string;
  issue: string;
  revenue: number | null;
  user_id?: string; 
};


const STATUS_ORDER = ["new", "contacted", "booked", "closed", "lost"] as const;

function formatDate(date: string | null) {
  if (!date) return "No date";

  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function lastNDaysRevenue(n: number) {
  const out: { date: string; revenue: number; closed: number }[] = [];
  const now = new Date();

  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);

    const key = `${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

    out.push({ date: key, revenue: 0, closed: 0 });
  }

  return out;
}

export default function AnalyticsPage() {
  const supabase = createClient();

  const [leads, setLeads] = useState<Lead[]>([]);
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

    const { data, error } = await supabase 
      .from("leads")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error(" loadLeads error:", error);
      setLoading(false);
      return;
    } 

    setLeads((data as Lead[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadLeads();
  }, [supabase]);

  const normalizedLeads = useMemo(() => {
    return leads.map((l) => ({
      ...l,
      status: (l.status || "new").trim().toLowerCase(),
      priority: (l.priority || "medium").trim().toLowerCase(),
    }));
  }, [leads]);

  const totalLeads = normalizedLeads.length;

  const closedLeads = normalizedLeads.filter((l) => l.status === "closed");
  const bookedLeads = normalizedLeads.filter((l) => l.status === "booked");

  const totalRevenue = closedLeads.reduce((sum, l) => sum + (l.revenue ?? 0), 0);

  const averageJobValue =
    closedLeads.length > 0 ? totalRevenue / closedLeads.length : 0;

  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const revenueThisWeek = closedLeads
    .filter((l) => l.created_at && new Date(l.created_at) >= sevenDaysAgo)
    .reduce((sum, l) => sum + (l.revenue ?? 0), 0);

  const closedThisWeek = closedLeads.filter(
    (l) => l.created_at && new Date(l.created_at) >= sevenDaysAgo
  ).length;

  const closeRate =
    bookedLeads.length > 0
      ? ((closedLeads.length / bookedLeads.length) * 100).toFixed(1)
      : "0";

  const bookedRate =
    totalLeads > 0
      ? ((bookedLeads.length / totalLeads) * 100).toFixed(1)
      : "0";

  const revenueSeries = lastNDaysRevenue(7);

  for (const lead of closedLeads) {
    if (!lead.created_at) continue;

    const d = new Date(lead.created_at);
    const day = `${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

    const idx = revenueSeries.findIndex((x) => x.date === day);

    if (idx !== -1) {
      revenueSeries[idx].revenue += lead.revenue ?? 0;
      revenueSeries[idx].closed += 1;
    }
  }

  const pipelineData = STATUS_ORDER.map((status) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: normalizedLeads.filter((l) => l.status === status).length,
  }));

  const priorityData = [
    {
      name: "Emergency",
      value: normalizedLeads.filter((l) => l.priority === "emergency").length,
    },
    {
      name: "Medium",
      value: normalizedLeads.filter((l) => l.priority === "medium").length,
    },
    {
      name: "Low",
      value: normalizedLeads.filter((l) => l.priority === "low").length,
    },
  ];

  const recentClosed = [...closedLeads]
    .sort((a, b) => {
      const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
      const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 5);

  return (
    <main className="p-6 min-h-screen">
        <Navbar />
      <div className="max-w-7xl mx-auto m-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Analytics</h1>
          <p className="text-sm text-gray-400 mt-1">
            Revenue, pipeline, and performance insights.
          </p>
        </div>

        {loading ? (
          <div className="border rounded-xl p-6">Loading analytics...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
              <div className="border rounded-xl p-4">
                <div className="text-sm text-gray-400">Total Revenue</div>
                <div className="text-2xl font-semibold">
                  ${totalRevenue.toLocaleString()}
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="text-sm text-gray-400">Revenue (7d)</div>
                <div className="text-2xl font-semibold">
                  ${revenueThisWeek.toLocaleString()}
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="text-sm text-gray-400">Avg Job Value</div>
                <div className="text-2xl font-semibold">
                  ${averageJobValue.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="text-sm text-gray-400">Closed Jobs</div>
                <div className="text-2xl font-semibold">{closedLeads.length}</div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="text-sm text-gray-400">Close Rate</div>
                <div className="text-2xl font-semibold">{closeRate}%</div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
              <div className="border rounded-xl p-4">
                <div className="font-semibold mb-3">Revenue (Last 7 Days)</div>
                <div style={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer>
                    <BarChart data={revenueSeries}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis allowDecimals={false} />
                      <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                      <Bar dataKey="revenue" fill="#22c55e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="font-semibold mb-3">Closed Jobs (Last 7 Days)</div>
                <div style={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer>
                    <LineChart data={revenueSeries}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="closed"
                        strokeWidth={2}
                        dot
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
              <div className="border rounded-xl p-4">
                <div className="font-semibold mb-3">Pipeline Breakdown</div>
                <div style={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer>
                    <BarChart data={pipelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-3 text-sm text-gray-400 flex flex-wrap gap-4">
                  <div>
                    Booked rate: <span className="font-semibold text-white">{bookedRate}%</span>
                  </div>
                  <div>
                    Close rate: <span className="font-semibold text-white">{closeRate}%</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="font-semibold mb-3">Priority Mix</div>
                <div style={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={priorityData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                      >
                        <Cell fill="#ef4444" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#3b82f6" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="font-semibold mb-3">Recent Closed Jobs</div>
                <div className="space-y-3">
                  {recentClosed.length === 0 ? (
                    <div className="text-sm text-gray-400">
                      No closed jobs yet.
                    </div>
                  ) : (
                    recentClosed.map((lead) => (
                      <div key={lead.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <div className="font-medium">
                              {lead.name || "No name"}
                            </div>
                            <div className="text-sm text-gray-400">
                              {lead.issue || "No issue"}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {formatDate(lead.created_at)}
                            </div>
                          </div>

                          <div className="font-semibold">
                            ${(lead.revenue ?? 0).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="border rounded-xl p-4">
              <div className="font-semibold mb-2">Quick Summary</div>
              <div className="text-sm text-gray-300 flex flex-wrap gap-6">
                <div>Total Leads: <span className="font-semibold text-white">{totalLeads}</span></div>
                <div>Booked Jobs: <span className="font-semibold text-white">{bookedLeads.length}</span></div>
                <div>Closed This Week: <span className="font-semibold text-white">{closedThisWeek}</span></div>
                <div>Revenue per Closed Job: <span className="font-semibold text-white">${averageJobValue.toFixed(0)}</span></div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}