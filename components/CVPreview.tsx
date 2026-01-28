import { CV } from "@/types/cv"

export default function CVPreview({ cv }: { cv: CV }) {
  return (
    <>
      <button
        onClick={() => window.print()}
        className="mb-4 px-4 py-2 bg-black text-white rounded-lg print:hidden"
      >
        Last ned PDF
      </button>

      <div className="bg-white border rounded-xl p-8 shadow-sm print:shadow-none print:border-none space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">
            {cv.personal.firstName} {cv.personal.lastName}
          </h1>
          <p className="text-sm text-gray-600">
            {cv.personal.title}
          </p>
          <p className="text-sm">
            {cv.personal.email} · {cv.personal.phone}
          </p>
        </div>

        {/* Experience */}
        <section>
          <h2 className="font-semibold mb-2">Arbeidserfaring</h2>
          {cv.experience.map((e) => (
            <div key={e.id} className="mb-2">
              <p className="font-medium">
                {e.role} – {e.company}
              </p>
              <p className="text-sm text-gray-600">
                {e.from} – {e.to}
              </p>
              {e.description && (
                <p className="text-sm">{e.description}</p>
              )}
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <h2 className="font-semibold mb-2">Utdanning</h2>
          {cv.education.map((e) => (
            <div key={e.id} className="mb-2">
              <p className="font-medium">
                {e.degree}, {e.school}
              </p>
              <p className="text-sm text-gray-600">
                {e.from} – {e.to}
              </p>
              {e.description && (
                <p className="text-sm">{e.description}</p>
              )}
            </div>
          ))}
        </section>

        {/* Skills */}
        <section>
          <h2 className="font-semibold mb-2">Ferdigheter</h2>
          <ul className="flex flex-wrap gap-2">
            {cv.skills.map((s) => (
              <li
                key={s.id}
                className="text-sm px-3 py-1 bg-gray-100 rounded-full"
              >
                {s.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}