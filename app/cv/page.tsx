"use client"

import { useEffect, useState } from "react"
import CVPreview from "@/components/CVPreview"
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

  // 🔹 HENT CV VED LOAD
  useEffect(() => {
    fetch("/api/cv")
      .then((res) => res.json())
      .then((data) => {
        if (data.cv) setCv(data.cv)
      })
  }, [])

  // 🔹 AUTO-SAVE (500ms debounce)
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cv),
      })
    }, 500)

    return () => clearTimeout(timeout)
  }, [cv])

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* HER har du dine skjema-komponenter senere */}
      <CVPreview cv={cv} />
    </div>
  )
}