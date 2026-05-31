"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {createClient} from "@/utils/supabase/client";


export default function SettingsPage() {
  const supabase = createClient();
  const [accountEmail, setAccountEmail] = useState<string | null>(null);

  const [businessName, setBusinessName] = useState("Tampa HVAC");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [email, setEmail] = useState("info@tampahvac.com");
  const [timezone, setTimezone] = useState("America/New_York");
  const [defaultJobValue, setDefaultJobValue] = useState("450");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading , setPasswordLoading] = useState(false);

  useEffect(() => {
  async function loadUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error loading user:", error);
      return;
    }

    setAccountEmail(user?.email ?? null);
  }

  loadUser();
}, [supabase]);

  function handleSave() {
    alert("Settings saved (for now this is just UI, not connected to Supabase yet).");
  }

  async function handleUpdatePassword(e: React.FormEvent) {
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

  return (
    <main className="p-6 min-h-screen">
        <Navbar />
      <div className="max-w-4xl mx-auto mt-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Settings</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage business details and app preferences.
          </p>
        </div>

        <div className="space-y-6">
          <section className="border rounded-xl p-5">
           <h2 className="text-xl font-semibold mb-4">Account</h2>
            
           <div>
             <label className="block text-sm text-gray-400 mb-1">
               Logged In As
             </label>
             <div className="w-full rounded-lg border p-2 text-black bg-white">
               {accountEmail ?? "Loading account..."}
             </div>
           </div>
          </section>
          
          <section className="border rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">Business Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full rounded-lg border p-2 text-black bg-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Business Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border p-2 text-black bg-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Business Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border p-2 text-black bg-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full rounded-lg border p-2 text-black bg-white"
                >
                  <option value="America/New_York">Eastern</option>
                  <option value="America/Chicago">Central</option>
                  <option value="America/Denver">Mountain</option>
                  <option value="America/Los_Angeles">Pacific</option>
                </select>
              </div>
            </div>
          </section>

          
          <section className="border rounded-xl p-5">
               <h2 className="text-xl font-semibold mb-4">Account Security</h2>

                <form onSubmit={handleUpdatePassword} className="max-w-sm">
            <label className="block text-sm text-gray-400 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border p-2 text-black bg-white mb-4"
              autoComplete="new-password"
            />

            <label className="block text-sm text-gray-400 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border p-2 text-black bg-white mb-4"
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={passwordLoading}
              className="px-5 py-2 rounded-lg bg-black text-white font-medium cursor-pointer disabled:opacity-60"
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
           </form>
          </section>
          

          <section className="border rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">Revenue Defaults</h2>

            <div className="max-w-sm">
              <label className="block text-sm text-gray-400 mb-1">
                Default Job Value
              </label>
              <input
                type="number"
                value={defaultJobValue}
                onChange={(e) => setDefaultJobValue(e.target.value)}
                className="w-full rounded-lg border p-2 text-black bg-white"
              />
              <p className="text-xs text-gray-500 mt-2">
                Useful if you want fallback revenue assumptions later.
              </p>
            </div>
          </section>

          <section className="border rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>

            <div className="space-y-3">
              <label className="flex items-center justify-between border rounded-lg p-3">
                <span>Email Notifications</span>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
              </label>

              <label className="flex items-center justify-between border rounded-lg p-3">
                <span>SMS Notifications</span>
                <input
                  type="checkbox"
                  checked={smsNotifications}
                  onChange={(e) => setSmsNotifications(e.target.checked)}
                />
              </label>
            </div>
          </section>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-white text-black font-medium"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}