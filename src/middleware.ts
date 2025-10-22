import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to handle incoming requests.
 * You can use this to add authentication, logging, or other request processing logic.
 */
export function middleware(request: NextRequest) {
    // Example: Log the request URL
    console.log(`Middleware triggered for: ${request.nextUrl}`);

    // Example: Redirect logic
    if (request.nextUrl.pathname === '/restricted') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Continue to the next middleware or route handler
    return NextResponse.next();
}

/**
 * Configure the paths where this middleware should run.
 * Example: Apply middleware only to specific routes.
 */
export const config = {
    matcher: ['/restricted', '/api/:path*'],
};