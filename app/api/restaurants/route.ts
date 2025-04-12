import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * GET handler for fetching restaurants
 * 
 * @param request - The incoming request object
 * @returns NextResponse with restaurants data or error
 */
export async function GET(request: Request) {
  try {
    // Create a Supabase client with the cookies
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get query parameters for pagination and filtering
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const city = searchParams.get('city') || '';
    
    // Calculate offset for pagination
    const offset = (page - 1) * limit;
    
    // Build the query
    let query = supabase
      .from('restaurants')
      .select('*', { count: 'exact' });
    
    // Apply filters if provided
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    
    if (city) {
      query = query.eq('city', city);
    }
    
    // Apply pagination
    query = query.range(offset, offset + limit - 1);
    
    // Execute the query
    const { data, error, count } = await query;
    
    // Handle errors
    if (error) {
      console.error('Error fetching restaurants:', error);
      return NextResponse.json(
        { error: 'Failed to fetch restaurants' },
        { status: 500 }
      );
    }
    
    // Return the data with pagination info
    return NextResponse.json({
      restaurants: data || [],
      pagination: {
        total: count || 0,
        page,
        limit,
        totalPages: count ? Math.ceil(count / limit) : 0
      }
    });
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 