'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Orders', href: '/orders', icon: ShoppingBag },
    { name: 'Cart', href: '/cart', icon: ShoppingCart },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 pointer-events-none">
      <nav className="max-w-md mx-auto bg-white/90 backdrop-blur-lg shadow-[0_-8px_32px_rgba(0,0,0,0.12)] rounded-2xl px-4 py-3 border border-gray-100 pointer-events-auto">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center space-y-1 transition-all duration-200 ${
                  isActive 
                    ? 'text-emerald-600 scale-110' 
                    : 'text-gray-500 hover:text-emerald-500 hover:scale-105'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default BottomNav; 