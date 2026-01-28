"use client"

import { CV } from "@/types/cv"

type Props = {
  cv: CV
  onChange: (cv: CV) => void
}

export default function ExperienceSection({ cv, onChange }: Props) {
  function addExperience() {
    onChange({
      ...cv,
      experience: [
        ...cv.experience,
        {
          id: crypto.randomUUID(),
          role: "",
          company: "",
          from: "",
          to: "",
          description: "",
        },
      ],
    })
  }

  function updateExperience(
    id: string,
    field: string,
    value: string
  ) {
    onChange({
      ...cv,
      experience: cv.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    })
  }

  function removeExperience(id: string) {
    onChange({
      ...cv,
      experience: cv.experience.filter((e) => e.id !== id),
    })
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Arbeidserfaring</h2>
        <button
          onClick={addExperience}
          className="text-sm text-blue-600"
        >
          + Legg til
        </button>
      </div>

      {cv.experience.length === 0 && (
        <p className="text-sm text-gray-500">
          Ingen arbeidserfaring lagt til ennå
        </p>
      )}

      {cv.experience.map((exp) => (
        <div
          key={exp.id}
          className="border rounded-lg p-4 space-y-2"
        >
          <input
            className="border p-2 w-full"
            placeholder="Stilling"
            value={exp.role}
            onChange={(e) =>
              updateExperience(exp.id, "role", e.target.value)
            }
          />

          <input
            className="border p-2 w-full"
            placeholder="Arbeidsgiver"
            value={exp.company}
            onChange={(e) =>
              updateExperience(exp.id, "company", e.target.value)
            }
          />

          <div className="flex gap-2">
            <input
              className="border p-2 w-full"
              placeholder="Fra"
              value={exp.from}
              onChange={(e) =>
                updateExperience(exp.id, "from", e.target.value)
              }
            />
            <input
              className="border p-2 w-full"
              placeholder="Til"
              value={exp.to}
              onChange={(e) =>
                updateExperience(exp.id, "to", e.target.value)
              }
            />
          </div>

          <textarea
            className="border p-2 w-full"
            placeholder="Beskrivelse"
            value={exp.description}
            onChange={(e) =>
              updateExperience(exp.id, "description", e.target.value)
            }
          />

          <button
            onClick={() => removeExperience(exp.id)}
            className="text-sm text-red-600"
          >
            Fjern
          </button>
        </div>
      ))}
    </section>
  )
}