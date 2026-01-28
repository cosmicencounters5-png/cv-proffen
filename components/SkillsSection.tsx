"use client"

import { CV, Skill } from "@/types/cv"

type Props = {
  cv: CV
  setCv: (cv: CV) => void
}

export default function SkillsSection({ cv, setCv }: Props) {
  const addSkill = () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: "",
    }

    setCv({
      ...cv,
      skills: [...cv.skills, newSkill],
    })
  }

  const updateSkill = (id: string, value: string) => {
    setCv({
      ...cv,
      skills: cv.skills.map((s) =>
        s.id === id ? { ...s, name: value } : s
      ),
    })
  }

  const removeSkill = (id: string) => {
    setCv({
      ...cv,
      skills: cv.skills.filter((s) => s.id !== id),
    })
  }

  return (
    <section className="space-y-4">
      <h2 className="font-semibold text-lg">Ferdigheter</h2>

      {cv.skills.map((s) => (
        <div key={s.id} className="flex gap-2">
          <input
            placeholder="F.eks. Truckførerbevis, Excel, Kundeservice"
            className="w-full border p-2 rounded"
            value={s.name}
            onChange={(e) => updateSkill(s.id, e.target.value)}
          />

          <button
            onClick={() => removeSkill(s.id)}
            className="px-3 border rounded text-red-500 hover:bg-red-50"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={addSkill}
        className="px-4 py-2 border rounded hover:bg-gray-50"
      >
        + Legg til ferdighet
      </button>
    </section>
  )
}