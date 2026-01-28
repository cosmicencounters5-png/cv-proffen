"use client"

import { CV, Education } from "@/types/cv"

type Props = {
  cv: CV
  onChange: (education: Education[]) => void
}

export default function EducationSection({ cv, onChange }: Props) {
  const addEducation = () => {
    onChange([
      ...cv.education,
      {
        id: crypto.randomUUID(),
        school: "",
        degree: "",
        from: "",
        to: "",
      },
    ])
  }

  return (
    <section>
      <h2 className="font-semibold mb-2">Utdanning</h2>

      {cv.education.map((e, index) => (
        <div key={e.id} className="mb-3 space-y-2">
          <input
            className="border p-2 w-full"
            placeholder="Skole"
            value={e.school}
            onChange={(ev) => {
              const copy = [...cv.education]
              copy[index] = { ...copy[index], school: ev.target.value }
              onChange(copy)
            }}
          />

          <input
            className="border p-2 w-full"
            placeholder="Grad"
            value={e.degree}
            onChange={(ev) => {
              const copy = [...cv.education]
              copy[index] = { ...copy[index], degree: ev.target.value }
              onChange(copy)
            }}
          />

          <div className="flex gap-2">
            <input
              className="border p-2 w-full"
              placeholder="Fra"
              value={e.from}
              onChange={(ev) => {
                const copy = [...cv.education]
                copy[index] = { ...copy[index], from: ev.target.value }
                onChange(copy)
              }}
            />
            <input
              className="border p-2 w-full"
              placeholder="Til"
              value={e.to}
              onChange={(ev) => {
                const copy = [...cv.education]
                copy[index] = { ...copy[index], to: ev.target.value }
                onChange(copy)
              }}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="mt-2 border px-3 py-1 text-sm"
      >
        + Legg til utdanning
      </button>
    </section>
  )
}