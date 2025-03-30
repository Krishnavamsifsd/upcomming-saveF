import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  // ✅ Use getUser() instead of getSession() to avoid excessive token refreshes
  const { data: { user } } = await supabase.auth.getUser();

  // Set the pathname header for the layout to use
  res.headers.set('x-pathname', request.nextUrl.pathname);

  // Redirect logic
  if (request.nextUrl.pathname === '/') {
    if (user) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return res;
  }

  if (request.nextUrl.pathname.startsWith('/auth')) {
    if (user) {
      const userRole = user.user_metadata?.role;
      
      if (userRole === 'restaurant') {
        // Check if restaurant exists
        const { data: restaurantData } = await supabase
          .from('restaurants')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (!restaurantData) {
          return NextResponse.redirect(new URL('/restaurant-setup', request.url));
        }
        return NextResponse.redirect(new URL('/restaurant/dashboard', request.url));
      } 
      
      if (userRole === 'customer') {
        return NextResponse.redirect(new URL('/home', request.url));
      } else {
        return NextResponse.redirect(new URL('/home', request.url));

      }

      // For unverified or unknown roles
      // return NextResponse.redirect(new URL('/auth/verification-pending', request.url));
    }
    return res;
  }

  if (!user) {
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/', '/auth/:path*', '/home/:path*', '/orders/:path*', '/cart/:path*', '/profile/:path*'],
};
