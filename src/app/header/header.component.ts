import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  links:Array<LinkModel> = [
    {
      link : 'https://www.linkedin.com/in/alejandro-tomba-a5405312a/',
      icon : '<i class="uil uil-linkedin"></i>'
    },
    {
      link : 'https://github.com/aletomba',
      icon : '<i class="uil uil-github"></i>'
    },
    {
      link : 'mailto:tombaalejandro456gmail.com',
      icon : '<i class="uil uil-mailbox"></i>'
    }
  ];


}

class LinkModel{
  link : string = ''
  icon :string =''
}
