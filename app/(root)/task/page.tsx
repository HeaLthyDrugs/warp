'use client'

import { useState } from 'react';
import {
    CheckCircle2,
    Circle,
    Clock,
    Plus,
    Tag,
    MoreVertical,
    ChevronDown,
    AlertCircle
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@radix-ui/react-select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Task {
    id: string;
    title: string;
    priority: 'high' | 'medium' | 'low';
    status: 'todo' | 'in_progress' | 'completed';
    createdAt: Date;
}

const TasksPage = () => {
    const [tasks, setTasks] = useState<Task[]>([
        // Sample tasks
        {
            id: '1',
            title: 'Implement authentication flow',
            priority: 'high',
            status: 'in_progress',
            createdAt: new Date(),
        },
        // ... more sample tasks
    ]);

    return (
        <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
            {/* Header with responsive spacing */}
            <div className="mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-26 font-semibold text-gray-500">Manage your tasks</h2>
            </div>

            {/* Stats Grid - Responsive columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 sm:mb-6">
                {/* Stats cards with responsive padding and text */}
                <Card className="rounded-xl shadow-lg">
                    <CardContent className="flex items-center p-3 sm:p-4 md:p-6">
                        <div className="bg-[#fff0e6] p-2 sm:p-3 rounded-full mr-3">
                            <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-[#f6ad55]" />
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">To Do</p>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{tasks.filter(t => t.status === 'todo').length}</h3>
                        </div>
                    </CardContent>
                </Card>
                {/* ... other stat cards with same responsive classes ... */}
            </div>

            {/* Add Task Form - Stack on mobile */}
            <Card className="mb-4 sm:mb-6 rounded-xl shadow-lg">
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Input
                            placeholder="Add a new task..."
                            className="flex-1 bg-white border-none"
                        />
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Select>
                                <SelectTrigger className="w-[180px] bg-white">
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button className="w-full sm:w-auto bg-[#9f7aea] hover:bg-[#8b5cf6] text-white">
                                <Plus className="w-4 h-4 mr-2" /> Add Task
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tasks List */}
            <Card className="rounded-xl shadow-lg">
                <CardHeader className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <CardTitle className="text-lg sm:text-xl">Tasks</CardTitle>
                    <Select>
                        <SelectTrigger className="w-[180px] bg-white">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            <SelectItem value="all">All Tasks</SelectItem>
                            <SelectItem value="todo">To Do</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-white rounded-lg gap-3"
                            >
                                <div className="flex items-center gap-3">
                                    <button className="focus:outline-none">
                                        {task.status === 'completed' ? (
                                            <CheckCircle2 className="w-5 h-5 text-[#9f7aea]" />
                                        ) : (
                                            <Circle className="w-5 h-5 text-muted-foreground" />
                                        )}
                                    </button>
                                    <div className="min-w-0">
                                        <p className={`font-medium truncate ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                                            {task.title}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                                                {task.priority}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(task.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 ml-8 sm:ml-0">
                                <Select >
                                <SelectTrigger className="w-[180px] bg-white">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="todo">To Do</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                                    <Button variant="ghost" size="icon" className="shrink-0">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Helper function for priority colors
const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'high': return 'bg-red-100 text-red-600';
        case 'medium': return 'bg-yellow-100 text-yellow-600';
        case 'low': return 'bg-green-100 text-green-600';
        default: return '';
    }
};

export default TasksPage;