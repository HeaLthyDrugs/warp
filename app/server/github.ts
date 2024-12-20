"use server";

import { getGitHubToken, GitHubService } from "@/lib/github";

export async function getGitHubData() {
  try {
    let githubToken;
    try {
      githubToken = await getGitHubToken();
    } catch (tokenError) {
      console.error('Token retrieval error:', tokenError);
      throw new Error('Unable to access GitHub token from session');
    }

    const github = new GitHubService(githubToken);
    
    const [profile, repositories, contributions] = await Promise.all([
      github.getUserProfile(),
      github.getUserRepositories(),
      github.getUserContributions()
    ]);

    return {
      profile,
      repositories,
      contributions,
      error: null
    };
  } catch (error) {
    console.error('Failed to fetch GitHub data:', error);
    return {
      profile: null,
      repositories: null,
      contributions: null,
      error: error instanceof Error ? error.message : 'Failed to fetch GitHub data'
    };
  }
} 