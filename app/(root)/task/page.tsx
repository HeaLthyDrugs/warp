'use client'

import { useState, useEffect } from 'react';
import {
    CheckCircle2,
    Circle,
    Clock,
    Plus,
    Tag,
    MoreVertical,
    Trash,
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
import { useAuth } from "@/context/AuthContext";
import { databases } from '@/lib/appwrite/config';
import { ID, Query } from 'appwrite';
import { toast } from 'sonner';
import { createSessionClient } from "@/appwrite/appwrite.server";
import Router from 'next/router';
import ErrorBoundary from '@/components/ErrorBoundary';
import Spinner from '@/components/ui/spinner';

interface Task {
    $id?: string;
    title: string;
    priority: 'high' | 'medium' | 'low';
    status: 'todo' | 'in_progress' | 'completed';
    created_at: Date;
    user_id: string;
}

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'your_database_id';
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_TASK_COLLECTION_ID || 'your_collection_id';

const TasksPage = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    const [priority, setPriority] = useState<Task['priority']>('medium');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);

        // Add permission check
        useEffect(() => {
            if (!user) {
                // Redirect to login or show error
                Router.push('/connect');
                return;
            }
        }, [user]);

    // Fetch tasks
    const fetchTasks = async () => {
        try {
            const response = await fetch('/api/tasks');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTasks(data.documents || []);
            setLoading(false);
        } catch (error) {
            console.error('Fetch tasks error:', error);
            toast.error('Failed to fetch tasks');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user || !newTask.trim()) return;

        try {
            const taskData = {
                title: newTask,
                priority,
                status: 'todo',
                created_at: new Date().toISOString(),
                user_id: user.$id
            };

            const response = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                taskData
            );

            setTasks(prev => [...prev, response as unknown as Task]);
            setNewTask('');
            toast.success('Task added successfully');
        } catch (error) {
            console.error('Add task error:', error);
            toast.error('Failed to add task');
        }
    };

    const updateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
        try {
            const response = await databases.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                taskId,
                { status: newStatus }
            );

            setTasks(tasks.map(task => 
                task.$id === taskId ? { ...task, status: newStatus } : task
            ));
            toast.success('Task updated successfully');
        } catch (error) {
            toast.error('Failed to update task');
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                taskId
            );

            setTasks(tasks.filter(task => task.$id !== taskId));
            toast.success('Task deleted successfully');
        } catch (error) {
            toast.error('Failed to delete task');
        }
    };

    const filteredTasks = tasks.filter(task => 
        statusFilter === 'all' ? true : task.status === statusFilter
    );

    // Helper function to get task counts
    const getTaskCounts = () => ({
        todo: tasks.filter(t => t.status === 'todo').length,
        inProgress: tasks.filter(t => t.status === 'in_progress').length,
        completed: tasks.filter(t => t.status === 'completed').length,
        total: tasks.length
    });

    return (
        <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
            {/* Header with responsive spacing */}
            <div className="mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-26 font-semibold text-gray-500">Manage your tasks</h2>
            </div>

            {/* Updated Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 sm:mb-6">
                {/* Todo Card */}
                <Card className="rounded-xl shadow-lg">
                    <CardContent className="flex items-center p-3 sm:p-4 md:p-6">
                        <div className="bg-[#fff0e6] p-2 sm:p-3 rounded-full mr-3">
                            <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-[#f6ad55]" />
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">To Do</p>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{getTaskCounts().todo}</h3>
                        </div>
                    </CardContent>
                </Card>

                {/* In Progress Card */}
                <Card className="rounded-xl shadow-lg">
                    <CardContent className="flex items-center p-3 sm:p-4 md:p-6">
                        <div className="bg-[#e6f3ff] p-2 sm:p-3 rounded-full mr-3">
                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#3b82f6]" />
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">In Progress</p>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{getTaskCounts().inProgress}</h3>
                        </div>
                    </CardContent>
                </Card>

                {/* Completed Card */}
                <Card className="rounded-xl shadow-lg">
                    <CardContent className="flex items-center p-3 sm:p-4 md:p-6">
                        <div className="bg-[#e6ffe6] p-2 sm:p-3 rounded-full mr-3">
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#22c55e]" />
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">Completed</p>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{getTaskCounts().completed}</h3>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Tasks Card */}
                <Card className="rounded-xl shadow-lg">
                    <CardContent className="flex items-center p-3 sm:p-4 md:p-6">
                        <div className="bg-[#f3e6ff] p-2 sm:p-3 rounded-full mr-3">
                            <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-[#9f7aea]" />
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Tasks</p>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{getTaskCounts().total}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Add Task Form - Stack on mobile */}
            <Card className="mb-4 sm:mb-6 rounded-xl shadow-lg">
                <CardContent className="p-4">
                    <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-3">
                        <Input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Add a new task..."
                            className="flex-1 bg-white border-none"
                        />
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Select value={priority} onValueChange={(value: Task['priority']) => setPriority(value)}>
                                <SelectTrigger className="w-[180px] bg-white">
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button type="submit" className="w-full sm:w-auto bg-[#9f7aea] hover:bg-[#8b5cf6] text-white">
                                <Plus className="w-4 h-4 mr-2" /> Add Task
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Tasks List */}
            <Card className="rounded-xl shadow-lg">
                <CardHeader className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <CardTitle className="text-lg sm:text-xl">Tasks</CardTitle>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
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
                    {loading ? (
                        <div className="text-center">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredTasks.map((task) => (
                                <div key={task.$id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-white rounded-lg gap-3">
                                    <div className="flex items-center gap-3">
                                        <button className="focus:outline-none" onClick={() => updateTaskStatus(task.$id!, task.status === 'completed' ? 'todo' : 'completed')}>
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
                                                    {new Date(task.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 ml-8 sm:ml-0">
                                        <Select 
                                            value={task.status} 
                                            onValueChange={(value: Task['status']) => 
                                                updateTaskStatus(task.$id!, value)
                                            }
                                        >
                                            <SelectTrigger className="w-[180px] bg-white">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                <SelectItem value="todo">To Do</SelectItem>
                                                <SelectItem value="in_progress">In Progress</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="shrink-0"
                                            onClick={() => deleteTask(task.$id!)}
                                        >
                                            <Trash className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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

export default function TaskPageWrapper() {
    return (
        <ErrorBoundary>
            <TasksPage />
        </ErrorBoundary>
    );
}