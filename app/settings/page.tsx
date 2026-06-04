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
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/requests/${slug}`;
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
    <main className="p-6 min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-5xl p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500">
            Manage your company profile, public request form, notifications, and account security.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-6 shadow text-slate-600">
            Loading settings...
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <section className="lg:col-span-2 space-y-6">
              <form
                onSubmit={saveCompanySettings}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <h2 className="text-xl font-semibold text-slate-900 mb-1">
                  Business Profile
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                  This information controls how your company appears inside the dashboard.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Business Name
                    </label>
                    <input
                      className="w-full rounded-lg border p-3 text-slate-900"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Company Slug
                    </label>
                    <input
                      className="w-full rounded-lg border p-3 text-slate-500 bg-slate-100"
                      value={slug}
                      disabled
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      Used in your public request form URL.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Business Phone
                    </label>
                    <input
                      className="w-full rounded-lg border p-3 text-slate-900"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Business Email
                    </label>
                    <input
                      className="w-full rounded-lg border p-3 text-slate-900"
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Time Zone
                    </label>
                    <select
                      className="w-full rounded-lg border p-3 text-slate-900"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                    >
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Default Job Value
                    </label>
                    <input
                      className="w-full rounded-lg border p-3 text-slate-900"
                      type="number"
                      value={defaultJobValue}
                      onChange={(e) => setDefaultJobValue(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-6 border-t pt-5">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Notifications
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <div className="font-medium text-slate-900">
                          Email Notifications
                        </div>
                        <div className="text-sm text-slate-500">
                          Receive alerts when new leads come in.
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                        className="h-5 w-5"
                      />
                    </label>

                    <label className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <div className="font-medium text-slate-900">
                          SMS Notifications
                        </div>
                        <div className="text-sm text-slate-500">
                          Future option for text alerts on urgent leads.
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={smsNotifications}
                        onChange={(e) => setSmsNotifications(e.target.checked)}
                        className="h-5 w-5"
                      />
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={savingCompany}
                  className="mt-6 rounded-lg bg-black px-5 py-3 text-white font-medium cursor-pointer disabled:opacity-60"
                >
                  {savingCompany ? "Saving..." : "Save Company Settings"}
                </button>
              </form>

              <section className="rounded-2xl bg-white p-6 shadow">
                <h2 className="text-xl font-semibold text-slate-900 mb-1">
                  Public Request Form
                </h2>
                <p className="text-sm text-slate-500 mb-4">
                  Share this link with customers so new requests are tied to your company.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    className="flex-1 rounded-lg border p-3 text-slate-900 bg-slate-50"
                    value={publicRequestUrl}
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={copyRequestLink}
                    className="rounded-lg bg-blue-600 px-5 py-3 text-white font-medium cursor-pointer hover:bg-blue-700 transition"
                  >
                    Copy Link
                  </button>
                </div>
              </section>
            </section>

            <aside className="space-y-6">
              <section className="rounded-2xl bg-white p-6 shadow">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Account
                </h2>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Logged In As
                  </label>
                  <div className="rounded-lg border p-3 text-slate-900 bg-slate-50">
                    {accountEmail ?? "Unknown"}
                  </div>
                </div>
              </section>

              <section className="rounded-2xl bg-white p-6 shadow">
                <h2 className="text-xl font-semibold text-slate-900 mb-1">
                  Account Security
                </h2>
                <p className="text-sm text-slate-500 mb-5">
                  Update your login password.
                </p>

                <form onSubmit={updatePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      autoComplete="new-password"
                      className="w-full rounded-lg border p-3 text-slate-900"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      autoComplete="new-password"
                      className="w-full rounded-lg border p-3 text-slate-900"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="w-full rounded-lg bg-red-600 px-5 py-3 text-white font-medium cursor-pointer hover:bg-red-700 transition disabled:opacity-60"
                  >
                    {passwordLoading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </section>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}