"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabaseClient";

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
  const supabase = getSupabase();

  type Lead = {
  id: string;
  name: string;
  phone: string;
  status: string;
  created_at: string;
  priority: string;
  issue: string;
  revenue: number | null;
};

  const [leads, setLeads] = useState<Lead[]>([]);
  const [revenueInputs, setRevenueInputs] = useState<Record<string, string>>({});

  async function loadLeads() {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("loadLeads error:", error);
    return;
  }

  console.log("loaded leads:", data?.length);
  setLeads(data ?? []);
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


  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
  <div className="p-4 border rounded-lg">
    <div className="text-sm text-gray-500">Total Leads</div>
    <div className="text-xl font-semibold">{totalLeads}</div>
  </div>

  <div className="p-4 border rounded-lg">
    <div className="text-sm text-gray-500">Conversion Rate</div>
    <div className="text-xl font-semibold">{conversionRate}%</div>
  </div>

  <div className="p-4 border rounded-lg">
    <div className="text-sm text-gray-500">This Week</div>
    <div className="text-xl font-semibold">{thisWeek}</div>
  </div>

  <div className="p-4 border rounded-lg">
    <div className="text-sm text-gray-500">Est. Revenue</div>
    <div className="text-xl font-semibold">
      ${totalRevenue.toLocaleString()}
    </div>
  </div>
</div>
<div className="border rounded-lg p-4 mb-6">
  <div className="font-semibold mb-2">Leads (Last 7 Days)</div>
  <div style={{ width: "100%", height: 240 }}>
    <ResponsiveContainer>
      <LineChart data={series}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip labelStyle={{color: "#000000ff"}}/>
        <Line type="monotone" dataKey="count" strokeWidth={2} dot />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

<div className="border rounded-lg p-4 mb-6">
  <div className="font-semibold mb-2">Pipeline Breakdown</div>
  <div style={{ width: "100%", height: 260 }}>
    <ResponsiveContainer>
      <BarChart data={statusSeries}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip labelStyle={{color: "#000000ff"}}/>
        <Legend />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  <div className="mt-3 text-sm text-gray-600 flex flex-wrap gap-4">
    <div>Booked rate: <span className="font-semibold text-White">{bookedRate}%</span></div>
    <div>Close rate: <span className="font-semibold text-White">{closeRate}%</span></div>
    <div>Emergency: <span className="font-semibold text-White">{emergencyPct}%</span></div>
  </div>
</div>




      <div className="space-y-4">
        {leads.map((lead) => (
  <div key={lead.id} className="border p-4 rounded-lg">
    <div className="flex justify-between items-center">
      <div>
        <div className="font-semibold">{lead.name}</div>
        <div>{lead.phone}</div>
        <div className="text-sm text-gray-600">
          Priority: {lead.priority}
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
        className={`border p-2 rounded text-black ${
          lead.status === "new"
            ? "bg-blue-100"
            : lead.status === "contacted"
            ? "bg-yellow-100"
            : lead.status === "booked"
            ? "bg-green-100"
            : lead.status === "closed"
            ? "bg-gray-300"
            : lead.status === "lost"
            ? "bg-red-100"
            : ""
          
        }`}
      >
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="booked">Booked</option>
        <option value="closed">Closed</option>
        <option value="lost">Lost</option>
      </select>
    </div>

    <p className="mt-2">{lead.issue}</p>

    {lead.status === "closed" && (
  <div className="mt-2 flex gap-2">
    <input
      type="text"
      inputMode="decimal"
      placeholder="Enter revenue"
      className="border p-2 rounded w-full text-black bg-white"
      value={revenueInputs[lead.id] ?? (lead.revenue?.toString() ?? "")}
      onChange={(e) => {
        setRevenueInputs((prev) => ({
          ...prev,
          [lead.id]: e.target.value,
        }));
      }}
    />

    <button
      className="px-3 rounded bg-black text-white"
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
    <div className="text-xs text-gray-500 mt-2">
      {new Date(lead.created_at).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </div>
  </div>
))}
        </div>
    </main>
  );
}


