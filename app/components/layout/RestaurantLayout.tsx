import { useState } from 'react';
import BottomNav from './BottomNav';
import TopNav from './TopNav';
import Sidebar from './Sidebar';

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="pt-16 pb-20">
        {children}
      </main>

      <BottomNav />
    </div>
  );
} 