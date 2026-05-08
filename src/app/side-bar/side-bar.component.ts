import { Component, ChangeDetectionStrategy, Input, signal } from '@angular/core';
import { ProfileModel, SkillCategoryModel } from '../models/profile.model';
import { CvPdfService } from '../services/cv-pdf.service';

@Component({
  selector: 'app-side-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  @Input() isEnglish = false;

  isCollapsed = signal(false);
  isDownloading = signal(false);

  constructor(private cvPdf: CvPdfService) {}

  toggleCollapse(): void {
    this.isCollapsed.update(v => !v);
  }

  async downloadCV(): Promise<void> {
    this.isDownloading.set(true);
    await this.cvPdf.generate(this.profile);
    this.isDownloading.set(false);
  }

  get profile(): ProfileModel {
    return this.isEnglish ? this.profileEN : this.profileES;
  }

  private readonly profileES: ProfileModel = {
    greeting: 'Hola, mi nombre es',
    name: 'Alejandro Tomba',
    title: 'Técnico en Programación',
    description: 'Desarrollador Full-Stack .NET con sólidos conocimientos en .NET Core, C#, Entity Framework, SQL Server, MySQL, AutoMapper y FluentValidation. Diseño soluciones escalables y colaboro en equipos Agile.',
    skillCategories: [
      { name: 'Lenguajes', items: ['C#', 'TypeScript'] },
      { name: 'Frameworks y Web', items: ['Angular', '.NET Core', 'ASP.NET Identity', 'Entity Framework', 'MVC', 'Razor Pages', 'Web API'] },
      { name: 'Seguridad', items: ['JWT', 'Autorización'] },
      { name: 'Bases de Datos', items: ['SQL Server', 'MySQL', 'PostgreSQL'] },
      { name: 'IA e Integración', items: ['OpenAI API', 'Integración de IA', 'APIs REST'] },
      { name: 'Herramientas', items: ['GitHub', 'Insomnia', 'UML'] },
    ],
    education: [{ institution: 'UTN FRCU', degree: 'Técnico en Programación' }],
    experience: [
      { place: 'Municipio de Concepcion del Uruguay - Entre Ríos - Argentina', role: 'Práctica Profesional', area: 'Área de Tecnología' },
      { place: 'Proyectos Personales', role: 'Integración de IA en aplicaciones', area: 'OpenAI API · .NET Core · Automatización inteligente' },
    ],
    courses: [
      { institution: 'Udemy', degree: 'API Mastery: C# en el Backend desde la práctica' },
      { institution: 'Taller', degree: 'Generación de competencias en desarrollo de software con GeneXus orientado a Bantotal' },
    ],
    availability: 'Full-time / Part-time',
    languages: ['Español (nativo)', 'Inglés (intermedio)'],
    contact: [
      { url: 'mailto:tombaalejandro456@gmail.com', label: 'tombaalejandro456@gmail.com', iconClass: 'uil uil-envelope' },
      { url: 'https://www.linkedin.com/in/alejandro-tomba-a5405312a/', label: 'LinkedIn', iconClass: 'uil uil-linkedin' },
      { url: 'https://github.com/aletomba', label: 'github.com/aletomba', iconClass: 'uil uil-github', cvVisible: false },
    ],
    photoUrl: 'assets/img/Diseño sin título.jpg',
    photoAlt: 'Foto de perfil de Alejandro Tomba',
    labels: {
      skillsTitle: 'Habilidades Técnicas',
      educationTitle: 'Educación',
      experienceTitle: 'Experiencia',
      coursesTitle: 'Cursos y Certificaciones',
      contactTitle: 'Contacto',
      additionalInfoTitle: 'Información Adicional',
      availabilityLabel: 'Disponibilidad',
      languagesLabel: 'Idiomas',
      downloadCV: 'Descargar CV',
      generatingPDF: 'Generando PDF...',
      expand: 'Expandir perfil',
      collapse: 'Colapsar perfil',
    },
  };

  private readonly profileEN: ProfileModel = {
    greeting: 'Hi, my name is',
    name: 'Alejandro Tomba',
    title: 'Programming Technician',
    description: 'Full-Stack .NET Developer with solid knowledge in .NET Core, C#, Entity Framework, SQL Server, MySQL, AutoMapper and FluentValidation. I design scalable solutions and collaborate in Agile teams.',
    skillCategories: [
      { name: 'Languages', items: ['C#', 'TypeScript'] },
      { name: 'Frameworks & Web', items: ['Angular', '.NET Core', 'ASP.NET Identity', 'Entity Framework', 'MVC', 'Razor Pages', 'Web API'] },
      { name: 'Security', items: ['JWT', 'Authorization'] },
      { name: 'Databases', items: ['SQL Server', 'MySQL', 'PostgreSQL'] },
      { name: 'AI & Integration', items: ['OpenAI API', 'AI Integration', 'REST APIs'] },
      { name: 'Tools', items: ['GitHub', 'Insomnia', 'UML'] },
    ],
    education: [{ institution: 'UTN FRCU', degree: 'Programming Technician' }],
    experience: [
      { place: 'Municipality of Concepción del Uruguay - Entre Ríos - Argentina', role: 'Professional Internship', area: 'Technology Department' },
      { place: 'Personal Projects', role: 'AI Integration in Applications', area: 'OpenAI API · .NET Core · Intelligent Automation' },
    ],
    courses: [
      { institution: 'Udemy', degree: 'API Mastery: C# Backend from Practice' },
      { institution: 'Workshop', degree: 'Software Development Competencies with GeneXus for Bantotal' },
    ],
    availability: 'Full-time / Part-time',
    languages: ['Spanish (native)', 'English (intermediate)'],
    contact: [
      { url: 'mailto:tombaalejandro456@gmail.com', label: 'tombaalejandro456@gmail.com', iconClass: 'uil uil-envelope' },
      { url: 'https://www.linkedin.com/in/alejandro-tomba-a5405312a/', label: 'LinkedIn', iconClass: 'uil uil-linkedin' },
      { url: 'https://github.com/aletomba', label: 'github.com/aletomba', iconClass: 'uil uil-github', cvVisible: false },
    ],
    photoUrl: 'assets/img/Diseño sin título.jpg',
    photoAlt: 'Alejandro Tomba profile photo',
    labels: {
      skillsTitle: 'Technical Skills',
      educationTitle: 'Education',
      experienceTitle: 'Experience',
      coursesTitle: 'Courses & Certifications',
      contactTitle: 'Contact',
      additionalInfoTitle: 'Additional Information',
      availabilityLabel: 'Availability',
      languagesLabel: 'Languages',
      downloadCV: 'Download CV',
      generatingPDF: 'Generating PDF...',
      expand: 'Expand profile',
      collapse: 'Collapse profile',
    },
  };

}
