import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get session instead of calling getUser() directly
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurant_id');
    const userId = searchParams.get('user_id');
    
    // Build query
    let query = supabase
      .from('meal_orders')
      .select(`
        *,
        meal:meals(*),
        restaurant:restaurants(*)
      `)
      .order('created_at', { ascending: false });
    
    // Filter by restaurant if provided
    if (restaurantId) {
      query = query.eq('restaurant_id', restaurantId);
    }
    
    // Filter by user if provided
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    // Execute query
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in orders route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get session instead of calling getUser() directly
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get request body
    const body = await request.json();
    const { meal_id, quantity } = body;
    
    if (!meal_id || !quantity) {
      return NextResponse.json(
        { error: 'Meal ID and quantity are required' },
        { status: 400 }
      );
    }
    
    // Get meal details
    const { data: meal, error: mealError } = await supabase
      .from('meals')
      .select('*, restaurant:restaurants(*)')
      .eq('id', meal_id)
      .single();
    
    if (mealError || !meal) {
      return NextResponse.json(
        { error: 'Meal not found' },
        { status: 404 }
      );
    }
    
    // Check if meal is available
    if (meal.quantity_available < quantity) {
      return NextResponse.json(
        { error: 'Not enough meals available' },
        { status: 400 }
      );
    }
    
    // Create order
    const { data: order, error: orderError } = await supabase
      .from('meal_orders')
      .insert({
        user_id: session.user.id,
        meal_id,
        restaurant_id: meal.restaurant_id,
        quantity,
        total_price: meal.discounted_price * quantity,
        status: 'pending'
      })
      .select()
      .single();
    
    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }
    
    // Update meal quantity
    const { error: updateError } = await supabase
      .from('meals')
      .update({ quantity_available: meal.quantity_available - quantity })
      .eq('id', meal_id);
    
    if (updateError) {
      console.error('Error updating meal quantity:', updateError);
      // Note: In a production environment, you would want to implement a rollback mechanism here
    }
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error in orders route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 