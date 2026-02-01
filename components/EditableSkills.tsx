"use client"

import { useState } from "react"
import { Skill } from "@/types/cv"

interface EditableSkillsProps {
  value: Skill[]
  onSave: (skills: Skill[]) => void
}

export default function EditableSkills({
  value,
  onSave,
}: EditableSkillsProps) {
  const [skills, setSkills] = useState<Skill[]>(value)
  const [input, setInput] = useState("")

  const addSkill = () => {
    const name = input.trim()
    if (!name) return

    const newSkill: Skill = {
      id: crypto.randomUUID(), // ✅ KRITISK
      name,
    }

    setSkills([...skills, newSkill])
    setInput("")
  }

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id))
  }

  const save = () => {
    onSave(skills)
  }

  return (
    <div className="border rounded p-4 space-y-3">
      <h3 className="font-semibold">Ferdigheter</h3>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1 text-sm"
          placeholder="Legg til ferdighet (f.eks. React, Excel, Salg)"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addSkill()}
        />

        <button
          onClick={addSkill}
          className="px-3 py-1 bg-black text-white rounded text-sm"
        >
          Legg til
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span
            key={skill.id}
            className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm"
          >
            {skill.name}
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-red-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <button
        onClick={save}
        className="text-sm text-blue-600 hover:underline"
      >
        Lagre ferdigheter
      </button>
    </div>
  )
}