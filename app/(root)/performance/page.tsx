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
  Focus
} from 'lucide-react';
import Header from '@/components/Header';

const PerformanceInsights = () => {
  // Sample data for charts
  const focusScoreData = [
    { hour: '9AM', score: 85 },
    { hour: '10AM', score: 90 },
    { hour: '11AM', score: 95 },
    { hour: '12PM', score: 75 },
    { hour: '1PM', score: 70 },
    { hour: '2PM', score: 85 },
    { hour: '3PM', score: 88 },
    { hour: '4PM', score: 92 },
  ];

  const productivityBreakdown = [
    { name: 'Coding', value: 45 },
    { name: 'Meetings', value: 20 },
    { name: 'Code Review', value: 15 },
    { name: 'Documentation', value: 20 },
  ];

  const COLORS = ['#7c3aed', '#16a34a', '#ea580c', '#2563eb'];

  const codeQualityMetrics = [
    { metric: 'Code Coverage', value: 85 },
    { metric: 'Bug Rate', value: 12 },
    { metric: 'Code Review', value: 92 },
    { metric: 'Test Pass Rate', value: 95 },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <Header 
          type="greeting"
          title="Performance Insights" 
          subtext="Track and analyze your development metrics"
        />
      </div>

      {/* Performance Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-purple-500/10 p-3 rounded-full mr-4">
              <Brain className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Focus Score</p>
              <h3 className="text-2xl font-bold">92/100</h3>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUp className="w-3 h-3 mr-1" />
                8% vs last week
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-green-500/10 p-3 rounded-full mr-4">
              <Timer className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Deep Work Hours</p>
              <h3 className="text-2xl font-bold">5.2h</h3>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUp className="w-3 h-3 mr-1" />
                12% improvement
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-blue-500/10 p-3 rounded-full mr-4">
              <Code2 className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Code Quality</p>
              <h3 className="text-2xl font-bold">A+</h3>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUp className="w-3 h-3 mr-1" />
                Excellent
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-orange-500/10 p-3 rounded-full mr-4">
              <Zap className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Productivity Score</p>
              <h3 className="text-2xl font-bold">88%</h3>
              <p className="text-xs text-red-500 flex items-center mt-1">
                <ArrowDown className="w-3 h-3 mr-1" />
                3% vs yesterday
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Focus className="w-5 h-5" />
              Focus Score Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={focusScoreData}>
                <XAxis dataKey="hour" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#7c3aed" 
                  strokeWidth={2}
                  dot={{ fill: "#7c3aed" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="w-5 h-5" />
              Time Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productivityBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {productivityBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {productivityBreakdown.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm text-muted-foreground">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Code Quality Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCommit className="w-5 h-5" />
            Code Quality Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={codeQualityMetrics}>
              <XAxis dataKey="metric" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip />
              <Bar dataKey="value" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Performance Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Peak Performance Time",
                description: "Your productivity peaks between 10 AM and 11 AM. Schedule important tasks during this window.",
                icon: Zap,
              },
              {
                title: "Break Pattern",
                description: "Consider taking more frequent short breaks. Current pattern shows decreased focus after 2-hour sessions.",
                icon: Coffee,
              },
              {
                title: "Code Quality Improvement",
                description: "Your code review participation has increased by 15%. Keep maintaining this engagement level.",
                icon: Code2,
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                <item.icon className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceInsights;