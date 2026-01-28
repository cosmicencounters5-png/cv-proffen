export type CV = {
  id: string
  personal: {
    firstName: string
    lastName: string
    title: string
    email: string
    phone: string
  }
  experience: {
    id: string
    role: string
    company: string
    from?: string
    to?: string
    description?: string
  }[]
  education: {
    id: string
    school: string
    degree: string
    year?: string
  }[]
  skills: {
    id: string
    name: string
  }[]
}