import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProfileModel } from '../models/profile.model';

@Component({
  selector: 'app-side-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  readonly profile: ProfileModel = {
    greeting: 'Hola, mi nombre es',
    name: 'Alejandro Tomba',
    title: 'Técnico en Programación',
    description: 'Desarrollador Full-Stack .NET con sólidos conocimientos en .NET Core, C#, Entity Framework, SQL Server, MySQL, AutoMapper y FluentValidation. Diseño soluciones escalables y colaboro en equipos Agile.',
    skills: ['.NET Core', 'C#', 'Entity Framework', 'SQL Server', 'MySQL', 'APIs REST', 'OpenAI API', 'Integración de IA'],
    education: [
      {
        institution: 'UTN FRCU',
        degree: 'Técnico en Programación',
      }
    ],
    experience: [
      {
        place: 'Municipio de Concepcion del Uruguay - Entre Ríos - Argentina',
        role: 'Práctica Profesional',
        area: 'Área de Tecnología',
      },
      {
        place: 'Proyectos Personales',
        role: 'Integración de IA en aplicaciones',
        area: 'OpenAI API · .NET Core · Automatización inteligente',
      }
    ],
    availability: 'Full-time / Part-time',
    languages: ['Español (nativo)', 'Inglés (intermedio)'],
    contact: [
      { url: 'mailto:tombaalejandro456@gmail.com', label: 'tombaalejandro456@gmail.com', iconClass: 'uil uil-envelope' },
      { url: 'https://www.linkedin.com/in/alejandro-tomba-a5405312a/', label: 'LinkedIn', iconClass: 'uil uil-linkedin' },
      { url: 'https://github.com/aletomba', label: 'github.com/aletomba', iconClass: 'uil uil-github' }
    ],
    photoUrl: 'assets/img/Diseño sin título.jpg',
    photoAlt: 'Foto de perfil de Alejandro Tomba'
  };

}
