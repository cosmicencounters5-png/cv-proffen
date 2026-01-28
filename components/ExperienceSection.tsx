import { Experience } from "@/types/cv"

export default function ExperienceSection({
  experience,
  onChange,
}: {
  experience: Experience[]
  onChange: (exp: Experience[]) => void
}) {
  function addExperience() {
    onChange([
      ...experience,
      {
        id: crypto.randomUUID(),
        role: "",
        company: "",
        from: "",
        to: "",
        description: "",
      },
    ])
  }

  return (
    <section className="mt-6">
      <h2 className="font-semibold mb-2">Arbeidserfaring</h2>

      {experience.map((e, index) => (
        <div key={e.id} className="mb-4 border p-3 rounded">
          <input
            className="w-full mb-1 border p-1"
            placeholder="Stilling"
            value={e.role}
            onChange={(ev) => {
              const copy = [...experience]
              copy[index].role = ev.target.value
              onChange(copy)
            }}
          />

          <input
            className="w-full mb-1 border p-1"
            placeholder="Bedrift"
            value={e.company}
            onChange={(ev) => {
              const copy = [...experience]
              copy[index].company = ev.target.value
              onChange(copy)
            }}
          />

          <input
            className="w-full mb-1 border p-1"
            placeholder="Fra"
            value={e.from}
            onChange={(ev) => {
              const copy = [...experience]
              copy[index].from = ev.target.value
              onChange(copy)
            }}
          />

          <input
            className="w-full mb-1 border p-1"
            placeholder="Til"
            value={e.to}
            onChange={(ev) => {
              const copy = [...experience]
              copy[index].to = ev.target.value
              onChange(copy)
            }}
          />

          <textarea
            className="w-full border p-1"
            placeholder="Beskrivelse av rollen"
            value={e.description}
            onChange={(ev) => {
              const copy = [...experience]
              copy[index].description = ev.target.value
              onChange(copy)
            }}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="px-3 py-1 border rounded text-sm"
      >
        + Legg til erfaring
      </button>
    </section>
  )
}