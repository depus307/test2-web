import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/utils';

// Protected routes
const protectedRoutes = [
  '/courses',
  '/profile',
  '/admin',
];

// Admin-only routes
const adminRoutes = [
  '/admin',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const isAuthenticated = token && verifyToken(token);
  
  // Check if the user is trying to access a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route) || pathname === route
  );
  
  // Check if the user is trying to access an admin route
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route) || pathname === route
  );
  
  // If not authenticated and trying to access a protected route, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // If trying to access admin route, check if user is admin
  if (isAdminRoute && isAuthenticated) {
    const user = verifyToken(token);
    if (user.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  // If authenticated and trying to access auth pages, redirect to courses
  if (isAuthenticated && (
    pathname.startsWith('/auth') || 
    pathname === '/auth' || 
    pathname === '/'
  )) {
    return NextResponse.redirect(new URL('/courses', request.url));
  }
  
  return NextResponse.next();
}

// Match all requests except api, static files, and other assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$).*)',
  ],
}; 