import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Cart</h2>

      {/* Cart Items */}
      <div className="space-y-4">
        {/* Cart Item */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Samosa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">5 Samosas</h4>
                  <p className="text-sm text-gray-600">Raju's Dhaba</p>
                  <div className="mt-1 text-sm text-gray-500">
                    Pickup: 6-7 PM
                  </div>
                </div>
                <button className="text-gray-400 hover:text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">1</span>
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 line-through">₹40</div>
                  <div className="font-medium">₹20</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Another Cart Item */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Family Pack"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">Family Pack: 10 Rotis + Sabzi</h4>
                  <p className="text-sm text-gray-600">Maa's Kitchen</p>
                  <div className="mt-1 text-sm text-gray-500">
                    Pickup: 7-8 PM
                  </div>
                </div>
                <button className="text-gray-400 hover:text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">1</span>
                  <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 line-through">₹250</div>
                  <div className="font-medium">₹75</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-medium mb-4">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>₹95</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">You Save</span>
            <span className="text-green-500">₹220</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>₹95</span>
            </div>
          </div>
        </div>
        <button className="w-full bg-primary text-white py-3 rounded-full mt-4 hover:bg-primary/90">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
} 