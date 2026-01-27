import { CV } from "@/types/cv"

export default function CVPreview({ cv }: { cv: CV }) {
  return (
    <div className="bg-white border rounded-xl p-8 shadow-sm print:shadow-none print:border-none">
      
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          {cv.personal.firstName} {cv.personal.lastName}
        </h1>

        {cv.personal.title && (
          <p className="text-gray-700 font-medium">
            {cv.personal.title}
          </p>
        )}

        <p className="text-sm text-gray-600 mt-1">
          {cv.personal.email} · {cv.personal.phone}
        </p>
      </div>

      {/* Experience */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Arbeidserfaring</h2>
        {cv.experience.length === 0 && (
          <p className="text-sm text-gray-500">Ingen arbeidserfaring lagt til</p>
        )}
        {cv.experience.map((e) => (
          <div key={e.id} className="mb-2">
            <p className="font-medium">
              {e.role} – {e.company}
            </p>
            <p className="text-sm text-gray-600">
              {e.from} – {e.to}
            </p>
            {e.description && (
              <p className="text-sm mt-1">{e.description}</p>
            )}
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Utdanning</h2>
        {cv.education.length === 0 && (
          <p className="text-sm text-gray-500">Ingen utdanning lagt til</p>
        )}
        {cv.education.map((e) => (
          <p key={e.id} className="text-sm">
            {e.degree}, {e.school} ({e.year})
          </p>
        ))}
      </section>

      {/* Skills */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Ferdigheter</h2>
        {cv.skills.length === 0 && (
          <p className="text-sm text-gray-500">Ingen ferdigheter lagt til</p>
        )}
        <ul className="list-disc ml-5 text-sm">
          {cv.skills.map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}