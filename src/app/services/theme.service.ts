import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private _isDarkMode = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initTheme();
  }

  private initTheme(): void {
    const stored = localStorage.getItem('darkMode');
    this._isDarkMode = stored === 'true' || 
      (stored === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
    this.applyTheme();
  }

  get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  toggle(): void {
    this._isDarkMode = !this._isDarkMode;
    localStorage.setItem('darkMode', String(this._isDarkMode));
    this.applyTheme();
  }

  private applyTheme(): void {
    const body = this.document.body;
    if (this._isDarkMode) {
      this.renderer.addClass(body, 'dark-mode');
      this.renderer.setAttribute(this.document.documentElement, 'data-theme', 'dark');
    } else {
      this.renderer.removeClass(body, 'dark-mode');
      this.renderer.setAttribute(this.document.documentElement, 'data-theme', 'light');
    }
  }
}
