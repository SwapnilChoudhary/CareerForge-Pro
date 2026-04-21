export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Skill {
  id: string;
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface ResumeData {
  id?: string;
  userId?: string;
  title: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const defaultResumeData: ResumeData = {
  title: "My Resume",
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  summary: "",
  education: [],
  experience: [],
  skills: [],
};