import Link from "next/link";
import Navbar from "@/components/Navbarb";
import UpgradeButton from "@/components/upgradeButtons";
import { getCompanyPlan } from "@/lib/getCompanyPlan";

const plans = [
  {
    name: "Starter",
    planId: "starter",
    price: "$99/mo",
    description: "Basic lead tracking and dashboard access.",
  },
  {
    name: "Pro",
    planId: "pro",
    price: "$199/mo",
    description: "SMS notifications, automation, and better analytics.",
  },
  {
    name: "Wingman AI",
    planId: "ai",
    price: "$299/mo",
    description: "AI lead scoring, follow-up suggestions, and insights.",
  },
] as const;

const planRank = {
  starter: 1,
  pro: 2,
  ai: 3,
};

export default async function BillingPage() {
  const company = await getCompanyPlan();

  const currentPlan = company?.plan as "starter" | "pro" | "ai" | undefined;
  const status = company?.subscription_status || "inactive";

  return (
    <main className="page-shell min-h-screen">
      <Navbar />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-400">
            Billing
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            Manage your subscription
          </h1>

          <p className="mt-4 text-slate-300">
            View your current ServiceWingman plan and upgrade when your company
            is ready for more features.
          </p>
        </div>

        <div className="mb-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <h2 className="text-xl font-bold text-white">Current subscription</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Current plan</p>
              <p className="mt-1 text-2xl font-bold capitalize text-white">
                {currentPlan || "No active plan"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Status</p>
              <p className="mt-1 text-2xl font-bold capitalize text-white">
                {status}
              </p>
            </div>
          </div>

          {status !== "active" && (
            <p className="mt-5 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-200">
              Your subscription is not active. Choose a plan below to activate
              your account.
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const isCurrent =
              status === "active" && currentPlan === plan.planId;

            const isDowngrade =
              currentPlan &&
              planRank[plan.planId] < planRank[currentPlan];

            return (
              <div
                key={plan.planId}
                className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/80 p-6"
              >
                <h2 className="text-2xl font-bold text-white">{plan.name}</h2>

                <p className="mt-2 text-3xl font-bold text-white">
                  {plan.price}
                </p>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                  {plan.description}
                </p>

                <div className="mt-6">
                  {isCurrent ? (
                    <button
                      disabled
                      className="w-full rounded-xl bg-slate-800 px-5 py-3 font-semibold text-slate-400"
                    >
                      Current Plan
                    </button>
                  ) : isDowngrade ? (
                    <button
                      disabled
                      className="w-full rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-500"
                    >
                      Contact support to downgrade
                    </button>
                  ) : (
                    <UpgradeButton plan={plan.planId} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <h2 className="text-xl font-bold text-white">Need help?</h2>
          <p className="mt-3 text-slate-300">
            For downgrades, cancellations, Enterprise plans, or billing
            questions, contact support.
          </p>

          <Link
            href="mailto:support@servicewingman.co?subject=ServiceWingman Billing Help"
            className="mt-5 inline-block rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  );
}