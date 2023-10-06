import { Component, OnInit } from '@angular/core';
import { GithubReposService } from '../services/github-repos.service';
import { map } from 'rxjs';




@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  constructor(private gitHubService:GithubReposService){}

  repos:any;

  ngOnInit(): void {
    this.gitHubService.loadRepos().subscribe(res => {
      this.repos = res;
    })
  }

}
