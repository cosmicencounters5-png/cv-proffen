import { CV } from "@/types/cv"

export const EMPTY_CV: CV = {
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