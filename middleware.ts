import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_KEY } from './consts';

export function middleware(request: NextRequest) {
    if (request.method === 'POST') {
        const auth = request.cookies.has(SESSION_KEY);
        if (!auth) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
    ],
}