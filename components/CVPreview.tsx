import { CV } from "@/types/cv"

export default function CVPreview({ cv }: { cv: CV }) {
  return (
    <div className="bg-white border rounded-xl p-8 shadow-sm print:shadow-none print:border-none">
      
      {/* PDF-knapp – vises ikke i print */}
      <button
        onClick={() => window.print()}
        className="mb-4 px-4 py-2 bg-black text-white rounded-lg print:hidden"
      >
        Last ned PDF
      </button>

      {/* ALT som skal med i PDF */}
      <div className="print-area">
        <h1 className="text-3xl font-bold mb-1">
          {cv.personal.firstName} {cv.personal.lastName}
        </h1>

        <p className="text-sm">{cv.personal.email}</p>
        <p className="text-sm">{cv.personal.phone}</p>

        <h2 className="mt-6 mb-2 font-semibold uppercase text-sm text-gray-500">
          Arbeidserfaring
        </h2>
        {cv.experience.map((e) => (
          <p key={e.id} className="text-sm mb-1">
            <strong>{e.role}</strong> – {e.company}
          </p>
        ))}

        <h2 className="mt-6 mb-2 font-semibold uppercase text-sm text-gray-500">
          Utdanning
        </h2>
        {cv.education.map((e) => (
          <p key={e.id} className="text-sm mb-1">
            {e.degree}, {e.school} ({e.year})
          </p>
        ))}

        <h2 className="mt-6 mb-2 font-semibold uppercase text-sm text-gray-500">
          Ferdigheter
        </h2>
        <ul className="list-disc ml-5 text-sm">
          {cv.skills.map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}