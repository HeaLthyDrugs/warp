"use client";

import Header from '@/components/Header'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Code2, 
  GitBranch, 
  Users, 
  Star,
  Plus,
  Brain,
  Activity,
  FolderGit,
  ArrowUp,
  Target,
  ArrowDown,
  Coffee
} from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Line, LineChart, Tooltip } from 'recharts'
import { useAuth } from '@/context/AuthContext';
import { useGitHub } from '@/context/GitHubContext';

const Home = () => {
    const { user } = useAuth();
    const { profile, repositories, contributions, isLoading, error } = useGitHub();

    // Sample data for charts
    const productivityData = [
      { name: 'Mon', hours: 6 },
      { name: 'Tue', hours: 7 },
      { name: 'Wed', hours: 8 },
      { name: 'Thu', hours: 6 },
      { name: 'Fri', hours: 7 },
      { name: 'Sat', hours: 4 },
      { name: 'Sun', hours: 3 },
    ];

    const commitData = [
      { name: 'Mon', commits: 12 },
      { name: 'Tue', commits: 19 },
      { name: 'Wed', commits: 15 },
      { name: 'Thu', commits: 8 },
      { name: 'Fri', commits: 22 },
      { name: 'Sat', commits: 14 },
      { name: 'Sun', commits: 10 },
    ];

    // Updated sample data for GitHub activity
    const activityData = [
      { name: 'Mon', contributions: 15, stars: 5 },
      { name: 'Tue', contributions: 22, stars: 8 },
      { name: 'Wed', contributions: 18, stars: 12 },
      { name: 'Thu', contributions: 25, stars: 7 },
      { name: 'Fri', contributions: 30, stars: 15 },
      { name: 'Sat', contributions: 12, stars: 3 },
      { name: 'Sun', contributions: 8, stars: 4 },
    ];

    return (
        <div className="min-h-screen bg-white p-8">
            <div className='mb-8'>
                <Header 
                  type="greeting" 
                  title="Good Morning" 
                  user={user?.name} 
                  subtext="Manage and Be productive" 
                />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="flex items-center p-6">
                        <div className="bg-[#f0e6ff] p-3 rounded-full mr-4">
                            <FolderGit className="w-6 h-6 text-[#9f7aea]" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Repositories</p>
                            <h3 className="text-2xl font-bold">{repositories?.length || 0}</h3>
                            <p className="text-xs text-[#9f7aea] mt-1">
                                View All
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center p-6">
                        <div className="bg-[#e8f3ff] p-3 rounded-full mr-4">
                            <Code2 className="w-6 h-6 text-[#7ba6de]" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Coding Time</p>
                            <h3 className="text-2xl font-bold">6h 30m</h3>
                            <p className="text-xs text-green-500 flex items-center mt-1">
                                <ArrowUp className="w-3 h-3 mr-1" />
                                12% vs yesterday
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center p-6">
                        <div className="bg-[#e8f7f0] p-3 rounded-full mr-4">
                            <GitBranch className="w-6 h-6 text-[#93c9af]" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Commits Today</p>
                            <h3 className="text-2xl font-bold">23</h3>
                            <p className="text-xs text-red-500 flex items-center mt-1">
                                <ArrowDown className="w-3 h-3 mr-1" />
                                8% vs yesterday
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center p-6">
                        <div className="bg-[#fff2e8] p-3 rounded-full mr-4">
                            <Target className="w-6 h-6 text-[#f3a683]" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
                            <h3 className="text-2xl font-bold">15/20</h3>
                            <p className="text-xs text-green-500 flex items-center mt-1">
                                <ArrowUp className="w-3 h-3 mr-1" />
                                75% completion
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center p-6">
                        <div className="bg-[#ffeef8] p-3 rounded-full mr-4">
                            <Coffee className="w-6 h-6 text-[#e8a0c9]" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Break Time</p>
                            <h3 className="text-2xl font-bold">45m</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                                Today's total
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <div className="flex gap-4 flex-wrap">
                    <button className="flex items-center gap-2 bg-[#e6f0ff] text-[#4a90e2] px-4 py-2 rounded-full hover:bg-[#d1e3ff] transition-colors">
                        <Plus className="w-4 h-4" /> New Repository
                    </button>
                    <button className="flex items-center gap-2 bg-[#fff0e6] text-[#f6ad55] px-4 py-2 rounded-full hover:bg-[#ffe4cc] transition-colors">
                        <Brain className="w-4 h-4" /> AI Suggestions
                    </button>
                    {/* Add more quick action buttons */}
                </div>
            </div>

            {/* GitHub Activity Chart - Updated design */}
            <Card className="mb-8 rounded-xl shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-[#9f7aea]" />
                        GitHub Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={activityData}>
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="contributions"
                                stroke="#9f7aea"
                                strokeWidth={2}
                                dot={{ fill: "#9f7aea" }}
                            />
                            <Line
                                type="monotone"
                                dataKey="stars"
                                stroke="#f6ad55"
                                strokeWidth={2}
                                dot={{ fill: "#f6ad55" }}
                            />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Recent Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="rounded-xl shadow-lg">
                    <CardHeader>
                        <CardTitle>Recent Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Add recent projects list */}
                        <div className="space-y-4">
                            {repositories?.slice(0, 4).map((repo: any) => (
                                <div key={repo.id} className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-[#faf8f6] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <FolderGit className="w-5 h-5 text-[#9f7aea]" />
                                        <div>
                                            <p className="font-medium">{repo.name}</p>
                                            <p className="text-sm text-muted-foreground">{repo.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">{repo.language}</span>
                                        <Star className="w-4 h-4 text-[#f6ad55]" />
                                        <span className="text-sm">{repo.stargazers_count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* AI Suggestions Card */}
                <Card className="rounded-xl shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Brain className="w-5 h-5 text-[#9f7aea]" />
                            AI Suggestions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Add AI suggestions content */}
                        <div className="space-y-4">
                            <div className="p-3 bg-[#f0e6ff] rounded-lg">
                                <p className="font-medium text-[#9f7aea]">Update Documentation</p>
                                <p className="text-sm text-muted-foreground">Your project 'awesome-project' hasn't had its README updated in 30 days.</p>
                            </div>
                            {/* Add more suggestions */}
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

export default Home