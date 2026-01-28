"use client"

import { useState } from "react"
import { CV } from "@/types/cv"
import CVPreview from "@/components/CVPreview"
import DownloadPdfButton from "@/components/DownloadPdfButton"

const EMPTY_CV: CV = {
  id: "local",
  personal: {
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
}

export default function CVPage() {
  const [cv, setCv] = useState<CV>(EMPTY_CV)

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ===================== */}
      {/* EDITOR (VENSTRE) */}
      {/* ===================== */}
      <div className="space-y-6">
        <h1 className="text-xl font-bold">Rediger CV</h1>

        {/* PERSONALIA */}
        <section className="space-y-2">
          <h2 className="font-semibold">Personalia</h2>

          <input
            placeholder="Fornavn"
            className="w-full border p-2 rounded"
            value={cv.personal.firstName}
            onChange={(e) =>
              setCv({
                ...cv,
                personal: { ...cv.personal, firstName: e.target.value },
              })
            }
          />

          <input
            placeholder="Etternavn"
            className="w-full border p-2 rounded"
            value={cv.personal.lastName}
            onChange={(e) =>
              setCv({
                ...cv,
                personal: { ...cv.personal, lastName: e.target.value },
              })
            }
          />

          <input
            placeholder="Ønsket stilling"
            className="w-full border p-2 rounded"
            value={cv.personal.title}
            onChange={(e) =>
              setCv({
                ...cv,
                personal: { ...cv.personal, title: e.target.value },
              })
            }
          />

          <input
            placeholder="E-post"
            className="w-full border p-2 rounded"
            value={cv.personal.email}
            onChange={(e) =>
              setCv({
                ...cv,
                personal: { ...cv.personal, email: e.target.value },
              })
            }
          />

          <input
            placeholder="Telefon"
            className="w-full border p-2 rounded"
            value={cv.personal.phone}
            onChange={(e) =>
              setCv({
                ...cv,
                personal: { ...cv.personal, phone: e.target.value },
              })
            }
          />
        </section>

        {/* SAMMENDRAG */}
        <section>
          <h2 className="font-semibold mb-1">Sammendrag</h2>
          <textarea
            placeholder="Kort profesjonelt sammendrag"
            className="w-full border p-2 rounded h-24"
            value={cv.summary}
            onChange={(e) => setCv({ ...cv, summary: e.target.value })}
          />
        </section>

        {/* FERDIGHETER */}
        <section>
          <h2 className="font-semibold mb-1">Ferdigheter</h2>

          <input
            placeholder="F.eks. Kundeservice"
            className="w-full border p-2 rounded"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                const value = (e.target as HTMLInputElement).value
                if (!value) return

                setCv({
                  ...cv,
                  skills: [...cv.skills, { id: crypto.randomUUID(), name: value }],
                })

                ;(e.target as HTMLInputElement).value = ""
              }
            }}
          />
        </section>
      </div>

      {/* ===================== */}
      {/* PREVIEW (HØYRE) */}
      {/* ===================== */}
      <div>
        <DownloadPdfButton />
        <CVPreview cv={cv} />
      </div>
    </div>
  )
}