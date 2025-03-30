import { Search, SlidersHorizontal } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for meals..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Featured Deals */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Featured Deals</h2>
        <div className="grid gap-4">
          {/* Deal Card */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-48">
              <img
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Samosa Deal"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-sm">
                50% OFF
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">5 Samosas</h3>
              <p className="text-gray-600 text-sm">Raju's Dhaba • 1.2km away</p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">₹20</span>
                  <span className="text-sm text-gray-500 line-through">₹40</span>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary/90">
                  Grab Now
                </button>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Pickup: 6-7 PM • 3 left
              </div>
            </div>
          </div>

          {/* More Deal Cards */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-48">
              <img
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Family Pack"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-sm">
                70% OFF
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">Family Pack: 10 Rotis + Sabzi</h3>
              <p className="text-gray-600 text-sm">Maa's Kitchen • 2.5km away</p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">₹75</span>
                  <span className="text-sm text-gray-500 line-through">₹250</span>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary/90">
                  Grab Now
                </button>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Pickup: 7-8 PM • 2 left
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 