"use client"
import { Bell, Menu } from 'lucide-react';

interface TopNavProps {
  onMenuClick: () => void;
}

export default function TopNav({ onMenuClick }: TopNavProps) {
  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-30 border-b">
      <div className="px-4 h-16 flex items-center justify-between">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="flex-1 px-4 lg:text-center">
          <h1 className="text-lg font-semibold text-gray-800">Restaurant Name</h1>
          <p className="text-xs text-gray-500">Dashboard</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </nav>
  );
} 