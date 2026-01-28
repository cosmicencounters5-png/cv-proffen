"use client"

import { useState } from "react"
import { CV } from "@/types/cv"

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
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Ny CV</h1>

      <input
        className="border w-full mb-2 p-2"
        placeholder="Fornavn"
        value={cv.personal.firstName}
        onChange={(e) =>
          setCv({
            ...cv,
            personal: { ...cv.personal, firstName: e.target.value },
          })
        }
      />

      <input
        className="border w-full mb-2 p-2"
        placeholder="Etternavn"
        value={cv.personal.lastName}
        onChange={(e) =>
          setCv({
            ...cv,
            personal: { ...cv.personal, lastName: e.target.value },
          })
        }
      />
    </div>
  )
}