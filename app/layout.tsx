import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SavePlate India',
  description: 'Save food, save money, save the planet',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  
  // Check if the current path is an authenticated route
  const isAuthenticatedRoute = pathname.startsWith('/home') || 
                             pathname.startsWith('/orders') || 
                             pathname.startsWith('/cart') || 
                             pathname.startsWith('/profile');

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <main className={`container mx-auto px-4 py-4 ${isAuthenticatedRoute ? 'pb-16' : ''}`}>
            {children}
          </main>
          {isAuthenticatedRoute && <BottomNav />}
        </div>
      </body>
    </html>
  );
}
