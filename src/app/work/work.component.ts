import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GithubRepo } from '../models/github-repo.model';
import { GithubReposService } from '../services/github-repos.service';

@Component({
  selector: 'app-work',
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

}
