import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/utils/supabase/supabaseAdmin";
import { sendSms } from "@/lib/sms";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const {
      name,
      phone,
      email,
      serviceType,
      message,
      smsConsent,
    } = body;

    const { data: company, error: companyError } = await supabaseAdmin
      .from("companies")
      .select(
        "id, name, phone, sms_enabled, sms_new_lead_notifications, sms_client_confirmation"
      )
      .eq("slug", slug)
      .single();

    if (companyError || !company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    const { data: lead, error: leadError } = await supabaseAdmin
      .from("leads")
      .insert({
        company_id: company.id,
        name,
        client_phone: phone,
        email,
        service_type: serviceType,
        message,
        sms_consent: Boolean(smsConsent),
      })
      .select()
      .single();

    if (leadError || !lead) {
      return NextResponse.json(
        { error: "Failed to create lead" },
        { status: 500 }
      );
    }

    // Text the HVAC company
    if (
      company.sms_enabled &&
      company.sms_new_lead_notifications &&
      company.phone
    ) {
      await sendSms(
        company.phone,
        `New HVAC lead for ${company.name}:
            Name: ${name}
            Phone: ${phone}
            Service: ${serviceType || "Not specified"}
            Message: ${message || "No message provided"}`
      );

      await supabaseAdmin
        .from("leads")
        .update({
          company_sms_sent_at: new Date().toISOString(),
        })
        .eq("id", lead.id);
    }

    // Text the client confirmation
    if (
      company.sms_enabled &&
      company.sms_client_confirmation &&
      smsConsent &&
      phone
    ) {
      await sendSms(
        phone,
        `Thanks ${name}, ${company.name} received your HVAC request and will contact you soon. Reply STOP to opt out.`
      );

      await supabaseAdmin
        .from("leads")
        .update({
          client_sms_sent_at: new Date().toISOString(),
        })
        .eq("id", lead.id);
    }

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error("Lead submission error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}