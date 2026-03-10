export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  created_at: string;
  language: string | null;
  private: boolean;
  stargazers_count: number;
  forks_count: number;
}
