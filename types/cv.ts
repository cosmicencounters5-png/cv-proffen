export type CV = {
  personal: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  experience: Experience[]
  education: Education[]
  skills: Skill[]
}

export type Experience = {
  id: string
  company: string
  role: string
  description: string
}

export type Education = {
  id: string
  school: string
  degree: string
  year: string
}

export type Skill = {
  id: string
  name: string
}