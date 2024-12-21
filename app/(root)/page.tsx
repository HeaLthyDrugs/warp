"use client";

import Header from '@/components/Header'
import React, { useState } from 'react'
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
  Coffee,
  Link,
  Notebook,
  GitCommit,
  GitFork,
  GitMerge
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext';
import { useGitHub } from '@/context/GitHubContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import Spinner from '@/components/ui/spinner';
import { Badge } from "@/components/ui/badge";

const Home = () => {
    const { user } = useAuth();
    const { githubData: { 
      profile, 
      repositories, 
      commitActivity, 
      languageStats,
      totalStars,
      loading, 
      error 
    } } = useGitHub();

    const [activeChart, setActiveChart] = useState<'bar' | 'line'>('bar');
    const [showNoteDialog, setShowNoteDialog] = useState(false);
    const [showProfileDialog, setShowProfileDialog] = useState(false);

    if (loading) {
        return <div>
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        </div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


       // Convert language stats to pie chart data
  const languageData = Object.entries(languageStats || {}).map(([name, value]) => ({
    name,
    value
  }));

    // Convert commit activity to chart data
    const commitData = commitActivity?.map((commits: number, index: number) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      return {
        name: date.toLocaleDateString('en-US', { weekday: 'short' }),
        commits
      };
    }) || [];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    const renderChart = () => {
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChart}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height={350}>
              {activeChart === 'bar' ? (
                <BarChart data={commitData}>
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
                  <Tooltip />
                  <Bar
                    dataKey="commits"
                    fill="#9f7aea"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              ) : (
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
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="commits"
                    stroke="#9f7aea"
                    strokeWidth={2}
                    dot={{ fill: "#9f7aea", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      );
    };

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
                            <p className="text-xs text-[#9f7aea] mt-1">Public Repos</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center p-6">
                        <div className="bg-[#e8f3ff] p-3 rounded-full mr-4">
                            <Star className="w-6 h-6 text-[#7ba6de]" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Stars</p>
                            <h3 className="text-2xl font-bold">{totalStars}</h3>
                            <p className="text-xs text-green-500 flex items-center mt-1">
                                <ArrowUp className="w-3 h-3 mr-1" />
                                Across all repos
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

                <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="flex items-center p-4 md:p-6">
            <div className="bg-[#e6f0ff] p-2 md:p-3 rounded-full mr-3 md:mr-4">
              <GitMerge className="w-5 h-5 md:w-6 md:h-6 text-[#4a90e2]" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Commits</p>
              <h3 className="text-xl md:text-2xl font-bold">
                {commitActivity?.reduce((a, b) => a + b, 0) || 0}
              </h3>
              <p className="text-xs text-[#4a90e2] flex items-center mt-1">
                Last 7 days
              </p>
            </div>
          </CardContent>
        </Card>
            </div>

            {/* GitHub Activity Chart */}
            <Card className="mb-8 rounded-xl shadow-lg">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-[#9f7aea]" />
                            Commit Activity
                        </CardTitle>
                        <div className="flex gap-2">
                            <Button
                                variant={activeChart === 'bar' ? 'outline' : 'default'}
                                size="sm"
                                onClick={() => setActiveChart('bar')}
                                className="text-xs"
                            >
                                Bar
                            </Button>
                            <Button
                                variant={activeChart === 'line' ? 'outline' : 'default'}
                                size="sm"
                                onClick={() => setActiveChart('line')}
                                className="text-xs"
                            >
                                Line
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {renderChart()}
                </CardContent>
            </Card>

            {/* Recent Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="rounded-xl shadow-lg">
                    <CardHeader>
                        <CardTitle>Recent Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {repositories?.slice(0, 4).map((repo: any) => (
                                <div key={repo.id} className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-[#faf8f6] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <FolderGit className="w-5 h-5 text-[#9f7aea]" />
                                        <div>
                                            <p className="font-medium">{repo.name}</p>
                                            <p className="text-sm text-muted-foreground">{repo.description || 'No description'}</p>
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

             {/* Language Distribution */}
      <Card className="rounded-xl shadow-lg">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">Language Distribution</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={languageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {languageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

                       {/* Quick Actions */}
            <div className="mb-8 mt-8 mx-8">
                <div className="flex gap-4 flex-wrap">
                    <button className="flex items-center gap-2 bg-[#e6f0ff] text-[#4a90e2] px-4 py-2 rounded-full hover:bg-[#d1e3ff] transition-colors" onClick={() => {
                        window.open(`https://github.com/HeaLthyDrugs/warp`, '_blank');
                    }}>
                        <Link className="w-4 h-4" /> View Repository
                    </button>
                    <button 
                        className="flex items-center gap-2 bg-[#fff0e6] text-[#f6ad55] px-4 py-2 rounded-full hover:bg-[#ffe4cc] transition-colors"
                        onClick={() => setShowNoteDialog(true)}
                    >
                        <Notebook className="w-4 h-4" /> Note
                    </button>
                    <button 
                        className="flex items-center gap-2 bg-[#e6ffe6] text-[#4ade80] px-4 py-2 rounded-full hover:bg-[#ccffcc] transition-colors"
                        onClick={() => setShowProfileDialog(true)}
                    >
                        <Users className="w-4 h-4" /> View Profile
                    </button>
                    {/* Add more quick action buttons */}
                    </div>
                </div>
            </div>

            {/* Note Dialog */}
            <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
                <DialogContent className="max-w-2xl bg-white">
                    <DialogHeader>
                        <DialogTitle>Provider Details Issue</DialogTitle>
                        <DialogDescription className="space-y-4 pt-4">
                            <p>
                                Currently, there is an issue with retrieving provider details from Appwrite. 
                                This is a known issue that affects the display of certain GitHub integration features.
                            </p>

                            <Separator className="my-4" />

                            <p className="text-sm text-muted-foreground">
                                You can track the issue here:{" "}
                                <a 
                                    href="https://github.com/orgs/appwrite/projects/9/views/1?pane=issue&itemId=89750083&issue=appwrite%7Cappwrite%7C8206" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[#f6ad55] hover:underline"
                                >
                                    Appwrite Provider Issue #8206
                                </a>
                            </p>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

                     {/* GitHub Profile Section */}
                     <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
                        <DialogContent className="max-w-3xl bg-white/95 backdrop-blur-sm border-none shadow-2xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-y-auto max-h-[80vh] scrollbar-hide"
                            >
                                <DialogHeader className="space-y-4">
                                    <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                                        GitHub Profile
                                    </DialogTitle>
                                    <Separator className="opacity-50" />
                                </DialogHeader>

                                {profile && (
                                    <div className="space-y-8 p-2">
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="flex flex-col md:flex-row items-start gap-6"
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.2 }}
                                                className="relative"
                                            >
                                                <Avatar className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl">
                                                    <AvatarImage src={profile.avatar_url} alt={profile.login} className="object-cover" />
                                                    <AvatarFallback>{profile.login?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <Badge className="absolute -bottom-2 -right-2 bg-green-500">Active</Badge>
                                            </motion.div>

                                            <div className="space-y-4 flex-1">
                                                <div>
                                                    <h3 className="text-2xl font-bold">{profile.name}</h3>
                                                    <p className="text-lg text-muted-foreground">@{profile.login}</p>
                                                </div>
                                                
                                                <p className="text-base leading-relaxed">{profile.bio}</p>
                                                
                                                <div className="flex flex-wrap gap-4">
                                                    <motion.div 
                                                        whileHover={{ scale: 1.05 }}
                                                        className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full"
                                                    >
                                                        <Users className="w-4 h-4" />
                                                        <span className="font-medium">{profile.followers} followers</span>
                                                    </motion.div>
                                                    <motion.div 
                                                        whileHover={{ scale: 1.05 }}
                                                        className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                                                    >
                                                        <GitFork className="w-4 h-4" />
                                                        <span className="font-medium">{profile.public_repos} repos</span>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <motion.div 
                                                whileHover={{ scale: 1.02 }}
                                                className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100 shadow-sm"
                                            >
                                                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                    <Activity className="w-5 h-5 text-purple-500" />
                                                    Recent Activity
                                                </h4>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3 bg-white/80 p-3 rounded-lg">
                                                        <GitCommit className="w-5 h-5 text-purple-500" />
                                                        <span className="font-medium">
                                                            {commitActivity?.reduce((a, b) => a + b, 0) || 0} commits
                                                            <span className="text-sm text-muted-foreground ml-1">(last 7 days)</span>
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3 bg-white/80 p-3 rounded-lg">
                                                        <Star className="w-5 h-5 text-yellow-500" />
                                                        <span className="font-medium">{totalStars} total stars</span>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            <motion.div 
                                                whileHover={{ scale: 1.02 }}
                                                className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100 shadow-sm"
                                            >
                                                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                    <Code2 className="w-5 h-5 text-blue-500" />
                                                    Top Languages
                                                </h4>
                                                <div className="space-y-4">
                                                    {Object.entries(languageStats || {})
                                                        .sort(([,a], [,b]) => b - a)
                                                        .slice(0, 3)
                                                        .map(([language, percentage], index) => (
                                                            <div key={language} 
                                                                className="flex items-center gap-3 bg-white/80 p-3 rounded-lg"
                                                            >
                                                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                                                <span className="font-medium">
                                                                    {language}
                                                                    <span className="text-sm text-muted-foreground ml-2">
                                                                        ({(percentage * 100).toFixed(1)}%)
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </DialogContent>
                    </Dialog>

        </div>
    )
}

export default Home