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
    if (!input.trim()) return

    setSkills([...skills, { name: input.trim() }])
    setInput("")
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
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
        {skills.map((skill, index) => (
          <span
            key={index}
            className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm"
          >
            {skill.name}
            <button
              onClick={() => removeSkill(index)}
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