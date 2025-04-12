'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { X, Check, Loader2, AlertCircle, User, Store } from 'lucide-react';

// Initialize Supabase client with the correct URL
const supabaseUrl = 'https://zfqbkvmkejimdgrsnuqi.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface WaitlistFormProps {
  onClose: () => void;
}

export default function WaitlistForm({ onClose }: WaitlistFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    role: 'customer' as 'customer' | 'restaurant'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tableExists, setTableExists] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'customer' | 'restaurant'>('customer');



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (tab: 'customer' | 'restaurant') => {
    setActiveTab(tab);
    setFormData(prev => ({ ...prev, role: tab }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Insert data into Supabase waitlist table
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            role: formData.role,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      // Show success message
      setIsSuccess(true);
      
      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err: any) {
      console.error('Error submitting form:', err);
      
      if (err.code === '42P01') {
        setError('The waitlist table does not exist in the database. Please create it first.');
      } else {
        setError('There was an error submitting your information. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // If table doesn't exist, show instructions
  if (tableExists === false) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
        <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Database Setup Required</h3>
            <p className="text-amber-700 mb-4">
              The waitlist table doesn't exist in your Supabase database. Please create it first.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-left text-sm text-gray-700 mb-4 overflow-auto max-h-40">
              <p className="font-mono">CREATE TABLE waitlist (</p>
              <p className="font-mono ml-4">id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),</p>
              <p className="font-mono ml-4">name TEXT NOT NULL,</p>
              <p className="font-mono ml-4">email TEXT NOT NULL,</p>
              <p className="font-mono ml-4">phone TEXT NOT NULL,</p>
              <p className="font-mono ml-4">city TEXT NOT NULL,</p>
              <p className="font-mono ml-4">role TEXT NOT NULL,</p>
              <p className="font-mono ml-4">created_at TIMESTAMPTZ DEFAULT NOW()</p>
              <p className="font-mono">);</p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-xl border border-gray-200 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-100 rounded-full opacity-50"></div>
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Success message */}
        {isSuccess ? (
          <div className="text-center py-8 relative z-10">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Check className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">You're on the list!</h3>
            <p className="text-emerald-700 mb-6">
              Thank you for joining our waitlist. We'll notify you when SavePlate launches in your area.
            </p>
            <div className="w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6 relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Join the SavePlate Waitlist</h2>
              <p className="text-gray-600">
                Be among the first to experience SavePlate and start saving money while reducing food waste.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex mb-6 border-b border-gray-200 relative z-10">
              <button
                onClick={() => handleTabChange('customer')}
                className={`flex-1 py-3 text-center font-medium transition-all duration-300 ${
                  activeTab === 'customer' 
                    ? 'text-emerald-600 border-b-2 border-emerald-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <User size={18} />
                  <span>Customer</span>
                </div>
              </button>
              <button
                onClick={() => handleTabChange('restaurant')}
                className={`flex-1 py-3 text-center font-medium transition-all duration-300 ${
                  activeTab === 'restaurant' 
                    ? 'text-emerald-600 border-b-2 border-emerald-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Store size={18} />
                  <span>Restaurant</span>
                </div>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-800 transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-800 transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-800 transition-all duration-300"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-800 transition-all duration-300"
                  placeholder="Enter your city"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative px-4 py-3 rounded-xl text-white overflow-hidden group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 disabled:opacity-70 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
} 