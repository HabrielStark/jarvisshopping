'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const deals = [
  {
    id: 1,
    name: 'iPhone 15 Pro 256GB',
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    oldPrice: 1299,
    newPrice: 1149,
    discount: 12,
    shop: 'Amazon',
    timeLeft: '2h 15m',
  },
  {
    id: 2,
    name: 'MacBook Air M3',
    image: 'https://images.pexels.com/photos/18105/pexels-photo-18105.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    oldPrice: 1499,
    newPrice: 1379,
    discount: 8,
    shop: 'MediaMarkt',
    timeLeft: '1h 45m',
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    oldPrice: 399,
    newPrice: 319,
    discount: 20,
    shop: 'eBay',
    timeLeft: '3h 30m',
  },
  {
    id: 4,
    name: 'Samsung 4K Monitor',
    image: 'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    oldPrice: 599,
    newPrice: 479,
    discount: 20,
    shop: 'Best Buy',
    timeLeft: '4h 20m',
  },
  {
    id: 5,
    name: 'iPad Pro 11"',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    oldPrice: 899,
    newPrice: 749,
    discount: 17,
    shop: 'Apple Store',
    timeLeft: '5h 10m',
  },
];

export default function LiveDeals() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleDeals, setVisibleDeals] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % deals.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleDeals(1);
      } else if (window.innerWidth < 1024) {
        setVisibleDeals(2);
      } else {
        setVisibleDeals(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getVisibleDeals = () => {
    const result = [];
    for (let i = 0; i < visibleDeals; i++) {
      result.push(deals[(currentIndex + i) % deals.length]);
    }
    return result;
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Live <span className="text-gradient">Deals</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See real-time negotiations happening right now. These are actual deals our AI is securing for users.
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {getVisibleDeals().map((deal, index) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="deal-card group"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                          <TrendingDown className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-sm">{deal.name}</p>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-green-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{deal.discount}%
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      {deal.timeLeft} left
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {deal.name}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-cyan-400">€{deal.newPrice}</span>
                        <span className="text-sm text-gray-400 line-through">€{deal.oldPrice}</span>
                      </div>
                      <span className="text-xs text-gray-400">{deal.shop}</span>
                    </div>
                    
                    <div className="bg-green-500/20 text-green-400 text-center py-2 rounded-lg text-sm font-semibold">
                      €{deal.oldPrice - deal.newPrice} saved
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {deals.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-cyan-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}