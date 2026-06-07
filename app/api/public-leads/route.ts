import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();

  const {   
    slug,
    name,
    phone,
    email,
    streetAddress,
    city,
    state,
    zipCode,
    propertyType,
    serviceType,
    priority,
    preferredDate,
    preferredTime,
    systemType,
    systemAge,
    systemBrand,
    lastMaintenance,
    issue,
    issueStarted,
    currentTemp,
    accessNotes,
    smsConsent,
    authorized, } = body;
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

  const { error: leadError } = await supabaseAdmin.from("leads").insert({
  company_id: company.id,

  name,
  phone,
  email,

  street_address: streetAddress,
  city,
  state,
  zip_code: zipCode,
  property_type: propertyType,

  service_type: serviceType,
  priority,
  preferred_date: preferredDate || null,
  preferred_time: preferredTime,

  system_type: systemType,
  system_age: systemAge,
  system_brand: systemBrand,
  last_maintenance: lastMaintenance,

  issue,
  issue_started: issueStarted,
  current_temp: currentTemp,
  access_notes: accessNotes,

  sms_consent: smsConsent,
  authorized,

  status: "new",
});

  if (leadError) {
    console.error("Lead insert error:", leadError);

    return NextResponse.json(
      { error: "Could not create lead" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}