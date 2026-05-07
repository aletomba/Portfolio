export interface SkillCategoryModel {
  name: string;
  items: string[];
}

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
  cvVisible?: boolean;
}

export interface ProfileModel {
  greeting: string;
  name: string;
  title: string;
  description: string;
  skillCategories: SkillCategoryModel[];
  education: EducationModel[];
  experience: ExperienceModel[];
  courses?: EducationModel[];
  availability: string;
  languages: string[];
  contact: ContactModel[];
  photoUrl: string;
  photoAlt: string;
}
