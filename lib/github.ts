import { Octokit } from "@octokit/rest";
import { createSessionClient } from "@/appwrite/appwrite.server";

export async function getGitHubToken() {
  try {
    const { account } = await createSessionClient('');
    // Get the current session which contains the OAuth2 data
    const currentSession = await account.getSession('current');

    if (!currentSession?.providerAccessToken) {
      throw new Error('No GitHub access token in current session');
    }

    return currentSession.providerAccessToken;
  } catch (error) {
    console.error('Failed to get GitHub token:', error);
    throw error;
  }
}

export class GitHubService {
  private octokit: Octokit;

  constructor(accessToken: string) {
    this.octokit = new Octokit({
      auth: accessToken,
    });
  }

  async getUserProfile() {
    const { data } = await this.octokit.users.getAuthenticated();
    return data;
  }

  async getUserRepositories() {
    const { data } = await this.octokit.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 5
    });
    return data;
  }

  async getUserContributions() {
    const { data } = await this.octokit.rest.search.commits({
      q: `author:${await this.getUserProfile().then(profile => profile.login)}`,
      sort: 'author-date',
      per_page: 100
    });
    return data;
  }
} 