import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GithubRepo } from '../models/github-repo.model';
import { GithubReposService } from '../services/github-repos.service';

@Component({
  selector: 'app-work',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit, OnDestroy {

  repos: GithubRepo[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly gitHubService: GithubReposService) {}

  ngOnInit(): void {
    this.gitHubService.loadRepos().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (repos) => {
        this.repos = repos;
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
        this.isLoading = false;
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
