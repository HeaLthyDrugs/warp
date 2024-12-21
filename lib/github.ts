import { Octokit } from "@octokit/rest";

export class GitHubService {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_ACCESS_TOKEN
    });
  }

  async getUserProfile() {
    const { data } = await this.octokit.users.getByUsername({
      username: process.env.GITHUB_USERNAME || ''
    });
    return data;
  }

  async getUserRepositories() {
    const { data } = await this.octokit.repos.listForUser({
      username: process.env.GITHUB_USERNAME || '',
      sort: 'updated',
      per_page: 10
    });
    return data;
  }

  async getCommitActivity() {
    const username = process.env.GITHUB_USERNAME || '';
    const { data } = await this.octokit.search.commits({
      q: `author:${username}`,
      sort: 'author-date',
      per_page: 100
    });

    // Process commits by day
    const last7Days = new Array(7).fill(0);
    const today = new Date();
    
    data.items.forEach((commit: any) => {
      const commitDate = new Date(commit.commit.author.date);
      const dayDiff = Math.floor((today.getTime() - commitDate.getTime()) / (1000 * 60 * 60 * 24));
      if (dayDiff < 7) {
        last7Days[dayDiff]++;
      }
    });

    return last7Days.reverse();
  }

  async getLanguageStats() {
    const repos = await this.getUserRepositories();
    const languageStats: { [key: string]: number } = {};

    await Promise.all(
      repos.map(async (repo) => {
        if (repo.language) {
          languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
        }
      })
    );

    return languageStats;
  }

  async getTotalStars() {
    const repos = await this.getUserRepositories();
    return repos.reduce((total, repo) => total + (repo.stargazers_count ?? 0), 0);
  }
} 