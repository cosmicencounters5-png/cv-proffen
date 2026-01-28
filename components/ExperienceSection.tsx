"use client"

import { CV, Experience } from "@/types/cv"

type Props = {
  cv: CV
  setCv: (cv: CV) => void
}

export default function ExperienceSection({ cv, setCv }: Props) {
  function addExperience() {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      role: "",
      company: "",
      from: "",
      to: "",
      description: "",
    }

    setCv({
      ...cv,
      experience: [...cv.experience, newExperience],
    })
  }

  return (
    <section className="mt-6">
      <h2 className="font-semibold mb-2">Arbeidserfaring</h2>

      {cv.experience.map((e, index) => (
        <div key={e.id} className="mb-4">
          <input
            className="border p-2 w-full mb-1"
            placeholder="Stilling"
            value={e.role}
            onChange={(ev) => {
              const updated = [...cv.experience]
              updated[index] = { ...e, role: ev.target.value }
              setCv({ ...cv, experience: updated })
            }}
          />

          <input
            className="border p-2 w-full mb-1"
            placeholder="Bedrift"
            value={e.company}
            onChange={(ev) => {
              const updated = [...cv.experience]
              updated[index] = { ...e, company: ev.target.value }
              setCv({ ...cv, experience: updated })
            }}
          />

          <textarea
            className="border p-2 w-full"
            placeholder="Beskrivelse av arbeidsoppgaver"
            value={e.description}
            onChange={(ev) => {
              const updated = [...cv.experience]
              updated[index] = { ...e, description: ev.target.value }
              setCv({ ...cv, experience: updated })
            }}
          />
        </div>
      ))}

      <button
        onClick={addExperience}
        className="border px-3 py-1"
      >
        + Legg til erfaring
      </button>
    </section>
  )
}