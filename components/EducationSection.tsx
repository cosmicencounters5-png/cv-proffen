"use client"

import { CV } from "@/types/cv"

export default function EducationSection({
  cv,
  setCV,
}: {
  cv: CV
  setCV: (cv: CV) => void
}) {
  function addEducation() {
    setCV({
      ...cv,
      education: [
        ...cv.education,
        {
          id: crypto.randomUUID(),
          degree: "",
          school: "",
          year: "",
        },
      ],
    })
  }

  function updateEducation(
    id: string,
    field: keyof CV["education"][number],
    value: string
  ) {
    setCV({
      ...cv,
      education: cv.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    })
  }

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Utdanning</h2>

      {cv.education.map((e) => (
        <div
          key={e.id}
          className="border rounded-lg p-4 space-y-2 bg-gray-50"
        >
          <input
            placeholder="Grad / utdanning"
            value={e.degree}
            onChange={(ev) =>
              updateEducation(e.id, "degree", ev.target.value)
            }
            className="w-full border rounded px-3 py-2"
          />

          <input
            placeholder="Skole / institusjon"
            value={e.school}
            onChange={(ev) =>
              updateEducation(e.id, "school", ev.target.value)
            }
            className="w-full border rounded px-3 py-2"
          />

          <input
            placeholder="År (f.eks. 2019–2022)"
            value={e.year}
            onChange={(ev) =>
              updateEducation(e.id, "year", ev.target.value)
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="text-sm text-blue-600 hover:underline"
      >
        + Legg til utdanning
      </button>
    </section>
  )
}