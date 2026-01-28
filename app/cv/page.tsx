import { CV } from "@/types/cv"
import CVPreview from "@/components/CVPreview"

const EMPTY_CV: CV = {
  id: "temp",
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
  return (
    <div className="max-w-4xl mx-auto p-6">
      <CVPreview cv={EMPTY_CV} />
    </div>
  )
}