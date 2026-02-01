"use client"

import { useState } from "react"

type Props = {
  title: string
  value: string
  onSave: (value: string) => void
}

export default function EditableSection({ title, value, onSave }: Props) {
  const [text, setText] = useState(value)
  const [loading, setLoading] = useState(false)

  const improveWithAI = async () => {
    setLoading(true)

    const res = await fetch("/api/ai/cv-improve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        section: title,
        text,
      }),
    })

    const json = await res.json()
    if (json.text) {
      setText(json.text)
    }

    setLoading(false)
  }

  return (
    <div className="space-y-2 border p-4 rounded">
      <h2 className="font-bold">{title}</h2>

      <textarea
        className="w-full min-h-[120px] border p-2"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <div className="flex gap-2">
        <button onClick={() => onSave(text)}>
          Lagre
        </button>

        <button onClick={improveWithAI} disabled={loading}>
          {loading ? "Forbedrer…" : "Forbedre med AI"}
        </button>
      </div>
    </div>
  )
}