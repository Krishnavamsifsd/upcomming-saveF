"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  PieChart,
  Utensils,
  User,
  Bell,
  Menu as MenuIcon,
  X,
  Shield,
  Crown,
  IndianRupee,
  Star,
  MapPin
} from 'lucide-react';
import { VendorProfile } from '@/app/restaurant/types';

interface RestaurantLayoutProps {
  children: React.ReactNode;
  vendorProfile?: VendorProfile;
}

export default function RestaurantLayout({ children, vendorProfile }: RestaurantLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white fixed top-0 left-0 right-0 z-30 border-b">
        <div className="px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 lg:text-center">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-lg font-semibold text-gray-800">{vendorProfile?.name || 'Restaurant Dashboard'}</h1>
              {vendorProfile?.isVerified && (
                <Shield className="h-4 w-4 text-blue-500" />
              )}
              {vendorProfile?.isPremium && (
                <Crown className="h-4 w-4 text-yellow-500" />
              )}
            </div>
            <p className="text-xs text-gray-500">SavePlate Vendor Dashboard</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isSidebarOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setSidebarOpen(false)}
        />
        
        <div className={`absolute top-0 left-0 bottom-0 w-64 bg-white transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="font-semibold">Menu</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4 space-y-2">
            <button 
              onClick={() => {
                router.push('/restaurant/dashboard');
                setSidebarOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Dashboard
            </button>
            <button 
              onClick={() => {
                router.push('/restaurant/menu');
                setSidebarOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Menu Items
            </button>
            <button 
              onClick={() => {
                router.push('/restaurant/analytics');
                setSidebarOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Analytics
            </button>
            <button 
              onClick={() => {
                router.push('/restaurant/profile');
                setSidebarOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-16 px-4 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-30">
        <div className="flex justify-around items-center h-16">
          <NavButton
            icon={<ShoppingBag />}
            label="Orders"
            onClick={() => router.push('/restaurant/dashboard')}
          />
          <NavButton
            icon={<PieChart />}
            label="Analytics"
            onClick={() => router.push('/restaurant/analytics')}
          />
          <NavButton
            icon={<Utensils />}
            label="Menu"
            onClick={() => router.push('/restaurant/menu')}
          />
          <NavButton
            icon={<User />}
            label="Profile"
            onClick={() => router.push('/restaurant/profile')}
          />
        </div>
      </nav>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavButton({ icon, label, isActive = false, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center flex-1 h-full ${
        isActive ? 'text-emerald-600' : 'text-gray-500'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
} 