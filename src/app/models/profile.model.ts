export interface EducationModel {
  institution: string;
  degree: string;
  year?: string;
}

export interface ExperienceModel {
  place: string;
  role: string;
  area?: string;
  period?: string;
}

export interface ContactModel {
  url: string;
  label: string;
  iconClass: string;
}

export interface ProfileModel {
  greeting: string;
  name: string;
  title: string;
  description: string;
  skills: string[];
  education: EducationModel[];
  experience: ExperienceModel[];
  availability: string;
  languages: string[];
  contact: ContactModel[];
  photoUrl: string;
  photoAlt: string;
}
