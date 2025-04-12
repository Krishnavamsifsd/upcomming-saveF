"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, Phone, Mail, Globe, Clock, Star, 
  Tag, Percent, Award, Heart, Share2, Bookmark,
  ChevronLeft, ChevronRight, Filter, X, Zap, 
  Calendar, Users, DollarSign, ArrowRight, 
  CheckCircle, AlertCircle, Info, Clock4, 
  Package, Truck, Shield, ThumbsUp, MessageCircle
} from 'lucide-react';
import { fetchRestaurantById, Restaurant } from '../../lib/api/restaurants';

// Mock meals data for development
const MOCK_MEALS = [
  {
    id: '1',
    name: 'Butter Chicken',
    description: 'Tender chicken in rich, creamy tomato sauce with naan bread',
    original_price: 299,
    discounted_price: 149,
    discount_percentage: 50,
    quantity_available: 5,
    pickup_time: '19:00-20:00',
    image_url: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    created_at: '2024-03-20T10:00:00Z',
    is_vegetarian: false,
    spice_level: 'Medium',
    portion_size: 'Regular'
  },
  {
    id: '2',
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese with spices and mint chutney',
    original_price: 249,
    discounted_price: 124,
    discount_percentage: 50,
    quantity_available: 3,
    pickup_time: '19:30-20:30',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    created_at: '2024-03-20T10:00:00Z',
    is_vegetarian: true,
    spice_level: 'Mild',
    portion_size: 'Regular'
  },
  {
    id: '3',
    name: 'Biryani Combo',
    description: 'Chicken biryani with raita and papad',
    original_price: 199,
    discounted_price: 99,
    discount_percentage: 50,
    quantity_available: 4,
    pickup_time: '20:00-21:00',
    image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    created_at: '2024-03-20T10:00:00Z',
    is_vegetarian: false,
    spice_level: 'Hot',
    portion_size: 'Large'
  },
  {
    id: '4',
    name: 'Mixed Vegetable Curry',
    description: 'Seasonal vegetables in aromatic curry sauce',
    original_price: 179,
    discounted_price: 89,
    discount_percentage: 50,
    quantity_available: 2,
    pickup_time: '18:30-19:30',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    created_at: '2024-03-20T10:00:00Z',
    is_vegetarian: true,
    spice_level: 'Mild',
    portion_size: 'Regular'
  }
];

// Mock reviews data
const MOCK_REVIEWS = [
  {
    id: '1',
    user_name: 'Rahul Sharma',
    rating: 5,
    comment: 'Great food at amazing prices! The butter chicken was delicious and the portion was generous.',
    date: '2024-03-15T14:30:00Z',
    is_verified: true
  },
  {
    id: '2',
    user_name: 'Priya Patel',
    rating: 4,
    comment: 'Good value for money. The food was fresh and tasty. Will definitely order again.',
    date: '2024-03-10T18:45:00Z',
    is_verified: true
  },
  {
    id: '3',
    user_name: 'Amit Kumar',
    rating: 5,
    comment: 'Excellent service and the food was amazing. The discounts are a great deal!',
    date: '2024-03-05T12:15:00Z',
    is_verified: false
  }
];

export default function RestaurantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meals, setMeals] = useState(MOCK_MEALS);
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [activeTab, setActiveTab] = useState('deals');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In development, use mock data
        // const data = await fetchRestaurantById(params.id as string);
        // setRestaurant(data);
        
        // Mock restaurant data
        setRestaurant({
          id: params.id as string,
          name: 'Spice Garden',
          description: 'Authentic Indian cuisine with a modern twist. We specialize in North Indian dishes with a contemporary presentation. Our chefs use traditional recipes with a creative approach to bring you the best flavors of India.',
          address: '123 Main Street, Colaba',
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          zip: '400001',
          phone: '+91 98765 43210',
          email: 'info@spicegarden.com',
          website: 'https://spicegarden.com',
          logo_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
          cover_image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
          cuisine_type: ['Indian', 'North Indian', 'Vegetarian', 'Non-Vegetarian'],
          price_range: '₹₹',
          rating: 4.5,
          is_verified: true,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z'
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch restaurant details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Get average rating
  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Handle adding meal to cart
  const handleAddToCart = (meal: typeof MOCK_MEALS[0]) => {
    // In a real app, this would add the meal to the cart
    setToastMessage(`${meal.name} added to cart!`);
    setShowToast(true);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-sm">
          <p className="font-medium">{error || 'Restaurant not found'}</p>
          <button 
            onClick={() => router.push('/restaurants')}
            className="mt-4 text-sm text-red-600 hover:text-red-800 underline"
          >
            Return to Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="fixed top-4 left-4 z-20">
        <button 
          onClick={() => router.push('/restaurants')}
          className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all duration-200"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Restaurant Header */}
      <div className="relative h-56 md:h-64">
        <Image
          src={restaurant.cover_image_url}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              {restaurant.logo_url && (
                <div className="relative h-16 w-16 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={restaurant.logo_url}
                    alt={`${restaurant.name} logo`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                  {restaurant.is_verified && (
                    <div className="bg-emerald-500 text-white p-1 rounded-full">
                      <Shield className="h-3 w-3" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-3 w-3 text-emerald-300" />
                  <span className="text-sm">{restaurant.address}, {restaurant.city}</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs">
                    <Star className="h-3 w-3 text-amber-400 mr-1" />
                    <span className="font-medium">{restaurant.rating}</span>
                    <span className="text-white/70 ml-1">({reviews.length})</span>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs">
                    <DollarSign className="h-3 w-3 text-emerald-300 mr-1" />
                    <span>{restaurant.price_range}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex overflow-x-auto pb-2 mb-4 -mx-4 px-4 scrollbar-hide">
          <button
            onClick={() => setActiveTab('deals')}
            className={`flex items-center px-3 py-1.5 rounded-full mr-2 whitespace-nowrap ${
              activeTab === 'deals' 
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } shadow-sm transition-all duration-200 text-sm`}
          >
            <Zap className="h-3.5 w-3.5 mr-1.5" />
            Deals
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center px-3 py-1.5 rounded-full mr-2 whitespace-nowrap ${
              activeTab === 'about' 
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } shadow-sm transition-all duration-200 text-sm`}
          >
            <Info className="h-3.5 w-3.5 mr-1.5" />
            About
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center px-3 py-1.5 rounded-full mr-2 whitespace-nowrap ${
              activeTab === 'reviews' 
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } shadow-sm transition-all duration-200 text-sm`}
          >
            <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
            Reviews
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex items-center px-3 py-1.5 rounded-full mr-2 whitespace-nowrap ${
              activeTab === 'contact' 
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            } shadow-sm transition-all duration-200 text-sm`}
          >
            <Phone className="h-3.5 w-3.5 mr-1.5" />
            Contact
          </button>
        </div>

        {/* Deals Tab */}
        {activeTab === 'deals' && (
          <div className="space-y-4">
            {/* Info Banner */}
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-emerald-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-emerald-800">How SavePlate Works</h3>
                <p className="text-sm text-emerald-700 mt-1">
                  All deals are for pickup only. After placing your order, you'll receive a confirmation with pickup instructions. 
                  Please arrive during the specified pickup window to collect your food.
                </p>
              </div>
            </div>

            {/* Deals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {meals.map((meal) => (
                <div 
                  key={meal.id} 
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 group"
                >
                  <div className="relative h-36">
                    <Image
                      src={meal.image_url}
                      alt={meal.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                  <div className="p-3">
                    <h3 className="font-bold text-base text-gray-900 truncate">{meal.name}</h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2 h-8">{meal.description}</p>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-500 line-through">₹{meal.original_price}</span>
                        <span className="ml-1 font-bold text-emerald-600">₹{meal.discounted_price}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded-md">
                        <Package className="h-3 w-3 mr-1" />
                        <span>{meal.quantity_available}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center text-xs text-gray-600">
                      <Clock className="h-3 w-3 mr-1 text-emerald-500" />
                      <span className="truncate">Pickup {meal.pickup_time}</span>
                    </div>
                    
                    <div className="mt-3 flex gap-2">
                      <button 
                        onClick={() => handleAddToCart(meal)}
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-1.5 rounded-lg hover:from-emerald-700 hover:to-emerald-600 transition-colors text-xs font-medium flex items-center justify-center shadow-sm"
                      >
                        <Package className="h-3 w-3 mr-1" />
                        Grab Now
                      </button>
                      <button className="bg-white border border-gray-200 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                        <Heart className="h-3 w-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">About {restaurant.name}</h2>
              <p className="text-gray-600 text-sm">{restaurant.description}</p>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-3">
                  <h3 className="font-medium text-gray-900 mb-2 text-sm">Cuisine Types</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {restaurant.cuisine_type.map((cuisine, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white text-emerald-800 shadow-sm"
                      >
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-3">
                  <h3 className="font-medium text-gray-900 mb-2 text-sm">Price Range</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">{restaurant.price_range}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">Moderate</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium text-gray-900 mb-2 text-sm">Why SavePlate?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-1.5 rounded-full text-white">
                      <ThumbsUp className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">Save Money</h4>
                      <p className="text-xs text-gray-600">Get delicious food at up to 70% off regular prices</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-1.5 rounded-full text-white">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">Fresh Food</h4>
                      <p className="text-xs text-gray-600">All meals are prepared fresh and available for same-day pickup</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-1.5 rounded-full text-white">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">Support Local</h4>
                      <p className="text-xs text-gray-600">Help local restaurants reduce food waste and increase revenue</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-1.5 rounded-full text-white">
                      <Truck className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">Easy Pickup</h4>
                      <p className="text-xs text-gray-600">Simple pickup process with clear instructions and time windows</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Customer Reviews</h2>
                  <div className="flex items-center mt-0.5">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-400 fill-current" />
                      <span className="font-bold ml-1 text-sm">{getAverageRating()}</span>
                    </div>
                    <span className="text-gray-500 mx-2">•</span>
                    <span className="text-gray-600 text-sm">{reviews.length} reviews</span>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-3 py-1.5 rounded-lg hover:from-emerald-700 hover:to-emerald-600 transition-colors text-xs font-medium shadow-sm">
                  Write a Review
                </button>
              </div>
              
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                          {review.user_name.charAt(0)}
                        </div>
                        <div className="ml-2">
                          <h4 className="font-medium text-gray-900 text-sm">{review.user_name}</h4>
                          <div className="flex items-center mt-0.5">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-1">{formatDate(review.date)}</span>
                          </div>
                        </div>
                      </div>
                      {review.is_verified && (
                        <div className="flex items-center text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 mt-2 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-1.5 rounded-full mt-0.5 text-white">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Address</h3>
                      <p className="text-gray-600 mt-0.5 text-sm">{restaurant.address}</p>
                      <p className="text-gray-600 text-sm">{restaurant.city}, {restaurant.state} {restaurant.zip}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-1.5 rounded-full mt-0.5 text-white">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Phone</h3>
                      <p className="text-gray-600 mt-0.5 text-sm">{restaurant.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-1.5 rounded-full mt-0.5 text-white">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Email</h3>
                      <p className="text-gray-600 mt-0.5 text-sm">{restaurant.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-1.5 rounded-full mt-0.5 text-white">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">Website</h3>
                      <a 
                        href={restaurant.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-emerald-600 hover:underline mt-0.5 block text-sm"
                      >
                        {restaurant.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-900 mb-3 text-sm">Location</h3>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Map will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 