import { CV } from "@/types/cv"

export default function CVPreview({ cv }: { cv: CV }) {
  return (
    <div className="bg-white border rounded-xl p-8 shadow-sm">
      <h1 className="text-xl font-bold">
        {cv.personal.firstName} {cv.personal.lastName}
      </h1>

      <p className="text-sm text-gray-600">{cv.personal.title}</p>
      <p className="text-sm">{cv.personal.email}</p>
      <p className="text-sm">{cv.personal.phone}</p>

      {cv.summary && (
        <section className="mt-6">
          <h2 className="font-semibold">Sammendrag</h2>
          <p className="text-sm mt-1">{cv.summary}</p>
        </section>
      )}

      <section className="mt-6">
        <h2 className="font-semibold">Arbeidserfaring</h2>
        {cv.experience.map((e) => (
          <p key={e.id} className="text-sm">
            <strong>{e.role}</strong> – {e.company} ({e.from} – {e.to})
          </p>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Utdanning</h2>
        {cv.education.map((e) => (
          <p key={e.id} className="text-sm">
            {e.degree}, {e.school} ({e.from} – {e.to})
          </p>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Ferdigheter</h2>
        <ul className="list-disc ml-5 text-sm">
          {cv.skills.map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}