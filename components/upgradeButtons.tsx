"use client";

type Plan = "starter" | "pro" | "ai";

export default function UpgradeButton({ plan }: { plan: Plan }) {
  async function handleUpgrade() {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error || "Something went wrong");
    }
  }

  return (
    <button 
        onClick={handleUpgrade}
        className="w-full rounded-xl bg-blue-500 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-400"
      >
        Upgrade
      </button>
  );
}