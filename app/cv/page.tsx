"use client"

import { useState } from "react"
import CVPreview from "@/components/CVPreview"
import { CV } from "@/types/cv"

const EMPTY_CV: CV = {
  id: "new",
  personal: {
    firstName: "",
    lastName: "",
    title: "", // ✅ VIKTIG: profesjonell tittel
    email: "",
    phone: "",
  },
  experience: [],
  education: [],
  skills: [],
}

export default function CVPage() {
  const [cv, setCV] = useState<CV>(EMPTY_CV)

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Editor */}
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Rediger CV</h1>

        <input
          placeholder="Fornavn"
          value={cv.personal.firstName}
          onChange={(e) =>
            setCV({
              ...cv,
              personal: { ...cv.personal, firstName: e.target.value },
            })
          }
          className="w-full border rounded px-3 py-2"
        />

        <input
          placeholder="Etternavn"
          value={cv.personal.lastName}
          onChange={(e) =>
            setCV({
              ...cv,
              personal: { ...cv.personal, lastName: e.target.value },
            })
          }
          className="w-full border rounded px-3 py-2"
        />

        <input
          placeholder="Tittel / rolle (f.eks. Frontend-utvikler)"
          value={cv.personal.title}
          onChange={(e) =>
            setCV({
              ...cv,
              personal: { ...cv.personal, title: e.target.value },
            })
          }
          className="w-full border rounded px-3 py-2"
        />

        <input
          placeholder="E-post"
          value={cv.personal.email}
          onChange={(e) =>
            setCV({
              ...cv,
              personal: { ...cv.personal, email: e.target.value },
            })
          }
          className="w-full border rounded px-3 py-2"
        />

        <input
          placeholder="Telefon"
          value={cv.personal.phone}
          onChange={(e) =>
            setCV({
              ...cv,
              personal: { ...cv.personal, phone: e.target.value },
            })
          }
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Preview */}
      <div>
        <CVPreview cv={cv} />
      </div>
    </div>
  )
}