"use client"

import { useState } from "react"

type EducationItem = {
  id: string
  school: string
  degree: string
  from: string
  to: string
}

type Props = {
  value: EducationItem[]
  onSave: (items: EducationItem[]) => void
}

export default function EditableEducation({ value, onSave }: Props) {
  const [items, setItems] = useState<EducationItem[]>(value)

  const addItem = () => {
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        school: "",
        degree: "",
        from: "",
        to: "",
      },
    ])
  }

  const updateItem = (
    id: string,
    field: keyof EducationItem,
    value: string
  ) => {
    setItems(items.map(i =>
      i.id === id ? { ...i, [field]: value } : i
    ))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id))
  }

  return (
    <div className="space-y-4 border p-4 rounded-lg bg-white">
      <h2 className="font-semibold text-lg">Utdanning</h2>

      {items.map(item => (
        <div key={item.id} className="space-y-2 border p-3 rounded">
          <input
            placeholder="Skole / Institusjon"
            value={item.school}
            onChange={e => updateItem(item.id, "school", e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Grad / Linje"
            value={item.degree}
            onChange={e => updateItem(item.id, "degree", e.target.value)}
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-2">
            <input
              placeholder="Fra"
              value={item.from}
              onChange={e => updateItem(item.id, "from", e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              placeholder="Til"
              value={item.to}
              onChange={e => updateItem(item.id, "to", e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-sm text-red-600"
          >
            Fjern
          </button>
        </div>
      ))}

      <div className="flex gap-3">
        <button onClick={addItem} className="px-3 py-2 border rounded">
          + Legg til utdanning
        </button>

        <button
          onClick={() => onSave(items)}
          className="px-4 py-2 border rounded"
        >
          Lagre utdanning
        </button>
      </div>
    </div>
  )
}