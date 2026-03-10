import { Component } from '@angular/core';
import { LinkModel } from '../models/link.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  readonly links: LinkModel[] = [
    {
      url: 'https://www.linkedin.com/in/alejandro-tomba-a5405312a/',
      iconClass: 'uil uil-linkedin',
      label: 'LinkedIn'
    },
    {
      url: 'https://github.com/aletomba',
      iconClass: 'uil uil-github',
      label: 'GitHub'
    },
    {
      url: 'mailto:tombaalejandro456@gmail.com',
      iconClass: 'uil uil-mailbox',
      label: 'Email'
    }
  ];

}
