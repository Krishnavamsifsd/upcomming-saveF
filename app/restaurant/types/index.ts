export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  tableNumber?: number;
  customerName: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
  specialInstructions?: string;
  pickupTime?: string;
  qrCode?: string;
  isFlashSale?: boolean;
}

export interface DashboardStats {
  todayOrders: number;
  todayRevenue: number;
  ordersTrend: number;
  revenueTrend: number;
  pendingOrders: number;
  avgPreparationTime: number;
  flashSalesActive: number;
  totalDealsPosted: number;
  dealsSold: number;
  totalEarnings: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'snacks' | 'meals' | 'catering';
  image?: string;
  isAvailable: boolean;
  quantity?: number;
  flashSalePrice?: number;
  flashSaleEndTime?: string;
}

export interface VendorProfile {
  id: string;
  name: string;
  phone: string;
  address: string;
  isPremium: boolean;
  rating: number;
  totalDeals: number;
  totalEarnings: number;
  businessHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  categories: string[];
  isVerified: boolean;
} 