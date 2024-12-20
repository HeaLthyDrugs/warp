declare interface GitHubProfile {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
}

declare interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
}

declare interface GitHubContribution {
  total: number;
  author: {
    login: string;
    id: number;
  };
  weeks: {
    w: string;
    a: number;
    d: number;
    c: number;
  }[];
}

declare interface GitHubContextType {
  profile: GitHubProfile | null;
  repositories: GitHubRepository[] | null;
  contributions: GitHubContribution | null;
  isLoading: boolean;
  error: string | null;
} 