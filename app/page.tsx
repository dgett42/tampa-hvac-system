import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Tampa HVAC System
        </h1>

        <p className="text-slate-500 mb-8">
          Manage HVAC leads from the admin dashboard or submit a new service
          request through the public request form.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin"
            className="rounded-xl border p-6 hover:bg-slate-50 transition"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Admin Dashboard
            </h2>
            <p className="text-sm text-slate-500">
              Log in to view and manage company leads.
            </p>
          </Link>

          <Link
            href="/requests/slug"
            className="rounded-xl border p-6 hover:bg-slate-50 transition"
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Request Service
            </h2>
            <p className="text-sm text-slate-500">
              Submit a public HVAC service request.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}