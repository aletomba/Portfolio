export interface SkillCategoryModel {
  name: string;
  items: string[];
}

export interface ProfileLabels {
  skillsTitle: string;
  educationTitle: string;
  experienceTitle: string;
  coursesTitle: string;
  contactTitle: string;
  additionalInfoTitle: string;
  availabilityLabel: string;
  languagesLabel: string;
  downloadCV: string;
  generatingPDF: string;
  expand: string;
  collapse: string;
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
  labels: ProfileLabels;
}
