"use client"

import { useState, useEffect } from 'react';
import { MapPin, Search, ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the Map component with no SSR
const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[calc(100vh-240px)] bg-gray-100 animate-pulse flex items-center justify-center">
      <span className="text-gray-500">Loading map...</span>
    </div>
  )
});

export default function MapPage() {
  const [radius, setRadius] = useState<number>(3000);
  const [center, setCenter] = useState({
    lat: 28.6139,
    lng: 77.2090
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Select Location</h1>
          </div>
        </div>
      </div>

      {/* Search and Radius Controls */}
      <div className="bg-white p-4 border-b">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 h-12 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Radius Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Radius:</span>
            <div className="flex gap-2">
              {[1, 2, 3, 5, 10].map((km) => (
                <button
                  key={km}
                  onClick={() => setRadius(km * 1000)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${radius === km * 1000 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {km}km
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <MapComponent center={center} radius={radius} setCenter={setCenter} />

      {/* Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => {
              localStorage.setItem('selectedLocation', JSON.stringify({
                center,
                radius
              }));
              window.history.back();
            }}
            className="w-full bg-primary text-white py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
} 