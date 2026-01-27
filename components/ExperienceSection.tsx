"use client"

import { CV } from "@/types/cv"

export default function ExperienceSection({
  cv,
  setCV,
}: {
  cv: CV
  setCV: (cv: CV) => void
}) {
  function addExperience() {
    setCV({
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
    field: keyof CV["experience"][number],
    value: string
  ) {
    setCV({
      ...cv,
      experience: cv.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    })
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Arbeidserfaring</h2>

      {cv.experience.map((e) => (
        <div
          key={e.id}
          className="border rounded-lg p-4 space-y-2 bg-gray-50"
        >
          <input
            placeholder="Stilling"
            value={e.role}
            onChange={(ev) =>
              updateExperience(e.id, "role", ev.target.value)
            }
            className="w-full border rounded px-3 py-2"
          />

          <input
            placeholder="Arbeidsgiver"
            value={e.company}
            onChange={(ev) =>
              updateExperience(e.id, "company", ev.target.value)
            }
            className="w-full border rounded px-3 py-2"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="Fra (f.eks. 2021)"
              value={e.from}
              onChange={(ev) =>
                updateExperience(e.id, "from", ev.target.value)
              }
              className="w-full border rounded px-3 py-2"
            />

            <input
              placeholder="Til (f.eks. 2024 eller Nå)"
              value={e.to}
              onChange={(ev) =>
                updateExperience(e.id, "to", ev.target.value)
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <textarea
            placeholder="Beskrivelse (valgfritt)"
            value={e.description || ""}
            onChange={(ev) =>
              updateExperience(e.id, "description", ev.target.value)
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="text-sm text-blue-600 hover:underline"
      >
        + Legg til arbeidserfaring
      </button>
    </section>
  )
}