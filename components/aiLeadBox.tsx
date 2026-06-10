import AiFollowUpButton from "@/components/AiFollowUpButton";

type AiLeadBoxProps = {
  lead: {
    ai_score?: number | null;
    ai_quality?: string | null;
    ai_urgency?: string | null;
    ai_summary?: string | null;
    ai_next_step?: string | null;
    ai_followup_sms?: string | null;
    ai_analyzed_at?: string | null;
  };
};

export default function AiLeadBox({ lead }: AiLeadBoxProps) {
  const hasAiAnalysis =
    lead.ai_score !== null &&
    lead.ai_score !== undefined;

  if (!hasAiAnalysis) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Wingman AI
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              No AI analysis yet for this lead.
            </p>
          </div>

          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
            Pending
          </span>
        </div>
      </div>
    );
  }

  const score = lead.ai_score ?? 0;

  return (
    <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">
            Wingman AI
          </h3>
          <p className="mt-1 text-sm text-slate-300">
            AI-powered lead insight and follow-up recommendation.
          </p>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold text-blue-300">
            {score}
          </div>
          <div className="text-xs font-medium text-slate-400">
            Lead Score
          </div>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Quality
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {lead.ai_quality || "Unknown"}
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Urgency
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {lead.ai_urgency || "Unknown"}
          </p>
        </div>
      </div>

      {lead.ai_summary && (
        <div className="mb-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            AI Summary
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            {lead.ai_summary}
          </p>
        </div>
      )}

      {lead.ai_next_step && (
        <div className="mb-4 rounded-lg border border-slate-800 bg-slate-950 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Recommended Next Step
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            {lead.ai_next_step}
          </p>
        </div>
      )}

      {lead.ai_followup_sms && (
        <div className="rounded-lg border border-blue-500/20 bg-slate-950 p-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Suggested Follow-Up Text
            </p>

            <AiFollowUpButton message={lead.ai_followup_sms} />
          </div>

          <p className="text-sm leading-6 text-slate-300">
            “{lead.ai_followup_sms}”
          </p>
        </div>
    )}

      {lead.ai_analyzed_at && (
        <p className="mt-3 text-xs text-slate-500">
          Analyzed by Wingman AI
        </p>
      )}
    </div>
  );
}