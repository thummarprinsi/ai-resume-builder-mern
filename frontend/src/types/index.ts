export interface User {
  _id: string;
  name: string;
  email: string;
}


export interface Resume {
  _id: string;
  title: string;
  resumeData: ResumeData;
  templateId: string;
  atsScore: number;
  createdAt: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  summary: string;
  skills: string[];
  projects: [];
  experience: [];
  education: [];
}