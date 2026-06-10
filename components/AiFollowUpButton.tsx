"use client";

import { useState } from "react";

type AiFollowUpButtonProps = {
  message?: string | null;
};

export default function AiFollowUpButton({ message }: AiFollowUpButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    if (!message) return;

    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy message:", error);
      alert("Could not copy message.");
    }
  }

  return (
    <button
      type="button"
      onClick={copyMessage}
      disabled={!message}
      className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-xs font-semibold text-blue-300 transition hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {copied ? "Copied!" : "Copy Follow-Up"}
    </button>
  );
}