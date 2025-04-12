"use client"
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, ShieldCheck, Timer, ChevronDown, Star, Menu, X, MapPin, Utensils, Clock, IndianRupee, Users, Zap, CheckCircle, Globe, Heart, TrendingUp, Award, Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';
import { useState, useEffect } from 'react';
import WaitlistForm from './components/WaitlistForm';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-effect shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <span className="font-bold text-2xl bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                SavePlate
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-emerald-600 transition-colors">Features</Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-emerald-600 transition-colors">How it Works</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-emerald-600 transition-colors">Pricing</Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-emerald-600 transition-colors">Testimonials</Link>
              <Link href="/auth/login" className="text-gray-600 hover:text-emerald-600 transition-colors">Login</Link>
              <button
                onClick={() => setShowWaitlistForm(true)}
                className="bg-emerald-600 text-white px-6 py-2.5 rounded-full hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Join Waitlist
              </button>
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
            <Link href="#features" className="block text-gray-600 hover:text-emerald-600 py-2">Features</Link>
            <Link href="#how-it-works" className="block text-gray-600 hover:text-emerald-600 py-2">How it Works</Link>
            <Link href="#pricing" className="block text-gray-600 hover:text-emerald-600 py-2">Pricing</Link>
            <Link href="#testimonials" className="block text-gray-600 hover:text-emerald-600 py-2">Testimonials</Link>
            <Link href="/auth/login" className="block text-gray-600 hover:text-emerald-600 py-2">Login</Link>
            <button
              onClick={() => setShowWaitlistForm(true)}
              className="block w-full bg-emerald-600 text-white px-6 py-3 rounded-full text-center hover:bg-emerald-700 transition-all"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full animate-fade-in-up">
                <Zap className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span className="text-sm font-medium text-emerald-700">India's #1 Food Rescue Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-fade-in">
                Save Food.
                <span className="block mt-2 shine-text">
                  Save Planet.
                </span>
        </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg animate-fade-in-up delay-200">
                Join our mission to reduce food waste while enjoying quality meals at amazing prices. Save up to 70% on restaurant food.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
                <button
                  onClick={() => setShowWaitlistForm(true)}
                  className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Join Waitlist
                </button>
                <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center justify-center px-8 py-4 gradient-border hover:border-emerald-200 transition-colors text-lg group">
                  <span>Learn More</span>
                  <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-12 border-t animate-fade-in-up delay-400">
                {[
                  { number: '50K+', label: 'Meals Saved', icon: <Leaf className="w-4 h-4 text-emerald-600" /> },
                  { number: '₹2M+', label: 'Saved', icon: <IndianRupee className="w-4 h-4 text-emerald-600" /> },
                  { number: '100+', label: 'Cities', icon: <MapPin className="w-4 h-4 text-emerald-600" /> }
                ].map((stat, index) => (
                  <div key={index} className="relative group hover-lift">
                    <div className="absolute inset-0 bg-emerald-50 rounded-2xl transform group-hover:scale-105 transition-transform opacity-0 group-hover:opacity-100" />
                    <div className="relative">
                      <div className="text-4xl font-bold text-gradient">{stat.number}</div>
                      <div className="text-gray-600 mt-1">{stat.label}</div>
                      {stat.icon && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center animate-float">
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
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
                    <Leaf className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gradient">1,240 kg</div>
                    <div className="text-emerald-600">CO₂ saved today</div>
                  </div>
                </div>
              </div>

              {/* Additional Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-float delay-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600 animate-pulse" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gradient">4.9/5 Rating</div>
                    <div className="text-gray-500">10K+ Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <span className="text-emerald-600 font-medium text-sm uppercase tracking-wider">Powerful Features</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2 shine-text">Why Choose SavePlate?</h2>
            <p className="mt-4 text-gray-600 text-xl max-w-3xl mx-auto">Our platform connects food lovers with restaurants to reduce waste and save money</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <IndianRupee className="w-8 h-8" />,
                title: "Save Up to 70%",
                description: "Get restaurant-quality food at a fraction of the original price",
                color: "bg-emerald-500",
                gradient: "from-emerald-500/10 to-emerald-500/0",
                iconBg: "bg-emerald-100",
                iconColor: "text-emerald-600"
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Reduce Food Waste",
                description: "Help restaurants reduce waste while enjoying delicious meals",
                color: "bg-green-500",
                gradient: "from-green-500/10 to-green-500/0",
                iconBg: "bg-green-100",
                iconColor: "text-green-600"
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Local Restaurants",
                description: "Discover great deals from restaurants in your neighborhood",
                color: "bg-blue-500",
                gradient: "from-blue-500/10 to-blue-500/0",
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600"
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Quality Assured",
                description: "All food is fresh and meets our quality standards",
                color: "bg-purple-500",
                gradient: "from-purple-500/10 to-purple-500/0",
                iconBg: "bg-purple-100",
                iconColor: "text-purple-600"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community Impact",
                description: "Join a community of food rescuers making a difference",
                color: "bg-orange-500",
                gradient: "from-orange-500/10 to-orange-500/0",
                iconBg: "bg-orange-100",
                iconColor: "text-orange-600"
              },
              {
                icon: <Timer className="w-8 h-8" />,
                title: "Easy Pickup",
                description: "Quick and convenient pickup process at your chosen time",
                color: "bg-red-500",
                gradient: "from-red-500/10 to-red-500/0",
                iconBg: "bg-red-100",
                iconColor: "text-red-600"
              }
            ].map((feature, index) => (
              <div key={index} className="relative group hover-lift">
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 z-10 h-full gradient-border">
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
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <span className="text-emerald-600 font-medium text-sm uppercase tracking-wider">Simple Process</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2 shine-text">How SavePlate Works</h2>
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
            ].map((step, index) => (
              <div key={index} className="relative group hover-lift">
                {/* Connection Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-50 -translate-y-1/2 z-0" />
                )}
                
                {/* Card */}
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" 
                    style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}CC)` }}>
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 ${step.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={step.iconColor}>{step.icon}</div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>

                  {/* Decorative Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              </div>
            ))}
          </div>

          {/* App Screenshots */}
          <div className="mt-20 relative animate-fade-in-up delay-200">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-3xl transform -rotate-1"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold">Experience the SavePlate App</h3>
                  <p className="text-gray-600 text-lg">Our intuitive mobile app makes it easy to find and order surplus food from your favorite restaurants.</p>
                  <ul className="space-y-4">
                    {[
                      "Real-time deal notifications",
                      "Easy payment with UPI",
                      "Order tracking and history",
                      "Restaurant ratings and reviews"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setShowWaitlistForm(true)}
                    className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700"
                  >
                    <span>Download the app</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000"
                      alt="SavePlate App"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <IndianRupee className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="text-sm">
                        <div className="font-semibold text-emerald-700">Save 70%</div>
                        <div className="text-gray-500">On every order</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <span className="text-emerald-600 font-medium text-sm uppercase tracking-wider">Simple Pricing</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2 shine-text">Choose Your Plan</h2>
            <p className="mt-4 text-gray-600 text-xl max-w-3xl mx-auto">Join our waitlist today and be among the first to experience SavePlate</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Basic",
                price: "Free",
                description: "Perfect for food lovers who want to save money",
                features: [
                  "Browse and order surplus food",
                  "Basic notifications",
                  "Standard support",
                  "Community access"
                ],
                cta: "Join Waitlist",
                highlighted: false
              },
              {
                title: "VIP",
                price: "₹80/month",
                description: "For serious food rescuers who want premium features",
                features: [
                  "Early access to deals",
                  "Priority notifications",
                  "Premium support",
                  "Exclusive restaurant offers",
                  "Ad-free experience"
                ],
                cta: "Join VIP Waitlist",
                highlighted: true
              },
              {
                title: "Restaurant",
                price: "₹400/month",
                description: "For restaurants looking to reduce waste and increase revenue",
                features: [
                  "Post unlimited deals",
                  "Analytics dashboard",
                  "Customer insights",
                  "Priority listing",
                  "Dedicated support"
                ],
                cta: "Join Restaurant Waitlist",
                highlighted: false
              }
            ].map((plan, index) => (
              <div key={index} className={`relative rounded-3xl overflow-hidden ${plan.highlighted ? 'transform scale-105 shadow-2xl' : 'shadow-lg'}`}>
                {plan.highlighted && (
                  <div className="absolute top-0 right-0 bg-emerald-600 text-white px-4 py-1 rounded-bl-lg">
                    <span className="text-sm font-medium">Popular</span>
                  </div>
                )}
                <div className={`p-8 ${plan.highlighted ? 'bg-emerald-600 text-white' : 'bg-white'}`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && <span className="ml-1 text-gray-500">/month</span>}
                  </div>
                  <p className={`mb-6 ${plan.highlighted ? 'text-emerald-100' : 'text-gray-600'}`}>{plan.description}</p>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className={`w-5 h-5 ${plan.highlighted ? 'text-white' : 'text-emerald-600'} mt-1 mr-2 flex-shrink-0`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setShowWaitlistForm(true)}
                    className={`block w-full py-3 px-6 rounded-full text-center font-medium transition-all ${
                      plan.highlighted 
                        ? 'bg-white text-emerald-600 hover:bg-emerald-50' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <span className="text-emerald-600 font-medium text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2 shine-text">What Our Users Say</h2>
            <p className="mt-4 text-gray-600 text-xl max-w-3xl mx-auto">Join thousands of satisfied customers who are saving money and reducing food waste</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "SavePlate has completely changed how I eat out. I'm saving money while enjoying restaurant-quality food!",
                author: "Priya Sharma",
                role: "Student",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                quote: "As a restaurant owner, SavePlate has helped us reduce waste and increase revenue. It's a win-win for everyone!",
                author: "Rajesh Patel",
                role: "Restaurant Owner",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                quote: "I love the environmental impact. Every time I use SavePlate, I feel like I'm making a difference.",
                author: "Ananya Reddy",
                role: "Environmentalist",
                image: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="mt-6 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <span className="text-emerald-600 font-medium text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-2 shine-text">Frequently Asked Questions</h2>
            <p className="mt-4 text-gray-600 text-xl max-w-3xl mx-auto">Find answers to common questions about SavePlate</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How does SavePlate work?",
                answer: "SavePlate connects you with restaurants that have surplus food at the end of the day. You can browse available deals, place an order, and pick up your food at the specified time. This helps reduce food waste while allowing you to enjoy restaurant-quality food at a fraction of the original price."
              },
              {
                question: "Is the food fresh and safe to eat?",
                answer: "Yes, all food available on SavePlate is fresh and meets our quality standards. Restaurants only post deals for food that is still good to eat but would otherwise go to waste. We work with trusted restaurants that maintain high food safety standards."
              },
              {
                question: "How much can I save?",
                answer: "You can save up to 70% on restaurant food through SavePlate. The exact savings depend on the restaurant and the type of food, but most deals offer significant discounts compared to regular prices."
              },
              {
                question: "How do I pick up my order?",
                answer: "After placing an order, you'll receive a QR code that you can show to the restaurant when picking up your food. The app will provide you with the restaurant's location and pickup instructions."
              },
              {
                question: "Can restaurants join SavePlate?",
                answer: "Yes, restaurants can join SavePlate to reduce waste and increase revenue. We offer different plans for restaurants, including a premium plan with additional features like analytics and priority listing."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(16,185,129,0.1),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 shine-text">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Join thousands of food rescuers who are saving money and the planet, one meal at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowWaitlistForm(true)}
                className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all group text-lg shadow-glow hover:shadow-glow-hover transform hover:scale-105"
              >
              Join SavePlate Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setShowWaitlistForm(true)}
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 gradient-border hover:bg-emerald-50 transition-all group text-lg"
              >
                Register Your Restaurant
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
      </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-green-900/20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-2xl mb-4 text-emerald-400">SavePlate</div>
              <p className="text-gray-400">Making food rescue easy and rewarding.</p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">About</Link>
                <Link href="/careers" className="block text-gray-400 hover:text-white transition-colors">Careers</Link>
                <Link href="/press" className="block text-gray-400 hover:text-white transition-colors">Press</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy</Link>
                <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors">Terms</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Contact</h4>
              <div className="space-y-2">
                <Link href="/support" className="block text-gray-400 hover:text-white transition-colors">Support</Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact Us</Link>
                <div className="flex items-center text-gray-400 mt-4">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>hello@saveplate.in</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            © 2024 SavePlate India. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Waitlist Form Modal */}
      {showWaitlistForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <WaitlistForm onClose={() => setShowWaitlistForm(false)} />
        </div>
      )}
    </div>
  );
}
