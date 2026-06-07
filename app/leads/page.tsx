"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/client";

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

const statusFilters = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Booked", value: "booked" },
  { label: "Closed", value: "closed" },
  { label: "Lost", value: "lost" },
];

export default function LeadsPage() {
  const supabase = createClient();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [revenueInputs, setRevenueInputs] = useState<Record<string, string>>({});

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

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        searchText === "" ||
        lead.name?.toLowerCase().includes(searchText) ||
        lead.phone?.toLowerCase().includes(searchText) ||
        lead.email?.toLowerCase().includes(searchText) ||
        lead.city?.toLowerCase().includes(searchText) ||
        lead.service_type?.toLowerCase().includes(searchText) ||
        lead.issue?.toLowerCase().includes(searchText);

      return matchesStatus && matchesSearch;
    });
  }, [leads, statusFilter, search]);

  async function updateStatus(leadId: string, status: string) {
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", leadId);

    if (error) {
      console.error("Status update failed:", error);
      alert(error.message);
      return;
    }

    loadLeads();
  }

  async function saveRevenue(leadId: string) {
    const raw = revenueInputs[leadId] ?? "";
    const value = Number(raw);

    if (raw.trim() === "" || Number.isNaN(value)) {
      alert("Enter a valid revenue amount");
      return;
    }

    const { error } = await supabase
      .from("leads")
      .update({ revenue: value })
      .eq("id", leadId);

    if (error) {
      console.error("Revenue update failed:", error);
      alert(error.message);
      return;
    }

    loadLeads();
  }

  return (
    <main className="page-shell min-h-screen">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-400">
                Lead Management
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Leads
              </h1>
            </div>

            <button
              type="button"
              onClick={loadLeads}
              disabled={loading}
              className="w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
            >
              {loading ? "Refreshing..." : "Refresh Leads"}
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Search leads
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, phone, email, city, service, or issue..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20"
              />
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setStatusFilter(filter.value)}
                  className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    statusFilter === filter.value
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-slate-700 bg-slate-950 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/20">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Lead Inbox
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Showing {filteredLeads.length} of {leads.length} leads.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 text-center text-slate-400">
              Loading leads...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 text-center">
              <p className="font-medium text-white">No matching leads</p>
              <p className="mt-2 text-sm text-slate-400">
                Try changing your search or status filter.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLeads.map((lead) => {
                const expanded = expandedLeadId === lead.id;

                return (
                  <div
                    key={lead.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-white">
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

                        <div className="mt-3 grid gap-2 text-sm text-slate-400 sm:grid-cols-2 xl:grid-cols-4">
                          <span>Phone: {formatValue(lead.phone)}</span>
                          <span>Email: {formatValue(lead.email)}</span>
                          <span>
                            Location:{" "}
                            {lead.city || lead.state
                              ? `${lead.city || ""}${
                                  lead.city && lead.state ? ", " : ""
                                }${lead.state || ""}`
                              : "Not provided"}
                          </span>
                          <span>
                            Submitted:{" "}
                            {new Date(lead.created_at).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(lead.id, e.target.value)
                          }
                          className={`w-full rounded-xl border px-3 py-2 text-sm font-medium outline-none sm:w-auto ${getStatusClass(
                            lead.status
                          )}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="booked">Booked</option>
                          <option value="closed">Closed</option>
                          <option value="lost">Lost</option>
                        </select>

                        <button
                          type="button"
                          onClick={() =>
                            setExpandedLeadId(expanded ? null : lead.id)
                          }
                          className="w-full rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 sm:w-auto"
                        >
                          {expanded ? "Hide Details" : "View Details"}
                        </button>
                      </div>
                    </div>

                    {expanded && (
                      <div className="mt-5 border-t border-slate-800 pt-5">
                        <div className="grid gap-4 lg:grid-cols-3">
                          <InfoPanel title="Contact">
                            <InfoRow label="Name" value={lead.name} />
                            <InfoRow label="Phone" value={lead.phone} />
                            <InfoRow label="Email" value={lead.email} />
                            <InfoRow
                              label="SMS Consent"
                              value={lead.sms_consent ? "Yes" : "No"}
                            />
                          </InfoPanel>

                          <InfoPanel title="Service Address">
                            <InfoRow
                              label="Street"
                              value={lead.street_address}
                            />
                            <InfoRow label="City" value={lead.city} />
                            <InfoRow label="State" value={lead.state} />
                            <InfoRow label="ZIP" value={lead.zip_code} />
                            <InfoRow
                              label="Property"
                              value={lead.property_type}
                            />
                          </InfoPanel>

                          <InfoPanel title="Request">
                            <InfoRow
                              label="Service"
                              value={lead.service_type}
                            />
                            <InfoRow label="Priority" value={lead.priority} />
                            <InfoRow
                              label="Preferred Date"
                              value={lead.preferred_date}
                            />
                            <InfoRow
                              label="Preferred Time"
                              value={lead.preferred_time}
                            />
                            <InfoRow
                              label="Authorized"
                              value={lead.authorized ? "Yes" : "No"}
                            />
                          </InfoPanel>

                          <InfoPanel title="System Details">
                            <InfoRow
                              label="System Type"
                              value={lead.system_type}
                            />
                            <InfoRow
                              label="System Age"
                              value={lead.system_age}
                            />
                            <InfoRow label="Brand" value={lead.system_brand} />
                            <InfoRow
                              label="Maintenance"
                              value={lead.last_maintenance}
                            />
                            <InfoRow
                              label="Indoor Temp"
                              value={lead.current_temp}
                            />
                          </InfoPanel>

                          <InfoPanel title="Issue Details">
                            <InfoRow
                              label="Issue Started"
                              value={lead.issue_started}
                            />
                            <InfoRow label="Status" value={lead.status} />
                            <InfoRow
                              label="Revenue"
                              value={
                                lead.revenue
                                  ? `$${lead.revenue.toLocaleString()}`
                                  : null
                              }
                            />
                          </InfoPanel>
                        </div>

                        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
                          <h4 className="mb-2 text-sm font-semibold text-white">
                            Issue Description
                          </h4>
                          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
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
                              value={
                                revenueInputs[lead.id] ??
                                lead.revenue?.toString() ??
                                ""
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
                              onClick={() => saveRevenue(lead.id)}
                              className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400 sm:w-auto"
                            >
                              Save Revenue
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
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