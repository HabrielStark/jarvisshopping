'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, HelpCircle, Bot, Calendar, Coins } from 'lucide-react';
import Image from 'next/image';

const faqData = [
  {
    id: 1,
    question: "How does the AI negotiation work?",
    answer: "Our AI uses advanced natural language processing and proven negotiation tactics to communicate with sellers and secure better prices for you. It analyzes market data, price patterns, and seller behavior to find the optimal negotiation strategy.",
    icon: Bot,
    gradient: "from-cyan-400 to-blue-500"
  },
  {
    id: 2,
    question: "Is my payment information secure?",
    answer: "Yes, all payments are processed through secure, encrypted channels using industry-standard 256-bit SSL encryption. We never store your payment details on our servers and are fully PCI DSS compliant.",
    icon: Shield,
    gradient: "from-green-400 to-emerald-500"
  },
  {
    id: 3,
    question: "Can I cancel anytime?",
    answer: "Absolutely! You can cancel your subscription at any time with no cancellation fees or penalties. Your subscription will remain active until the end of your current billing period, and you'll retain access to all features.",
    icon: Calendar,
    gradient: "from-purple-400 to-pink-500"
  },
  {
    id: 4,
    question: "What are NFT receipts?",
    answer: "Your purchase receipts are minted as NFTs on the Algorand blockchain, providing immutable proof of your savings and transactions. These serve as digital certificates of your negotiation success and can be used for tax purposes or personal records.",
    icon: Coins,
    gradient: "from-orange-400 to-red-500"
  }
];

interface FAQProps {
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  className?: string;
}

export default function FAQ({ 
  title = "Frequently Asked Questions", 
  subtitle = "Everything you need to know about Jarvis AI shopping negotiation",
  showHeader = true,
  className = ""
}: FAQProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <section className={`relative py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-pink-900/10 rounded-3xl blur-3xl"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-orange-500/20 rounded-full blur-2xl"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <div className="glass border border-cyan-400/20 shadow-2xl shadow-cyan-400/10 rounded-3xl overflow-hidden">
          {/* Header */}
          {showHeader && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 pt-12 px-8"
            >
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full px-6 py-3 mb-6 border border-cyan-400/30">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Jarvis Logo"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <HelpCircle className="w-6 h-6 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-400">Got Questions?</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {subtitle}
              </p>
            </motion.div>
          )}
          
          {/* FAQ Grid */}
          <div className="grid md:grid-cols-2 gap-6 p-8">
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-500 cursor-pointer ${
                    openFAQ === faq.id ? 'ring-2 ring-cyan-400/30 shadow-2xl shadow-cyan-400/20' : ''
                  }`}
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${faq.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative p-6">
                    {/* Question Header */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${faq.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <faq.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                          {faq.question}
                        </h3>
                      </div>
                      
                      <div
                        className={`text-gray-400 group-hover:text-cyan-400 transition-all duration-300 transform ${
                          openFAQ === faq.id ? 'rotate-180' : 'rotate-0'
                        }`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                    
                    {/* Answer */}
                    <AnimatePresence>
                      {openFAQ === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            exit={{ y: -10 }}
                            className="pt-4 border-t border-gray-700/50"
                          >
                            <p className="text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Shine Effect */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </motion.div>
            ))}
          </div>
          
          
        </div>
      </div>
    </section>
  );
} 