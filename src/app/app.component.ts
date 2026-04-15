import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public themeService: ThemeService) {}

  toggleDarkMode(): void {
    this.themeService.toggle();
  }
}
