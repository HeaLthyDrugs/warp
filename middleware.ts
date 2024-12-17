import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrentUser } from './lib/actions/user.actions'

export async function middleware(request: NextRequest) {
  // Check if user is authenticated
  const user = await getCurrentUser()
  
  // Get the current path
  const path = request.nextUrl.pathname

  // Auth paths that should redirect to dashboard if user is logged in
  const authPaths = ['/connect', '/sign-in', '/sign-up']
  
  // Protected paths that should redirect to connect if user is not logged in
  const protectedPaths = ['/dashboard', '/error-tracking', '/performance']

  if (user) {
    // If user is logged in and trying to access auth pages, redirect to dashboard
    if (authPaths.includes(path)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  } else {
    // If user is not logged in and trying to access protected pages, redirect to connect
    if (protectedPaths.includes(path)) {
      return NextResponse.redirect(new URL('/connect', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/connect',
    '/sign-in',
    '/sign-up',
    '/dashboard',
    '/error-tracking',
    '/performance'
  ]
} 