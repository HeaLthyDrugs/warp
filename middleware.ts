import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_KEY } from './consts';

export function middleware(request: NextRequest) {
    // Check if the request is for protected routes
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/task') || 
                           request.nextUrl.pathname === '/settings' ||
                           request.nextUrl.pathname === '/ai' ||
                           request.nextUrl.pathname === '/insights' ||
                           request.nextUrl.pathname === '/integrations';

    const auth = request.cookies.has(SESSION_KEY);

    // Redirect to login if accessing protected routes without auth
    if (isProtectedRoute && !auth) {
        return NextResponse.redirect(new URL('/connect', request.url));
    }

    // Handle POST requests
    if (request.method === 'POST') {
        if (!auth) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/task/:path*',
        '/settings/:path*',
        '/ai/:path*',
        '/insights/:path*',
        '/integrations/:path*',
    ],
}