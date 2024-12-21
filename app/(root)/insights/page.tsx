"use client";

import React, { useState } from 'react';
import { useGitHub } from '@/context/GitHubContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { 
  GitMerge,
  Star,
  GitFork,
  Activity,
  Code2
} from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const InsightsPage = () => {
  const [activeChart, setActiveChart] = useState<'bar' | 'line'>('bar');
  const { githubData: { 
    profile, 
    repositories, 
    commitActivity, 
    languageStats,
    totalStars,
    loading, 
    error 
  } } = useGitHub();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Convert commit activity to chart data
  const commitData = commitActivity?.map((commits: number, index: number) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      commits
    };
  }) || [];

  // Convert language stats to pie chart data
  const languageData = Object.entries(languageStats || {}).map(([name, value]) => ({
    name,
    value
  }));

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
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Bar dataKey="commits" fill="#4a90e2" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={commitData}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="commits" 
                  stroke="#4a90e2" 
                  strokeWidth={2}
                  dot={{ fill: "#4a90e2" }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-[#faf8f6] p-4 sm:p-6 md:p-8">
      <div className="mb-6 md:mb-8">
        <Header 
          title="Repository Insights" 
          subtext="Analyze your GitHub activity and repository metrics"
        />
      </div>

      {/* Activity Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
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

        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="flex items-center p-4 md:p-6">
            <div className="bg-[#fff0e6] p-2 md:p-3 rounded-full mr-3 md:mr-4">
              <Star className="w-5 h-5 md:w-6 md:h-6 text-[#f6ad55]" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Stars</p>
              <h3 className="text-xl md:text-2xl font-bold">{totalStars}</h3>
              <p className="text-xs text-[#f6ad55] flex items-center mt-1">
                Across all repos
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="flex items-center p-4 md:p-6">
            <div className="bg-[#e6ffe6] p-2 md:p-3 rounded-full mr-3 md:mr-4">
              <Code2 className="w-5 h-5 md:w-6 md:h-6 text-[#48bb78]" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Languages</p>
              <h3 className="text-xl md:text-2xl font-bold">
                {Object.keys(languageStats || {}).length}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="flex items-center p-4 md:p-6">
            <div className="bg-[#f0e6ff] p-2 md:p-3 rounded-full mr-3 md:mr-4">
              <GitFork className="w-5 h-5 md:w-6 md:h-6 text-[#9f7aea]" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Repositories</p>
              <h3 className="text-xl md:text-2xl font-bold">{repositories?.length || 0}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card className="mb-6 md:mb-8 rounded-xl shadow-lg">
        <CardHeader className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Activity className="w-5 h-5 text-[#9f7aea]" />
              Commit Activity
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant={activeChart === 'bar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveChart('bar')}
              >
                Bar
              </Button>
              <Button
                variant={activeChart === 'line' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveChart('line')}
              >
                Line
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {renderChart()}
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
    </div>
  );
};

export default InsightsPage;