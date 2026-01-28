import { CV, Education } from "@/types/cv"

type Props = {
  cv: CV
  setCV: (cv: CV) => void
}

export default function EducationSection({ cv, setCV }: Props) {
  function addEducation() {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      from: "",
      to: "",
    }

    setCV({
      ...cv,
      education: [...cv.education, newEducation],
    })
  }

  function updateEducation(
    id: string,
    field: keyof Education,
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
    <section className="mt-6">
      <h2 className="font-semibold mb-2">Utdanning</h2>

      {cv.education.map((e) => (
        <div key={e.id} className="mb-4 grid gap-2">
          <input
            placeholder="Skole"
            value={e.school}
            onChange={(ev) =>
              updateEducation(e.id, "school", ev.target.value)
            }
            className="border p-2 rounded"
          />

          <input
            placeholder="Grad / studie"
            value={e.degree}
            onChange={(ev) =>
              updateEducation(e.id, "degree", ev.target.value)
            }
            className="border p-2 rounded"
          />

          <div className="flex gap-2">
            <input
              placeholder="Fra"
              value={e.from}
              onChange={(ev) =>
                updateEducation(e.id, "from", ev.target.value)
              }
              className="border p-2 rounded w-1/2"
            />
            <input
              placeholder="Til"
              value={e.to}
              onChange={(ev) =>
                updateEducation(e.id, "to", ev.target.value)
              }
              className="border p-2 rounded w-1/2"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="text-sm text-blue-600 underline"
      >
        + Legg til utdanning
      </button>
    </section>
  )
}