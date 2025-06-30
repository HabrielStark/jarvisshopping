'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Sparkles, TrendingDown, ShoppingBag, Smartphone, Laptop } from 'lucide-react';
import VideoModal from './VideoModal';

const floatingItems = [
  { icon: Laptop, name: 'MacBook Pro', price: '€2,399', newPrice: '€2,109', discount: '-12%', delay: 0 },
  { icon: Smartphone, name: 'iPhone 15 Pro', price: '€1,299', newPrice: '€1,149', discount: '-12%', delay: 0.5 },
  { icon: ShoppingBag, name: 'Designer Sneakers', price: '€299', newPrice: '€263', discount: '-12%', delay: 1 },
];

export default function Hero() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">AI-Powered Shopping</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Your AI Shopping{' '}
              <span className="text-gradient">Negotiator</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Search · Haggle · Save — on autopilot. Let Jarvis negotiate the best deals while you sit back and save up to 30% on every purchase.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/demo" className="btn-primary inline-flex items-center justify-center space-x-2">
                <span>Try Live Demo</span>
                <TrendingDown className="w-5 h-5" />
              </Link>
              
              <button 
                onClick={() => setShowVideoModal(true)}
                className="btn-secondary inline-flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Watch 60-sec Video</span>
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right Content - Animated Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full h-96 flex items-center justify-center">
              {floatingItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                  }}
                  transition={{ 
                    delay: 1 + item.delay, 
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 3
                  }}
                  className={`absolute glass-card w-64 ${
                    index === 0 ? 'top-0 left-0' :
                    index === 1 ? 'top-16 right-0' :
                    'bottom-0 left-1/2 transform -translate-x-1/2'
                  }`}
                  style={{
                    animationDelay: `${item.delay}s`
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{item.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400 line-through">{item.price}</span>
                        <span className="text-sm font-semibold text-cyan-400">{item.newPrice}</span>
                      </div>
                    </div>
                    <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded-full">
                      {item.discount}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {/* Chat Bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.6 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="glass rounded-2xl p-4 max-w-48 text-center">
                  <div className="text-green-400 font-semibold text-sm mb-1">Price Reduced!</div>
                  <div className="text-2xl font-bold text-gradient">-12%</div>
                  <div className="text-xs text-gray-400 mt-1">Negotiation complete</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <VideoModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} />
    </section>
  );
}