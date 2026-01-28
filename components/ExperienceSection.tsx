"use client"

import { CV, Experience } from "@/types/cv"

type Props = {
  cv: CV
  setCv: (cv: CV) => void
}

export default function ExperienceSection({ cv, setCv }: Props) {
  const addExperience = () => {
    const newItem: Experience = {
      id: crypto.randomUUID(),
      role: "",
      company: "",
      from: "",
      to: "",
      description: "",
    }

    setCv({
      ...cv,
      experience: [...cv.experience, newItem],
    })
  }

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: string
  ) => {
    setCv({
      ...cv,
      experience: cv.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    })
  }

  return (
    <section className="space-y-4">
      <h2 className="font-semibold text-lg">Arbeidserfaring</h2>

      {cv.experience.map((e) => (
        <div key={e.id} className="border rounded p-3 space-y-2">
          <input
            placeholder="Stilling"
            className="w-full border p-2 rounded"
            value={e.role}
            onChange={(ev) =>
              updateExperience(e.id, "role", ev.target.value)
            }
          />

          <input
            placeholder="Bedrift"
            className="w-full border p-2 rounded"
            value={e.company}
            onChange={(ev) =>
              updateExperience(e.id, "company", ev.target.value)
            }
          />

          <div className="flex gap-2">
            <input
              placeholder="Fra"
              className="w-full border p-2 rounded"
              value={e.from}
              onChange={(ev) =>
                updateExperience(e.id, "from", ev.target.value)
              }
            />
            <input
              placeholder="Til"
              className="w-full border p-2 rounded"
              value={e.to}
              onChange={(ev) =>
                updateExperience(e.id, "to", ev.target.value)
              }
            />
          </div>

          <textarea
            placeholder="Beskrivelse av rollen"
            className="w-full border p-2 rounded h-20"
            value={e.description}
            onChange={(ev) =>
              updateExperience(e.id, "description", ev.target.value)
            }
          />
        </div>
      ))}

      <button
        onClick={addExperience}
        className="px-4 py-2 border rounded hover:bg-gray-50"
      >
        + Legg til erfaring
      </button>
    </section>
  )
}