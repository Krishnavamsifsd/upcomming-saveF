"use client"
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div className={`fixed inset-0 z-40 lg:hidden ${isOpen ? 'visible' : 'invisible'}`}>
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      <div className={`absolute top-0 left-0 bottom-0 w-64 bg-white transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-semibold">Menu</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        {/* Add sidebar content here */}
      </div>
    </div>
  );
} 