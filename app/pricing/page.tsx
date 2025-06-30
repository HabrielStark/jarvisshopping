'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Crown, Users, ChevronDown, Shield, CreditCard, X, Gift, HelpCircle, Bot, Lock, Calendar, Coins } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    icon: Zap,
    features: [
      '3 searches per day',
      '1 negotiation per day',
      'Basic video report',
      'Email support',
    ],
    limitations: ['Limited AI negotiations', 'No auto-checkout', 'No NFT receipts'],
    popular: false,
  },
  {
    name: 'Pro',
    price: 7,
    period: 'month',
    icon: Crown,
    features: [
      'Unlimited searches',
      'Unlimited negotiations',
      'Auto-checkout',
      'Voice + video reports',
      'NFT receipt minting',
      'Priority support',
      'Advanced AI models',
    ],
    limitations: [],
    popular: true,
  },
  {
    name: 'Team',
    price: 15,
    period: 'user/month',
    icon: Users,
    features: [
      'Everything in Pro',
      'Shared team wallet',
      'Analytics API access',
      'Team management',
      'Bulk negotiations',
      'Custom integrations',
      'Dedicated support',
    ],
    limitations: [],
    popular: false,
  },
];

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

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handlePurchase = (planName: string) => {
    // Mock RevenueCat integration
    toast.success(`${planName} subscription activated!`, {
      description: 'Welcome to Jarvis Pro features.',
    });
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Choose Your <span className="text-gradient">Plan</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Start saving money today with our AI-powered negotiation platform. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-800/50 rounded-xl p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-300 text-gray-900 font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-300 text-gray-900 font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`glass-card relative ${
                plan.popular ? 'ring-2 ring-cyan-400/50 scale-105' : ''
              } hover:scale-105 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-400 to-teal-300 text-gray-900 text-sm font-bold px-4 py-2 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${
                  plan.name === 'Free' ? 'from-gray-400 to-gray-600' :
                  plan.name === 'Pro' ? 'from-cyan-400 to-purple-500' :
                  'from-purple-500 to-pink-500'
                } rounded-2xl flex items-center justify-center`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    €{billingCycle === 'yearly' && plan.price > 0 
                      ? Math.round(plan.price * 0.8) 
                      : plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-400">
                      /{billingCycle === 'yearly' ? 'year' : plan.period}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-semibold text-white mb-4">Features:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePurchase(plan.name)}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {plan.name === 'Free' ? 'Get Started' : `Choose ${plan.name}`}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Enhanced FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-pink-900/10 rounded-3xl blur-3xl"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-orange-500/20 rounded-full blur-2xl"></div>
          
          <div className="relative glass-card border border-cyan-400/20 shadow-2xl shadow-cyan-400/10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center mb-12"
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
                  Frequently Asked Questions
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Everything you need to know about Jarvis AI shopping negotiation
              </p>
            </motion.div>
            
            {/* FAQ Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {faqData.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-500 cursor-pointer ${
                      openFAQ === faq.id ? 'ring-2 ring-cyan-400/30 shadow-2xl shadow-cyan-400/20' : ''
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${faq.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative p-6">
                      {/* Question Header */}
                      <div className="flex items-start space-x-4 mb-4">
                        <motion.div 
                          className={`w-12 h-12 bg-gradient-to-br ${faq.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <faq.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                            {faq.question}
                          </h3>
                        </div>
                        
                        <motion.div
                          animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
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
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            
          </div>
        </motion.div>
      </div>
    </div>
  );
}