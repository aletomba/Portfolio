import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  private _isEnglish: boolean;

  constructor() {
    const stored = localStorage.getItem('lang');
    if (stored) {
      this._isEnglish = stored === 'en';
    } else {
      this._isEnglish = navigator.language.toLowerCase().startsWith('en');
    }
  }

  get isEnglish(): boolean {
    return this._isEnglish;
  }

  toggle(): void {
    this._isEnglish = !this._isEnglish;
    localStorage.setItem('lang', this._isEnglish ? 'en' : 'es');
  }
}
