import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Settings,
  Menu as MenuIcon,
  ChefHat,
  Calendar,
  MessageSquare
} from 'lucide-react';

const navItems = [
  { icon: ShoppingBag, label: 'Orders', path: '/restaurant/orders' },
  { icon: MenuIcon, label: 'Menu', path: '/restaurant/menu' },
  { icon: TrendingUp, label: 'Analytics', path: '/restaurant/analytics' },
  { icon: MessageSquare, label: 'Reviews', path: '/restaurant/reviews' },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-30">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center justify-center flex-1 h-full
              ${pathname === item.path ? 'text-emerald-600' : 'text-gray-500'}`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
} 