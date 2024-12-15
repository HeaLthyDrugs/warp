"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { 
  AlertCircle, 
  Bug, 
  CheckCircle2, 
  Clock, 
  ArrowUp, 
  ArrowDown,
  AlertTriangle,
  Shield,
  Terminal,
  Activity
} from 'lucide-react';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';

const ErrorTracking = () => {
  // Sample data for charts
  const errorTrendData = [
    { day: 'Mon', errors: 12 },
    { day: 'Tue', errors: 8 },
    { day: 'Wed', errors: 15 },
    { day: 'Thu', errors: 10 },
    { day: 'Fri', errors: 5 },
    { day: 'Sat', errors: 3 },
    { day: 'Sun', errors: 7 },
  ];

  const errorTypeData = [
    { type: 'Syntax', count: 24 },
    { type: 'Runtime', count: 18 },
    { type: 'Logic', count: 12 },
    { type: 'Network', count: 8 },
  ];

  const recentErrors = [
    {
      id: 'ERR-001',
      message: 'TypeError: Cannot read property of undefined',
      location: 'UserService.ts:42',
      time: '5 minutes ago',
      severity: 'high',
      status: 'unresolved'
    },
    {
      id: 'ERR-002',
      message: 'Failed to fetch API endpoint',
      location: 'ApiClient.ts:156',
      time: '15 minutes ago',
      severity: 'medium',
      status: 'investigating'
    },
    {
      id: 'ERR-003',
      message: 'Uncaught Promise rejection',
      location: 'AuthController.ts:89',
      time: '1 hour ago',
      severity: 'low',
      status: 'resolved'
    },
    {
      id: 'ERR-004',
      message: 'Memory leak detected in component',
      location: 'Dashboard.tsx:234',
      time: '2 hours ago',
      severity: 'high',
      status: 'resolved'
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-500 bg-red-100';
      case 'medium': return 'text-yellow-500 bg-yellow-100';
      case 'low': return 'text-green-500 bg-green-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unresolved': return 'text-red-500 bg-red-100';
      case 'investigating': return 'text-yellow-500 bg-yellow-100';
      case 'resolved': return 'text-green-500 bg-green-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <Header 
          type="greeting"
          title="Error Tracking" 
          subtext="Monitor and analyze application errors"
        />
      </div>

      {/* Error Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-red-500/10 p-3 rounded-full mr-4">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Errors</p>
              <h3 className="text-2xl font-bold">7</h3>
              <p className="text-xs text-red-500 flex items-center mt-1">
                <ArrowUp className="w-3 h-3 mr-1" />
                3 new today
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-green-500/10 p-3 rounded-full mr-4">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Resolution Rate</p>
              <h3 className="text-2xl font-bold">94%</h3>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowUp className="w-3 h-3 mr-1" />
                5% improvement
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-blue-500/10 p-3 rounded-full mr-4">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Resolution Time</p>
              <h3 className="text-2xl font-bold">2.5h</h3>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowDown className="w-3 h-3 mr-1" />
                30min faster
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="bg-purple-500/10 p-3 rounded-full mr-4">
              <Shield className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Error Impact Score</p>
              <h3 className="text-2xl font-bold">Low</h3>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <ArrowDown className="w-3 h-3 mr-1" />
                Stable
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
              <Activity className="w-5 h-5" />
              Error Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={errorTrendData}>
                <XAxis dataKey="day" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="errors" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ fill: "#ef4444" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="w-5 h-5" />
              Error Types Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={errorTypeData}>
                <XAxis dataKey="type" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Errors List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Recent Errors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentErrors.map((error) => (
              <div key={error.id} className="flex items-start justify-between p-4 rounded-lg border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="font-medium">{error.id}</span>
                    <Badge variant="outline" className={getSeverityColor(error.severity)}>
                      {error.severity}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(error.status)}>
                      {error.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{error.message}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <code className="bg-muted px-1 py-0.5 rounded">{error.location}</code>
                    <span>•</span>
                    <span>{error.time}</span>
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

export default ErrorTracking;