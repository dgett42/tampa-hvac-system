"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabase } from "@/lib/supabaseClient";

type Lead = {
  id: string;
  name: string | null;
  phone: string | null;
  email?: string | null;
  issue: string | null;
  status: string | null;
  priority: string | null;
  created_at: string | null;
  revenue?: number | null;
};

const STATUS_ORDER = ["new", "contacted", "booked", "closed", "lost"] as const;

function formatDate(date: string | null) {
  if (!date) return "No date";

  return new Date(date).toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short",
    timeZoneName: "short",
  });
}

function statusLabel(status: string) {
  switch (status) {
    case "new":
      return "New";
    case "contacted":
      return "Contacted";
    case "booked":
      return "Booked";
    case "closed":
      return "Closed";
    case "lost":
      return "Lost";
    default:
      return "Other";
  }
}

function priorityClasses(priority: string | null) {
  const p = (priority || "").toLowerCase().trim();

  switch (p) {
    case "emergency":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

function statusClasses(status: string | null) {
  const s = (status || "").toLowerCase().trim();

  switch (s) {
    case "new":
      return "bg-blue-100 text-blue-800";
    case "contacted":
      return "bg-yellow-100 text-yellow-800";
    case "booked":
      return "bg-purple-100 text-purple-800";
    case "closed":
      return "bg-green-100 text-green-800";
    case "lost":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function LeadsPage() {
  const supabase = getSupabase();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  async function loadLeads() {
    if (!supabase) {
     console.error("Supabase client not ready");
    return;
        }

    setLoading(true);

    const { data, error } = await supabase
      .from("leads")
      .select("*")
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

  const normalizedLeads = useMemo(() => {
    return leads.map((lead) => ({
      ...lead,
      status: (lead.status || "new").trim().toLowerCase(),
      priority: (lead.priority || "medium").trim().toLowerCase(),
    }));
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return normalizedLeads.filter((lead) => {
      const haystack = [
        lead.name || "",
        lead.phone || "",
        lead.email || "",
        lead.issue || "",
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = haystack.includes(search.toLowerCase());

      const matchesPriority =
        priorityFilter === "all" ? true : lead.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [normalizedLeads, search, priorityFilter]);

  const groupedLeads = useMemo(() => {
    return STATUS_ORDER.map((status) => ({
      status,
      leads: filteredLeads.filter((lead) => lead.status === status),
    }));
  }, [filteredLeads]);

  async function updateStatus(leadId: string, nextStatus: string) {
    if (!supabase) return;

    const { error } = await supabase
      .from("leads")
      .update({ status: nextStatus })
      .eq("id", leadId);

    if (error) {
      console.error("updateStatus error:", error);
      return;
    }

    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, status: nextStatus } : lead
      )
    );
  }

  return (
    <main className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Leads</h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage all customer leads by pipeline stage.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              placeholder="Search name, phone, email, or issue"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg border border-gray-700 bg-white text-black px-3 py-2 w-full md:w-80"
            />

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="rounded-lg border border-gray-700 bg-white text-black px-3 py-2"
            >
              <option value="all">All Priorities</option>
              <option value="emergency">Emergency</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="border rounded-xl p-6">Loading leads...</div>
        ) : (
          <div className="space-y-8">
            {groupedLeads.map((group) => (
              <section key={group.status} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {statusLabel(group.status)}
                  </h2>
                  <div className="text-sm text-gray-400">
                    {group.leads.length} lead{group.leads.length === 1 ? "" : "s"}
                  </div>
                </div>

                {group.leads.length === 0 ? (
                  <div className="border rounded-xl p-4 text-sm text-gray-400">
                    No leads in this category.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {group.leads.map((lead) => (
                      <div
                        key={lead.id}
                        className="border rounded-xl p-4 bg-black/20"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="text-lg font-semibold">
                                {lead.name || "No name"}
                              </div>

                              <span
                                className={`text-xs px-2 py-1 rounded-full border ${priorityClasses(
                                  lead.priority
                                )}`}
                              >
                                {lead.priority || "Not set"}
                              </span>
                            </div>

                            <div className="text-sm">
                              {lead.phone || "No phone"}
                            </div>

                            {lead.email && (
                              <div className="text-sm text-gray-300">
                                {lead.email}
                              </div>
                            )}

                            <div className="text-sm text-gray-400">
                              Created: {formatDate(lead.created_at)}
                            </div>
                          </div>

                          <div className="min-w-[160px]">
                            <label className="block text-xs text-gray-400 mb-1">
                              Status
                            </label>
                            <select
                              value={lead.status || "new"}
                              onChange={(e) =>
                                updateStatus(lead.id, e.target.value)
                              }
                              className={`w-full rounded-lg border p-2 bg-white text-black ${statusClasses(
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
                        </div>

                        <div className="mt-4">
                          <div className="text-xs text-gray-400 mb-1">Issue</div>
                          <div className="rounded-lg border p-3 text-sm">
                            {lead.issue || "No issue provided"}
                          </div>
                        </div>

                        {lead.status === "closed" && (
                          <div className="mt-4">
                            <div className="text-xs text-gray-400 mb-1">
                              Revenue
                            </div>
                            <div className="rounded-lg border p-3 text-sm">
                              ${Number(lead.revenue ?? 0).toLocaleString()}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}