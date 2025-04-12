import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string;
  cover_image_url: string;
  cuisine_type: string[];
  price_range: string;
  rating: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RestaurantsResponse {
  restaurants: Restaurant[];
  pagination: PaginationInfo;
}

/**
 * Fetches restaurants from the API with optional filtering and pagination
 * 
 * @param options - Options for filtering and pagination
 * @returns Promise with restaurants data
 */
export async function fetchRestaurants(options: {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
} = {}): Promise<RestaurantsResponse> {
  const { page = 1, limit = 10, search = '', city = '' } = options;
  
  // Build query parameters
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  
  if (search) params.append('search', search);
  if (city) params.append('city', city);
  
  // Fetch data from the API
  const response = await fetch(`/api/restaurants?${params.toString()}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch restaurants');
  }
  
  return response.json();
}

/**
 * Fetches a single restaurant by ID
 * 
 * @param id - The restaurant ID
 * @returns Promise with restaurant data
 */
export async function fetchRestaurantById(id: string): Promise<Restaurant> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
} 