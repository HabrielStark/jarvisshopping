'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageSquare, CheckCircle, ShoppingCart, Bot, User, Globe, Zap, X, Loader2, Star, Eye, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

// Predefined products with multiple price variants
const productDatabase = {
  'iPhone 15 Pro': [
    { id: 'iphone-1', name: 'iPhone 15 Pro 256GB', shop: 'Amazon', price: 1149, originalPrice: 1299, rating: 4.8, views: 2847 },
    { id: 'iphone-2', name: 'iPhone 15 Pro 256GB', shop: 'eBay', price: 1089, originalPrice: 1299, rating: 4.6, views: 1943 },
    { id: 'iphone-3', name: 'iPhone 15 Pro 256GB', shop: 'MediaMarkt', price: 1199, originalPrice: 1299, rating: 4.9, views: 3156 },
    { id: 'iphone-4', name: 'iPhone 15 Pro 256GB', shop: 'BestBuy', price: 1129, originalPrice: 1299, rating: 4.7, views: 2234 },
  ],
  'MacBook Air M3': [
    { id: 'macbook-1', name: 'MacBook Air M3 13"', shop: 'Amazon', price: 1379, originalPrice: 1499, rating: 4.9, views: 1823 },
    { id: 'macbook-2', name: 'MacBook Air M3 13"', shop: 'eBay', price: 1299, originalPrice: 1499, rating: 4.5, views: 978 },
    { id: 'macbook-3', name: 'MacBook Air M3 13"', shop: 'MediaMarkt', price: 1429, originalPrice: 1499, rating: 4.8, views: 1456 },
  ],
  'Sony WH-1000XM5': [
    { id: 'sony-1', name: 'Sony WH-1000XM5 Headphones', shop: 'Amazon', price: 319, originalPrice: 399, rating: 4.8, views: 5643 },
    { id: 'sony-2', name: 'Sony WH-1000XM5 Headphones', shop: 'eBay', price: 289, originalPrice: 399, rating: 4.6, views: 2134 },
    { id: 'sony-3', name: 'Sony WH-1000XM5 Headphones', shop: 'BestBuy', price: 329, originalPrice: 399, rating: 4.7, views: 3245 },
  ],
  'Samsung 4K Monitor': [
    { id: 'monitor-1', name: 'Samsung 32" 4K Monitor', shop: 'Amazon', price: 479, originalPrice: 599, rating: 4.7, views: 1567 },
    { id: 'monitor-2', name: 'Samsung 32" 4K Monitor', shop: 'eBay', price: 429, originalPrice: 599, rating: 4.5, views: 876 },
    { id: 'monitor-3', name: 'Samsung 32" 4K Monitor', shop: 'BestBuy', price: 519, originalPrice: 599, rating: 4.8, views: 2143 },
  ],
  'iPad Pro 11"': [
    { id: 'ipad-1', name: 'iPad Pro 11" 256GB', shop: 'Amazon', price: 749, originalPrice: 899, rating: 4.8, views: 3456 },
    { id: 'ipad-2', name: 'iPad Pro 11" 256GB', shop: 'eBay', price: 689, originalPrice: 899, rating: 4.6, views: 1234 },
    { id: 'ipad-3', name: 'iPad Pro 11" 256GB', shop: 'MediaMarkt', price: 789, originalPrice: 899, rating: 4.9, views: 2567 },
  ]
};

// Search websites simulation
const searchWebsites = [
  'Amazon.com', 'eBay.com', 'MediaMarkt.de', 'BestBuy.com', 'Apple.com',
  'Samsung.com', 'Newegg.com', 'Walmart.com', 'Target.com', 'Costco.com'
];

// Chat flows for negotiations - множественные диалоги для всех продуктов
const chatFlowsDatabase = {
  'iphone-1': [
    { sender: 'seller', text: 'Hi! The iPhone 15 Pro 256GB is listed at €1149.' },
    { sender: 'jarvis', text: 'I found similar listings for €1089. Can you match that price?' },
    { sender: 'seller', text: 'I can go down to €1099, but that\'s my lowest.' },
    { sender: 'jarvis', text: 'How about €1075 and I buy it immediately?' },
    { sender: 'seller', text: 'Deal! €1075 for immediate purchase.' },
  ],
  'iphone-2': [
    { sender: 'seller', text: 'Hello! eBay listing for iPhone 15 Pro at €1089.' },
    { sender: 'jarvis', text: 'Amazon has it for €1149. Can you do €1050?' },
    { sender: 'seller', text: 'I can include a case and screen protector for €1060.' },
    { sender: 'jarvis', text: 'Perfect! €1045 with accessories?' },
    { sender: 'seller', text: 'Deal! €1045 with case and protector.' },
  ],
  'iphone-3': [
    { sender: 'seller', text: 'Hi! MediaMarkt has iPhone 15 Pro for €1199.' },
    { sender: 'jarvis', text: 'eBay has it for €1089. Any flexibility?' },
    { sender: 'seller', text: 'I can offer €1150 with extended warranty.' },
    { sender: 'jarvis', text: 'How about €1120 with warranty?' },
    { sender: 'seller', text: 'Agreed! €1120 with 2-year warranty.' },
  ],
  'iphone-4': [
    { sender: 'seller', text: 'BestBuy here! iPhone 15 Pro for €1129.' },
    { sender: 'jarvis', text: 'Found cheaper options. Can you do €1080?' },
    { sender: 'seller', text: 'With store pickup, I can do €1095.' },
    { sender: 'jarvis', text: 'Deal at €1085 with pickup?' },
    { sender: 'seller', text: 'Yes! €1085 with free store pickup.' },
  ],
  'macbook-1': [
    { sender: 'seller', text: 'Hi! MacBook Air M3 13" for €1379.' },
    { sender: 'jarvis', text: 'I found one for €1299 elsewhere. Can you beat that?' },
    { sender: 'seller', text: 'I can include a laptop sleeve and do €1329.' },
    { sender: 'jarvis', text: 'How about €1299 with the sleeve?' },
    { sender: 'seller', text: 'Deal! €1299 with premium laptop sleeve.' },
  ],
  'macbook-2': [
    { sender: 'seller', text: 'eBay seller here! MacBook Air M3 for €1299.' },
    { sender: 'jarvis', text: 'That\'s a great price! Any discount for cash?' },
    { sender: 'seller', text: 'For immediate payment, €1275.' },
    { sender: 'jarvis', text: 'Perfect! €1275 cash payment confirmed.' },
    { sender: 'seller', text: 'Excellent! €1275 for immediate cash.' },
  ],
  'macbook-3': [
    { sender: 'seller', text: 'MediaMarkt here! MacBook Air M3 for €1429.' },
    { sender: 'jarvis', text: 'Others sell for €1299. Can you match?' },
    { sender: 'seller', text: 'With AppleCare+, I can do €1380.' },
    { sender: 'jarvis', text: 'How about €1350 with AppleCare?' },
    { sender: 'seller', text: 'Deal! €1350 with AppleCare+ included.' },
  ],
  'sony-1': [
    { sender: 'seller', text: 'Hi! Sony WH-1000XM5 headphones for €319.' },
    { sender: 'jarvis', text: 'I see similar ones for €289. Any wiggle room?' },
    { sender: 'seller', text: 'I can throw in a carrying case for €309.' },
    { sender: 'jarvis', text: 'Deal at €295 with the case?' },
    { sender: 'seller', text: 'You got it! €295 with premium case.' },
  ],
  'sony-2': [
    { sender: 'seller', text: 'eBay seller! Sony WH-1000XM5 for €289.' },
    { sender: 'jarvis', text: 'Excellent price! Is this genuine?' },
    { sender: 'seller', text: 'Yes, sealed box with receipt. €275 for quick sale.' },
    { sender: 'jarvis', text: 'Perfect! €275 confirmed.' },
    { sender: 'seller', text: 'Great! €275 with receipt included.' },
  ],
  'sony-3': [
    { sender: 'seller', text: 'BestBuy here! Sony WH-1000XM5 for €329.' },
    { sender: 'jarvis', text: 'Found them for €289 elsewhere. Can you match?' },
    { sender: 'seller', text: 'With extended return policy, €310.' },
    { sender: 'jarvis', text: 'How about €300 with extended returns?' },
    { sender: 'seller', text: 'Deal! €300 with 60-day returns.' },
  ],
  'monitor-1': [
    { sender: 'seller', text: 'Amazon here! Samsung 32" 4K Monitor for €479.' },
    { sender: 'jarvis', text: 'eBay has similar for €429. Can you match?' },
    { sender: 'seller', text: 'With free calibration service, €450.' },
    { sender: 'jarvis', text: 'Perfect! €445 with calibration?' },
    { sender: 'seller', text: 'Deal! €445 with professional calibration.' },
  ],
  'monitor-2': [
    { sender: 'seller', text: 'eBay seller! Samsung Monitor for €429.' },
    { sender: 'jarvis', text: 'Great price! Any additional accessories?' },
    { sender: 'seller', text: 'I can include HDMI cable for €420.' },
    { sender: 'jarvis', text: 'Perfect! €420 with cable confirmed.' },
    { sender: 'seller', text: 'Excellent! €420 with premium HDMI.' },
  ],
  'ipad-1': [
    { sender: 'seller', text: 'Amazon here! iPad Pro 11" 256GB for €749.' },
    { sender: 'jarvis', text: 'eBay has them for €689. Can you beat that?' },
    { sender: 'seller', text: 'With Apple Pencil included, €720.' },
    { sender: 'jarvis', text: 'How about €700 with the Pencil?' },
    { sender: 'seller', text: 'Deal! €700 with Apple Pencil included.' },
  ],
  'ipad-2': [
    { sender: 'seller', text: 'eBay seller! iPad Pro for €689.' },
    { sender: 'jarvis', text: 'Excellent price! Is the condition perfect?' },
    { sender: 'seller', text: 'Brand new, sealed. €670 for quick sale.' },
    { sender: 'jarvis', text: 'Perfect! €670 confirmed.' },
    { sender: 'seller', text: 'Great! €670 for sealed iPad Pro.' },
  ]
};

type ProductType = {
  id: string;
  name: string;
  shop: string;
  price: number;
  originalPrice: number;
  rating: number;
  views: number;
};

export default function DemoPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState(0);
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  
  // Modal states
  const [showNegotiationModal, setShowNegotiationModal] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{sender: string, text: string}>>([]);
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [negotiationComplete, setNegotiationComplete] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);

  // Search simulation function
  const simulateSearch = useCallback(async (query: string) => {
    setIsSearching(true);
    setSearchStep(0);
    setShowResults(false);
    
    // Step 1: Show searching animation through websites
    for (let i = 0; i < searchWebsites.length; i++) {
      setSearchStep(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Step 2: Processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Step 3: Find matching products
    const matchingProducts: ProductType[] = [];
    Object.entries(productDatabase).forEach(([key, products]) => {
      if (key.toLowerCase().includes(query.toLowerCase()) || 
          products[0].name.toLowerCase().includes(query.toLowerCase())) {
        matchingProducts.push(...products);
      }
    });
    
    // Sort by price (best deals first)
    matchingProducts.sort((a, b) => a.price - b.price);
    
    setSearchResults(matchingProducts.slice(0, 5));
    setIsSearching(false);
    setShowResults(true);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      simulateSearch(query);
    } else {
      setShowResults(false);
      setIsSearching(false);
    }
  };

  const startNegotiation = (product: ProductType) => {
    setSelectedProduct(product);
    setShowNegotiationModal(true);
    setChatMessages([]);
    setIsNegotiating(true);
    setNegotiationComplete(false);
    
    // Get chat flow and start animation
    let flow = chatFlowsDatabase[product.id as keyof typeof chatFlowsDatabase];
    
    // Fallback: создаём generic диалог если нет в базе
    if (!flow) {
      const discount = Math.floor(Math.random() * 150) + 50; // 50-200 скидка
      const originalPrice = product.originalPrice;
      const currentPrice = product.price;
      const negotiatedPrice = currentPrice - discount;
      
      flow = [
        { sender: 'seller', text: `Hi! ${product.name} is available for €${currentPrice} at ${product.shop}.` },
        { sender: 'jarvis', text: `I found similar products for less. Can you do €${negotiatedPrice + 30}?` },
        { sender: 'seller', text: `That's quite low... I can go down to €${negotiatedPrice + 15}.` },
        { sender: 'jarvis', text: `How about €${negotiatedPrice} and I buy it right now?` },
        { sender: 'seller', text: `Deal! €${negotiatedPrice} for immediate purchase.` },
      ];
    }
    
    setTimeout(() => {
      animateMessages(flow);
    }, 800); // Уменьшили с 1500ms до 800ms для быстрого старта
  };

  const animateMessages = (messages: Array<{sender: string, text: string}>) => {
    let index = 0;
    const addMessage = () => {
      if (index < messages.length) {
        setChatMessages(prev => [...prev, messages[index]]);
        index++;
        // Уменьшаем время между сообщениями: 800-1500ms вместо 2000-3500ms
        setTimeout(addMessage, 800 + Math.random() * 700);
      } else {
        setIsNegotiating(false);
        setNegotiationComplete(true);
        // Реалистичный торг: финальная цена 70-95% от исходной
        const basePrice = selectedProduct?.price ?? 1;
        const minPercent = 0.7; // минимум 70% от цены
        const maxPercent = 0.95; // максимум 95% от цены
        const percent = minPercent + Math.random() * (maxPercent - minPercent);
        const final = Math.round(basePrice * percent);
        setFinalPrice(final);
      }
    };
    addMessage();
  };

  const closeModal = () => {
    setShowNegotiationModal(false);
    setChatMessages([]);
    setSelectedProduct(null);
    setNegotiationComplete(false);
    setIsNegotiating(false);
  };

  const acceptDeal = () => {
    const order = {
      id: Date.now(),
      product: selectedProduct?.name,
      shop: selectedProduct?.shop,
      originalPrice: selectedProduct?.originalPrice,
      finalPrice: finalPrice,
      saved: selectedProduct ? selectedProduct.originalPrice - finalPrice : 0,
      date: new Date().toISOString(),
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('jarvis-orders') || '[]');
    localStorage.setItem('jarvis-orders', JSON.stringify([...existingOrders, order]));
    
    toast.success('Deal accepted! Order saved to dashboard.');
    closeModal();
    
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
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
           <div 
             className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full px-4 py-2 mb-6"
           >
             <Image src="/logo.png" alt="Jarvis" width={24} height={24} className="rounded-full" />
             <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
             >
               <Zap className="w-4 h-4 text-cyan-400" />
             </motion.div>
             <span className="text-cyan-400 font-semibold">Live Demo</span>
           </div>

           <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
             Try <span className="bg-gradient-to-r from-yellow-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
               Jarvis
             </span> AI Negotiator
          </h1>
           
           <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
             Watch our AI search across multiple websites, find the best deals, and negotiate prices automatically.
          </p>
        </motion.div>

                 {/* Demo Notice */}
         <div className="mb-8 text-center">
           <div className="bg-amber-500/20 border border-amber-500/40 rounded-lg p-4 max-w-4xl mx-auto">
             <div className="flex items-center justify-center space-x-2 mb-3">
               <span className="text-amber-400">⚠️</span>
               <span className="text-amber-400 font-semibold text-lg">DEMO MODE</span>
             </div>
             <p className="text-gray-300 mb-3">Try searching for these products:</p>
             <div className="flex flex-wrap justify-center gap-2 text-sm">
               {Object.keys(productDatabase).map((product) => (
                 <button
                   key={product}
                   onClick={() => handleSearch(product)}
                   className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors"
                 >
                   {product}
                 </button>
               ))}
             </div>
           </div>
         </div>

         {/* Search Section */}
         <div className="max-w-4xl mx-auto mb-12">
            {/* Search Bar */}
           <div className="glass-card mb-6 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
             <div className="relative flex items-center">
               <Search className="absolute left-4 w-5 h-5 text-gray-400 transition-colors duration-300 group-hover:text-cyan-400" />
                <input
                  type="text"
                 placeholder="Search for any product (iPhone, MacBook, Sony, etc.)..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                 disabled={isSearching}
                 className="w-full pl-12 pr-4 py-4 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded-lg transition-all duration-300 disabled:opacity-50"
               />
               
               {isSearching && (
                 <div className="absolute right-4">
                   <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                 </div>
               )}
             </div>
              </div>
              
           {/* Search Progress */}
              <AnimatePresence>
             {isSearching && (
                  <motion.div
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 className="glass-card mb-6 overflow-hidden"
               >
                 <div className="p-6">
                   <div className="flex items-center space-x-2 mb-4">
                     <Globe className="w-5 h-5 text-cyan-400 animate-spin" />
                     <span className="text-white font-semibold">Searching across websites...</span>
                   </div>
                   
                   <div className="space-y-2">
                     {searchWebsites.map((website, index) => (
                       <div
                         key={website}
                         className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 ${
                           index === searchStep ? 'bg-cyan-400/20' : ''
                         }`}
                       >
                         <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                           index < searchStep ? 'bg-green-400' : 
                           index === searchStep ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'
                         }`} />
                         <span className={`text-sm transition-colors duration-300 ${
                           index <= searchStep ? 'text-white' : 'text-gray-500'
                         }`}>
                           {website}
                         </span>
                         {index < searchStep && (
                           <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
                         )}
                         {index === searchStep && (
                           <Loader2 className="w-4 h-4 text-cyan-400 animate-spin ml-auto" />
                         )}
                       </div>
                     ))}
                        </div>
                        </div>
                  </motion.div>
                )}
              </AnimatePresence>

           {/* Search Results */}
           <AnimatePresence>
             {showResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 className="space-y-4"
               >
                 <div className="flex items-center space-x-2 mb-4">
                   <CheckCircle className="w-5 h-5 text-green-400" />
                   <span className="text-white font-semibold">Found {searchResults.length} deals</span>
                 </div>

                 {searchResults.map((product, index) => (
                   <div
                     key={product.id}
                     className="glass-card group hover:bg-white/5 transition-all duration-300 cursor-pointer"
                   >
                     <div className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                         <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <ShoppingCart className="w-8 h-8 text-white" />
                  </div>
                         
                         <div>
                           <h3 className="text-white font-semibold group-hover:text-cyan-300 transition-colors duration-300">
                             {product.name}
                           </h3>
                           <div className="flex items-center space-x-3 mt-1">
                             <span className="text-gray-400 text-sm">{product.shop}</span>
                             <div className="flex items-center space-x-1">
                               <Star className="w-4 h-4 text-yellow-400 fill-current" />
                               <span className="text-yellow-400 text-sm">{product.rating}</span>
                             </div>
                             <div className="flex items-center space-x-1">
                               <Eye className="w-4 h-4 text-gray-400" />
                               <span className="text-gray-400 text-sm">{product.views}</span>
                             </div>
                           </div>
                         </div>
                       </div>
                       
                       <div className="text-right">
                         <div className="flex items-center space-x-2">
                           <span className="text-gray-400 line-through text-sm">€{product.originalPrice}</span>
                           <span className="text-2xl font-bold text-cyan-400">€{product.price}</span>
                         </div>
                    <div className="flex items-center space-x-2 mt-1">
                           <TrendingDown className="w-4 h-4 text-green-400" />
                           <span className="text-green-400 text-sm font-semibold">
                             -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    </div>
                         
                  <button
                           onClick={(e) => {
                             e.stopPropagation();
                             startNegotiation(product);
                           }}
                           className="btn-primary mt-3 relative overflow-hidden group/btn hover:scale-105 transition-transform"
                         >
                           <span className="relative z-10">Negotiate on {product.shop}</span>
                  </button>
                </div>
                     </div>
                   </div>
                 ))}
              </motion.div>
            )}
           </AnimatePresence>
          </div>

         {/* Negotiation Modal */}
            <AnimatePresence>
           {showNegotiationModal && (
             <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
               <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />
               
                <motion.div
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0.8, opacity: 0 }}
                 className="relative glass rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
               >
                 {/* Modal Header */}
                 <div className="border-b border-white/10 p-6">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                       <MessageSquare className="w-6 h-6 text-cyan-400" />
                       <div>
                         <h3 className="text-xl font-bold text-white">AI Negotiation</h3>
                         <p className="text-gray-400 text-sm">{selectedProduct?.shop} • {selectedProduct?.name}</p>
                       </div>
                     </div>
                     
                     <div className="flex items-center space-x-3">
                       {isNegotiating && (
                         <div className="flex items-center space-x-2">
                           <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                           <span className="text-green-400 text-sm">Live</span>
                         </div>
                       )}
                       <button
                         onClick={closeModal}
                         className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                       >
                         <X className="w-5 h-5" />
                       </button>
                     </div>
                   </div>
                  </div>
                  
                 {/* Chat Messages */}
                 <div className="h-96 overflow-y-auto p-6 space-y-4">
                    <AnimatePresence>
                      {chatMessages
                        .filter((message) => message && typeof message.sender === 'string' && typeof message.text === 'string')
                        .map((message, index) => (
                        <motion.div
                          key={index}
                         initial={{ opacity: 0, y: 20, scale: 0.95 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         transition={{ duration: 0.4 }}
                         className={`flex ${message.sender === 'jarvis' ? 'justify-end' : 'justify-start'}`}
                       >
                         <div className={`flex items-start space-x-2 max-w-[80%] ${
                           message.sender === 'jarvis' ? 'flex-row-reverse space-x-reverse' : ''
                         }`}>
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
                           
                           <div className={`rounded-2xl p-4 ${
                             message.sender === 'jarvis'
                               ? 'bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-400/30'
                               : 'bg-white/10 border border-white/20'
                           }`}>
                              <div className="text-xs text-gray-400 mb-1">
                                {message.sender === 'jarvis' ? 'Jarvis AI' : 'Seller'}
                              </div>
                             <div className="text-white">{message.text}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                   
                   {isNegotiating && (
                     <div className="flex justify-center">
                       <div className="flex items-center space-x-2 text-gray-400">
                         <Loader2 className="w-4 h-4 animate-spin" />
                         <span className="text-sm">Jarvis is typing...</span>
                       </div>
                     </div>
                   )}
                  </div>

                 {/* Modal Footer */}
                 {negotiationComplete && (
                   <div className="border-t border-white/10 p-6">
                      <div className="text-center mb-4">
                       <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                       <h4 className="text-xl font-bold text-white mb-2">Negotiation Successful!</h4>
                       <div className="space-y-2">
                         <div className="flex items-center justify-center space-x-4">
                           <span className="text-gray-400">Original Price:</span>
                           <span className="text-gray-400 line-through">€{selectedProduct?.price}</span>
                         </div>
                         <div className="flex items-center justify-center space-x-4">
                           <span className="text-white font-semibold">Final Price:</span>
                           <span className="text-2xl font-bold text-green-400">€{finalPrice}</span>
                         </div>
                         <div className="text-sm text-green-400">
                           You saved €{selectedProduct ? selectedProduct.price - finalPrice : 0}!
                      </div>
          </div>
        </div>

                     <div className="flex space-x-3">
                       <button
                         onClick={closeModal}
                         className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                       >
                         Decline
                       </button>
                       <button
                         onClick={acceptDeal}
                         className="flex-1 btn-primary"
                       >
                         Accept Deal €{finalPrice}
                       </button>
                  </div>
                </div>
                 )}
              </motion.div>
             </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
