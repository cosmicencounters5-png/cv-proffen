export type CV = {
  personal: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  experience: Experience[]
}

export type Experience = {
  id: string
  company: string
  role: string
  description: string
}