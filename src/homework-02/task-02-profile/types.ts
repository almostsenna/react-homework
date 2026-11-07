export interface Profile {
  fullName: string;
  nickname: string;
  role: string;
  city: string;
  phone: string;
  email: string;
  github: string;
  photo: string;
  photoAlt: string;
  about: string;
}

export interface WorkExperience {
  id: string;
  title: string;
  area: string;
  description: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}
