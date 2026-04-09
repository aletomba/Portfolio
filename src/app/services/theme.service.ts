import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'portfolio-theme';
  private readonly DARK_CLASS = 'dark-mode';
  private readonly renderer: Renderer2;

  private readonly darkMode$ = new BehaviorSubject<boolean>(false);

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.init();
  }

  get isDarkMode$(): Observable<boolean> {
    return this.darkMode$.asObservable();
  }

  get isDarkMode(): boolean {
    return this.darkMode$.value;
  }

  toggle(): void {
    this.setDarkMode(!this.darkMode$.value);
  }

  private init(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved !== null ? saved === 'dark' : prefersDark;
    this.setDarkMode(shouldBeDark);
  }

  private setDarkMode(dark: boolean): void {
    const body = document.body;
    if (dark) {
      this.renderer.addClass(body, this.DARK_CLASS);
    } else {
      this.renderer.removeClass(body, this.DARK_CLASS);
    }
    localStorage.setItem(this.STORAGE_KEY, dark ? 'dark' : 'light');
    this.darkMode$.next(dark);
  }
}
