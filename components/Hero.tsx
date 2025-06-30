'use client';

import { useState, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Play, Sparkles, TrendingDown, ShoppingBag, Smartphone, Laptop, Zap, Star, ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import VideoModal from './VideoModal';

const floatingItems = [
  { 
    icon: Laptop, 
    name: 'MacBook Pro', 
    price: '€2,399', 
    newPrice: '€2,109', 
    discount: '-12%', 
    delay: 0,
    gradient: 'from-blue-400 to-indigo-600',
    glow: 'shadow-blue-400/25'
  },
  { 
    icon: Smartphone, 
    name: 'iPhone 15 Pro', 
    price: '€1,299', 
    newPrice: '€1,149', 
    discount: '-12%', 
    delay: 0.5,
    gradient: 'from-purple-400 to-pink-600',
    glow: 'shadow-purple-400/25'
  },
  { 
    icon: ShoppingBag, 
    name: 'Designer Sneakers', 
    price: '€299', 
    newPrice: '€263', 
    discount: '-12%', 
    delay: 1,
    gradient: 'from-green-400 to-teal-600',
    glow: 'shadow-green-400/25'
  },
];

// Floating particles component
const FloatingParticle = ({ delay = 0, x = 0, y = 0 }: { delay?: number; x?: number; y?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [y, y - 100],
      x: [x, x + (Math.random() - 0.5) * 50]
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      delay: delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3
    }}
    className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
    style={{ left: x, top: y }}
  />
);

export default function Hero() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const backgroundX = useTransform(mouseX, [-1000, 1000], [-10, 10]);
  const backgroundY = useTransform(mouseY, [-1000, 1000], [-10, 10]);
  
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  }, [mouseX, mouseY]);

  const memoizedFloatingItems = useMemo(() => floatingItems, []);
  
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-slate-900/50 to-cyan-900/30"></div>
      
      {/* Animated Background Orbs */}
      <motion.div 
        style={{ x: backgroundX, y: backgroundY }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        style={{ x: backgroundX, y: backgroundY }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Floating Particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <FloatingParticle 
          key={i} 
          delay={i * 0.5} 
          x={Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)} 
          y={Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)}
        />
      ))}
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[length:50px_50px] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Enhanced Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "backOut" }}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-400/25 to-purple-500/25 backdrop-blur-xl rounded-full px-6 py-3 border border-cyan-400/40 shadow-2xl shadow-cyan-400/20 hover:shadow-cyan-400/40 transition-all duration-500 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400/30 to-purple-500/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/logo.png"
                  alt="Jarvis Logo"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              </div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </motion.div>
              <span className="text-sm font-semibold text-cyan-400 tracking-wide">AI-Powered Shopping</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
            </motion.div>
            
            {/* Massive Enhanced Title */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className="space-y-4"
            >
              <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight">
                <span className="block text-white">Your AI</span>
                <span className="block">
                  <span className="text-white">Shopping</span>
                </span>
                <motion.span 
                  className="block bg-gradient-to-r from-yellow-400 via-orange-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent bg-300% animate-gradient"
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  Negotiator
                </motion.span>
              </h1>
            </motion.div>
            
            {/* Enhanced Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-4"
            >
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <span className="text-cyan-400 font-semibold">Search</span>
                <span className="mx-2">·</span>
                <span className="text-purple-400 font-semibold">Haggle</span>
                <span className="mx-2">·</span>
                <span className="text-yellow-400 font-semibold">Save</span>
                <span className="text-gray-400"> — on autopilot.</span>
              </p>
              <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0">
                Let Jarvis negotiate the best deals while you sit back and save up to 
                <span className="text-green-400 font-bold"> 30%</span> on every purchase.
              </p>
            </motion.div>
            
            {/* Enhanced Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Link href="/demo" className="btn-primary inline-flex items-center justify-center space-x-3 text-lg font-semibold px-8 py-4 relative overflow-hidden">
                  <span className="relative z-10">Try Live Demo</span>
                  <motion.div
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendingDown className="w-6 h-6" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </Link>
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVideoModal(true)}
                className="btn-secondary inline-flex items-center justify-center space-x-3 text-lg font-semibold px-8 py-4 group"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="w-6 h-6" />
                </motion.div>
                <span>Watch 60-sec Video</span>
              </motion.button>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start space-x-6 pt-4"
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">5.0 rating</span>
              </div>
              <div className="h-4 w-px bg-gray-600" />
              <div className="text-sm text-gray-400">
                <span className="text-cyan-400 font-semibold">10K+</span> saved
              </div>
              <div className="h-4 w-px bg-gray-600" />
              <div className="text-sm text-gray-400">
                <span className="text-green-400 font-semibold">€2M+</span> total savings
              </div>
            </motion.div>
          </motion.div>
          
          {/* Enhanced Right Content - Beautifully Arranged Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative lg:h-[700px] w-full flex items-center justify-center"
          >
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 via-purple-500/15 to-pink-500/15 rounded-3xl blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/10 via-transparent to-green-400/10 rounded-3xl blur-2xl" />
            
            {/* Card Container with Perfect Positioning */}
            <div className="relative w-full max-w-2xl h-full">
              {memoizedFloatingItems.map((item, index) => {
                // Perfect positioning for each card
                const positions = [
                  // MacBook Pro - Top Left with elegant spacing
                  { 
                    className: 'top-4 left-8 lg:top-8 lg:left-4',
                    rotate: -2,
                    scale: 0.95
                  },
                  // iPhone 15 Pro - Top Right with perfect offset
                  { 
                    className: 'top-24 right-4 lg:top-16 lg:right-8',
                    rotate: 3,
                    scale: 1
                  },
                  // Designer Sneakers - Bottom Center with style
                  { 
                    className: 'bottom-12 left-1/2 transform -translate-x-1/2 lg:bottom-8',
                    rotate: -1,
                    scale: 0.98
                  }
                ];
                
                const position = positions[index];
                
                return (
                  <motion.div
                    key={index}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.3, 
                      y: 150, 
                      rotateX: -60,
                      rotateZ: position.rotate * 3
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: position.scale, 
                      y: [0, -15, 0],
                      rotateX: 0,
                      rotateZ: position.rotate
                    }}
                    transition={{ 
                      delay: 1.0 + (index * 0.3), 
                      duration: 1.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      y: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 4 + index,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }
                    }}
                    whileHover={{ 
                      scale: position.scale * 1.08, 
                      y: -20,
                      rotateY: 8,
                      rotateZ: position.rotate * 1.5,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    className={`absolute ultra-glass-card card-shine rounded-3xl p-5 w-80 lg:w-72 xl:w-80 border border-white/25 backdrop-blur-xl cursor-pointer group ${position.className} ${item.glow} shadow-2xl hover:shadow-3xl transition-all duration-700`}
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, rgba(6,182,212,0.08) 100%)`,
                      borderImage: `linear-gradient(135deg, ${item.gradient.replace('from-', 'rgba(').replace('to-', ', rgba(').replace('-400', ', 0.3)').replace('-600', ', 0.5)')}) 1`,
                    }}
                  >
                  {/* Enhanced Card Content */}
                  <div className="flex items-center space-x-4 relative z-10">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}
                      whileHover={{ rotate: 12 }}
                    >
                      <item.icon className="w-8 h-8 text-white drop-shadow-lg" />
                      {/* Icon background glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 blur-xl`} />
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <motion.h4 
                        className="font-black text-white text-xl mb-2 group-hover:text-cyan-300 transition-colors duration-300 leading-tight"
                        whileHover={{ scale: 1.02 }}
                      >
                        {item.name}
                      </motion.h4>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400 line-through font-semibold text-sm">
                          {item.price}
                        </span>
                        <motion.span 
                          className="text-2xl font-black text-cyan-400 drop-shadow-lg"
                          animate={{ 
                            scale: [1, 1.08, 1],
                            textShadow: [
                              "0 0 10px rgba(6, 182, 212, 0.3)",
                              "0 0 20px rgba(6, 182, 212, 0.6)",
                              "0 0 10px rgba(6, 182, 212, 0.3)"
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                        >
                          {item.newPrice}
                        </motion.span>
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ 
                        scale: [1, 1.15, 1],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.7 }}
                      className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-white text-lg font-black px-4 py-3 rounded-2xl shadow-xl shadow-green-400/30 border border-green-300/30"
                    >
                      {item.discount}
                    </motion.div>
                  </div>
                  
                  {/* Enhanced Decorative Elements */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-60 animate-pulse" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-40 animate-bounce" />
                  
                  {/* Enhanced Border Glow */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                </motion.div>
                );
              })}
              
              {/* Perfectly Positioned Central Success Bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotateX: -90 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ delay: 2.2, duration: 1.2, ease: "backOut" }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 8,
                  transition: { duration: 0.3 }
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <div className="ultra-glass-card rounded-3xl p-8 w-64 text-center border-2 border-green-400/40 shadow-2xl shadow-green-400/25 hover:shadow-green-400/50 transition-all duration-500 group cursor-pointer relative overflow-hidden">
                  {/* Background gradient animation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-emerald-500/10 to-teal-500/10 animate-gradient-shift" />
                  
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl relative z-10"
                  >
                    <Zap className="w-6 h-6 text-white drop-shadow-lg" />
                  </motion.div>
                  
                  <div className="text-green-400 font-black text-sm mb-3 tracking-wider uppercase relative z-10">
                    Price Reduced!
                  </div>
                  
                  <motion.div 
                    className="text-5xl font-black bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent mb-3 relative z-10"
                    animate={{ 
                      scale: [1, 1.15, 1],
                      filter: [
                        "brightness(1)",
                        "brightness(1.2)",
                        "brightness(1)"
                      ]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    -12%
                  </motion.div>
                  
                  <div className="text-sm text-gray-300 font-semibold mb-3 relative z-10">
                    Negotiation complete
                  </div>
                  
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-green-400 rounded-full mx-auto shadow-lg shadow-green-400/50 relative z-10"
                  />
                  
                  {/* Decorative corner elements */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-green-400 rounded-full opacity-60 animate-ping" />
                  <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-40 animate-bounce" />
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