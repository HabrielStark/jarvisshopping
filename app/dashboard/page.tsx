'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Percent, ExternalLink, Play, Volume2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Order {
  id: number;
  product: string;
  shop: string;
  originalPrice: number;
  finalPrice: number;
  saved: number;
  date: string;
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalSaved: 0,
    dealsNegotiated: 0,
    avgDiscount: 0,
  });

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('jarvis-orders') || '[]');
    setOrders(savedOrders);

    // Calculate stats
    if (savedOrders.length > 0) {
      const totalSaved = savedOrders.reduce((sum: number, order: Order) => sum + order.saved, 0);
      const avgDiscount = savedOrders.reduce((sum: number, order: Order) => 
        sum + ((order.saved / order.originalPrice) * 100), 0) / savedOrders.length;
      
      setStats({
        totalSaved,
        dealsNegotiated: savedOrders.length,
        avgDiscount: Math.round(avgDiscount),
      });
    }
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="glass-card text-center group hover:scale-105 transition-all duration-300">
      <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-gray-400">{title}</div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-12">
          <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-cyan-400/30 shadow-2xl shadow-cyan-400/20">
              <Image
                src="/logo.png"
                alt="Jarvis Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Your <span className="text-gradient">Dashboard</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 text-center lg:text-left">
            Track your savings and negotiation history with Jarvis AI.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <StatCard
            title="Total Saved"
            value={`€${stats.totalSaved}`}
            icon={TrendingUp}
            color="from-green-400 to-emerald-500"
          />
          <StatCard
            title="Deals Negotiated"
            value={stats.dealsNegotiated}
            icon={ShoppingBag}
            color="from-blue-400 to-cyan-500"
          />
          <StatCard
            title="Avg Discount"
            value={`${stats.avgDiscount}%`}
            icon={Percent}
            color="from-purple-400 to-pink-500"
          />
        </div>

        {/* Orders Table */}
        <div className="glass-card">
          <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
          
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No orders yet</p>
              <Link href="/demo" className="btn-primary">
                Try Demo
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-gray-400 font-medium">Date</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Product</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Shop</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Paid</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Saved</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Media</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 text-gray-300">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-white font-medium">
                        {order.product}
                      </td>
                      <td className="py-4 text-gray-300">
                        {order.shop}
                      </td>
                      <td className="py-4 text-cyan-400 font-semibold">
                        €{order.finalPrice}
                      </td>
                      <td className="py-4 text-green-400 font-semibold">
                        €{order.saved}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors">
                            <Play className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* NFT Section (Mock) */}
        {orders.length > 0 && (
          <div className="mt-8 glass-card">
            <h2 className="text-2xl font-bold mb-4">NFT Receipts</h2>
            <p className="text-gray-400 mb-4">
              Your purchase receipts are minted as NFTs on the Algorand blockchain for proof of savings.
            </p>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Transaction Hash:</span>
                <button className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center space-x-1">
                  <span>View on Explorer</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 font-mono text-xs text-gray-500 break-all">
                0x8b3a7b2c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}