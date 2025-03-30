import { Order } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { Clock, User, IndianRupee, Zap } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: Order['status']) => void;
  onViewDetails: (order: Order) => void;
}

export function OrderCard({ order, onStatusChange, onViewDetails }: OrderCardProps) {
  const statusColors = {
    pending: 'bg-amber-100 text-amber-700',
    preparing: 'bg-blue-100 text-blue-700',
    ready: 'bg-emerald-100 text-emerald-700',
    completed: 'bg-gray-100 text-gray-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">#{order.id}</span>
          {order.isFlashSale && (
            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Flash Sale
            </span>
          )}
        </div>
        <span className={`${statusColors[order.status]} text-xs px-2 py-1 rounded-full capitalize`}>
          {order.status}
        </span>
      </div>
      
      <div className="space-y-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div>
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-gray-500 ml-2">x{item.quantity}</span>
            </div>
            <span className="text-sm font-medium flex items-center">
              <IndianRupee className="h-3 w-3 mr-1" />
              {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{order.customerName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{order.pickupTime}</span>
          </div>
        </div>

        {order.specialInstructions && (
          <div className="bg-amber-50 text-amber-700 text-sm p-2 rounded-lg">
            {order.specialInstructions}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm">
          <span className="text-gray-500">Total: </span>
          <span className="font-semibold flex items-center">
            <IndianRupee className="h-4 w-4 mr-1" />
            {order.total.toFixed(2)}
          </span>
        </div>
        <div className="flex gap-2">
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order.id, e.target.value as Order['status'])}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button 
            onClick={() => onViewDetails(order)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
} 