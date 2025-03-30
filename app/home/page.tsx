"use client"
import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, MapPin, Bell, User, Star, TrendingUp, Clock, Gift, Share2, Map, Filter, ChevronRight, Utensils, Coffee, Pizza, Heart } from 'lucide-react';

// Add meal data
const meals = [
  {
    id: 1,
    name: "Butter Chicken Bowl",
    restaurant: "Punjab Grill",
    distance: "1.2km",
    currentPrice: "₹149",
    originalPrice: "₹499",
    rating: "4.5",
    reviews: "120+",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
    pickupTime: "8-9 PM",
    portionsLeft: 3
  },
  {
    id: 2,
    name: "Masala Dosa",
    restaurant: "South Indian House",
    distance: "0.8km",
    currentPrice: "₹39",
    originalPrice: "₹199",
    rating: "4.7",
    reviews: "200+",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pickupTime: "7-8 PM",
    portionsLeft: 5
  },
  {
    id: 3,
    name: "Veg Thali",
    restaurant: "Gujarati Kitchen",
    distance: "1.5km",
    currentPrice: "₹99",
    originalPrice: "₹299",
    rating: "4.6",
    reviews: "150+",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
    pickupTime: "7:30-8:30 PM",
    portionsLeft: 2
  },
  {
    id: 4,
    name: "Paneer Tikka Platter",
    restaurant: "Royal Kitchen",
    distance: "0.5km",
    currentPrice: "₹129",
    originalPrice: "₹399",
    rating: "4.8",
    reviews: "180+",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8",
    pickupTime: "7-8 PM",
    portionsLeft: 4
  },
  {
    id: 5,
    name: "Sushi Combo",
    restaurant: "Asian Fusion",
    distance: "2.0km",
    currentPrice: "₹299",
    originalPrice: "₹899",
    rating: "4.9",
    reviews: "220+",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    pickupTime: "8:30-9:30 PM",
    portionsLeft: 2
  }
];

// Add restaurant data
const restaurants = [
  {
    id: 1,
    name: "The Green House",
    cuisine: "Continental • Italian",
    rating: "4.8",
    reviews: "500+",
    distance: "2.1km",
    deals: 8,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
  },
  {
    id: 2,
    name: "Spice Garden",
    cuisine: "North Indian • Chinese",
    rating: "4.6",
    reviews: "350+",
    distance: "1.8km",
    deals: 5,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9"
  },
  {
    id: 3,
    name: "Pizza Paradise",
    cuisine: "Italian • Fast Food",
    rating: "4.7",
    reviews: "420+",
    distance: "2.5km",
    deals: 6,
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae"
  },
  {
    id: 4,
    name: "South Side Cafe",
    cuisine: "South Indian • Coffee",
    rating: "4.5",
    reviews: "280+",
    distance: "1.2km",
    deals: 4,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814"
  }
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      {/* Hero Banner - Enhanced */}
      <div className="relative h-[400px] rounded-3xl overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Save Food"
          className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Save Food,<br />Save Money,<br />Save Planet
          </h1>
          <p className="text-xl text-white/90 mb-6 max-w-lg">
            Get up to 70% off on quality surplus food from your favorite restaurants
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-full w-fit hover:bg-primary hover:text-white transition-colors duration-300">
            Explore Deals
          </button>
        </div>
      </div>

      {/* Search and Filters - Modernized */}
      <div className="bg-white rounded-3xl p-6 shadow-lg backdrop-blur-lg">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search meals or restaurants..."
                className="w-full pl-12 pr-4 h-12 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"
              />
            </div>

            {/* Map Button */}
            <button 
              onClick={() => window.location.href = '/map'} 
              className="h-12 w-12 flex items-center justify-center rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <MapPin className="w-5 h-5 text-gray-600 hover:text-primary" />
            </button>

            {/* Filter Button */}
            <button 
              className="h-12 w-12 flex items-center justify-center rounded-xl bg-primary text-white hover:bg-primary/90 transition-all"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {['Near Expiry (70%+ Off)', 'Under ₹50', 'Vegetarian', 'Available Now', 'Top Rated', 'New Arrivals'].map((filter) => (
              <button
                key={filter}
                className="px-6 py-2.5 bg-gray-50 text-gray-700 rounded-full whitespace-nowrap hover:bg-primary hover:text-white transition-colors duration-300"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories - Enhanced */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: <Utensils className="w-8 h-8" />, name: 'Main Course', count: '150+ items', color: 'bg-orange-50 text-orange-500' },
          { icon: <Pizza className="w-8 h-8" />, name: 'Quick Bites', count: '100+ items', color: 'bg-blue-50 text-blue-500' },
          { icon: <Coffee className="w-8 h-8" />, name: 'Beverages', count: '50+ items', color: 'bg-green-50 text-green-500' },
          { icon: <TrendingUp className="w-8 h-8" />, name: 'Trending', count: '80+ items', color: 'bg-purple-50 text-purple-500' }
        ].map((category) => (
          <div key={category.name} 
               className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {category.icon}
            </div>
            <h3 className="font-semibold text-lg">{category.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{category.count}</p>
          </div>
        ))}
      </div>

      {/* Time-sensitive Deals - Enhanced */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Ending Soon</h2>
          </div>
          <button className="text-primary flex items-center hover:underline">
            View all <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div key={meal.id} 
                 className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={`${meal.image}?w=800&q=80`}
                  alt={meal.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  70% OFF
                </div>
                <button className="absolute top-4 left-4 p-2.5 bg-white/90 rounded-full hover:bg-white hover:text-red-500 transition-colors duration-300">
                  <Heart className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-medium">
                  Ends in 2h 30m
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-xl group-hover:text-primary transition-colors duration-300">{meal.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{meal.restaurant} • {meal.distance}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">{meal.currentPrice}</p>
                    <p className="text-sm text-gray-500 line-through">{meal.originalPrice}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{meal.rating}</span>
                    <span className="text-sm text-gray-500">({meal.reviews})</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Pickup: {meal.pickupTime}
                  </p>
                </div>
                <div className="text-sm text-green-600 mb-4">
                  Only {meal.portionsLeft} portions left
                </div>
                <button className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary/90 transition-colors duration-300">
                  Reserve Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Restaurants with Real Data */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Popular Restaurants</h2>
          <button className="text-primary flex items-center hover:underline">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
              <img
                src={`${restaurant.image}?w=400&h=300&fit=crop`}
                alt={restaurant.name}
                className="w-full h-36 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="font-semibold">{restaurant.name}</h3>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{restaurant.rating}</span>
                  <span className="text-sm text-gray-500">({restaurant.reviews})</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{restaurant.cuisine}</p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    {restaurant.distance}
                  </p>
                  <p className="text-sm text-green-600">{restaurant.deals} deals</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Stats - Enhanced Mobile Design */}
      <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-primary/10 p-6 text-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
          <div className="relative">
            <span className="inline-block text-4xl mb-3">🌍</span>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Together We're Making a Difference
            </h2>
            <p className="text-sm text-gray-600">Join thousands saving food daily</p>
          </div>
        </div>

        {/* Main Stats */}
        <div className="p-4 space-y-4">
          {/* Primary Impact Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                value: '25,000+',
                label: 'Meals Saved',
                subtext: 'This Month',
                icon: '🍱',
                color: 'bg-green-50',
                textColor: 'text-green-600',
                borderColor: 'border-green-200'
              },
              {
                value: '₹12.5L+',
                label: 'Customer Savings',
                subtext: 'Total Impact',
                icon: '💰',
                color: 'bg-blue-50',
                textColor: 'text-blue-600',
                borderColor: 'border-blue-200'
              }
            ].map((stat) => (
              <div
                key={stat.label}
                className={`${stat.color} border ${stat.borderColor} rounded-2xl p-4 text-center relative overflow-hidden group`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <span className="text-2xl block mb-2">{stat.icon}</span>
                <p className={`text-xl font-bold ${stat.textColor} mb-1`}>
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-800">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {stat.subtext}
                </p>
              </div>
            ))}
          </div>

          {/* Environmental Impact */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-center text-sm font-semibold text-gray-800 mb-3">Environmental Impact</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <span>🌱</span>
                  <span className="text-xs font-medium text-emerald-600">CO₂ Reduced</span>
                </div>
                <p className="text-lg font-bold text-emerald-600">12,500 kg</p>
                <p className="text-xs text-gray-500">This Quarter</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <span>💧</span>
                  <span className="text-xs font-medium text-blue-600">Water Saved</span>
                </div>
                <p className="text-lg font-bold text-blue-600">50,000 L</p>
                <p className="text-xs text-gray-500">This Quarter</p>
              </div>
            </div>
          </div>

          {/* Community Growth */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-600">Monthly Users</span>
              </div>
              <p className="text-lg font-bold text-amber-700">50,000+</p>
              <p className="text-xs text-amber-600">Active Users</p>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <span>🏪</span>
                <span className="text-sm font-medium text-purple-600">Partners</span>
              </div>
              <p className="text-lg font-bold text-purple-700">1,200+</p>
              <p className="text-xs text-purple-600">Restaurants</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-4">
            <div className="text-center text-white mb-3">
              <h3 className="font-semibold text-lg mb-1">Join Our Mission</h3>
              <p className="text-sm text-white/90">Every meal saved counts</p>
            </div>
            <button className="w-full bg-white text-primary py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share Our Impact</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 