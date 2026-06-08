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
      client_phone,
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
      authorized,
    } = body;

    const { data: company, error: companyError } = await supabaseAdmin
      .from("companies")
      .select(
        "id, name, phone, sms_enabled, sms_new_lead_notifications, sms_client_confirmation"
      )
      .eq("slug", slug)
      .single();

    if (companyError || !company) {
      console.log("Company lookup error:", companyError);
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
        client_phone: client_phone,
        email,

        street_address: streetAddress,
        city,
        state,
        zip_code: zipCode,
        property_type: propertyType,

        service_type: serviceType,
        priority: priority || "medium",
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

        sms_consent: Boolean(smsConsent),
        authorized: Boolean(authorized),

        status: "new",
      })
      .select()
      .single();

    if (leadError || !lead) {
      console.error("Lead insert error:", leadError);

      return NextResponse.json(
        { error: "Failed to create lead",
          details: leadError?.message,
          code: leadError?.code,
          hint: leadError?.hint,
        },
        { status: 500 }
      );
    }

    // Text the HVAC company
try {
  if (
    company.sms_enabled &&
    company.sms_new_lead_notifications &&
    company.phone
  ) {
    await sendSms(
      company.phone,
      `New HVAC lead for ${company.name}:
        Name: ${name}
        Phone: ${client_phone}
        Service: ${serviceType || "Not specified"}
        Priority: ${priority || "medium"}
        City: ${city || "Not provided"}
        Issue: ${issue || "No issue provided"}`
    );

    const { error: companySmsUpdateError } = await supabaseAdmin
      .from("leads")
      .update({
        company_sms_sent_at: new Date().toISOString(),
      })
      .eq("id", lead.id);

    if (companySmsUpdateError) {
      console.error("Company SMS timestamp update failed:", companySmsUpdateError);
    }
  }
} catch (smsError) {
  console.error("Company SMS failed:", smsError);
}

// Text the client confirmation
try {
  if (
    company.sms_enabled &&
    company.sms_client_confirmation &&
    smsConsent &&
    client_phone
  ) {
    await sendSms(
      client_phone,
      `Thanks ${name}, ${company.name} received your HVAC request and will contact you soon. Reply STOP to opt out.`
    );

    const { error: clientSmsUpdateError } = await supabaseAdmin
      .from("leads")
      .update({
        client_sms_sent_at: new Date().toISOString(),
      })
      .eq("id", lead.id);

    if (clientSmsUpdateError) {
      console.error("Client SMS timestamp update failed:", clientSmsUpdateError);
    }
  }
} catch (smsError) {
  console.error("Client SMS failed:", smsError);
}

    // Text the client confirmation
    try {
      if (
        company.sms_enabled &&
        company.sms_client_confirmation &&
        smsConsent &&
        client_phone
      ) {
        await sendSms(
          client_phone,
          `Thanks ${name}, ${company.name} received your HVAC request and will contact you soon. Reply STOP to opt out.`
        );

        const { error: clientSmsUpdateError } = await supabaseAdmin
          .from("leads")
          .update({
            client_sms_sent_at: new Date().toISOString(),
          })
          .eq("id", lead.id);

        if (clientSmsUpdateError) {
          console.error(
            "Client SMS timestamp update failed:",
            clientSmsUpdateError
          );
        }
      }
    } catch (smsError) {
      console.error("Client SMS failed:", smsError);
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