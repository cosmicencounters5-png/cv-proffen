"use client"

import { useState } from "react"

type ExperienceItem = {
  id: string
  company: string
  role: string
  from: string
  to: string
  description: string
}

type Props = {
  value: ExperienceItem[]
  onSave: (items: ExperienceItem[]) => void
}

export default function EditableExperience({ value, onSave }: Props) {
  const [items, setItems] = useState<ExperienceItem[]>(value)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const addItem = () => {
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        company: "",
        role: "",
        from: "",
        to: "",
        description: "",
      },
    ])
  }

  const improveWithAI = async (id: string) => {
    const item = items.find(i => i.id === id)
    if (!item?.description) return

    setLoadingId(id)

    const res = await fetch("/api/ai/cv-improve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        section: "Arbeidserfaring",
        text: item.description,
      }),
    })

    const json = await res.json()

    if (json.text) {
      setItems(items.map(i =>
        i.id === id ? { ...i, description: json.text } : i
      ))
    }

    setLoadingId(null)
  }

  return (
    <div className="space-y-4 border p-4 rounded">
      <h2 className="font-bold">Arbeidserfaring</h2>

      {items.map((item, idx) => (
        <div key={item.id} className="space-y-2 border p-3 rounded">
          <input
            placeholder="Stilling"
            value={item.role}
            onChange={e =>
              setItems(items.map(i =>
                i.id === item.id ? { ...i, role: e.target.value } : i
              ))
            }
          />
          <input
            placeholder="Bedrift"
            value={item.company}
            onChange={e =>
              setItems(items.map(i =>
                i.id === item.id ? { ...i, company: e.target.value } : i
              ))
            }
          />

          <div className="flex gap-2">
            <input
              placeholder="Fra"
              value={item.from}
              onChange={e =>
                setItems(items.map(i =>
                  i.id === item.id ? { ...i, from: e.target.value } : i
                ))
              }
            />
            <input
              placeholder="Til"
              value={item.to}
              onChange={e =>
                setItems(items.map(i =>
                  i.id === item.id ? { ...i, to: e.target.value } : i
                ))
              }
            />
          </div>

          <textarea
            placeholder="Beskrivelse (stikkord er ok)"
            value={item.description}
            onChange={e =>
              setItems(items.map(i =>
                i.id === item.id ? { ...i, description: e.target.value } : i
              ))
            }
          />

          <div className="flex gap-2">
            <button onClick={() => improveWithAI(item.id)}>
              {loadingId === item.id ? "Forbedrer…" : "Forbedre med AI"}
            </button>
          </div>
        </div>
      ))}

      <div className="flex gap-2">
        <button onClick={addItem}>+ Legg til stilling</button>
        <button onClick={() => onSave(items)}>Lagre arbeidserfaring</button>
      </div>
    </div>
  )
}