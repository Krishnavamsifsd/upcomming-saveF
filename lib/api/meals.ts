import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Initialize Supabase client once
const supabase = createClientComponentClient();

// Define the Meal interface
export interface Meal {
  id: string;
  name: string;
  description: string;
  original_price: number;
  discounted_price: number;
  discount_percentage: number;
  quantity_available: number;
  pickup_time: string;
  image_url?: string;
  is_vegetarian?: boolean;
  portion_size?: string;
  restaurant_id: string;
  created_at: string;
}

// Define the form state interface
export interface MealFormData {
  name: string;
  description: string;
  original_price: number;
  discounted_price: number;
  discount_percentage: number;
  quantity_available: number;
  pickup_time: string;
  is_vegetarian: boolean;
  portion_size: string;
  image_url?: string;
}

// Get restaurant ID for the current user
export async function getRestaurantId(): Promise<string> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  const { data: restaurant, error } = await supabase
    .from('restaurants')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (error || !restaurant) {
    throw new Error('Restaurant not found');
  }

  return restaurant.id;
}

// Fetch all meals for a restaurant
export async function fetchMeals(restaurantId: string): Promise<Meal[]> {
  const { data, error } = await supabase
    .from('meals')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message || 'Failed to fetch meals');
  }

  return data || [];
}

// Upload meal image
export async function uploadMealImage(file: File, restaurantId: string): Promise<string> {
  if (!file) throw new Error('No file provided');
  if (file.size > 5 * 1024 * 1024) throw new Error('File size exceeds 5MB limit');

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('restaurant_id', restaurantId);

  const response = await fetch('/api/meals/upload', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      errorData?.error?.includes('Storage bucket')
        ? 'Storage bucket not configured. Please contact the administrator.'
        : errorData?.error || 'Failed to upload image';
    throw new Error(message);
  }

  const { url } = await response.json();
  return url;
}

// Create a new meal
export async function createMeal(mealData: MealFormData & { restaurant_id: string }): Promise<Meal> {
  const response = await fetch('/api/meals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mealData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error || 'Failed to create meal');
  }

  return response.json();
}

// Update an existing meal
export async function updateMeal(mealId: string, mealData: Partial<MealFormData>): Promise<Meal> {
  const response = await fetch('/api/meals', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: mealId, ...mealData })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error || 'Failed to update meal');
  }

  return response.json();
}

// Delete a meal
export async function deleteMeal(mealId: string): Promise<void> {
  const response = await fetch(`/api/meals?id=${mealId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error || 'Failed to delete meal');
  }
}

// Toggle meal availability
export async function toggleMealAvailability(mealId: string, isAvailable: boolean): Promise<Meal> {
  return updateMeal(mealId, {
    quantity_available: isAvailable ? 1 : 0
  });
}
