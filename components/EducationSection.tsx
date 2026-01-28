"use client"

import { CV } from "@/types/cv"

type Props = {
  cv: CV
  onChange: (cv: CV) => void
}

export default function EducationSection({ cv, onChange }: Props) {
  function addEducation() {
    onChange({
      ...cv,
      education: [
        ...cv.education,
        {
          id: crypto.randomUUID(),
          school: "",
          degree: "",
          from: "",
          to: "",
          description: "",
        },
      ],
    })
  }

  function updateEducation(
    id: string,
    field: keyof CV["education"][number],
    value: string
  ) {
    onChange({
      ...cv,
      education: cv.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    })
  }

  function removeEducation(id: string) {
    onChange({
      ...cv,
      education: cv.education.filter((e) => e.id !== id),
    })
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Utdanning</h2>
        <button
          onClick={addEducation}
          className="text-sm text-blue-600"
        >
          + Legg til
        </button>
      </div>

      {cv.education.map((edu) => (
        <div
          key={edu.id}
          className="border rounded-lg p-4 space-y-2"
        >
          <input
            className="border p-2 w-full"
            placeholder="Skole"
            value={edu.school}
            onChange={(e) =>
              updateEducation(edu.id, "school", e.target.value)
            }
          />

          <input
            className="border p-2 w-full"
            placeholder="Grad / utdanning"
            value={edu.degree}
            onChange={(e) =>
              updateEducation(edu.id, "degree", e.target.value)
            }
          />

          <div className="flex gap-2">
            <input
              className="border p-2 w-full"
              placeholder="Fra"
              value={edu.from}
              onChange={(e) =>
                updateEducation(edu.id, "from", e.target.value)
              }
            />
            <input
              className="border p-2 w-full"
              placeholder="Til"
              value={edu.to}
              onChange={(e) =>
                updateEducation(edu.id, "to", e.target.value)
              }
            />
          </div>

          <textarea
            className="border p-2 w-full"
            placeholder="Beskrivelse (valgfritt)"
            value={edu.description}
            onChange={(e) =>
              updateEducation(edu.id, "description", e.target.value)
            }
          />

          <button
            onClick={() => removeEducation(edu.id)}
            className="text-sm text-red-600"
          >
            Fjern
          </button>
        </div>
      ))}
    </section>
  )
}