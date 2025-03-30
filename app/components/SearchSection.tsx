"use client"

import { Search, MapPin, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchSection() {
  const router = useRouter();

  return (
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
        onClick={() => router.push('/map')}
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
  );
} 