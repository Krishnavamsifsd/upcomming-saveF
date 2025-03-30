import { Award, Heart, Settings, Star, Trophy } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-4">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Rahul Kumar</h2>
            <p className="text-gray-600">rahul@example.com</p>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              <span>4.8 • 12 orders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="font-medium">Food Hero Points</h3>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">450</div>
            <div className="text-sm text-gray-500">50 points to next level</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-green-500" />
            <h3 className="font-medium">Total Savings</h3>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">₹1,250</div>
            <div className="text-sm text-gray-500">This month</div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-medium mb-4">My Badges</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="mt-2 text-sm font-medium">Snack Saver</div>
            <div className="text-xs text-gray-500">10 orders</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <Heart className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-2 text-sm font-medium">Food Hero</div>
            <div className="text-xs text-gray-500">500 points</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
              <Star className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-2 text-sm font-medium">Meal Master</div>
            <div className="text-xs text-gray-500">25 orders</div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h3 className="font-medium">Settings</h3>
        </div>
        <div className="divide-y">
          <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-gray-500" />
              <span>Account Settings</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
          <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <Heart className="w-5 h-5 text-gray-500" />
              <span>Favorite Vendors</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
          <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <Star className="w-5 h-5 text-gray-500" />
              <span>Notifications</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
        </div>
      </div>
    </div>
  );
} 