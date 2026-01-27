"use client"

import { CV } from "@/types/cv"

export default function SkillsSection({
  cv,
  setCV,
}: {
  cv: CV
  setCV: (cv: CV) => void
}) {
  function addSkill() {
    setCV({
      ...cv,
      skills: [
        ...cv.skills,
        {
          id: crypto.randomUUID(),
          name: "",
        },
      ],
    })
  }

  function updateSkill(id: string, value: string) {
    setCV({
      ...cv,
      skills: cv.skills.map((s) =>
        s.id === id ? { ...s, name: value } : s
      ),
    })
  }

  function removeSkill(id: string) {
    setCV({
      ...cv,
      skills: cv.skills.filter((s) => s.id !== id),
    })
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Ferdigheter</h2>

      {cv.skills.map((s) => (
        <div
          key={s.id}
          className="flex items-center gap-2"
        >
          <input
            placeholder="Ferdighet (f.eks. Kundeservice, React, Excel)"
            value={s.name}
            onChange={(ev) => updateSkill(s.id, ev.target.value)}
            className="flex-1 border rounded px-3 py-2"
          />

          <button
            type="button"
            onClick={() => removeSkill(s.id)}
            className="text-sm text-red-600 hover:underline"
          >
            Fjern
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSkill}
        className="text-sm text-blue-600 hover:underline"
      >
        + Legg til ferdighet
      </button>
    </section>
  )
}