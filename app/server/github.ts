"use server";

import { cookies } from "next/headers";
import { GitHubService } from "@/lib/github";

export async function getGitHubData() {
  try {
    const cookieStore = await cookies();
    const githubToken = cookieStore.get('github_token')?.value;

    if (!githubToken) {
      throw new Error('GitHub token not found');
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
      error: 'Failed to fetch GitHub data'
    };
  }
} 