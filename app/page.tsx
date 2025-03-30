"use client"
import Link from 'next/link';
import { ArrowRight, Leaf, ShieldCheck, Timer, ChevronDown, Star, Menu, X, MapPin, Utensils, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <span className="font-bold text-2xl bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
                SavePlate
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-gray-600 hover:text-black transition-colors">About</Link>
              <Link href="/restaurants" className="text-gray-600 hover:text-black transition-colors">Restaurants</Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-black transition-colors">How it Works</Link>
              <Link href="/auth/login" className="text-gray-600 hover:text-black transition-colors">Login</Link>
              <Link href="/auth/signup" 
                className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-black/90 transition-all transform hover:scale-105">
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden absolute w-full bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="px-4 py-6 space-y-4">
            <Link href="/about" className="block text-gray-600 hover:text-black py-2">About</Link>
            <Link href="/restaurants" className="block text-gray-600 hover:text-black py-2">Restaurants</Link>
            <Link href="/how-it-works" className="block text-gray-600 hover:text-black py-2">How it Works</Link>
            <Link href="/auth/login" className="block text-gray-600 hover:text-black py-2">Login</Link>
            <Link href="/auth/signup" 
              className="block bg-black text-white px-6 py-3 rounded-full text-center hover:bg-black/90 transition-all">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

  

      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-black/5 px-4 py-2 rounded-full animate-fade-in-up">
                <Star className="w-4 h-4 text-yellow-500 animate-pulse" />
                <span className="text-sm font-medium">India's #1 Food Rescue Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-fade-in">
                Save Food.
                <span className="block mt-2 bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text animate-gradient">
                  Save Planet.
                </span>
        </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg animate-fade-in-up delay-200">
                Join our mission to reduce food waste while enjoying quality meals at amazing prices.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
                <Link href="/auth/login"
                  className="group flex items-center justify-center px-8 py-4 bg-black text-white rounded-full hover:bg-black/90 transition-all transform hover:scale-105 hover:shadow-xl">
                  <span className="text-lg">Get Started</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
                <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center justify-center px-8 py-4 border-2 border-black/10 rounded-full hover:border-black transition-colors text-lg group">
                  <span>Learn More</span>
                  <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-12 border-t animate-fade-in-up delay-400">
                {[
                  { number: '50K+', label: 'Meals Saved', icon: <Leaf className="w-4 h-4 text-green-600" /> },
                  { number: '₹2M+', label: 'Saved', icon: null },
                  { number: '100+', label: 'Cities', icon: null }
                ].map((stat, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute inset-0 bg-black/5 rounded-2xl transform group-hover:scale-105 transition-transform opacity-0 group-hover:opacity-100" />
                    <div className="relative">
                      <div className="text-4xl font-bold">{stat.number}</div>
                      <div className="text-gray-600 mt-1">{stat.label}</div>
                      {stat.icon && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          {stat.icon}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-square lg:aspect-[4/5] shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200"
                  alt="Delicious Food"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">1,240 kg</div>
                    <div className="text-green-600">CO₂ saved today</div>
                  </div>
                </div>
              </div>

              {/* Additional Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-float delay-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">4.9/5 Rating</div>
                    <div className="text-gray-500">10K+ Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-emerald-600 font-medium text-sm uppercase tracking-wider">Simple Process</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2">How SavePlate Works</h2>
            <p className="mt-4 text-gray-600 text-xl">Three easy steps to start saving food and money</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <Timer className="w-8 h-8" />,
                title: "Browse Deals",
                description: "Discover discounted meals from quality restaurants in your area",
                color: "bg-purple-500",
                gradient: "from-purple-500/10 to-purple-500/0",
                iconBg: "bg-purple-100",
                iconColor: "text-purple-600"
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Place Order",
                description: "Select your meals and complete your purchase securely",
                color: "bg-emerald-500",
                gradient: "from-emerald-500/10 to-emerald-500/0",
                iconBg: "bg-emerald-100",
                iconColor: "text-emerald-600"
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Pickup & Enjoy",
                description: "Collect your order and enjoy restaurant-quality food",
                color: "bg-orange-500",
                gradient: "from-orange-500/10 to-orange-500/0",
                iconBg: "bg-orange-100",
                iconColor: "text-orange-600"
              }
            ].map((feature, index) => (
              <div key={index} className="relative group">
                {/* Connection Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-50 -translate-y-1/2 z-0" />
                )}
                
                {/* Card */}
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" 
                    style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}CC)` }}>
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={feature.iconColor}>{feature.icon}</div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>

                  {/* Decorative Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              </div>
            ))}
          </div>

          {/* Additional Features */}
          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Quality Food", value: "100% Fresh" },
              { title: "Average Savings", value: "Up to 50%" },
              { title: "Partner Restaurants", value: "500+" },
              { title: "Food Saved", value: "1000+ kg/day" }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-emerald-600">{stat.value}</div>
                <div className="text-gray-600 mt-1">{stat.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,0,0,0.05),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Join thousands of food rescuers who are saving money and the planet, one meal at a time.
            </p>
            <Link href="/auth/signup"
              className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full hover:bg-black/90 transition-all group text-lg">
              Join SavePlate Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-2xl mb-4">SavePlate</div>
              <p className="text-gray-600">Making food rescue easy and rewarding.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-600 hover:text-black">About</Link>
                <Link href="/careers" className="block text-gray-600 hover:text-black">Careers</Link>
                <Link href="/press" className="block text-gray-600 hover:text-black">Press</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-gray-600 hover:text-black">Privacy</Link>
                <Link href="/terms" className="block text-gray-600 hover:text-black">Terms</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2">
                <Link href="/support" className="block text-gray-600 hover:text-black">Support</Link>
                <Link href="/contact" className="block text-gray-600 hover:text-black">Contact Us</Link>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-gray-600">
            © 2024 SavePlate India. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
