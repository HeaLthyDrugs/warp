// app/api/tasks/route.ts
import { NextResponse } from 'next/server';
import { databases } from '@/lib/appwrite/config';

export async function GET() {
    try {
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_TASK_COLLECTION_ID!
        );
        
        // Return the data in a proper JSON format
        return NextResponse.json({
            documents: response.documents,
            total: response.total
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tasks' }, 
            { status: 500 }
        );
    }
}