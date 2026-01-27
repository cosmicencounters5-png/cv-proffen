import { CV } from "@/types/cv"

export default function CVPreview({ cv }: { cv: CV }) {
  return (
    <div className="border rounded-xl p-4 bg-gray-50">
      <h1 className="text-xl font-bold">
        {cv.personal.firstName} {cv.personal.lastName}
      </h1>
      <p>{cv.personal.email}</p>
      <p>{cv.personal.phone}</p>

      <h2 className="mt-4 font-semibold">Arbeidserfaring</h2>
      {cv.experience.map((e) => (
        <p key={e.id}>
          <strong>{e.role}</strong> – {e.company}
        </p>
      ))}

      <h2 className="mt-4 font-semibold">Utdanning</h2>
      {cv.education.map((e) => (
        <p key={e.id}>
          {e.degree}, {e.school} ({e.year})
        </p>
      ))}

      <h2 className="mt-4 font-semibold">Ferdigheter</h2>
      <ul className="list-disc ml-5">
        {cv.skills.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </div>
  )
}