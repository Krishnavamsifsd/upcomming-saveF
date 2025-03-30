"use client"

import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Orders</h2>
      
      {/* Active Orders */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Active Orders</h3>
        <div 
          className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => router.push('/orders/12345')}
        >
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Order"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">5 Samosas</h4>
              <p className="text-sm text-gray-600">Raju's Dhaba</p>
              <div className="mt-2 flex items-center text-sm text-primary">
                <Clock className="w-4 h-4 mr-1" />
                <span>Pickup by 7:00 PM</span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Order #12345 • ₹20
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevents the parent div's onClick from firing
                router.push('/orders/12345');
              }}
              className="text-primary text-sm font-medium hover:text-primary/80"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Past Orders */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Past Orders</h3>
        <div className="space-y-4">
          {/* Completed Order */}
          <div 
            className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => router.push('/orders/12346')}
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Order"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Family Pack: 10 Rotis + Sabzi</h4>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-sm text-gray-600">Maa's Kitchen</p>
                <div className="mt-2 text-sm text-gray-500">
                  Picked up on Mar 29, 2024 • ₹75
                </div>
              </div>
            </div>
          </div>

          {/* Cancelled Order */}
          <div 
            className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => router.push('/orders/12347')}
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Order"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">3 Idlis</h4>
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-sm text-gray-600">South Indian Corner</p>
                <div className="mt-2 text-sm text-gray-500">
                  Cancelled on Mar 28, 2024 • ₹15
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 