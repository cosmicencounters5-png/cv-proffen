"use client"

import { useState } from "react"
import { EMPTY_CV } from "@/lib/emptyCV"
import CVPreview from "@/components/CVPreview"

export default function CVPage() {
  const [cv, setCv] = useState(EMPTY_CV)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* skjema til venstre */}
      <div>SKJEMA HER</div>

      {/* preview til høyre */}
      <CVPreview cv={cv} />
    </div>
  )
}