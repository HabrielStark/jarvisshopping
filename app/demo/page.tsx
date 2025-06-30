'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageSquare, CheckCircle, ShoppingCart, Bot, User, Play, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

const products = [
  { id: 'p1', name: 'iPhone 15 Pro 256GB', oldPrice: 1299, newPrice: 1149, img: '/img/iphone.png', shop: 'Amazon' },
  { id: 'p2', name: 'MacBook Air M3', oldPrice: 1499, newPrice: 1379, img: '/img/macbook.png', shop: 'MediaMarkt' },
  { id: 'p3', name: 'Sony WH-1000XM5', oldPrice: 399, newPrice: 319, img: '/img/sony.png', shop: 'eBay' },
  { id: 'p4', name: 'Samsung 4K Monitor', oldPrice: 599, newPrice: 479, img: '/img/monitor.png', shop: 'Best Buy' },
  { id: 'p5', name: 'iPad Pro 11"', oldPrice: 899, newPrice: 749, img: '/img/ipad.png', shop: 'Apple Store' },
];

const chatFlow = [
  { sender: 'seller', text: 'Hi! Listed price €399 for the Sony WH-1000XM5.' },
  { sender: 'jarvis', text: 'Could you do €330? I see similar listings for less.' },
  { sender: 'seller', text: 'I can discount to €349, that\'s my best offer.' },
  { sender: 'jarvis', text: 'How about €319 if I add free shipping?' },
  { sender: 'seller', text: 'Deal! €319 with free shipping included.' },
];

export default function DemoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<typeof chatFlow>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleProductSelect = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setShowResults(false);
    setSearchQuery(product.name);
  };

  const startNegotiation = () => {
    setShowChat(true);
    setIsNegotiating(true);
    setChatMessages([]);
    setCurrentMessageIndex(0);
  };

  useEffect(() => {
    if (isNegotiating && currentMessageIndex < chatFlow.length) {
      const timer = setTimeout(() => {
        setChatMessages(prev => [...prev, chatFlow[currentMessageIndex]]);
        setCurrentMessageIndex(prev => prev + 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (currentMessageIndex >= chatFlow.length && isNegotiating) {
      setIsNegotiating(false);
      setTimeout(() => {
        setShowCheckout(true);
      }, 1000);
    }
  }, [currentMessageIndex, isNegotiating]);

  const handleAcceptPrice = () => {
    setShowCheckout(false);
    setShowSuccess(true);
    
    // Save to localStorage
    const order = {
      id: Date.now(),
      product: selectedProduct?.name,
      shop: selectedProduct?.shop,
      originalPrice: selectedProduct?.oldPrice,
      finalPrice: selectedProduct?.newPrice,
      saved: selectedProduct ? selectedProduct.oldPrice - selectedProduct.newPrice : 0,
      date: new Date().toISOString(),
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('jarvis-orders') || '[]');
    localStorage.setItem('jarvis-orders', JSON.stringify([...existingOrders, order]));
    
    setTimeout(() => {
      toast.success('Order saved to dashboard!');
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Try <span className="text-gradient">Jarvis</span> Live Demo
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of AI-driven negotiations. Search for a product and watch Jarvis secure the best deal for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Search & Results */}
          <div className="lg:col-span-2">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card mb-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for any product..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded-lg"
                />
              </div>
              
              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 space-y-2"
                  >
                    {filteredProducts.slice(0, 5).map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductSelect(product)}
                        className="w-full p-3 text-left rounded-lg hover:bg-white/5 transition-colors flex items-center space-x-3"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium">{product.name}</div>
                          <div className="text-sm text-gray-400">{product.shop}</div>
                        </div>
                        <div className="text-cyan-400 font-semibold">€{product.newPrice}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Selected Product */}
            {selectedProduct && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card mb-8"
              >
                <h3 className="text-xl font-semibold mb-4">Selected Product</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{selectedProduct.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-400 line-through">€{selectedProduct.oldPrice}</span>
                      <span className="text-lg font-semibold text-cyan-400">€{selectedProduct.newPrice}</span>
                      <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded-full">
                        -{Math.round(((selectedProduct.oldPrice - selectedProduct.newPrice) / selectedProduct.oldPrice) * 100)}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">{selectedProduct.shop}</div>
                  </div>
                  <button
                    onClick={startNegotiation}
                    disabled={showChat}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {showChat ? 'Negotiating...' : 'Negotiate'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Chat */}
          <div className="lg:col-span-1">
            <AnimatePresence>
              {showChat && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass-card sticky top-24"
                >
                  <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-white/10">
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-semibold">Live Negotiation</h3>
                    {isNegotiating && <div className="spinner ml-auto"></div>}
                  </div>
                  
                  <div className="h-64 overflow-y-auto mb-4">
                    <AnimatePresence>
                      {chatMessages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`chat-message ${message.sender}`}
                        >
                          <div className="flex items-start space-x-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              message.sender === 'jarvis' 
                                ? 'bg-gradient-to-br from-cyan-400 to-teal-300' 
                                : 'bg-gray-600'
                            }`}>
                              {message.sender === 'jarvis' ? 
                                <Bot className="w-4 h-4 text-white" /> : 
                                <User className="w-4 h-4 text-white" />
                              }
                            </div>
                            <div className="flex-1">
                              <div className="text-xs text-gray-400 mb-1">
                                {message.sender === 'jarvis' ? 'Jarvis AI' : 'Seller'}
                              </div>
                              <div className="text-sm">{message.text}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {showCheckout && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-t border-white/10 pt-4"
                    >
                      <div className="text-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-sm text-green-400 font-semibold">Negotiation Complete!</p>
                        <p className="text-lg font-bold text-white">Final Price: €{selectedProduct?.newPrice}</p>
                      </div>
                      <button
                        onClick={handleAcceptPrice}
                        className="btn-primary w-full"
                      >
                        Accept Price €{selectedProduct?.newPrice}
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative glass rounded-2xl p-8 max-w-md w-full text-center"
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Order Complete!</h3>
                <p className="text-gray-300 mb-6">
                  Your order has been processed successfully. You saved €{selectedProduct ? selectedProduct.oldPrice - selectedProduct.newPrice : 0}!
                </p>
                
                {/* Media Placeholder */}
                <div className="mb-6 space-y-4">
                  <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
                    <Play className="w-6 h-6 text-cyan-400" />
                    <span className="text-sm">demo.mp4 - Negotiation Recording</span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
                    <Volume2 className="w-6 h-6 text-purple-400" />
                    <span className="text-sm">demo.mp3 - Audio Summary</span>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    setShowChat(false);
                    setSelectedProduct(null);
                    setSearchQuery('');
                    setChatMessages([]);
                    setCurrentMessageIndex(0);
                  }}
                  className="btn-primary w-full"
                >
                  Save & Continue
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}