"use client"

import { CV } from "@/types/cv"
import { useState } from "react"

type Props = {
  cv: CV
  onUpdate: (summary: string) => void
}

export default function GenerateSummaryButton({ cv, onUpdate }: Props) {
  const [loading, setLoading] = useState(false)

  async function generate() {
    setLoading(true)

    const res = await fetch("/api/ai/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cv }),
    })

    const data = await res.json()

    if (data.summary) {
      onUpdate(data.summary)
    }

    setLoading(false)
  }

  return (
    <button
      onClick={generate}
      disabled={loading}
      className="print-hidden mb-4 bg-emerald-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
    >
      {loading ? "Genererer…" : "✨ Lag sammendrag med AI"}
    </button>
  )
}