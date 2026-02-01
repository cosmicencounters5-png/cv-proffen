"use client"

import { useState } from "react"

interface EditableTextSectionProps {
  title: string
  value: string
  onSave: (text: string) => void
}

export default function EditableTextSection({
  title,
  value,
  onSave,
}: EditableTextSectionProps) {
  const [text, setText] = useState(value)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await onSave(text)
    setSaving(false)
    setEditing(false)
  }

  return (
    <div className="border rounded p-4 space-y-2">
      <h3 className="font-semibold">{title}</h3>

      {editing ? (
        <>
          <textarea
            className="w-full border rounded p-2"
            rows={4}
            value={text}
            onChange={e => setText(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-3 py-1 bg-black text-white rounded text-sm"
            >
              {saving ? "Lagrer…" : "Lagre"}
            </button>

            <button
              onClick={() => {
                setText(value)
                setEditing(false)
              }}
              className="px-3 py-1 text-sm border rounded"
            >
              Avbryt
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="whitespace-pre-line text-sm text-gray-800">
            {value || "Ingen tekst ennå"}
          </p>

          <button
            onClick={() => setEditing(true)}
            className="text-sm text-blue-600 hover:underline"
          >
            Rediger
          </button>
        </>
      )}
    </div>
  )
}