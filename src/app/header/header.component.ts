import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LinkModel } from '../models/link.model';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isDarkMode = false;
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.isDarkMode$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(dark => this.isDarkMode = dark);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
