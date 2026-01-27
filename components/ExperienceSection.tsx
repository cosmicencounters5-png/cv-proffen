import { CV } from "@/types/cv"

type Props = {
  cv: CV
  setCv: (cv: CV) => void
}

export default function ExperienceSection({ cv, setCv }: Props) {
  function addExperience() {
    setCv({
      ...cv,
      experience: [
        ...cv.experience,
        { id: crypto.randomUUID(), company: "", role: "", description: "" },
      ],
    })
  }

  return (
    <div>
      {cv.experience.map((exp, i) => (
        <div key={exp.id} className="mb-3">
          <input
            placeholder="Bedrift"
            value={exp.company}
            onChange={(e) => {
              const copy = [...cv.experience]
              copy[i].company = e.target.value
              setCv({ ...cv, experience: copy })
            }}
          />
        </div>
      ))}

      <button onClick={addExperience} className="mt-2 text-blue-600">
        + Legg til arbeidserfaring
      </button>
    </div>
  )
}