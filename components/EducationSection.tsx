import { CV } from "@/types/cv"

type Props = {
  cv: CV
  setCv: (cv: CV) => void
}

export default function EducationSection({ cv, setCv }: Props) {
  function addEducation() {
    setCv({
      ...cv,
      education: [
        ...cv.education,
        { id: crypto.randomUUID(), school: "", degree: "", year: "" },
      ],
    })
  }

  return (
    <div className="space-y-3">
      {cv.education.map((edu, i) => (
        <div key={edu.id} className="grid gap-2">
          <input
            placeholder="Skole"
            value={edu.school}
            onChange={(e) => {
              const copy = [...cv.education]
              copy[i].school = e.target.value
              setCv({ ...cv, education: copy })
            }}
          />
          <input
            placeholder="Utdanning / grad"
            value={edu.degree}
            onChange={(e) => {
              const copy = [...cv.education]
              copy[i].degree = e.target.value
              setCv({ ...cv, education: copy })
            }}
          />
          <input
            placeholder="År"
            value={edu.year}
            onChange={(e) => {
              const copy = [...cv.education]
              copy[i].year = e.target.value
              setCv({ ...cv, education: copy })
            }}
          />
        </div>
      ))}

      <button onClick={addEducation} className="text-blue-600">
        + Legg til utdanning
      </button>
    </div>
  )
}