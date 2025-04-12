"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Plus, Search, Filter, IndianRupee, Zap, Clock, 
  Edit, Trash2, CheckCircle, X, Upload, Package,
  Percent, Calendar, Users, AlertCircle
} from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Define meal type
interface Meal {
  id: string;
  restaurant_id: string;
  name: string;
  description: string;
  original_price: number;
  discounted_price: number;
  discount_percentage: number;
  quantity_available: number;
  pickup_time: string;
  image_url: string;
  created_at: string;
  is_vegetarian: boolean;
  portion_size: string;
}

// Define restaurant type
interface Restaurant {
  id: string;
  name: string;
  logo_url: string;
}

export default function RestaurantMealsPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMeal, setCurrentMeal] = useState<Meal | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    original_price: '',
    discounted_price: '',
    discount_percentage: '',
    quantity_available: '',
    pickup_time: '',
    is_vegetarian: false,
    portion_size: 'Regular'
  });

  // Fetch restaurant and meals data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/login');
          return;
        }

        // Get restaurant data
        const { data: restaurantData, error: restaurantError } = await supabase
          .from('restaurants')
          .select('id, name, logo_url')
          .eq('user_id', user.id)
          .single();

        if (restaurantError) {
          throw new Error('Failed to fetch restaurant data');
        }

        setRestaurant(restaurantData);

        // Get meals data
        const { data: mealsData, error: mealsError } = await supabase
          .from('meals')
          .select('*')
          .eq('restaurant_id', restaurantData.id)
          .order('created_at', { ascending: false });

        if (mealsError) {
          throw new Error('Failed to fetch meals data');
        }

        setMeals(mealsData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase, router]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Calculate discount percentage
  const calculateDiscount = () => {
    const original = parseFloat(formData.original_price);
    const discounted = parseFloat(formData.discounted_price);
    
    if (original && discounted && original > discounted) {
      const percentage = Math.round(((original - discounted) / original) * 100);
      setFormData({
        ...formData,
        discount_percentage: percentage.toString()
      });
    }
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to Supabase Storage
  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `meal-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw new Error('Failed to upload image');
      }

      // Get public URL
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  // Handle form submission for adding a new meal
  const handleAddMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (!restaurant) {
        throw new Error('Restaurant not found');
      }

      let imageUrl = '';
      
      // Upload image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Calculate discount percentage if not provided
      if (!formData.discount_percentage) {
        calculateDiscount();
      }

      // Create meal record
      const { data, error } = await supabase
        .from('meals')
        .insert({
          restaurant_id: restaurant.id,
          name: formData.name,
          description: formData.description,
          original_price: parseFloat(formData.original_price),
          discounted_price: parseFloat(formData.discounted_price),
          discount_percentage: parseInt(formData.discount_percentage),
          quantity_available: parseInt(formData.quantity_available),
          pickup_time: formData.pickup_time,
          image_url: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', // Default image
          is_vegetarian: formData.is_vegetarian,
          portion_size: formData.portion_size
        })
        .select()
        .single();

      if (error) {
        throw new Error('Failed to add meal');
      }

      // Update meals list
      setMeals([data, ...meals]);
      
      // Reset form and close modal
      resetForm();
      setShowAddModal(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for editing a meal
  const handleEditMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (!currentMeal) {
        throw new Error('Meal not found');
      }

      let imageUrl = currentMeal.image_url;
      
      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Calculate discount percentage if not provided
      if (!formData.discount_percentage) {
        calculateDiscount();
      }

      // Update meal record
      const { data, error } = await supabase
        .from('meals')
        .update({
          name: formData.name,
          description: formData.description,
          original_price: parseFloat(formData.original_price),
          discounted_price: parseFloat(formData.discounted_price),
          discount_percentage: parseInt(formData.discount_percentage),
          quantity_available: parseInt(formData.quantity_available),
          pickup_time: formData.pickup_time,
          image_url: imageUrl,
          is_vegetarian: formData.is_vegetarian,
          portion_size: formData.portion_size
        })
        .eq('id', currentMeal.id)
        .select()
        .single();

      if (error) {
        throw new Error('Failed to update meal');
      }

      // Update meals list
      setMeals(meals.map(meal => meal.id === currentMeal.id ? data : meal));
      
      // Reset form and close modal
      resetForm();
      setShowEditModal(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle meal deletion
  const handleDeleteMeal = async (id: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('meals')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error('Failed to delete meal');
      }

      // Update meals list
      setMeals(meals.filter(meal => meal.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal with meal data
  const openEditModal = (meal: Meal) => {
    setCurrentMeal(meal);
    setFormData({
      name: meal.name,
      description: meal.description,
      original_price: meal.original_price.toString(),
      discounted_price: meal.discounted_price.toString(),
      discount_percentage: meal.discount_percentage.toString(),
      quantity_available: meal.quantity_available.toString(),
      pickup_time: meal.pickup_time,
      is_vegetarian: meal.is_vegetarian,
      portion_size: meal.portion_size
    });
    setImagePreview(meal.image_url);
    setShowEditModal(true);
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      original_price: '',
      discounted_price: '',
      discount_percentage: '',
      quantity_available: '',
      pickup_time: '',
      is_vegetarian: false,
      portion_size: 'Regular'
    });
    setImageFile(null);
    setImagePreview(null);
  };

  // Filter meals based on search query
  const filteredMeals = meals.filter(meal => 
    meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meal.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && !meals.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {restaurant?.logo_url && (
              <div className="relative h-12 w-12 rounded-xl overflow-hidden border-2 border-white shadow-md">
                <Image
                  src={restaurant.logo_url}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{restaurant?.name || 'Restaurant'}</h1>
              <p className="text-gray-600">Manage your meals and deals</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-600 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus className="h-5 w-5" />
            Add Meal
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search meals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMeals.map((meal) => (
            <div 
              key={meal.id} 
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative h-40">
                <Image
                  src={meal.image_url}
                  alt={meal.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center shadow-md">
                  <Percent className="h-3 w-3 mr-1" />
                  {meal.discount_percentage}% OFF
                </div>
                {meal.is_vegetarian && (
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center shadow-md">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Veg
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 truncate">{meal.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2 h-10">{meal.description}</p>
                
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500 line-through">₹{meal.original_price}</span>
                    <span className="ml-2 font-bold text-emerald-600">₹{meal.discounted_price}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                    <Package className="h-3 w-3 mr-1" />
                    <span>{meal.quantity_available}</span>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center text-xs text-gray-600">
                  <Clock className="h-3 w-3 mr-1 text-emerald-500" />
                  <span className="truncate">Pickup {meal.pickup_time}</span>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => openEditModal(meal)}
                    className="flex-1 bg-white border border-gray-200 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium flex items-center justify-center shadow-sm"
                  >
                    <Edit className="h-3 w-3 mr-1 text-gray-600" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteMeal(meal.id)}
                    className="flex-1 bg-white border border-gray-200 py-1.5 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium flex items-center justify-center shadow-sm"
                  >
                    <Trash2 className="h-3 w-3 mr-1 text-red-500" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMeals.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No meals found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? 'Try a different search term' : 'Add your first meal to get started'}
            </p>
            {!searchQuery && (
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-600 transition-colors flex items-center gap-2 shadow-sm mx-auto"
              >
                <Plus className="h-5 w-5" />
                Add Meal
              </button>
            )}
          </div>
        )}

        {/* Add Meal Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Add New Meal</h2>
                <button 
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddMeal} className="space-y-4">
                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Meal Image</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-xs text-gray-500">Click to upload an image</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
                
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., Butter Chicken"
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Describe your meal..."
                  />
                </div>
                
                {/* Price Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      name="original_price"
                      value={formData.original_price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="299"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price (₹)</label>
                    <input
                      type="number"
                      name="discounted_price"
                      value={formData.discounted_price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="149"
                    />
                  </div>
                </div>
                
                {/* Discount Percentage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label>
                  <input
                    type="number"
                    name="discount_percentage"
                    value={formData.discount_percentage}
                    onChange={handleInputChange}
                    required
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="50"
                  />
                </div>
                
                {/* Quantity and Pickup Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Available</label>
                    <input
                      type="number"
                      name="quantity_available"
                      value={formData.quantity_available}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
                    <input
                      type="text"
                      name="pickup_time"
                      value={formData.pickup_time}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="19:00-20:00"
                    />
                  </div>
                </div>
                
                {/* Portion Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portion Size</label>
                  <select
                    name="portion_size"
                    value={formData.portion_size}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="Small">Small</option>
                    <option value="Regular">Regular</option>
                    <option value="Large">Large</option>
                    <option value="Family">Family</option>
                  </select>
                </div>
                
                {/* Vegetarian Option */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_vegetarian"
                    checked={formData.is_vegetarian}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Vegetarian</label>
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-600 transition-colors flex items-center justify-center shadow-sm"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Add Meal
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Meal Modal */}
        {showEditModal && currentMeal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Edit Meal</h2>
                <button 
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleEditMeal} className="space-y-4">
                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Meal Image</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-xs text-gray-500">Click to upload an image</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
                
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                {/* Price Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      name="original_price"
                      value={formData.original_price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price (₹)</label>
                    <input
                      type="number"
                      name="discounted_price"
                      value={formData.discounted_price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
                
                {/* Discount Percentage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label>
                  <input
                    type="number"
                    name="discount_percentage"
                    value={formData.discount_percentage}
                    onChange={handleInputChange}
                    required
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                {/* Quantity and Pickup Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Available</label>
                    <input
                      type="number"
                      name="quantity_available"
                      value={formData.quantity_available}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
                    <input
                      type="text"
                      name="pickup_time"
                      value={formData.pickup_time}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
                
                {/* Portion Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portion Size</label>
                  <select
                    name="portion_size"
                    value={formData.portion_size}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="Small">Small</option>
                    <option value="Regular">Regular</option>
                    <option value="Large">Large</option>
                    <option value="Family">Family</option>
                  </select>
                </div>
                
                {/* Vegetarian Option */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_vegetarian"
                    checked={formData.is_vegetarian}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Vegetarian</label>
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-600 transition-colors flex items-center justify-center shadow-sm"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Update Meal
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 