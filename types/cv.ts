export type CV = {
  id: string
  personal: {
    firstName: string
    lastName: string
    title: string
    email: string
    phone: string
  }
  summary?: string
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
    school: string
    degree: string
    from: string
    to: string
  }[]
  skills: {
    id: string
    name: string
  }[]
}