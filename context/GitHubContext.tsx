"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getGitHubData } from "@/app/server/github";

interface GitHubContextType {
  profile: any;
  repositories: any[];
  contributions: any;
  isLoading: boolean;
  error: string | null;
}

const GitHubContext = createContext<GitHubContextType>({
  profile: null,
  repositories: [],
  contributions: null,
  isLoading: true,
  error: null
});

export const useGitHub = () => useContext(GitHubContext);

export function GitHubProvider({ children }: { children: React.ReactNode }) {
  const [githubData, setGithubData] = useState<GitHubContextType>({
    profile: null,
    repositories: [],
    contributions: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGitHubData();
        setGithubData({
          profile: data.profile,
          repositories: data.repositories || [],
          contributions: data.contributions,
          isLoading: false,
          error: data.error
        });
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setGithubData(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to fetch GitHub data'
        }));
      }
    };

    fetchData();
  }, []);

  return (
    <GitHubContext.Provider value={githubData}>
      {children}
    </GitHubContext.Provider>
  );
} 