"use client"
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Mail, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function VerificationPending() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.email) {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email
      });
      if (error) {
        console.error('Error resending verification:', error);
      } else {
        setCountdown(60); // Start 60 second countdown
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Mail className="w-14 h-14 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
            <p className="text-gray-600 mb-8">We've sent you a verification link</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleResend}
              disabled={countdown > 0}
              className={`w-full px-6 py-3 rounded-xl transition-colors flex items-center justify-center ${
                countdown > 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {countdown > 0 ? (
                <>
                  Resend in {countdown}s
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              ) : (
                <>
                  Resend Email
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
            
            <button
              onClick={() => router.push('/auth/login')}
              className="w-full px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 