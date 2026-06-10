import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { leadId } = await req.json();

    if (!leadId) {
      return NextResponse.json(
        { error: "Missing leadId" },
        { status: 400 }
      );
    }

    // 1. Get the lead from Supabase
    const { data: lead, error: leadError } = await supabaseAdmin
      .from("leads")
      .select("*")
      .eq("id", leadId)
      .single();

    if (leadError || !lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    // 2. Send the lead to OpenAI for analysis
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
            You are Wingman AI, a sales assistant for local service businesses.
                    
            Analyze incoming service leads and help the business understand:
            - how valuable the lead is
            - how urgent the lead is
            - what the business should do next
            - what follow-up message they should send
                    
            Always respond with valid JSON only.
                      `,
                    },
                    {
                      role: "user",
                      content: `
            Analyze this lead:
                    
            Customer Name: ${lead.client_name || "Unknown"}
            Customer Phone: ${lead.client_phone || "Unknown"}
            Service Needed: ${lead.service_needed || "Unknown"}
            Message: ${lead.message || "No message provided"}
            Current Status: ${lead.status || "new"}
                    
            Return this exact JSON structure:
                    
            {
              "ai_score": number from 1 to 100,
              "ai_quality": "Low" | "Medium" | "High",
              "ai_urgency": "Low" | "Medium" | "High",
              "ai_summary": "short summary of the lead",
              "ai_next_step": "recommended action for the business",
              "ai_followup_sms": "short SMS the business can send to the customer"
            }
          `,
        },
      ],
    });

    const rawContent = completion.choices[0].message.content;

    if (!rawContent) {
      return NextResponse.json(
        { error: "No AI response returned" },
        { status: 500 }
      );
    }

    const aiResult = JSON.parse(rawContent);

    // 3. Save AI results back to the lead
    const { data: updatedLead, error: updateError } = await supabaseAdmin
      .from("leads")
      .update({
        ai_score: aiResult.ai_score,
        ai_quality: aiResult.ai_quality,
        ai_urgency: aiResult.ai_urgency,
        ai_summary: aiResult.ai_summary,
        ai_next_step: aiResult.ai_next_step,
        ai_followup_sms: aiResult.ai_followup_sms,
        ai_analyzed_at: new Date().toISOString(),
      })
      .eq("id", leadId)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: updatedLead,
      ai: aiResult,
    });
  } catch (error: any) {
    console.error("Analyze lead error:", error);

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}