import Link from "next/link";
import Navbar from "@/components/Navbarb";

const plans = [
  {
    name: "Starter",
    planId: "starter",
    price: "$149",
    period: "/mo",
    description: "For small service businesses just tracking leads.",
    badge: "",
    features: [
      "Lead capture form",
      "Admin dashboard",
      "Lead status tracking",
      "Basic analytics",
      "Customer notes",
      "Email notifications",
    ],
    cta: "Start Starter",
  },
  {
    name: "Pro",
    planId: "pro",
    price: "$249",
    period: "/mo",
    description:
      "For businesses that want faster follow-up and better organization.",
    badge: "Best Starting Offer",
    features: [
      "Everything in Starter",
      "SMS notifications",
      "Automated follow-up texts",
      "Better analytics",
      "Close-rate tracking",
      "Missed opportunity tracking",
      "Custom branding/company page",
    ],
    cta: "Start Pro",
    highlighted: true,
  },
  {
    name: "Wingman AI",
    planId: "ai",
    price: "$399",
    period: "/mo",
    description: "For companies that want insights and sales help.",
    badge: "Growth Plan",
    features: [
      "Everything in Pro",
      "AI lead analysis",
      "AI follow-up suggestions",
      "Lead quality scoring",
      "Most likely to close lead list",
      "Weekly performance summary",
      "Revenue leak suggestions",
    ],
    cta: "Start Wingman AI",
  },
];

const enterpriseFeatures = [
  "Multiple users",
  "Multiple locations",
  "Advanced reporting",
  "Call tracking integration",
  "Priority support",
  "Custom setup",
  "Team onboarding",
  "Dedicated growth support",
];

export default function PricingPage() {
  return (
    <main className="page-shell min-h-screen">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
            ServiceWingman Pricing
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Choose the plan that fits your service business.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            Select a plan, create your account, then finish checkout securely
            through Stripe.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border p-6 shadow-2xl shadow-black/20 ${
                plan.highlighted
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-slate-800 bg-slate-900/80"
              }`}
            >
              {plan.badge && (
                <div
                  className={`mb-5 w-fit rounded-full border px-3 py-1 text-xs font-semibold ${
                    plan.highlighted
                      ? "border-blue-400 bg-blue-500 text-white"
                      : "border-slate-700 bg-slate-950 text-slate-300"
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              <h2 className="text-2xl font-bold text-white">{plan.name}</h2>

              <p className="mt-3 min-h-14 text-sm leading-6 text-slate-400">
                {plan.description}
              </p>

              <div className="mt-6 flex items-end gap-1">
                <span className="text-4xl font-bold tracking-tight text-white">
                  {plan.price}
                </span>

                <span className="pb-1 text-sm font-medium text-slate-400">
                  {plan.period}
                </span>
              </div>

              <Link
                href={`/signup?plan=${plan.planId}`}
                className={`mt-6 rounded-xl px-5 py-3 text-center font-semibold transition ${
                  plan.highlighted
                    ? "bg-blue-500 text-white hover:bg-blue-400"
                    : "border border-slate-700 text-slate-200 hover:bg-slate-800"
                }`}
              >
                {plan.cta}
              </Link>

              <div className="mt-6 border-t border-slate-800 pt-6">
                <p className="mb-4 text-sm font-semibold text-white">
                  Includes:
                </p>

                <ul className="space-y-3 text-sm leading-6 text-slate-300">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-0.5 text-blue-400">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-blue-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 shadow-2xl shadow-blue-950/40">
          <div className="grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
            <div>
              <div className="mb-5 w-fit rounded-full border border-blue-400 bg-blue-500 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Built for Growing Teams
              </div>

              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Enterprise
              </h2>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Built for serious service companies with larger teams, multiple
                locations, custom workflows, advanced reporting, and deeper
                support needs.
              </p>

              <div className="mt-8 flex flex-wrap items-end gap-3">
                <span className="text-5xl font-bold tracking-tight text-white">
                  Custom
                </span>

                <span className="pb-2 text-lg font-semibold text-blue-300">
                  $500+/mo
                </span>
              </div>

              <Link
                href="mailto:servicewingmancrm@servicewingman.co?subject=ServiceWingman Enterprise Plan"
                className="mt-8 inline-flex rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
              >
                Contact Sales
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-700/80 bg-slate-950/70 p-6">
              <p className="mb-5 text-sm font-semibold uppercase tracking-wide text-blue-400">
                Enterprise includes:
              </p>

              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {enterpriseFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-sm text-slate-300"
                  >
                    <span className="text-blue-400">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-slate-500">
          Prices are subject to change as ServiceWingman features expand.
          Custom setup, SMS usage, AI usage, and advanced integrations may have
          additional costs.
        </div>
      </section>
    </main>
  );
}