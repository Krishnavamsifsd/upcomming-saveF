"use client"
import { useState } from 'react';
import RestaurantLayout from '@/components/layout/RestaurantLayout';
import { Plus, Search, Filter, IndianRupee, Zap, Clock } from 'lucide-react';
import { MenuItem } from '../types';

// Sample menu items
const sampleMenuItems: MenuItem[] = [
  {
    id: '1',
    name: '5 Samosas',
    description: 'Freshly made samosas with potato and peas filling',
    price: 40,
    category: 'snacks',
    isAvailable: true,
    quantity: 10,
    flashSalePrice: 20,
    flashSaleEndTime: '2024-03-20T20:00:00Z'
  },
  {
    id: '2',
    name: 'Family Pack: 10 Rotis + Sabzi',
    description: 'Fresh rotis with mixed vegetable curry',
    price: 150,
    category: 'meals',
    isAvailable: true,
    quantity: 5
  },
  {
    id: '3',
    name: '3 Idlis',
    description: 'Soft idlis served with sambar and chutney',
    price: 30,
    category: 'snacks',
    isAvailable: true,
    quantity: 8,
    flashSalePrice: 15,
    flashSaleEndTime: '2024-03-20T19:00:00Z'
  }
];

export default function MenuManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'snacks' | 'meals' | 'catering'>('all');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(sampleMenuItems);

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Menu Items</h1>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-700 transition-colors">
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

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {item.isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Regular Price:</span>
                  <span className="font-medium flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {item.price}
                  </span>
                </div>

                {item.flashSalePrice && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-orange-600">Flash Sale Price:</span>
                    <span className="font-medium flex items-center text-orange-600">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      {item.flashSalePrice}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Quantity:</span>
                  <span className="font-medium">{item.quantity}</span>
                </div>

                {item.flashSaleEndTime && (
                  <div className="flex items-center gap-2 text-sm text-orange-600">
                    <Clock className="h-4 w-4" />
                    <span>Ends at {new Date(item.flashSaleEndTime).toLocaleTimeString()}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                  Edit
                </button>
                <button className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                  {item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RestaurantLayout>
  );
} 