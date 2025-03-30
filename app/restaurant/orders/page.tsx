"use client"
import { useState } from 'react';
import RestaurantLayout from '@/components/layout/RestaurantLayout';
import { Filter } from 'lucide-react';
import { OrderCard } from '../components/OrderCard';

const orderStatuses = ['All', 'New', 'Preparing', 'Ready', 'Completed', 'Cancelled'];

export default function Orders() {
  const [activeStatus, setActiveStatus] = useState('all');

  return (
    <RestaurantLayout>
      <div className="px-4">
        {/* Status Filter */}
        <div className="sticky top-16 bg-gray-50 pt-4 pb-2 z-20">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Orders</h1>
            <button className="p-2 border border-gray-200 rounded-xl">
              <Filter className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {orderStatuses.map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-full whitespace-nowrap
                  ${activeStatus === status.toLowerCase() 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white border border-gray-200 text-gray-600'
                  }`}
                onClick={() => setActiveStatus(status.toLowerCase())}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="mt-4 space-y-4">
          <OrderCard 
            order={{
              id: "1",
              status: "pending",
              items: [],
              customerName: "John Doe",
              total: 0,
              createdAt: new Date().toISOString(),
              isFlashSale: false
            }}
            onStatusChange={(orderId, status) => console.log(orderId, status)}
            onViewDetails={(order) => console.log(order)}
          />
          {/* Add more OrderCards */}
        </div>
      </div>
    </RestaurantLayout>
  );
} 