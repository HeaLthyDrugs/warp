"use client";

import Header from '@/components/Header'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Code2, 
  GitBranch, 
  Clock, 
  Target, 
  ArrowUp, 
  ArrowDown,
  Calendar,
  Coffee,
  FolderGit
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

    return (
        <div className="min-h-screen bg-background p-8">
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
                <Card>
                    <CardContent className="flex items-center p-6">
                        <div className="bg-primary/10 p-3 rounded-full mr-4">
                            <Code2 className="w-6 h-6 text-primary" />
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
                        <div className="bg-green-500/10 p-3 rounded-full mr-4">
                            <GitBranch className="w-6 h-6 text-green-500" />
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
                        <div className="bg-blue-500/10 p-3 rounded-full mr-4">
                            <Target className="w-6 h-6 text-blue-500" />
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
                        <div className="bg-orange-500/10 p-3 rounded-full mr-4">
                            <Coffee className="w-6 h-6 text-orange-500" />
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

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Productivity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={productivityData}>
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
                                    tickFormatter={(value) => `${value}h`}
                                />
                                <Bar
                                    dataKey="hours"
                                    fill="currentColor"
                                    radius={[4, 4, 0, 0]}
                                    className="fill-primary"
                                />
                                <Tooltip />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Commit Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
                            <LineChart data={commitData}>
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
                                    dataKey="commits"
                                    stroke="#16a34a"
                                    strokeWidth={2}
                                    dot={{ fill: "#16a34a" }}
                                />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Repository Stats - Replacing Recent Activity & Upcoming Tasks */}
            <div className="grid grid-cols-1 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FolderGit className="w-5 h-5" />
                            Repository Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Total Repositories</p>
                                <h3 className="text-3xl font-bold">{repositories?.length}</h3>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Active This Month</p>
                                <h3 className="text-3xl font-bold">8</h3>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Public</p>
                                <h3 className="text-3xl font-bold">16</h3>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Private</p>
                                <h3 className="text-3xl font-bold">8</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

export default Home