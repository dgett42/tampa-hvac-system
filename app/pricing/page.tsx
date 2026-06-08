import Link from "next/link";
import Navbar from "@/components/Navbarb";
import upgradeButton from "@/components/upgradeButtons";
import UpgradeButton from "@/components/upgradeButtons";

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
    cta: "Get Started",
    href: "mailto:support@servicewingman.co?subject=ServiceWingman Starter Plan",
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
    cta: "Start with Pro",
    href: "mailto:support@servicewingman.co?subject=ServiceWingman Pro Plan",
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
    cta: "Ask About AI",
    href: "mailto:support@servicewingman.co?subject=ServiceWingman Wingman AI Plan",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For larger teams, multiple locations, and advanced needs.",
    badge: "$500+",
    features: [
      "Multiple users",
      "Multiple locations",
      "Advanced reporting",
      "Call tracking integration",
      "Priority support",
      "Custom setup",
    ],
    cta: "Contact Sales",
    href: "mailto:support@servicewingman.co?subject=ServiceWingman Enterprise Plan",
  },
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
            Simple plans for turning more service leads into booked jobs.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            Start with lead capture and follow-up tracking, then grow into SMS
            automation, better analytics, and AI-powered sales insights.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
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

                {plan.period && (
                  <span className="pb-1 text-sm font-medium text-slate-400">
                    {plan.period}
                  </span>
                )}
              </div>

              {plan.planId ? (
                <div className="mt-6">
                  <UpgradeButton plan={plan.planId as "starter" | "pro" | "ai"} />
                </div>
              ) : (
                <Link
                  href={plan.href}
                  className="mt-6 rounded-xl border border-slate-700 px-5 py-3 text-center font-semibold text-slate-200 transition hover:bg-slate-800"
                >
                  {plan.cta}
                </Link>
              )}

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

        <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 md:p-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
                Recommended starting point
              </p>

              <h2 className="text-3xl font-bold text-white">
                Start with Pro. Upgrade to Wingman AI when the AI features are
                ready.
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                The Pro plan is the best starting offer because it gives service
                businesses the core value: faster follow-up, SMS alerts, better
                organization, and stronger lead tracking.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <h3 className="text-lg font-semibold text-white">
                Best early offer
              </h3>

              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <span>Pro Plan</span>
                  <span className="font-semibold text-white">$199/mo</span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <span>Wingman AI</span>
                  <span className="font-semibold text-white">$299/mo</span>
                </div>
              </div>

              <Link
                href="mailto:support@servicewingman.co?subject=ServiceWingman Pricing"
                className="mt-5 block rounded-xl bg-blue-500 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-400"
              >
                Talk About a Plan
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-slate-500">
          Prices are subject to change as ServiceWingman features expand.
          Custom setup, SMS usage, and advanced integrations may have additional
          costs.
        </div>
      </section>
    </main>
  );
}