import Link from "next/link";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold tracking-tight text-white">
            ServiceWingman
          </Link>

          <nav className="flex items-center gap-6 text-sm text-slate-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>

            <Link href="/features" className="text-white">
              Features
            </Link>

            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-400">
            ServiceWingman Features
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Everything you need to manage leads without overcomplicating your business.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            ServiceWingman gives home service businesses a simple system to
            capture leads, track follow-ups, organize opportunities, and turn
            more inquiries into booked jobs.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/#contact"
              className="rounded-lg bg-blue-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-400"
            >
              Get Started
            </Link>

            <Link
              href="/"
              className="rounded-lg border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
              Core tools
            </p>

            <h2 className="text-3xl font-bold text-white">
              Built around the way service businesses actually work.
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-300">
              ServiceWingman is designed for contractors who need something
              cleaner than a spreadsheet but simpler than a massive CRM.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FeatureCard
              title="Lead Capture"
              description="Collect incoming leads from website forms and keep them organized in one central dashboard."
            />

            <FeatureCard
              title="Lead Dashboard"
              description="See new, contacted, quoted, booked, and closed leads in one simple view so nothing gets forgotten."
            />

            <FeatureCard
              title="Follow-Up Tracking"
              description="Track who needs a call, who has already been contacted, and which leads are starting to go cold."
            />

            <FeatureCard
              title="Lead Status Updates"
              description="Move leads through clear stages so your team always knows where each opportunity stands."
            />

            <FeatureCard
              title="Customer Notes"
              description="Add notes about service needs, appointment details, pricing conversations, and next steps."
            />

            <FeatureCard
              title="Team Visibility"
              description="Give your business a shared view of leads so owners, office staff, and technicians are not guessing."
            />
          </div>
        </div>
      </section>

      {/* Conversion Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
              Convert more opportunities
            </p>

            <h2 className="text-3xl font-bold text-white">
              Faster follow-up means more booked jobs.
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-300">
              A lead is most valuable when it is fresh. ServiceWingman helps
              your team stay organized so you can respond faster, follow up
              consistently, and keep potential customers from slipping away to a
              competitor.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold text-white">
              What ServiceWingman helps prevent:
            </h3>

            <ul className="mt-5 space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="text-blue-400">•</span>
                Missed website form submissions
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400">•</span>
                Forgotten callbacks
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400">•</span>
                Leads sitting too long without follow-up
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400">•</span>
                Confusion over who contacted the customer
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400">•</span>
                Lost revenue from disorganized lead tracking
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Simple Workflow */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
              Simple workflow
            </p>

            <h2 className="text-3xl font-bold text-white">
              From new lead to booked job.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <StepCard
              number="1"
              title="Capture"
              description="A customer submits a form or contacts your business."
            />

            <StepCard
              number="2"
              title="Organize"
              description="The lead appears in your dashboard with their information."
            />

            <StepCard
              number="3"
              title="Follow Up"
              description="Your team contacts the lead and tracks the next step."
            />

            <StepCard
              number="4"
              title="Book"
              description="The lead turns into a scheduled service call or estimate."
            />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
            Who it is for
          </p>

          <h2 className="text-3xl font-bold text-white">
            Made for home service companies.
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-300">
            ServiceWingman starts with HVAC businesses, but the system can fit
            many service companies that depend on fast lead response and strong
            follow-up.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <IndustryCard label="HVAC Companies" />
          <IndustryCard label="Plumbing Companies" />
          <IndustryCard label="Electrical Contractors" />
          <IndustryCard label="Roofing Companies" />
          <IndustryCard label="Landscaping Businesses" />
          <IndustryCard label="General Service Contractors" />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-white">
                Give your leads a system.
              </h2>

              <p className="mt-4 text-lg leading-8 text-slate-300">
                ServiceWingman helps home service businesses capture, organize,
                and follow up with leads so more opportunities become booked
                jobs.
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
                  Terms
                </Link>
              </div>
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
            <Link href="/" className="hover:text-white">
              Home
            </Link>

            <Link href="/features" className="hover:text-white">
              Features
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

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 leading-7 text-slate-300">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
        {number}
      </div>

      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 leading-7 text-slate-300">{description}</p>
    </div>
  );
}

function IndustryCard({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-center font-semibold text-slate-200">
      {label}
    </div>
  );
}