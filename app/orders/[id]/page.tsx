"use client"

import { useState, useEffect } from 'react';
import { Clock, CheckCircle2, XCircle, MapPin, Phone, ArrowLeft, AlertCircle, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [copySuccess, setCopySuccess] = useState(false);
  const [order, setOrder] = useState<null | any>(null);

  // Generate verification code after component mounts
  useEffect(() => {
    // Create a deterministic verification code based on order ID
    const generateVerificationCode = (orderId: string) => {
      // Take last 6 characters of order ID, or pad with zeros if needed
      const code = orderId.slice(-6).padStart(6, '0');
      return code;
    };

    setOrder({
      id: resolvedParams.id,
      items: "5 Samosas",
      restaurant: "Raju's Dhaba",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      status: 'active',
      pickupTime: "7:00 PM",
      price: 20,
      originalPrice: 40,
      date: new Date().toISOString(),
      address: "123 Food Street, Local Area",
      contact: "+91 98765 43210",
      restaurantNotes: "Please use the back entrance for pickup",
      itemDetails: [
        { name: "Samosa", quantity: 5, price: 4, originalPrice: 8 }
      ],
      verificationCode: generateVerificationCode(resolvedParams.id)
    });
  }, [resolvedParams.id]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Show loading state while order is being initialized
  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-60 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const VerificationSection = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-2">Pickup Verification</h2>
      <p className="text-sm text-gray-600 mb-4">
        Show this code to the restaurant staff when picking up your order
      </p>
      
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
        <div>
          <div className="text-2xl font-bold tracking-wider text-primary">
            {order.verificationCode}
          </div>
          <div className="text-sm text-gray-500 mt-1">Verification Code</div>
        </div>
        <button
          onClick={() => copyToClipboard(order.verificationCode)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors p-2"
        >
          <Copy className="w-5 h-5" />
          {copySuccess ? (
            <span className="text-green-600">Copied!</span>
          ) : (
            <span className="text-sm">Copy</span>
          )}
        </button>
      </div>

      {order.status === 'active' && (
        <div className="mt-4 bg-blue-50 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              Please have this code ready when you arrive at the restaurant. The staff will ask for it to verify your order.
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Orders
      </button>

      {/* Order Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start space-x-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden">
            <img
              src={order.image}
              alt={order.items}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-semibold">{order.items}</h1>
                <p className="text-gray-600">{order.restaurant}</p>
              </div>
              {order.status === 'active' && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Active Order
                </span>
              )}
            </div>
            
            <div className="mt-4 flex items-center text-sm text-primary">
              <Clock className="w-4 h-4 mr-1" />
              <span>Pickup by {order.pickupTime}</span>
            </div>
            
            <div className="mt-2 text-sm text-gray-500">
              Order #{order.id}
            </div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <h2 className="text-lg font-semibold">Order Details</h2>
        
        {/* Items Breakdown */}
        <div className="space-y-3">
          {order.itemDetails.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b">
              <div className="flex items-center">
                <span className="font-medium">{item.quantity}x</span>
                <span className="ml-2">{item.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm line-through text-gray-400">
                  ₹{item.originalPrice * item.quantity}
                </p>
                <p className="font-medium">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price Summary */}
        <div className="space-y-2 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Original Price</span>
            <span className="line-through text-gray-400">₹{order.originalPrice}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600">-₹{order.originalPrice - order.price}</span>
          </div>
          <div className="flex justify-between font-medium pt-2 border-t">
            <span>Total Amount</span>
            <span className="text-primary">₹{order.price}</span>
          </div>
        </div>
      </div>

      {/* Pickup Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold">Pickup Information</h2>
        
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{order.address}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="w-5 h-5 mr-2" />
            <span>{order.contact}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2" />
            <span>Pickup by {order.pickupTime}</span>
          </div>
        </div>

        {order.restaurantNotes && (
          <div className="mt-4 bg-blue-50 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-800">Restaurant Notes</p>
                <p className="mt-1 text-sm text-blue-700">{order.restaurantNotes}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Verification Section before Action Buttons */}
      {order.status === 'active' && <VerificationSection />}

      {/* Action Buttons */}
      {order.status === 'active' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex gap-4">
            <button 
              onClick={() => router.push(`https://maps.google.com/?q=${encodeURIComponent(order.address)}`)}
              className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Directions
            </button>
            <button 
              onClick={() => {
                if(confirm('Are you sure you want to cancel this order?')) {
                  // Handle cancellation
                }
              }}
              className="flex-1 border border-red-600 text-red-600 py-3 rounded-lg hover:bg-red-50 transition-colors"
            >
              Cancel Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 