"use client"
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Clock, 
  ChefHat, 
  User,
  Bell,
  Menu as MenuIcon,
  X,
  ArrowUpRight,
  Filter,
  Utensils,
  Calendar,
  PieChart,
  LucideIcon,
  Zap,
  IndianRupee,
  Star,
  MapPin,
  Phone,
  Shield,
  Crown
} from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { OrderCard } from '../components/OrderCard';
import { Order, DashboardStats, MenuItem, VendorProfile } from '../types';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { OrderDetailsModal } from '../components/OrderDetailsModal';

// Sample data with Indian context
const sampleOrders: Order[] = [
  {
    id: 'ORD-001',
    items: [
      { id: '1', name: '5 Samosas', quantity: 1, price: 20 },
      { id: '2', name: 'Chutney', quantity: 1, price: 0 }
    ],
    customerName: 'Rahul Kumar',
    status: 'pending',
    total: 20,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    pickupTime: '7:00 PM',
    isFlashSale: true
  },
  {
    id: 'ORD-002',
    items: [
      { id: '3', name: 'Family Pack: 10 Rotis + Sabzi', quantity: 1, price: 75 }
    ],
    customerName: 'Priya Sharma',
    status: 'preparing',
    total: 75,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    pickupTime: '7:30 PM'
  },
  {
    id: 'ORD-003',
    items: [
      { id: '5', name: '3 Idlis', quantity: 1, price: 15 },
      { id: '6', name: 'Sambar', quantity: 1, price: 0 }
    ],
    customerName: 'Amit Patel',
    status: 'ready',
    total: 15,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    pickupTime: '8:00 PM',
    isFlashSale: true
  }
];

const sampleStats: DashboardStats = {
  todayOrders: 24,
  todayRevenue: 842.50,
  ordersTrend: 12.5,
  revenueTrend: 8.2,
  pendingOrders: 8,
  avgPreparationTime: 15,
  flashSalesActive: 2,
  totalDealsPosted: 5,
  dealsSold: 18,
  totalEarnings: 842.50
};

const sampleVendorProfile: VendorProfile = {
  id: 'VEND-001',
  name: 'Raju\'s Dhaba',
  phone: '+91 98765 43210',
  address: '123 Main Street, Bangalore',
  isPremium: true,
  rating: 4.8,
  totalDeals: 156,
  totalEarnings: 842.50,
  businessHours: {
    monday: { open: '10:00', close: '22:00' },
    tuesday: { open: '10:00', close: '22:00' },
    wednesday: { open: '10:00', close: '22:00' },
    thursday: { open: '10:00', close: '22:00' },
    friday: { open: '10:00', close: '22:00' },
    saturday: { open: '10:00', close: '22:00' },
    sunday: { open: '10:00', close: '22:00' }
  },
  categories: ['snacks', 'meals'],
  isVerified: true
};

export default function RestaurantDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'preparing' | 'ready'>('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(null);

  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    setTimeout(() => {
      setOrders(sampleOrders);
      setStats(sampleStats);
      setVendorProfile(sampleVendorProfile);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleFlashSale = async () => {
    try {
      // Implement flash sale logic
      toast.success('Flash sale started!');
    } catch (error) {
      toast.error('Failed to start flash sale');
    }
  };

  const handleStatusChange = async (orderId: string, status: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(prev => 
        prev.map(order => 
          order.id === orderId ? { ...order, status } : order
        )
      );

      toast.success('Order status updated');
    } catch (error) {
      toast.error('Failed to update order status');
      console.error(error);
    }
  };

  const filteredOrders = orders.filter(order => 
    activeTab === 'all' ? true : order.status === activeTab
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white fixed top-0 left-0 right-0 z-30 border-b">
        <div className="px-4 h-16 flex items-center justify-between">
         
          
          <div className="flex-1 px-4 lg:text-center">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-lg font-semibold text-gray-800">{vendorProfile?.name}</h1>
              {vendorProfile?.isVerified && (
                <Shield className="h-4 w-4 text-blue-500" />
              )}
              {vendorProfile?.isPremium && (
                <Crown className="h-4 w-4 text-yellow-500" />
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 px-4 pb-20">
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
          </div>
        ) : (
          <>
            {/* Vendor Profile Summary */}
            <div className="mt-6 bg-white rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="font-medium">{vendorProfile?.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{vendorProfile?.address}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Deals</p>
                  <p className="font-medium">{vendorProfile?.totalDeals}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Earnings</p>
                  <p className="font-medium flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {vendorProfile?.totalEarnings}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <StatsCard
                title="Today's Orders"
                value={stats?.todayOrders || 0}
                trend={stats?.ordersTrend}
                icon={<ShoppingBag className="h-6 w-6 text-emerald-600" />}
                colorClass="bg-emerald-100"
              />
              <StatsCard
                title="Today's Revenue"
                value={`₹${stats?.todayRevenue || 0}`}
                trend={stats?.revenueTrend}
                icon={<IndianRupee className="h-6 w-6 text-blue-600" />}
                colorClass="bg-blue-100"
              />
            </div>

            {/* Flash Sale Button */}
            <button
              onClick={handleFlashSale}
              className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              <Zap className="h-5 w-5" />
              <span>Start Flash Sale</span>
            </button>

            {/* Order Filters */}
            <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
              {['all', 'pending', 'preparing', 'ready'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab !== 'all' && (
                    <span className="ml-2 text-xs">
                      {orders.filter(order => order.status === tab).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Orders List */}
            <section className="mt-6">
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onStatusChange={handleStatusChange}
                    onViewDetails={setSelectedOrder}
                  />
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="mt-8 mb-20">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <QuickActionButton
                  icon={<ChefHat className="h-6 w-6" />}
                  title="Post New Deal"
                  subtitle="Create a surplus deal"
                  onClick={() => router.push('/restaurant/deals/new')}
                />
                <QuickActionButton
                  icon={<Clock className="h-6 w-6" />}
                  title="Business Hours"
                  subtitle="Set availability"
                  onClick={() => router.push('/restaurant/settings/hours')}
                />
              </div>
            </section>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-30">
        <div className="flex justify-around items-center h-16">
          <NavButton
            icon={<ShoppingBag />}
            label="Orders"
            isActive={true}
          />
          <NavButton
            icon={<PieChart />}
            label="Analytics"
            onClick={() => router.push('/restaurant/analytics')}
          />
          <NavButton
            icon={<Utensils />}
            label="Menu"
            onClick={() => router.push('/restaurant/menu')}
          />
          <NavButton
            icon={<User />}
            label="Profile"
            onClick={() => router.push('/profile')}
          />
        </div>
      </nav>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

interface QuickActionButtonProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}

function QuickActionButton({ icon, title, subtitle, onClick }: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 hover:border-emerald-500 hover:shadow-md transition-all"
    >
      <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
        {icon}
      </div>
      <div className="text-left">
        <h3 className="font-medium">{title}</h3>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </button>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavButton({ icon, label, isActive = false, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center flex-1 h-full ${
        isActive ? 'text-emerald-600' : 'text-gray-500'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
} 