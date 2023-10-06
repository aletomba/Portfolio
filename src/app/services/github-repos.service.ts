import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubReposService {
  private readonly url = 'https://api.github.com/users/aletomba/repos';

  constructor(private httpClient:HttpClient) { }

  loadRepos = ()=> this.httpClient.get(this.url);
}


