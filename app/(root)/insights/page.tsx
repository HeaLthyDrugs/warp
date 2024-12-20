"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { 
  Zap, 
  Timer, 
  GitCommit, 
  Code2, 
  ArrowUp, 
  ArrowDown,
  Brain,
  Coffee,
  Focus,
  GitBranch, 
  GitPullRequest, 
  GitMerge,
  Search,
  Filter,
  Star,
  GitFork,
  Users,
  Clock,
  Activity
} from 'lucide-react';
import Header from '@/components/Header';
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const InsightsPage = () => {
  // Sample data for repository metrics
  const repoActivityData = [
    { date: 'Mon', commits: 15, prs: 5, issues: 8 },
    { date: 'Tue', commits: 22, prs: 3, issues: 5 },
    // ... more data
  ];

  const topRepositories = [
    { name: 'project-alpha', stars: 120, forks: 45, language: 'TypeScript', updated: '2h ago' },
    { name: 'awesome-utils', stars: 89, forks: 23, language: 'JavaScript', updated: '1d ago' },
    // ... more repos
  ];

  return (
    <div className="min-h-screen bg-[#faf8f6] p-4 sm:p-6 md:p-8">
      <div className="mb-6 md:mb-8">
        <Header 
          title="Repository Insights" 
          subtext="Analyze your GitHub activity and repository metrics"
        />
      </div>

      {/* Search and Filter Section - Updated for better mobile layout */}
      {/* <Card className="mb-6 md:mb-8 rounded-xl shadow-lg">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search repositories..." 
                  className="pl-9 bg-white border-none w-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Activity Overview Cards - Updated grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="flex items-center p-4 md:p-6">
            <div className="bg-[#e6f0ff] p-2 md:p-3 rounded-full mr-3 md:mr-4">
              <GitMerge className="w-5 h-5 md:w-6 md:h-6 text-[#4a90e2]" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Commits</p>
              <h3 className="text-xl md:text-2xl font-bold">1,234</h3>
              <p className="text-xs text-[#4a90e2] flex items-center mt-1">
                +23% this month
              </p>
            </div>
          </CardContent>
        </Card>
        {/* ... similar cards ... */}
      </div>

      {/* Activity Timeline - Responsive height */}
      <Card className="mb-6 md:mb-8 rounded-xl shadow-lg">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Activity className="w-5 h-5 text-[#9f7aea]" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <ResponsiveContainer width="100%" height={300} minHeight={300}>
            <LineChart data={repoActivityData}>
              <XAxis dataKey="date" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="commits" 
                stroke="#4a90e2" 
                strokeWidth={2}
                dot={{ fill: "#4a90e2" }}
              />
              <Line 
                type="monotone" 
                dataKey="prs" 
                stroke="#9f7aea" 
                strokeWidth={2}
                dot={{ fill: "#9f7aea" }}
              />
              <Line 
                type="monotone" 
                dataKey="issues" 
                stroke="#f6ad55" 
                strokeWidth={2}
                dot={{ fill: "#f6ad55" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Repository List - Responsive layout */}
      <Card className="rounded-xl shadow-lg">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Top Repositories</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {topRepositories.map((repo, index) => (
              <div key={index} 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white rounded-lg hover:bg-[#faf8f6] transition-colors gap-4 sm:gap-0"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#f0e6ff] p-2 rounded-full">
                    <GitBranch className="w-4 h-4 text-[#9f7aea]" />
                  </div>
                  <div>
                    <h4 className="font-medium">{repo.name}</h4>
                    <p className="text-sm text-muted-foreground">{repo.language}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#f6ad55]" />
                    <span className="text-sm">{repo.stars}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitFork className="w-4 h-4 text-[#4a90e2]" />
                    <span className="text-sm">{repo.forks}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{repo.updated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsPage;