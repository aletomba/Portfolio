import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { LanguageService } from './language.service';

describe('LanguageService', () => {

  let service: LanguageService;
  let mockDocument: Document;
  let mockLocalStorage: { [key: string]: string };

  function buildDoc(storedLang?: string, navigatorLang = 'es-AR'): Document {
    mockLocalStorage = storedLang !== undefined ? { lang: storedLang } : {};
    const mockWindow = {
      localStorage: {
        getItem: (k: string) => mockLocalStorage[k] ?? null,
        setItem: (k: string, v: string) => { mockLocalStorage[k] = v; },
      },
      navigator: { language: navigatorLang },
    } as unknown as Window;

    return {
      defaultView: mockWindow,
      documentElement: { lang: '' },
    } as unknown as Document;
  }

  function createService(doc: Document): LanguageService {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: DOCUMENT, useValue: doc },
      ],
    });
    return TestBed.inject(LanguageService);
  }

  describe('default language selection (no stored value)', () => {
    it('defaults to English when navigator language starts with "en"', () => {
      mockDocument = buildDoc(undefined, 'en-US');
      service = createService(mockDocument);
      expect(service.isEnglish).toBeTrue();
    });

    it('defaults to Spanish when navigator language does not start with "en"', () => {
      mockDocument = buildDoc(undefined, 'es-AR');
      service = createService(mockDocument);
      expect(service.isEnglish).toBeFalse();
    });
  });

  describe('localStorage read on init', () => {
    it('reads "en" from localStorage and sets isEnglish to true', () => {
      mockDocument = buildDoc('en');
      service = createService(mockDocument);
      expect(service.isEnglish).toBeTrue();
    });

    it('reads "es" from localStorage and sets isEnglish to false', () => {
      mockDocument = buildDoc('es');
      service = createService(mockDocument);
      expect(service.isEnglish).toBeFalse();
    });
  });

  describe('toggle()', () => {
    beforeEach(() => {
      mockDocument = buildDoc('es');
      service = createService(mockDocument);
    });

    it('flips isEnglish from false to true', () => {
      expect(service.isEnglish).toBeFalse();
      service.toggle();
      expect(service.isEnglish).toBeTrue();
    });

    it('updates documentElement.lang to "en" after toggle', () => {
      service.toggle();
      expect(mockDocument.documentElement.lang).toBe('en');
    });

    it('updates documentElement.lang to "es" on second toggle', () => {
      service.toggle();
      service.toggle();
      expect(mockDocument.documentElement.lang).toBe('es');
    });

    it('writes the new language to localStorage', () => {
      service.toggle();
      expect(mockLocalStorage['lang']).toBe('en');
    });

    it('writes back "es" to localStorage on second toggle', () => {
      service.toggle();
      service.toggle();
      expect(mockLocalStorage['lang']).toBe('es');
    });
  });

  describe('SSR (no browser environment)', () => {
    it('defaults to false without throwing when defaultView is null', () => {
      const ssrDoc = { defaultView: null, documentElement: { lang: '' } } as unknown as Document;
      expect(() => createService(ssrDoc)).not.toThrow();
      expect(createService(ssrDoc).isEnglish).toBeFalse();
    });
  });
});
