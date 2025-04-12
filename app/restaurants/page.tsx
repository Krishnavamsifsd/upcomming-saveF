"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin, ChevronLeft, ChevronRight, Filter, X, Star, Clock, DollarSign, Phone, Mail, Globe, Tag, Percent, Award, Heart, Share2, Bookmark, Zap, TrendingUp, Users, Utensils } from 'lucide-react';
import { fetchRestaurants, Restaurant } from '../lib/api/restaurants';
import Link from 'next/link';
import Image from 'next/image';
import { useDebounceValue } from 'usehooks-ts';

// Hardcoded restaurant data for UI development
const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Spice Garden',
    description: 'Authentic Indian cuisine with a modern twist. Specializing in North Indian dishes.',
    cover_image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    cuisine_type: ['Indian', 'North Indian', 'Vegetarian'],
    price_range: '₹₹',
    address: '123 Main Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    zip: '400001',
    phone: '+91 98765 43210',
    email: 'contact@spicegarden.com',
    website: 'https://spicegarden.com',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Pizza Paradise',
    description: 'Best pizza in town with authentic Italian recipes',
    cover_image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    rating: 4.2,
    cuisine_type: ['Italian', 'Pizza', 'Fast Food'],
    price_range: '₹₹',
    address: '456 Oak Street',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    zip: '110001',
    phone: '+91 98765 43211',
    email: 'info@pizzaparadise.com',
    website: 'https://pizzaparadise.com',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Green Leaf Cafe',
    description: 'Healthy and organic food options with a focus on sustainability',
    cover_image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    rating: 4.3,
    cuisine_type: ['Healthy', 'Organic', 'Cafe'],
    price_range: '₹₹',
    address: '789 Park Road',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    zip: '560001',
    phone: '+91 98765 43212',
    email: 'hello@greenleaf.com',
    website: 'https://greenleaf.com',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Taste of South',
    description: 'Authentic South Indian cuisine with traditional recipes',
    cover_image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    rating: 4.4,
    cuisine_type: ['South Indian', 'Vegetarian', 'Traditional'],
    price_range: '₹₹',
    address: '321 Lake View Road',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    zip: '500001',
    phone: '+91 98765 43213',
    email: 'info@tasteofsouth.com',
    website: 'https://tasteofsouth.com',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Street Food Hub',
    description: 'Best street food from across India',
    cover_image_url: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo_url: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    rating: 4.6,
    cuisine_type: ['Street Food', 'Indian', 'Fast Food'],
    price_range: '₹',
    address: '654 Market Street',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    zip: '600001',
    phone: '+91 98765 43214',
    email: 'hello@streetfoodhub.com',
    website: 'https://streetfoodhub.com',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Royal Mughlai',
    description: 'Authentic Mughlai cuisine with royal touch',
    cover_image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    rating: 4.7,
    cuisine_type: ['Mughlai', 'North Indian', 'Non-Vegetarian'],
    price_range: '₹₹₹',
    address: '987 Palace Road',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    zip: '700001',
    phone: '+91 98765 43215',
    email: 'contact@royalmughlai.com',
    website: 'https://royalmughlai.com',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Maharashtrian Delights',
    description: 'Authentic Maharashtrian cuisine',
    cover_image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    rating: 4.3,
    cuisine_type: ['Maharashtrian', 'Traditional', 'Vegetarian'],
    price_range: '₹₹',
    address: '147 Cultural Street',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    zip: '411001',
    phone: '+91 98765 43216',
    email: 'info@maharashtriandelights.com',
    website: 'https://maharashtriandelights.com',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Seafood Paradise',
    description: 'Fresh seafood from the Arabian Sea',
    cover_image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    cuisine_type: ['Seafood', 'Coastal', 'Non-Vegetarian'],
    price_range: '₹₹₹',
    address: '258 Beach Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    zip: '400002',
    phone: '+91 98765 43217',
    email: 'hello@seafoodparadise.com',
    website: 'https://seafoodparadise.com',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Delhi Dhaba',
    description: 'Authentic Punjabi dhaba style food',
    cover_image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    rating: 4.4,
    cuisine_type: ['Punjabi', 'North Indian', 'Dhaba'],
    price_range: '₹₹',
    address: '369 Highway Road',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    zip: '110002',
    phone: '+91 98765 43218',
    email: 'info@delhidhaba.com',
    website: 'https://delhidhaba.com',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '10',
    name: 'Bangalore Brews',
    description: 'Craft beer and international cuisine',
    cover_image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    rating: 4.6,
    cuisine_type: ['International', 'Pub Food', 'Fusion'],
    price_range: '₹₹₹',
    address: '741 Tech Park Road',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    zip: '560002',
    phone: '+91 98765 43219',
    email: 'hello@bangalorebrews.com',
    website: 'https://bangalorebrews.com',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '11',
    name: 'Hyderabad House',
    description: 'Authentic Hyderabadi biryani and kebabs',
    cover_image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    rating: 4.7,
    cuisine_type: ['Hyderabadi', 'Biryani', 'Non-Vegetarian'],
    price_range: '₹₹',
    address: '852 Charminar Road',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    zip: '500002',
    phone: '+91 98765 43220',
    email: 'info@hyderabadhouse.com',
    website: 'https://hyderabadhouse.com',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '12',
    name: 'Chennai Kitchen',
    description: 'Traditional Tamil Nadu cuisine',
    cover_image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    logo_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    rating: 4.3,
    cuisine_type: ['Tamil', 'South Indian', 'Traditional'],
    price_range: '₹₹',
    address: '963 Marina Beach Road',
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    zip: '600002',
    phone: '+91 98765 43221',
    email: 'hello@chennaikitchen.com',
    website: 'https://chennaikitchen.com',
    is_verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export default function RestaurantsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for restaurants data
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceSearch, setDebounceSearch] = useDebounceValue('' , 500);
  const [selectedCity, setSelectedCity] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Available cities for filter (in a real app, this would come from the API)
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune'];
  
  // Fetch restaurants when filters or pagination changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Using hardcoded data instead of API call for UI development
        // Commented out API call but preserved for future use
        /*
        const response = await fetchRestaurants({
          page: currentPage,
          limit: 12,
          search: searchTerm,
          city: selectedCity
        });
        
        setRestaurants(response?.restaurants || []);
        setTotalPages(response?.pagination?.totalPages || 1);
        setTotalRestaurants(response?.pagination?.total || 0);
        */
        
        // Filter mock data based on search term and city
        let filteredRestaurants = [...MOCK_RESTAURANTS];
        
        if (searchTerm) {
          filteredRestaurants = filteredRestaurants.filter(restaurant => 
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.cuisine_type.some(cuisine => 
              cuisine.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        }
        
        if (selectedCity) {
          filteredRestaurants = filteredRestaurants.filter(restaurant => 
            restaurant.city.toLowerCase() === selectedCity.toLowerCase()
          );
        }
        
        // Pagination for mock data
        const itemsPerPage = 12;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedRestaurants = filteredRestaurants.slice(startIndex, endIndex);
        
        setRestaurants(paginatedRestaurants);
        setTotalPages(Math.ceil(filteredRestaurants.length / itemsPerPage));
        setTotalRestaurants(filteredRestaurants.length);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch restaurants');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentPage, debounceSearch, selectedCity]);
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };
  
  // Handle pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Handle filter toggle
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCity('');
    setCurrentPage(1);
  };

  // Get price range display
  const getPriceRangeDisplay = (priceRange: string) => {
    switch(priceRange) {
      case '$': return 'Budget';
      case '$$': return 'Moderate';
      case '$$$': return 'High-end';
      default: return 'Various';
    }
  };

  // Get cuisine tags
  const getCuisineTags = (cuisineTypes: string[]) => {
    return cuisineTypes.slice(0, 2).map((cuisine, index) => (
      <span 
        key={index} 
        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mr-1"
      >
        {cuisine}
      </span>
    ));
  };

  // Get random discount percentage (for demo purposes)
  const getRandomDiscount = () => {
    const discounts = [30, 40, 50, 60, 70]; // Higher discounts for surplus food
    return discounts[Math.floor(Math.random() * discounts.length)];
  };

  // Get random pickup time window (for demo purposes)
  const getRandomPickupTime = () => {
    const times = ['6:00-7:00 PM', '7:00-8:00 PM', '8:00-9:00 PM', '9:00-10:00 PM'];
    return times[Math.floor(Math.random() * times.length)];
  };

  // Get random portions left (for demo purposes)
  const getRandomPortionsLeft = () => {
    return Math.floor(Math.random() * 5) + 1; // 1-5 portions left
  };

  // Get random rating count (for demo purposes)
  const getRandomRatingCount = () => {
    return Math.floor(Math.random() * 500) + 50;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="bg-emerald-600 text-white p-2 rounded-lg mr-3 shadow-md">
                  <Utensils className="h-6 w-6" />
                </div>
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 tracking-tight">
                  Discover Restaurants
                </h1>
              </div>
              <p className="text-gray-600 mt-2 text-lg font-medium">
                {totalRestaurants} restaurants found
              </p>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {setSearchTerm(e.target.value); setDebounceSearch(e.target.value)}}
                  placeholder="Search restaurants..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white/90 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm shadow-sm transition-all duration-200"
                />
              </form>
              
              <button
                onClick={toggleFilters}
                className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white/90 backdrop-blur-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
          
          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
                >
                  Clear all
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <select
                    id="city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg shadow-sm"
                  >
                    <option value="">All Cities</option>
                    {cities?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Add more filters here as needed */}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        )}
        
        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6 shadow-sm">
            <p className="font-medium">{error}</p>
          </div>
        )}
        
        {/* Restaurants Grid */}
        {!loading && !error && (
          <>
            {restaurants.length === 0 ? (
              <div className="text-center py-16 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-medium text-gray-900 mb-3">No restaurants found</h3>
                <p className="text-gray-500 max-w-md mx-auto">Try adjusting your search or filters to find what you're looking for.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {restaurants.map((restaurant) => (
                  <Link 
                    href={`/restaurant/${restaurant?.id}`} 
                    key={restaurant?.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group relative h-[360px] flex flex-col border border-gray-100"
                  >
                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center shadow-md">
                        <Percent className="h-3 w-3 mr-1" />
                        {getRandomDiscount()}% OFF
                      </div>
                    </div>
                    
                    {/* Deals Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center shadow-md">
                        <Zap className="h-3 w-3 mr-1" />
                        {Math.floor(Math.random() * 5) + 3} Deals
                      </div>
                    </div>
                    
                    {/* Restaurant Image */}
                    <div className="relative h-36">
                      {restaurant?.cover_image_url ? (
                        <Image
                          src={restaurant.cover_image_url}
                          alt={restaurant?.name || 'Restaurant'}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          priority={true}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Restaurant Info */}
                    <div className="p-4 flex-grow flex flex-col">
                      {/* Restaurant Name and Logo */}
                      <div className="flex items-center mb-2">
                        {restaurant?.logo_url && (
                          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-2 border-2 border-white shadow-sm">
                            <Image
                              src={restaurant.logo_url}
                              alt={`${restaurant?.name || 'Restaurant'} logo`}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">{restaurant?.name || 'Unnamed Restaurant'}</h3>
                          <div className="flex items-center mt-0.5">
                            <MapPin className="h-3.5 w-3.5 text-emerald-500 mr-1" />
                            <span className="text-xs text-gray-600">{restaurant?.city || 'Unknown'}, {restaurant?.state || 'Unknown'}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-grow">{restaurant?.description || 'No description available'}</p>
                      
                      {/* Cuisine Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {getCuisineTags(Array.isArray(restaurant?.cuisine_type) ? restaurant.cuisine_type : [])}
                        {restaurant?.cuisine_type && restaurant.cuisine_type.length > 2 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{restaurant.cuisine_type.length - 2} more
                          </span>
                        )}
                      </div>
                      
                      {/* Pickup Info and Rating */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
                        <div className="flex items-center">
                          <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md">
                            <Star className="h-3.5 w-3.5 text-amber-400 mr-1" />
                            <span className="text-xs font-semibold">{restaurant?.rating?.toFixed(1) || 'N/A'}</span>
                            <span className="text-xs text-gray-500 ml-1">({getRandomRatingCount()})</span>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-gray-600 bg-emerald-50 px-2 py-1 rounded-md">
                          <Clock className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                          <span>Pickup {getRandomPickupTime()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-10">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all duration-200"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>
                
                <div className="mx-3 flex items-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`relative inline-flex items-center px-2.5 py-1 mx-0.5 text-sm font-medium rounded-md ${
                        currentPage === page
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100'
                      } transition-all duration-200`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all duration-200"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 