"use client"

import { useEffect, useState } from "react"
import { CV } from "@/types/cv"
import CVSection from "@/components/CVSection"
import PersonalForm from "@/components/PersonalForm"
import ExperienceSection from "@/components/ExperienceSection"
import EducationSection from "@/components/EducationSection"
import SkillsSection from "@/components/SkillsSection"
import CVPreview from "@/components/CVPreview"

const EMPTY_CV: CV = {
  personal: { firstName: "", lastName: "", email: "", phone: "" },
  experience: [],
  education: [],
  skills: [],
}

export default function CVPage() {
  const [cv, setCv] = useState<CV>(EMPTY_CV)
  const [loaded, setLoaded] = useState(false)

  // 🔹 Last fra localStorage én gang
  useEffect(() => {
    const stored = localStorage.getItem("cv")
    if (stored) {
      setCv(JSON.parse(stored))
    }
    setLoaded(true)
  }, [])

  // 🔹 Lagre hver gang CV endres
  useEffect(() => {
    if (!loaded) return
    localStorage.setItem("cv", JSON.stringify(cv))
  }, [cv, loaded])

  if (!loaded) return null

  return (
    <div className="grid lg:grid-cols-[1fr_420px] gap-6">
      <div>
        <CVSection title="Personalia">
          <PersonalForm cv={cv} setCv={setCv} />
        </CVSection>

        <CVSection title="Arbeidserfaring">
          <ExperienceSection cv={cv} setCv={setCv} />
        </CVSection>

        <CVSection title="Utdanning">
          <EducationSection cv={cv} setCv={setCv} />
        </CVSection>

        <CVSection title="Ferdigheter">
          <SkillsSection cv={cv} setCv={setCv} />
        </CVSection>
      </div>

      <CVPreview cv={cv} />
    </div>
  )
}