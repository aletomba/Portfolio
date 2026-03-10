import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { GithubRepo } from '../models/github-repo.model';

@Injectable({
  providedIn: 'root'
})
export class GithubReposService {
  private readonly url = 'https://api.github.com/users/aletomba/repos';

  constructor(private readonly httpClient: HttpClient) {}

  loadRepos(): Observable<GithubRepo[]> {
    return this.httpClient.get<GithubRepo[]>(this.url).pipe(
      catchError(error => throwError(() => new Error(`Error al cargar repositorios: ${error.message}`)))
    );
  }
}


