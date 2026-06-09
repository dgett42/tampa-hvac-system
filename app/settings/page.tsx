"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/client";

type CompanySettings = {
  id: string;
  name: string;
  slug: string;
  phone: string | null;
  email: string | null;
  timezone: string | null;
  default_job_value: number | null;
  email_notifications: boolean | null;
  sms_notifications: boolean | null;
};

export default function SettingsPage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [savingCompany, setSavingCompany] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [accountEmail, setAccountEmail] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [slug, setSlug] = useState("");
  const [phone, setPhone] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [timezone, setTimezone] = useState("America/New_York");
  const [defaultJobValue, setDefaultJobValue] = useState("450");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const publicRequestUrl = useMemo(() => {
  if (!slug) return "";

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://servicewingman.co";

  return `${siteUrl}/requests/${slug}`;
}, [slug]);

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User not logged in:", userError);
        setLoading(false);
        return;
      }

      setAccountEmail(user.email ?? null);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("company_id")
        .eq("id", user.id)
        .single();

      if (profileError || !profile?.company_id) {
        console.error("Company profile not found:", profileError);
        setLoading(false);
        return;
      }

      setCompanyId(profile.company_id);

      const { data: company, error: companyError } = await supabase
        .from("companies")
        .select(
          "id, name, slug, phone, email, timezone, default_job_value, email_notifications, sms_notifications"
        )
        .eq("id", profile.company_id)
        .single();

      if (companyError || !company) {
        console.error("Company settings not found:", companyError);
        setLoading(false);
        return;
      }

      const c = company as CompanySettings;

      setBusinessName(c.name ?? "");
      setSlug(c.slug ?? "");
      setPhone(c.phone ?? "");
      setBusinessEmail(c.email ?? "");
      setTimezone(c.timezone ?? "America/New_York");
      setDefaultJobValue(String(c.default_job_value ?? 450));
      setEmailNotifications(c.email_notifications ?? true);
      setSmsNotifications(c.sms_notifications ?? false);

      setLoading(false);
    }

    loadSettings();
  }, [supabase]);

  async function saveCompanySettings(e: React.FormEvent) {
    e.preventDefault();

    if (!companyId) {
      alert("No company found for this account.");
      return;
    }

    setSavingCompany(true);

    const { error } = await supabase
      .from("companies")
      .update({
        name: businessName,
        phone,
        email: businessEmail,
        timezone,
        default_job_value: Number(defaultJobValue) || 0,
        email_notifications: emailNotifications,
        sms_notifications: smsNotifications,
      })
      .eq("id", companyId);

    setSavingCompany(false);

    if (error) {
      console.error("Save settings error:", error);
      alert(error.message);
      return;
    }

    alert("Settings saved successfully.");
  }

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setPasswordLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setPasswordLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password updated successfully.");
    setNewPassword("");
    setConfirmPassword("");
  }

  async function copyRequestLink() {
    if (!publicRequestUrl) return;

    await navigator.clipboard.writeText(publicRequestUrl);
    alert("Request form link copied.");
  }

  return (
    <main className="page-shell min-h-screen">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-400">
            ServiceWingman Admin
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Settings
          </h1>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-400 shadow-xl shadow-black/20">
            Loading settings...
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <section className="space-y-6 lg:col-span-2">
              <form
                onSubmit={saveCompanySettings}
                className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20"
              >
                <SectionHeader
                  title="Business Profile"
                  description="Update the company information used across your dashboard and lead forms."
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    label="Business Name"
                    value={businessName}
                    onChange={setBusinessName}
                    placeholder="Example HVAC Company"
                  />

                  <TextInput
                    label="Company Slug"
                    value={slug}
                    onChange={setSlug}
                    disabled
                    helper="Used in your public request form URL."
                  />

                  <TextInput
                    label="Business Phone"
                    value={phone}
                    onChange={setPhone}
                    placeholder="(555) 123-4567"
                    type="tel"
                  />

                  <TextInput
                    label="Business Email"
                    value={businessEmail}
                    onChange={setBusinessEmail}
                    placeholder="office@example.com"
                    type="email"
                  />

                  <SelectInput
                    label="Time Zone"
                    value={timezone}
                    onChange={setTimezone}
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </SelectInput>

                  <TextInput
                    label="Default Job Value"
                    value={defaultJobValue}
                    onChange={setDefaultJobValue}
                    type="number"
                    placeholder="450"
                    helper="Used as a planning estimate for job value."
                  />
                </div>

                <div className="mt-6 border-t border-slate-800 pt-6">
                  <h3 className="text-lg font-semibold text-white">
                    Notifications
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Control how your company receives lead alerts.
                  </p>

                  <div className="mt-4 space-y-3">
                    <ToggleRow
                      title="Email Notifications"
                      description="Receive alerts when new leads come in."
                      checked={emailNotifications}
                      onChange={setEmailNotifications}
                    />

                    <ToggleRow
                      title="SMS Notifications"
                      description="Enable text alerts for urgent or new leads when SMS is configured."
                      checked={smsNotifications}
                      onChange={setSmsNotifications}
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-500">
                    Changes apply to this company account.
                  </p>

                  <button
                    type="submit"
                    disabled={savingCompany}
                    className="w-full rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {savingCompany ? "Saving..." : "Save Settings"}
                  </button>
                </div>
              </form>

              <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20">
                <SectionHeader
                  title="Public Request Form"
                  description="Share this link with customers so new HVAC requests are tied to your company."
                />

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20"
                    value={publicRequestUrl}
                    readOnly
                  />

                  <button
                    type="button"
                    onClick={copyRequestLink}
                    className="w-full rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400 sm:w-auto"
                  >
                    Copy Link
                  </button>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-sm font-medium text-white">
                    Customer-facing URL
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Customers can submit HVAC requests through this public form.
                    Submissions appear in your Leads page and dashboard.
                  </p>
                </div>
              </section>
            </section>

            <aside className="space-y-6">
              <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20">
                <SectionHeader
                  title="Account"
                  description="Your current ServiceWingman login."
                />

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">
                    Logged In As
                  </label>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-300">
                    {accountEmail ?? "Unknown"}
                  </div>
                </div>

                <div> 
                  <p className="mt-4 text-sm text-slate-500">
                    Manage Subscription
                  </p>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20">
                <SectionHeader
                  title="Account Security"
                  description="Update your login password."
                />

                <form onSubmit={updatePassword} className="space-y-4">
                  <TextInput
                    label="New Password"
                    value={newPassword}
                    onChange={setNewPassword}
                    type="password"
                    placeholder="Enter new password"
                    autoComplete="new-password"
                  />

                  <TextInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    type="password"
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                  />

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="w-full rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {passwordLoading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </section>

              <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20">
                <h2 className="text-lg font-semibold text-white">
                  Setup Checklist
                </h2>

                <div className="mt-4 space-y-3 text-sm">
                  <ChecklistItem
                    label="Business profile completed"
                    complete={Boolean(businessName && phone)}
                  />

                  <ChecklistItem
                    label="Public request link generated"
                    complete={Boolean(publicRequestUrl)}
                  />

                  <ChecklistItem
                    label="Email notifications configured"
                    complete={emailNotifications}
                  />

                  <ChecklistItem
                    label="SMS notifications enabled"
                    complete={smsNotifications}
                  />
                </div>
              </section>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled = false,
  helper,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  helper?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 disabled:cursor-not-allowed disabled:bg-slate-900 disabled:text-slate-500"
      />

      {helper && <p className="mt-1.5 text-xs text-slate-500">{helper}</p>}
    </label>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20"
      >
        {children}
      </select>
    </label>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <div>
        <p className="font-medium text-white">{title}</p>
        <p className="mt-1 text-sm leading-5 text-slate-400">{description}</p>
      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 shrink-0"
      />
    </label>
  );
}

function ChecklistItem({
  label,
  complete,
}: {
  label: string;
  complete: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
      <span className="text-slate-300">{label}</span>

      <span
        className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
          complete
            ? "border-green-500/30 bg-green-500/10 text-green-300"
            : "border-slate-700 bg-slate-900 text-slate-400"
        }`}
      >
        {complete ? "Done" : "Pending"}
      </span>
    </div>
  );
}