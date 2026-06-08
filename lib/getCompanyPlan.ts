import { createClient } from "@/utils/supabase/server";

export type Plan = "starter" | "pro" | "ai";

const planRank: Record<Plan, number> = {
  starter: 1,
  pro: 2,
  ai: 3,
};

export async function getCompanyPlan() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("company_id")
    .eq("id", user.id)
    .single();

  if (!profile?.company_id) return null;

  const { data: company } = await supabase
    .from("companies")
    .select("id, plan, subscription_status")
    .eq("id", profile.company_id)
    .single();

  return company;
}

export async function hasPlan(requiredPlan: Plan) {
  const company = await getCompanyPlan();

  if (!company) return false;

  if (company.subscription_status !== "active") {
    return false;
  }

  const currentPlan = company.plan as Plan;

  if (!currentPlan || !planRank[currentPlan]) {
    return false;
  }

  return planRank[currentPlan] >= planRank[requiredPlan];
}