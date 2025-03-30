import { Order } from '../types';
import { X, Clock, User, IndianRupee, Zap, MapPin, Phone } from 'lucide-react';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
  onStatusChange: (orderId: string, status: Order['status']) => void;
}

export function OrderDetailsModal({ order, onClose, onStatusChange }: OrderDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-lg p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Order Details</h2>
            {order.isFlashSale && (
              <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full flex items-center gap-1 mt-1">
                <Zap className="h-3 w-3" />
                Flash Sale
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium">#{order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Pickup Time</p>
              <p className="font-medium">{order.pickupTime}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Items</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    {item.notes && (
                      <p className="text-sm text-amber-600 mt-1">{item.notes}</p>
                    )}
                  </div>
                  <p className="font-medium flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Status</h3>
            <select
              value={order.status}
              onChange={(e) => onStatusChange(order.id, e.target.value as Order['status'])}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-medium mb-3">Customer Details</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span>{order.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>2.5 km away</span>
              </div>
            </div>
          </div>

          {order.specialInstructions && (
            <div className="bg-amber-50 text-amber-700 p-3 rounded-xl">
              <p className="font-medium">Special Instructions</p>
              <p className="text-sm mt-1">{order.specialInstructions}</p>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount</span>
              <span className="text-xl font-bold flex items-center">
                <IndianRupee className="h-5 w-5 mr-1" />
                {order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 