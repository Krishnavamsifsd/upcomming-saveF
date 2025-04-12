"use client"
import { useState, useEffect } from 'react';
import RestaurantLayout from '@/components/layout/RestaurantLayout';
import { Plus, Search, Filter, IndianRupee, Zap, Clock, X, Check, Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { 
  Meal, 
  MealFormData, 
  getRestaurantId, 
  fetchMeals, 
  uploadMealImage, 
  createMeal, 
  updateMeal, 
  deleteMeal, 
  toggleMealAvailability 
} from '@/lib/api/meals';

export default function MenuManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'snacks' | 'meals' | 'catering'>('all');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMealId, setCurrentMealId] = useState<string | null>(null);
  const [formData, setFormData] = useState<MealFormData>({
    name: '',
    description: '',
    original_price: 0,
    discounted_price: 0,
    discount_percentage: 0,
    quantity_available: 0,
    pickup_time: '',
    is_vegetarian: false,
    portion_size: 'Regular',
    image_url: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  
  const router = useRouter();

  // Fetch restaurant ID and meals on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const id = await getRestaurantId();
        setRestaurantId(id);
        
        const mealsData = await fetchMeals(id);
        setMeals(mealsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter meals based on search query and category
  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    // For now, we'll use a simple category filter based on meal name
    // In a real app, you would have a category field in your meals table
    const matchesCategory = activeCategory === 'all' || 
                           (activeCategory === 'snacks' && meal.name.toLowerCase().includes('snack')) ||
                           (activeCategory === 'meals' && meal.name.toLowerCase().includes('meal')) ||
                           (activeCategory === 'catering' && meal.name.toLowerCase().includes('catering'));
    return matchesSearch && matchesCategory;
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate discount percentage when original and discounted prices change
  useEffect(() => {
    if (formData.original_price > 0 && formData.discounted_price > 0) {
      const discountPercentage = Math.round(((formData.original_price - formData.discounted_price) / formData.original_price) * 100);
      setFormData(prev => ({ ...prev, discount_percentage: discountPercentage }));
    }
  }, [formData.original_price, formData.discounted_price]);

  // Open modal for adding a new meal
  const handleAddMeal = () => {
    setIsEditing(false);
    setCurrentMealId(null);
    setFormData({
      name: '',
      description: '',
      original_price: 0,
      discounted_price: 0,
      discount_percentage: 0,
      quantity_available: 0,
      pickup_time: '',
      is_vegetarian: false,
      portion_size: 'Regular',
      image_url: ''
    });
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing meal
  const handleEditMeal = (meal: Meal) => {
    setIsEditing(true);
    setCurrentMealId(meal.id);
    setFormData({
      name: meal.name,
      description: meal.description,
      original_price: meal.original_price,
      discounted_price: meal.discounted_price,
      discount_percentage: meal.discount_percentage,
      quantity_available: meal.quantity_available,
      pickup_time: meal.pickup_time,
      is_vegetarian: meal.is_vegetarian || false,
      portion_size: meal.portion_size || 'Regular',
      image_url: meal.image_url || ''
    });
    setImageFile(null);
    setImagePreview(meal.image_url || null);
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!restaurantId) {
      toast.error('Restaurant ID not found');
      return;
    }
    
    try {
      let imageUrl = formData.image_url;
      
      // Upload image if a new file was selected
      if (imageFile) {
        toast.loading('Uploading image...', { id: 'uploading' });
        try {
          imageUrl = await uploadMealImage(imageFile, restaurantId);
          toast.success('Image uploaded successfully', { id: 'uploading' });
        } catch (uploadError) {
          toast.error(uploadError instanceof Error ? uploadError.message : 'Failed to upload image', { id: 'uploading' });
          return; // Stop form submission if image upload fails
        }
      }
      
      // Prepare meal data
      const mealData = {
        ...formData,
        restaurant_id: restaurantId,
        image_url: imageUrl
      };
      
      let savedMeal;
      
      if (isEditing && currentMealId) {
        // Update existing meal
        savedMeal = await updateMeal(currentMealId, mealData);
        toast.success('Meal updated successfully');
      } else {
        // Create new meal
        savedMeal = await createMeal(mealData);
        toast.success('Meal added successfully');
      }
      
      // Update meals list
      if (isEditing) {
        setMeals(prev => prev.map(meal => meal.id === currentMealId ? savedMeal : meal));
      } else {
        setMeals(prev => [savedMeal, ...prev]);
      }
      
      // Close modal
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving meal:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to save meal');
    }
  };

  // Handle meal deletion
  const handleDeleteMeal = async (mealId: string) => {
    if (!confirm('Are you sure you want to delete this meal?')) {
      return;
    }
    
    try {
      await deleteMeal(mealId);
      
      // Update meals list
      setMeals(prev => prev.filter(meal => meal.id !== mealId));
      toast.success('Meal deleted successfully');
    } catch (err) {
      console.error('Error deleting meal:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to delete meal');
    }
  };

  // Toggle meal availability
  const handleToggleAvailability = async (meal: Meal) => {
    try {
      const isAvailable = meal.quantity_available === 0;
      const updatedMeal = await toggleMealAvailability(meal.id, isAvailable);
      
      // Update meals list
      setMeals(prev => prev.map(m => m.id === meal.id ? updatedMeal : m));
      toast.success(`Meal ${isAvailable ? 'marked as available' : 'marked as unavailable'}`);
    } catch (err) {
      console.error('Error updating meal availability:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to update meal availability');
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Menu Items</h1>
          <button 
            onClick={handleAddMeal}
            className="bg-emerald-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add Item
          </button>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'snacks', 'meals', 'catering'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as typeof activeCategory)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl">
            <p>{error}</p>
          </div>
        )}

        {/* Menu Items Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMeals.length > 0 ? (
              filteredMeals.map((meal) => (
                <div key={meal.id} className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md transition-all">
                  {meal.image_url && (
                    <div className="relative h-40 mb-3 rounded-lg overflow-hidden">
                      <img 
                        src={meal.image_url} 
                        alt={meal.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium">{meal.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{meal.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      meal.quantity_available > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {meal.quantity_available > 0 ? 'Available' : 'Unavailable'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Regular Price:</span>
                      <span className="font-medium flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        {meal.original_price}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-orange-600">Discounted Price:</span>
                      <span className="font-medium flex items-center text-orange-600">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        {meal.discounted_price}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Discount:</span>
                      <span className="font-medium text-emerald-600">{meal.discount_percentage}%</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Quantity:</span>
                      <span className="font-medium">{meal.quantity_available}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Pickup: {formatTime(meal.pickup_time)}</span>
                    </div>
                    
                    {meal.is_vegetarian && (
                      <div className="flex items-center gap-2 text-sm text-emerald-600">
                        <Check className="h-4 w-4" />
                        <span>Vegetarian</span>
                      </div>
                    )}
                    
                    {meal.portion_size && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Portion: {meal.portion_size}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button 
                      onClick={() => handleEditMeal(meal)}
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleToggleAvailability(meal)}
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      {meal.quantity_available > 0 ? 'Mark Unavailable' : 'Mark Available'}
                    </button>
                    <button 
                      onClick={() => handleDeleteMeal(meal.id)}
                      className="px-3 py-2 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                No meals found. Add your first meal to get started.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Meal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{isEditing ? 'Edit Meal' : 'Add New Meal'}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Original Price (₹)</label>
                  <input
                    type="number"
                    name="original_price"
                    value={formData.original_price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Discounted Price (₹)</label>
                  <input
                    type="number"
                    name="discounted_price"
                    value={formData.discounted_price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Quantity Available</label>
                  <input
                    type="number"
                    name="quantity_available"
                    value={formData.quantity_available}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Pickup Time</label>
                  <input
                    type="datetime-local"
                    name="pickup_time"
                    value={formData.pickup_time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Portion Size</label>
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
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_vegetarian"
                    name="is_vegetarian"
                    checked={formData.is_vegetarian}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_vegetarian" className="text-sm font-medium text-gray-700">
                    Vegetarian
                  </label>
                </div>
              </div>
              
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Image Preview</p>
                  <div className="relative h-40 w-40 rounded-lg overflow-hidden">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  {isEditing ? 'Update Meal' : 'Add Meal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </RestaurantLayout>
  );
} 