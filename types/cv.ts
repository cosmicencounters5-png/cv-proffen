export type Experience = {
  id: string
  role: string
  company: string
  from: string
  to: string
}

export type Education = {
  id: string
  school: string
  degree: string
  from: string
  to: string
}

export type Skill = {
  id: string
  name: string
}

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
  experience: Experience[]
  education: Education[]
  skills: Skill[]
}