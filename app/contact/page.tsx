import Link from "next/link";
import Navbar from "@/components/Navbarb";

export default function ContactPage() {
  return (
    <main className="page-shell min-h-screen">
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
            Contact ServiceWingman
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Let’s talk about helping your service business capture more leads.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            Have questions about ServiceWingman, pricing, setup, or whether it
            fits your HVAC or home service business? Reach out and we’ll get
            back to you.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white">Send a message</h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Use the contact options below to ask about plans, onboarding,
              lead forms, SMS notifications, or getting your company set up.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <ContactCard
                title="General Questions"
                description="Ask about ServiceWingman, features, or setup."
                link="mailto:support@servicewingman.co?subject=ServiceWingman Question"
                linkText="support@servicewingman.co"
              />

              <ContactCard
                title="Pricing & Plans"
                description="Ask about Starter, Pro, Wingman AI, or Enterprise."
                link="mailto:support@servicewingman.co?subject=ServiceWingman Pricing"
                linkText="Ask about pricing"
              />

              <ContactCard
                title="Demo Request"
                description="Want to see how the dashboard and lead form work?"
                link="mailto:support@servicewingman.co?subject=ServiceWingman Demo Request"
                linkText="Request a demo"
              />

              <ContactCard
                title="Support"
                description="Need help with your account, dashboard, or public form?"
                link="mailto:support@servicewingman.co?subject=ServiceWingman Support"
                linkText="Get support"
              />
            </div>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <h3 className="font-semibold text-white">What to include</h3>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-400">
                <li>• Your business name</li>
                <li>• Your service area</li>
                <li>• Whether you are interested in Starter, Pro, Wingman AI, or Enterprise</li>
                <li>• Any questions about lead capture, SMS, analytics, or setup</li>
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
              <h2 className="text-xl font-bold text-white">
                Contact Information
              </h2>

              <div className="mt-5 space-y-4 text-sm">
                <InfoBlock label="Email" value="support@servicewingman.co" />
                <InfoBlock label="Website" value="servicewingman.co" />
                <InfoBlock label="Business Type" value="Lead management software for home service businesses" />
              </div>
            </div>

            <div className="rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 shadow-2xl shadow-black/20">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
                Recommended Plan
              </p>

              <h2 className="mt-3 text-2xl font-bold text-white">
                Start with Pro
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                The Pro plan is the best starting point for service businesses
                that want lead tracking, SMS notifications, follow-up tools, and
                better organization.
              </p>

              <Link
                href="/pricing"
                className="mt-5 inline-flex rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400"
              >
                View Pricing
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
              <h2 className="text-xl font-bold text-white">Quick Links</h2>

              <div className="mt-5 grid gap-3 text-sm font-medium text-slate-300">
                <Link
                  href="/features"
                  className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 transition hover:bg-slate-800 hover:text-white"
                >
                  Features
                </Link>

                <Link
                  href="/pricing"
                  className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 transition hover:bg-slate-800 hover:text-white"
                >
                  Pricing
                </Link>

                <Link
                  href="/legaldocs/privacy-policy"
                  className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 transition hover:bg-slate-800 hover:text-white"
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/legaldocs/terms-and-conditions"
                  className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 transition hover:bg-slate-800 hover:text-white"
                >
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function ContactCard({
  title,
  description,
  link,
  linkText,
}: {
  title: string;
  description: string;
  link: string;
  linkText: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>

      <a
        href={link}
        className="mt-4 inline-flex font-semibold text-blue-400 transition hover:text-blue-300 hover:underline"
      >
        {linkText}
      </a>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-slate-200">{value}</p>
    </div>
  );
}