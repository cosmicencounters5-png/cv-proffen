"use client"

import { useState } from "react"
import { CV } from "@/types/cv"
import CVSection from "@/components/CVSection"
import PersonalForm from "@/components/PersonalForm"
import ExperienceSection from "@/components/ExperienceSection"
import CVPreview from "@/components/CVPreview"

export default function CVPage() {
  const [cv, setCv] = useState<CV>({
    personal: { firstName: "", lastName: "", email: "", phone: "" },
    experience: [],
  })

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <CVSection title="Personalia">
          <PersonalForm cv={cv} setCv={setCv} />
        </CVSection>

        <CVSection title="Arbeidserfaring">
          <ExperienceSection cv={cv} setCv={setCv} />
        </CVSection>
      </div>

      <CVPreview cv={cv} />
    </div>
  )
}