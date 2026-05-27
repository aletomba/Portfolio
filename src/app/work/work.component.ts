import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GithubRepo } from '../models/github-repo.model';
import { GithubReposService } from '../services/github-repos.service';
import { PROJECT_METADATA, ProjectMeta, ProjectType } from '../data/project-metadata';

@Component({
  selector: 'app-work',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit, OnDestroy {

  @Input() set isEnglish(value: boolean) {
    this._isEnglish = value;
    this.labels = this.buildLabels();
  }
  get isEnglish(): boolean { return this._isEnglish; }

  private _isEnglish = false;

  repos: GithubRepo[] = [];
  isLoading = true;
  hasError = false;
  selectedLanguage: string | null = null;
  lightboxSrc: string | null = null;
  lightboxType: 'image' | 'video' = 'image';
  readonly slideIndex = new Map<string, number>();

  allLanguages: string[] = [];
  filteredRepos: GithubRepo[] = [];
  labels = this.buildLabels();

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly gitHubService: GithubReposService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.gitHubService.loadRepos().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (repos) => {
        this.repos = repos;
        this.hasError = false;
        if (this.selectedLanguage && !repos.some(r => r.language === this.selectedLanguage)) {
          this.selectedLanguage = null;
        }
        this.allLanguages = this.computeAllLanguages();
        this.filteredRepos = this.computeFilteredRepos();
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (_err: Error) => {
        this.hasError = true;
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByRepoId(_index: number, repo: GithubRepo): number {
    return repo.id;
  }

  trackByLang(_index: number, lang: string): string {
    return lang;
  }

  getMeta(repoName: string): ProjectMeta | undefined {
    return PROJECT_METADATA[repoName];
  }

  getPreviewImage(repoName: string): string {
    const meta = PROJECT_METADATA[repoName];
    if (meta?.previewImages?.length) {
      const idx = this.slideIndex.get(repoName) ?? 0;
      return meta.previewImages[idx];
    }
    if (meta?.previewImage) return meta.previewImage;
    return `https://opengraph.githubassets.com/1/aletomba/${repoName}`;
  }

  getActiveImage(repoName: string): string {
    const meta = PROJECT_METADATA[repoName];
    const images = meta?.previewImages;
    if (!images?.length) return this.getPreviewImage(repoName);
    const idx = this.slideIndex.get(repoName) ?? 0;
    return images[idx];
  }

  nextSlide(repoName: string, images: string[], event: Event): void {
    event.stopPropagation();
    const current = this.slideIndex.get(repoName) ?? 0;
    this.slideIndex.set(repoName, (current + 1) % images.length);
    this.cdr.markForCheck();
  }

  prevSlide(repoName: string, images: string[], event: Event): void {
    event.stopPropagation();
    const current = this.slideIndex.get(repoName) ?? 0;
    this.slideIndex.set(repoName, (current - 1 + images.length) % images.length);
    this.cdr.markForCheck();
  }

  goToSlide(repoName: string, index: number, event: Event): void {
    event.stopPropagation();
    this.slideIndex.set(repoName, index);
    this.cdr.markForCheck();
  }

  getTypeLabel(type: ProjectType | undefined): string {
    if (!type) return '';
    const map: Record<ProjectType, string> = {
      frontend: 'Frontend',
      backend: 'Backend',
      fullstack: 'Full-Stack',
      desktop: 'Desktop',
    };
    return map[type];
  }

  openLightbox(src: string, type: 'image' | 'video' = 'image'): void {
    this.lightboxSrc = src;
    this.lightboxType = type;
    this.cdr.markForCheck();
  }

  closeLightbox(): void {
    this.lightboxSrc = null;
    this.cdr.markForCheck();
  }

  private computeAllLanguages(): string[] {
    const langs = this.repos
      .map(r => r.language)
      .filter((l): l is string => l != null);
    return [...new Set(langs)].sort();
  }

  private computeFilteredRepos(): GithubRepo[] {
    if (!this.selectedLanguage) return this.repos;
    return this.repos.filter(r => r.language === this.selectedLanguage);
  }

  private buildLabels() {
    return this._isEnglish ? {
      title: 'GitHub Repositories',
      viewRepo: 'View repository on GitHub',
      errorMessage: 'Failed to load repositories',
      filterAll: 'All',
    } : {
      title: 'Repositorios en GitHub',
      viewRepo: 'Ver repositorio en GitHub',
      errorMessage: 'Error al cargar repositorios',
      filterAll: 'Todos',
    };
  }

  selectLanguage(lang: string | null): void {
    this.selectedLanguage = lang;
    this.filteredRepos = this.computeFilteredRepos();
    this.cdr.markForCheck();
  }

  getLanguageColor(language: string): string {
    const colors: Record<string, string> = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#3178c6',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'Python': '#3572A5',
      'Java': '#b07219',
      'C#': '#178600',
      'C++': '#f34b7d',
      'C': '#555555',
      'PHP': '#4F5D95',
      'Ruby': '#701516',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'Swift': '#F05138',
      'Kotlin': '#A97BFF',
      'Dart': '#00B4AB',
      'Vue': '#41b883',
      'Angular': '#dd0031',
      'Shell': '#89e051',
      'SCSS': '#c6538c',
    };
    return colors[language] || '#8b8b8b';
  }

}
