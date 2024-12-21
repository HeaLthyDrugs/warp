import { deleteServerSession } from "@/appwrite/appwrite.server";
import { deleteSession } from "@/lib/session";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const userAgent = (await headers()).get('User-Agent');
        const {success, error} = await deleteServerSession(userAgent);
        
        if (error) throw new Error(error);
        
        // Also delete the session cookie
        await deleteSession();
        
        return Response.json({ deleted: success }, { status: 200 });
    } catch (error) {
        console.error('Logout error:', error);
        return Response.json({ error: 'Failed to logout' }, { status: 500 });
    }
}