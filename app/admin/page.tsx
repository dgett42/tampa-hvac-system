"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
  const [leads, setLeads] = useState<any[]>([]);

  async function loadLeads() {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setLeads(data || []);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

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
        className="border p-2 rounded"
      >
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="booked">Booked</option>
        <option value="closed">Closed</option>
        <option value="lost">Lost</option>
      </select>
    </div>

    <p className="mt-2">{lead.issue}</p>
    <div className="text-xs text-gray-500 mt-2">
      {new Date(lead.created_at).toLocaleString()}
    </div>
  </div>
))}
        </div>
    </main>
  );
}


