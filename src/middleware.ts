import createMiddleware from 'next-intl/middleware';
import { updateSession } from '@/lib/supabase/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: ['en', 'ar', 'fr', 'es', 'nl', 'de'],
    defaultLocale: 'en'
});

export async function middleware(request: NextRequest) {
    // 1. Run Supabase Session update (handles cookie refreshing)
    // We don't return its response directly because we need next-intl to handle the routing/response construction
    // But updateSession sets cookies on the *response* object it creates.
    // Ideally, we should chain them. 
    // Common pattern:

    const { pathname } = request.nextUrl

    // Skip internal paths
    if (
        pathname.startsWith('/_next') ||
        pathname.includes('/api/') ||
        pathname.includes('.') // static files
    ) {
        return;
    }

    // Update Supabase session
    const response = await updateSession(request);

    // Run Intl Middleware
    const intlResponse = intlMiddleware(request);

    // Copy cookies from Supabase response to Intl response
    // ensuring Auth cookies are preserved
    if (response.cookies.getAll().length > 0) {
        response.cookies.getAll().forEach((cookie) => {
            intlResponse.cookies.set(cookie.name, cookie.value, cookie)
        })
    }

    return intlResponse;
}

export const config = {
    matcher: ['/', '/(ar|fr|en|es|nl|de)/:path*']
};
