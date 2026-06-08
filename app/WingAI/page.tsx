// src/app/ai/page.tsx
import { getCompanyPlan } from "@/lib/getCompanyPlan";
import UpgradeButton from "@/components/upgradeButtons";

export default async function AIPage() {
  const company = await getCompanyPlan();

  const hasAI =
    company?.plan === "ai" &&
    company?.subscription_status === "active";

  if (!hasAI) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Wingman AI Locked</h1>
        <p className="mt-2 text-gray-600">
          Upgrade to Wingman AI to unlock lead scoring, AI suggestions, and revenue leak insights.
        </p>

        <div className="mt-6">
          <UpgradeButton plan="ai" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Wingman AI</h1>
      <p>Your AI tools go here.</p>
    </div>
  );
}