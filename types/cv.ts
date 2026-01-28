export type PersonalInfo = {
  firstName: string
  lastName: string
  title: string
  email: string
  phone: string
}

export type Experience = {
  id: string
  role: string
  company: string
  from: string
  to: string
  description?: string
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
  personal: PersonalInfo
  summary?: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
}