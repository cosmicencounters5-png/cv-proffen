import { CV } from "@/types/cv"

type Props = {
  cv: CV
  setCv: (cv: CV) => void
}

export default function SkillsSection({ cv, setCv }: Props) {
  function addSkill() {
    setCv({
      ...cv,
      skills: [...cv.skills, { id: crypto.randomUUID(), name: "" }],
    })
  }

  return (
    <div className="space-y-2">
      {cv.skills.map((skill, i) => (
        <input
          key={skill.id}
          placeholder="Ferdighet"
          value={skill.name}
          onChange={(e) => {
            const copy = [...cv.skills]
            copy[i].name = e.target.value
            setCv({ ...cv, skills: copy })
          }}
        />
      ))}

      <button onClick={addSkill} className="text-blue-600">
        + Legg til ferdighet
      </button>
    </div>
  )
}