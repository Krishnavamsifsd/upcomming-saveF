import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

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
    
    // Get form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const restaurantId = formData.get('restaurant_id') as string;
    
    if (!file || !restaurantId) {
      return NextResponse.json(
        { error: 'File and restaurant ID are required' },
        { status: 400 }
      );
    }
    
    // Verify restaurant belongs to user
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('id')
      .eq('id', restaurantId)
      .eq('user_id', session.user.id)
      .single();
    
    if (restaurantError || !restaurant) {
      return NextResponse.json(
        { error: 'Unauthorized or restaurant not found' },
        { status: 403 }
      );
    }
    
    // Check if the bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
      return NextResponse.json(
        { error: 'Failed to check storage buckets' },
        { status: 500 }
      );
    }
    
    const bucketExists = buckets.some(bucket => bucket.name === 'meal-images');
    
    if (!bucketExists) {
      console.error('Storage bucket "meal-images" does not exist');
      return NextResponse.json(
        { error: 'Storage bucket "meal-images" does not exist. Please create it in the Supabase dashboard.' },
        { status: 500 }
      );
    }
    
    // Generate unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${restaurantId}/${Date.now()}.${fileExt}`;
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('meal-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading file:', error);
      return NextResponse.json(
        { error: `Failed to upload file: ${error.message}` },
        { status: 500 }
      );
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('meal-images')
      .getPublicUrl(fileName);
    
    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Error in meal upload route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
} 