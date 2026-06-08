import { createClient } from "@/utils/supabase/server";

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