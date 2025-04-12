import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// GET /api/meals - Get all meals for a restaurant
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('restaurant_id');
    
    if (!restaurantId) {
      return NextResponse.json(
        { error: 'Restaurant ID is required' },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });
    
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching meals:', error);
      return NextResponse.json(
        { error: 'Failed to fetch meals' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in meals GET route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/meals - Create a new meal
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
    
    // Validate required fields
    const requiredFields = [
      'restaurant_id', 'name', 'description', 'original_price', 
      'discounted_price', 'discount_percentage', 'quantity_available', 
      'pickup_time'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    // Verify restaurant belongs to user
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('id')
      .eq('id', body.restaurant_id)
      .eq('user_id', session.user.id)
      .single();
    
    if (restaurantError || !restaurant) {
      return NextResponse.json(
        { error: 'Unauthorized or restaurant not found' },
        { status: 403 }
      );
    }
    
    // Create meal
    const { data, error } = await supabase
      .from('meals')
      .insert({
        ...body,
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating meal:', error);
      return NextResponse.json(
        { error: 'Failed to create meal' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in meals POST route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/meals - Update a meal
export async function PUT(request: Request) {
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
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'Meal ID is required' },
        { status: 400 }
      );
    }
    
    // Get meal to verify ownership
    const { data: meal, error: mealError } = await supabase
      .from('meals')
      .select('restaurant_id')
      .eq('id', body.id)
      .single();
    
    if (mealError || !meal) {
      return NextResponse.json(
        { error: 'Meal not found' },
        { status: 404 }
      );
    }
    
    // Verify restaurant belongs to user
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('id')
      .eq('id', meal.restaurant_id)
      .eq('user_id', session.user.id)
      .single();
    
    if (restaurantError || !restaurant) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Update meal
    const { data, error } = await supabase
      .from('meals')
      .update({
        name: body.name,
        description: body.description,
        original_price: body.original_price,
        discounted_price: body.discounted_price,
        discount_percentage: body.discount_percentage,
        quantity_available: body.quantity_available,
        pickup_time: body.pickup_time,
        image_url: body.image_url,
        is_vegetarian: body.is_vegetarian,
        portion_size: body.portion_size
      })
      .eq('id', body.id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating meal:', error);
      return NextResponse.json(
        { error: 'Failed to update meal' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in meals PUT route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/meals - Delete a meal
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mealId = searchParams.get('id');
    
    if (!mealId) {
      return NextResponse.json(
        { error: 'Meal ID is required' },
        { status: 400 }
      );
    }
    
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get session instead of calling getUser() directly
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get meal to verify ownership
    const { data: meal, error: mealError } = await supabase
      .from('meals')
      .select('restaurant_id')
      .eq('id', mealId)
      .single();
    
    if (mealError || !meal) {
      return NextResponse.json(
        { error: 'Meal not found' },
        { status: 404 }
      );
    }
    
    // Verify restaurant belongs to user
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('id')
      .eq('id', meal.restaurant_id)
      .eq('user_id', session.user.id)
      .single();
    
    if (restaurantError || !restaurant) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Delete meal
    const { error } = await supabase
      .from('meals')
      .delete()
      .eq('id', mealId);
    
    if (error) {
      console.error('Error deleting meal:', error);
      return NextResponse.json(
        { error: 'Failed to delete meal' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in meals DELETE route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 