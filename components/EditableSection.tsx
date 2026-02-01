"use client"

import { useEffect, useState } from "react"

type Props = {
  title: string
  value: string
  onSave: (value: string) => void
}

export default function EditableSection({ title, value, onSave }: Props) {
  const [text, setText] = useState(value)
  const [loading, setLoading] = useState(false)
  const [dirty, setDirty] = useState(false)

  // 🔁 Sync når CV lastes / endres
  useEffect(() => {
    setText(value)
    setDirty(false)
  }, [value])

  const improveWithAI = async () => {
    if (!text.trim()) return

    setLoading(true)

    try {
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
        setDirty(true)
      }
    } catch (err) {
      alert("AI-feil. Prøv igjen.")
    } finally {
      setLoading(false)
    }
  }

  const save = () => {
    onSave(text)
    setDirty(false)
  }

  return (
    <div className="space-y-3 border p-4 rounded-lg bg-white">
      <h2 className="font-semibold text-lg">{title}</h2>

      <textarea
        className="w-full min-h-[120px] border rounded p-2 focus:outline-none focus:ring"
        value={text}
        onChange={e => {
          setText(e.target.value)
          setDirty(true)
        }}
        placeholder="Skriv her…"
      />

      <div className="flex gap-3">
        <button
          onClick={save}
          disabled={!dirty}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Lagre
        </button>

        <button
          onClick={improveWithAI}
          disabled={loading || !text.trim()}
          className="px-4 py-2 border rounded"
        >
          {loading ? "Forbedrer…" : "Forbedre med AI"}
        </button>
      </div>
    </div>
  )
}