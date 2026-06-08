import Link from "next/link";
import Navbar from "@/components/Navbarb";

const painPoints = [
  {
    title: "Good leads go cold",
    description:
      "When a lead sits too long without follow-up, the customer usually calls another company. Wingman AI helps surface the leads that need attention before the opportunity is gone.",
  },
  {
    title: "Owners do not have time to analyze every lead",
    description:
      "Most service businesses are busy running jobs, answering calls, and handling operations. Wingman AI helps turn raw lead activity into clear next steps.",
  },
  {
    title: "Not every lead deserves the same urgency",
    description:
      "Some leads are ready to book. Others are price-shopping or low intent. Wingman AI helps identify which leads appear most likely to turn into revenue.",
  },
];

const aiFeatures = [
  {
    title: "AI Lead Analysis",
    description:
      "Review each lead’s service type, urgency, issue description, system details, and customer notes to help your team understand the opportunity faster.",
  },
  {
    title: "Lead Quality Scoring",
    description:
      "Give your team a clearer signal on which leads appear strongest based on details like urgency, service need, system age, and customer intent.",
  },
  {
    title: "Follow-Up Suggestions",
    description:
      "Get suggested next steps for contacting leads, including what to ask, what to clarify, and how to move the customer toward booking.",
  },
  {
    title: "Most Likely to Close List",
    description:
      "Help your team focus on the leads that may deserve the fastest response instead of treating every inquiry the exact same way.",
  },
  {
    title: "Weekly Performance Summary",
    description:
      "See a simple summary of what happened that week: lead volume, booked jobs, closed jobs, lost opportunities, and follow-up gaps.",
  },
  {
    title: "Revenue Leak Suggestions",
    description:
      "Spot patterns that may be costing money, such as slow follow-up, missed high-priority leads, or leads that get contacted but never booked.",
  },
];

const workflow = [
  {
    step: "1",
    title: "A lead comes in",
    description:
      "A customer submits an HVAC request with their contact info, service need, system details, urgency, and issue description.",
  },
  {
    step: "2",
    title: "Wingman AI reviews the details",
    description:
      "The AI looks at the lead information and helps summarize what matters most for the business.",
  },
  {
    step: "3",
    title: "Your team sees what to do next",
    description:
      "Instead of guessing, the dashboard can show lead quality, recommended follow-up, and which opportunities need attention.",
  },
  {
    step: "4",
    title: "More leads get followed up",
    description:
      "The goal is simple: fewer missed opportunities, faster follow-up, and more service requests turning into booked jobs.",
  },
];

export default function WingmanAIPage() {
  return (
    <main className="page-shell min-h-screen">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-400">
              Wingman AI
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Stop guessing which leads are worth chasing.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Wingman AI is designed to help home service businesses understand
              their leads faster, prioritize follow-up, and spot missed revenue
              opportunities before they disappear.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-xl bg-blue-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-400"
              >
                Ask About Wingman AI
              </Link>

              <Link
                href="/pricing"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 transition hover:bg-slate-800"
              >
                View Pricing
              </Link>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Built for HVAC and home service companies that want faster,
              smarter lead follow-up.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 shadow-2xl shadow-black/30">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
                AI Opportunity Snapshot
              </p>

              <div className="mt-5 space-y-4">
                <InsightRow
                  label="Lead Quality"
                  value="High"
                  detail="Emergency AC repair, same-day need, older system"
                />

                <InsightRow
                  label="Suggested Action"
                  value="Call First"
                  detail="Customer likely needs urgent service"
                />

                <InsightRow
                  label="Revenue Risk"
                  value="Follow up fast"
                  detail="High-intent leads can go cold quickly"
                />

                <InsightRow
                  label="Next Step"
                  value="Book appointment"
                  detail="Confirm address, symptoms, and time window"
                />
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm font-semibold text-white">
                What the owner sees:
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                “This lead should be prioritized. The customer has an urgent
                cooling issue, provided useful system details, and appears more
                likely to book than a general estimate request.”
              </p>
            </div>
          </div>
        </div>

        {/* Pain Section */}
        <div className="mt-20 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 md:p-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
              The real problem
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-white">
              Most contractors do not lose jobs because they cannot do the work.
              They lose jobs because follow-up breaks down.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-300">
              A customer submits a request. Someone gets busy. The lead sits.
              The customer calls another company. By the time your team gets
              back to them, the job may already be gone.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {painPoints.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
              >
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
              What Wingman AI helps with
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Turn lead data into clear sales actions.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-300">
              Wingman AI is not just about having “AI” on the dashboard. The
              goal is to help service businesses respond faster, prioritize
              better, and understand where revenue is slipping away.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {aiFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-300">
                  ✦
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow */}
        <div className="mt-20 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 md:p-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
              How it works
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-white">
              From raw lead to recommended next step.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-300">
              Wingman AI helps make the lead follow-up process easier to
              understand, especially for busy owners, office staff, and small
              teams.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {workflow.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
                  {item.step}
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Argument */}
        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 md:p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
              Why it matters
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-white">
              One saved job can justify the tool.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-300">
              HVAC jobs can be valuable. If better follow-up helps save even one
              job that would have slipped away, the software can become much
              easier to justify. Wingman AI is built around that simple idea:
              help businesses stop leaking opportunities.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm font-semibold text-white">
                The sales question Wingman AI helps answer:
              </p>

              <p className="mt-3 text-lg font-semibold leading-8 text-blue-300">
                “Which lead should my team follow up with right now?”
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 md:p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
              Built for practical operators
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-white">
              Not complicated. Not bloated. Just useful.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-300">
              Service businesses do not need another confusing software system.
              They need clear information, fast follow-up, and simple answers.
              Wingman AI is designed to support the people doing the work, not
              slow them down.
            </p>

            <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-300">
              <li className="flex gap-3">
                <span className="text-blue-400">✓</span>
                See which leads may deserve priority.
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400">✓</span>
                Understand what to say on the follow-up.
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400">✓</span>
                Identify missed opportunities before they become patterns.
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400">✓</span>
                Give owners a clearer view of lead performance.
              </li>
            </ul>
          </div>
        </div>

        {/* Pricing CTA */}
        <div className="mt-20 rounded-3xl border border-blue-500/30 bg-blue-500/10 p-6 text-center shadow-2xl shadow-black/20 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-300">
            Wingman AI Plan
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Add sales intelligence to your lead follow-up.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Wingman AI is designed for companies that want more than a lead
            list. It helps turn every submission into a clearer decision:
            follow up, prioritize, book, or improve the process.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
            >
              Talk About Wingman AI
            </Link>

            <Link
              href="/pricing"
              className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              Compare Plans
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function InsightRow({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-slate-400">{label}</span>
        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-300">
          {value}
        </span>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
    </div>
  );
}