export type CV = {
  id: string

  personal: {
    firstName: string
    lastName: string
    title: string // 👈 Profesjonell tittel (viktig)
    email: string
    phone: string
  }

  experience: {
    id: string
    role: string
    company: string
    from: string
    to: string
    description?: string
  }[]

  education: {
    id: string
    degree: string
    school: string
    year: string
  }[]

  skills: {
    id: string
    name: string
  }[]
}