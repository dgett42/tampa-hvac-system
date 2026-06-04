import Navbar from "@/components/Navbarb";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-950/80">
        <Navbar />
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-400">
            Lead management for home service businesses
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Your wingman for turning service leads into booked jobs.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            ServiceWingman helps HVAC and home service businesses capture,
            organize, and follow up with leads so fewer opportunities slip
            through the cracks.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-lg bg-blue-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-400"
            >
              Get Started
            </Link>

            <Link
              href="#features"
              className="rounded-lg border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
            >
              See Features
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-white">
              Missed leads cost real money.
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-300">
              Many service businesses lose jobs because calls, form submissions,
              and follow-ups are scattered across texts, emails, notebooks, and
              memory. ServiceWingman gives your team one simple place to track
              every lead from first contact to booked job.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
            What ServiceWingman helps with
          </p>

          <h2 className="text-3xl font-bold text-white">
            Built for simple, fast lead follow-up.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold text-white">
              Capture Every Lead
            </h3>

            <p className="mt-3 leading-7 text-slate-300">
              Collect leads from website forms and organize them in one clear
              dashboard instead of losing them in emails or missed calls.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold text-white">
              Track Follow-Ups
            </h3>

            <p className="mt-3 leading-7 text-slate-300">
              See who needs a call back, who has been contacted, and which leads
              still need attention before they go cold.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold text-white">
              Book More Jobs
            </h3>

            <p className="mt-3 leading-7 text-slate-300">
              Keep your sales pipeline organized so your team can move faster,
              follow up better, and turn more inquiries into scheduled work.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-white">
              Ready to stop losing leads?
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-300">
              ServiceWingman helps your team capture, track, and follow up with
              leads so more service requests become booked jobs.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:support@servicewingman.co"
                className="rounded-lg bg-blue-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-400"
              >
                Contact ServiceWingman
              </a>

              <Link
                href="/privacy"
                className="rounded-lg border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="rounded-lg border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
              >
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} ServiceWingman. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="#features" className="hover:text-white">
              Features
            </Link>

            <Link href="#contact" className="hover:text-white">
              Contact
            </Link>

            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}