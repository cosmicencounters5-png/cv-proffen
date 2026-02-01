"use client"

import { useState } from "react"

type Props = {
  title: string
  value: string
  onSave: (value: string) => void
}

export default function EditableTextSection({
  title,
  value,
  onSave,
}: Props) {
  const [text, setText] = useState(value)
  const [editing, setEditing] = useState(false)

  return (
    <div className="border rounded p-4 space-y-2">
      <h3 className="font-semibold">{title}</h3>

      {editing ? (
        <>
          <textarea
            className="w-full border rounded p-2 text-sm"
            rows={5}
            value={text}
            onChange={e => setText(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              onClick={() => {
                onSave(text)
                setEditing(false)
              }}
              className="bg-black text-white px-3 py-1 rounded text-sm"
            >
              Lagre
            </button>

            <button
              onClick={() => {
                setText(value)
                setEditing(false)
              }}
              className="text-sm underline"
            >
              Avbryt
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm whitespace-pre-line">
            {value || "Ingen tekst lagt inn"}
          </p>

          <button
            onClick={() => setEditing(true)}
            className="text-sm underline"
          >
            Rediger
          </button>
        </>
      )}
    </div>
  )
}