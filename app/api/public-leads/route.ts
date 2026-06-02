import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();

  const { slug, name, phone, email, issue, priority } = body;
  const cleanSlug = String(slug).trim().toLowerCase();

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: company, error: companyError } = await supabaseAdmin
    .from("companies")
    .select("id")
    .eq("slug", cleanSlug)
    .single();

  if (companyError || !company) {
    console.error("Company lookup failed:", {
      cleanSlug,
      companyError,
    });

    return NextResponse.json(
      { error: "Company not found" },
      { status: 404 }
    );
  }

  const { error: insertError } = await supabaseAdmin.from("leads").insert({
    name,
    phone,
    email,
    issue,
    priority: priority || "medium",
    status: "new",
    company_id: company.id,
  });

  if (insertError) {
    console.error("Lead insert error:", insertError);

    return NextResponse.json(
      { error: "Could not create lead" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}