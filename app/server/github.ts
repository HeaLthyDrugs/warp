"use server";

import { GitHubService } from "@/lib/github";

export async function getGitHubData() {
  try {
    const github = new GitHubService();
    
    const [profile, repositories, commitActivity, languageStats, totalStars] = await Promise.all([
      github.getUserProfile(),
      github.getUserRepositories(),
      github.getCommitActivity(),
      github.getLanguageStats(),
      github.getTotalStars()
    ]);

    return {
      profile,
      repositories,
      commitActivity,
      languageStats,
      totalStars,
      error: null
    };
  } catch (error) {
    console.error('Failed to fetch GitHub data:', error);
    return {
      profile: null,
      repositories: null,
      commitActivity: null,
      languageStats: null,
      totalStars: 0,
      error: error instanceof Error ? error.message : 'Failed to fetch GitHub data'
    };
  }
} 