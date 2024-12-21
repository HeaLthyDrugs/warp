"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getGitHubData } from '@/app/server/github';

interface GitHubContextType {
  profile: any | null;
  repositories: any[] | null;
  commitActivity: number[] | null;
  languageStats: { [key: string]: number } | null;
  totalStars: number;
  loading: boolean;
  error: string | null;
}

const GitHubContext = createContext<{
  githubData: GitHubContextType;
  setGithubData: React.Dispatch<React.SetStateAction<GitHubContextType>>;
} | null>(null);

export function GitHubProvider({ children }: { children: React.ReactNode }) {
  const [githubData, setGithubData] = useState<GitHubContextType>({
    profile: null,
    repositories: [],
    commitActivity: null,
    languageStats: null,
    totalStars: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    async function fetchGitHubData() {
      const data = await getGitHubData();
      setGithubData(prev => ({
        ...prev,
        ...data,
        loading: false
      }));
    }

    fetchGitHubData();
  }, []);

  return (
    <GitHubContext.Provider value={{ githubData, setGithubData }}>
      {children}
    </GitHubContext.Provider>
  );
}

export function useGitHub() {
  const context = useContext(GitHubContext);
  if (!context) {
    throw new Error('useGitHub must be used within a GitHubProvider');
  }
  return context;
} 