"use client"

import { CV, Education } from "@/types/cv"

type Props = {
  cv: CV
  setCv: (cv: CV) => void
}

export default function EducationSection({ cv, setCv }: Props) {
  const addEducation = () => {
    const newItem: Education = {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      from: "",
      to: "",
    }

    setCv({
      ...cv,
      education: [...cv.education, newItem],
    })
  }

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    setCv({
      ...cv,
      education: cv.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    })
  }

  return (
    <section className="space-y-4">
      <h2 className="font-semibold text-lg">Utdanning</h2>

      {cv.education.map((e) => (
        <div key={e.id} className="border rounded p-3 space-y-2">
          <input
            placeholder="Skole / Institusjon"
            className="w-full border p-2 rounded"
            value={e.school}
            onChange={(ev) =>
              updateEducation(e.id, "school", ev.target.value)
            }
          />

          <input
            placeholder="Grad / Utdanning"
            className="w-full border p-2 rounded"
            value={e.degree}
            onChange={(ev) =>
              updateEducation(e.id, "degree", ev.target.value)
            }
          />

          <div className="flex gap-2">
            <input
              placeholder="Fra"
              className="w-full border p-2 rounded"
              value={e.from}
              onChange={(ev) =>
                updateEducation(e.id, "from", ev.target.value)
              }
            />
            <input
              placeholder="Til"
              className="w-full border p-2 rounded"
              value={e.to}
              onChange={(ev) =>
                updateEducation(e.id, "to", ev.target.value)
              }
            />
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="px-4 py-2 border rounded hover:bg-gray-50"
      >
        + Legg til utdanning
      </button>
    </section>
  )
}