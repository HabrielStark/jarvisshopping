import { useState, useCallback, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { createOrder, getUserOrders, Order } from '@/lib/supabase';

export interface LocalOrder {
  id: number;
  product: string;
  shop: string;
  originalPrice: number;
  finalPrice: number;
  saved: number;
  date: string;
  nftHash?: string;
}

export const useOrders = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<LocalOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalSaved: 0,
    dealsNegotiated: 0,
    avgDiscount: 0,
  });

  // Load orders from localStorage and Supabase
  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Load from localStorage for demo purposes
      const localOrders = JSON.parse(localStorage.getItem('jarvis-orders') || '[]');
      setOrders(localOrders);
      
      // If user is logged in, also load from Supabase
      if (user?.id) {
        try {
          const supabaseOrders = await getUserOrders(user.id);
          // Merge with local orders (in a real app, you'd sync these properly)
          console.log('Supabase orders:', supabaseOrders);
        } catch (error) {
          console.log('Supabase not configured yet:', error);
        }
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Calculate stats from orders
  useEffect(() => {
    if (orders.length > 0) {
      const totalSaved = orders.reduce((sum, order) => sum + order.saved, 0);
      const avgDiscount = orders.reduce((sum, order) => 
        sum + ((order.saved / order.originalPrice) * 100), 0) / orders.length;
      
      setStats({
        totalSaved,
        dealsNegotiated: orders.length,
        avgDiscount: Math.round(avgDiscount),
      });
    } else {
      setStats({ totalSaved: 0, dealsNegotiated: 0, avgDiscount: 0 });
    }
  }, [orders]);

  // Add new order
  const addOrder = useCallback(async (orderData: Omit<LocalOrder, 'id' | 'date'>) => {
    const newOrder: LocalOrder = {
      ...orderData,
      id: Date.now(),
      date: new Date().toISOString(),
      nftHash: `0x${Math.random().toString(16).substr(2, 40)}` // Mock NFT hash
    };

    // Save to localStorage
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('jarvis-orders', JSON.stringify(updatedOrders));

    // Save to Supabase if user is logged in
    if (user?.id) {
      try {
        await createOrder({
          user_id: user.id,
          product_name: orderData.product,
          shop: orderData.shop,
          original_price: orderData.originalPrice,
          final_price: orderData.finalPrice,
          saved_amount: orderData.saved,
          nft_hash: newOrder.nftHash,
          status: 'completed'
        });
      } catch (error) {
        console.log('Supabase not configured yet:', error);
      }
    }

    return newOrder;
  }, [orders, user?.id]);

  // Delete order
  const deleteOrder = useCallback((orderId: number) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem('jarvis-orders', JSON.stringify(updatedOrders));
  }, [orders]);

  // Load orders on mount and when user changes
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return {
    orders,
    stats,
    isLoading,
    addOrder,
    deleteOrder,
    refreshOrders: loadOrders
  };
}; 