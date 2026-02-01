"use client"

import { useState } from "react"

type Props = {
  value: string[]
  onSave: (skills: string[]) => void
}

export default function EditableSkills({ value, onSave }: Props) {
  const [skills, setSkills] = useState<string[]>(value ?? [])
  const [input, setInput] = useState("")

  const addSkill = () => {
    if (!input.trim()) return
    const updated = [...skills, input.trim()]
    setSkills(updated)
    onSave(updated)
    setInput("")
  }

  const removeSkill = (index: number) => {
    const updated = skills.filter((_, i) => i !== index)
    setSkills(updated)
    onSave(updated)
  }

  return (
    <div className="border rounded p-4 space-y-3">
      <h3 className="font-semibold">Ferdigheter</h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="bg-gray-200 text-sm px-3 py-1 rounded flex items-center gap-2"
          >
            {skill}
            <button
              onClick={() => removeSkill(i)}
              className="text-gray-500 hover:text-black"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Legg til ferdighet"
          className="border rounded px-2 py-1 flex-1"
        />
        <button
          onClick={addSkill}
          className="px-3 py-1 rounded bg-black text-white text-sm"
        >
          Legg til
        </button>
      </div>
    </div>
  )
}