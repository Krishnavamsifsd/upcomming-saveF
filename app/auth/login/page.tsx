"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Leaf, Zap, Check } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Force a router refresh - the middleware will handle the redirect
      router.refresh();
    } catch (err) {
      setError('Invalid email or password');
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
          <h2 className="text-3xl font-bold text-white mb-3">Welcome back</h2>
          <p className="text-emerald-200/80">Join us in making food waste a thing of the past</p>
        </div>

        {/* Login form */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl shadow-black/20 border border-white/10 hover:border-white/20 transition-all duration-300">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-200 flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-emerald-100 mb-2">
                Email address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-emerald-300 group-focus-within:text-emerald-400 transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-white placeholder-emerald-200/50"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-emerald-100">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-emerald-300 hover:text-emerald-400 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-emerald-300 group-focus-within:text-emerald-400 transition-colors" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all text-white placeholder-emerald-200/50"
                  placeholder="Enter your password"
                  required
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

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-emerald-300/30 rounded transition-colors bg-white/5"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-emerald-100">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full flex items-center justify-center px-4 py-3 rounded-xl text-white overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:from-emerald-600 group-hover:to-teal-600 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative flex items-center">
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign in
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-emerald-200/80">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="font-medium text-emerald-300 hover:text-emerald-400 transition-colors">
                Sign up now
              </Link>
            </p>
          </div>
        </div>

        {/* Premium features */}
        <div className="mt-10 text-center space-y-6">
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center">
              <div className="bg-emerald-500/20 p-2 rounded-full mr-2">
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-sm text-emerald-200/90">Save up to 50% on food</span>
            </div>
            <div className="w-1 h-1 bg-emerald-500/30 rounded-full"></div>
            <div className="flex items-center">
              <div className="bg-emerald-500/20 p-2 rounded-full mr-2">
                <Leaf className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-sm text-emerald-200/90">Reduce food waste</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-200/70">Premium restaurant discounts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-200/70">Exclusive member benefits</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-200/70">Join 10,000+ satisfied customers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 