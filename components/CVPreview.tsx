import { CV } from "@/types/cv"

export default function CVPreview({ cv }: { cv: CV }) {
  return (
    <div className="bg-white border rounded-xl p-8 shadow-sm">
      <h1 className="text-2xl font-bold">
        {cv.personal.firstName} {cv.personal.lastName}
      </h1>
      <p className="text-gray-600">{cv.personal.title}</p>
      <p>{cv.personal.email} · {cv.personal.phone}</p>

      <section className="mt-6">
        <h2 className="font-semibold">Sammendrag</h2>
        <p className="text-sm mt-1">{cv.summary}</p>
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Arbeidserfaring</h2>
        {cv.experience.map(e => (
          <div key={e.id} className="mt-2 text-sm">
            <strong>{e.role}</strong> – {e.company}  
            <div className="text-gray-500">{e.from} – {e.to}</div>
            <p>{e.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Utdanning</h2>
        {cv.education.map(e => (
          <div key={e.id} className="text-sm mt-1">
            {e.degree}, {e.school} ({e.from} – {e.to})
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Ferdigheter</h2>
        <ul className="list-disc ml-5 text-sm">
          {cv.skills.map(s => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}