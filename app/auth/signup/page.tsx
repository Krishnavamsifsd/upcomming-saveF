"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Store, Leaf } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'customer' | 'restaurant' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!userRole) {
      setError('Please select a role');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            role: userRole,
            is_verified: false
          }
        }
      });

      if (error) throw error;

      // Always redirect to verification pending page after signup
      router.push('/auth/verification-pending');
      
    } catch (error: any) {
      const errorMessage = error?.message || 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Premium background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Main content */}
      <div className="relative w-full max-w-md p-8">
        {/* Logo and title */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-70 animate-pulse" />
              <div className="relative z-10 bg-gradient-to-br from-emerald-400 to-teal-500 p-3 rounded-2xl shadow-lg shadow-emerald-500/20">
                <Leaf className="w-8 h-8 text-white" />
              </div>
            </div>
            <span className="ml-4 text-4xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">SavePlate</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Create Account</h2>
          <p className="text-emerald-200/80">Choose your account type</p>
        </div>

        {/* Signup form */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl shadow-black/20 border border-white/10 hover:border-white/20 transition-all duration-300">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-200 flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserRole('customer')}
                className={`p-6 border rounded-xl flex flex-col items-center justify-center transition-all ${
                  userRole === 'customer'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-lg shadow-emerald-500/20'
                    : 'border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5'
                }`}
              >
                <div className="relative mb-4">
                  <div className={`absolute inset-0 bg-emerald-500/20 rounded-full ${userRole === 'customer' ? 'animate-pulse' : ''}`}></div>
                  <User className="h-10 w-10 relative z-10 text-emerald-300" />
                </div>
                <span className="font-semibold text-lg mb-1 text-white">Customer</span>
                <span className="text-xs text-emerald-200/70">Order & Track</span>
              </button>

              <button
                type="button"
                onClick={() => setUserRole('restaurant')}
                className={`p-6 border rounded-xl flex flex-col items-center justify-center transition-all ${
                  userRole === 'restaurant'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-lg shadow-emerald-500/20'
                    : 'border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5'
                }`}
              >
                <div className="relative mb-4">
                  <div className={`absolute inset-0 bg-emerald-500/20 rounded-full ${userRole === 'restaurant' ? 'animate-pulse' : ''}`}></div>
                  <Store className="h-10 w-10 relative z-10 text-emerald-300" />
                </div>
                <span className="font-semibold text-lg mb-1 text-white">Restaurant</span>
                <span className="text-xs text-emerald-200/70">Manage & Grow</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-emerald-100 mb-2">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-emerald-300 group-focus-within:text-emerald-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="block w-full pl-12 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-white placeholder-emerald-200/50"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-emerald-100 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-emerald-300 group-focus-within:text-emerald-400 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    className="block w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-white placeholder-emerald-200/50"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-300 hover:text-emerald-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !userRole}
                className="relative w-full flex items-center justify-center px-4 py-3 rounded-xl text-white overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:from-emerald-600 group-hover:to-teal-600 transition-all duration-300 disabled:opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative flex items-center">
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            <div className="text-center">
              <p className="text-sm text-emerald-200/80">
                Already have an account?{' '}
                <button
                  onClick={() => router.push('/auth/login')}
                  className="font-medium text-emerald-300 hover:text-emerald-400 transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 