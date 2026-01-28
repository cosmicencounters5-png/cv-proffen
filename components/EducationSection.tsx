"use client"

import { CV, Education } from "@/types/cv"

type Props = {
  cv: CV
  setCv: (cv: CV) => void
}

export default function EducationSection({ cv, setCv }: Props) {
  function addEducation() {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      from: "",
      to: "",
    }

    setCv({
      ...cv,
      education: [...cv.education, newEducation],
    })
  }

  return (
    <section className="mt-6">
      <h2 className="font-semibold mb-2">Utdanning</h2>

      {cv.education.map((e, index) => (
        <div key={e.id} className="mb-3">
          <input
            className="border p-2 w-full mb-1"
            placeholder="Skole"
            value={e.school}
            onChange={(ev) => {
              const updated = [...cv.education]
              updated[index] = { ...e, school: ev.target.value }
              setCv({ ...cv, education: updated })
            }}
          />

          <input
            className="border p-2 w-full mb-1"
            placeholder="Grad / linje"
            value={e.degree}
            onChange={(ev) => {
              const updated = [...cv.education]
              updated[index] = { ...e, degree: ev.target.value }
              setCv({ ...cv, education: updated })
            }}
          />
        </div>
      ))}

      <button
        onClick={addEducation}
        className="mt-2 border px-3 py-1"
      >
        + Legg til utdanning
      </button>
    </section>
  )
}