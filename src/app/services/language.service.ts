import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  private _isEnglish: boolean;
  private readonly isBrowser: boolean;

  constructor(@Inject(DOCUMENT) private readonly doc: Document) {
    this.isBrowser = typeof doc.defaultView !== 'undefined' && doc.defaultView !== null;

    if (this.isBrowser) {
      const stored = this.getStoredLang();
      if (stored) {
        this._isEnglish = stored === 'en';
      } else {
        this._isEnglish = doc.defaultView!.navigator.language.toLowerCase().startsWith('en');
      }
    } else {
      this._isEnglish = false;
    }
    this.applyLang();
  }

  get isEnglish(): boolean {
    return this._isEnglish;
  }

  toggle(): void {
    this._isEnglish = !this._isEnglish;
    this.setStoredLang(this._isEnglish ? 'en' : 'es');
    this.applyLang();
  }

  private getStoredLang(): string | null {
    try {
      return this.doc.defaultView!.localStorage.getItem('lang');
    } catch {
      return null;
    }
  }

  private setStoredLang(lang: string): void {
    try {
      this.doc.defaultView!.localStorage.setItem('lang', lang);
    } catch { /* storage unavailable — silently ignore */ }
  }

  private applyLang(): void {
    this.doc.documentElement.lang = this._isEnglish ? 'en' : 'es';
  }
}
