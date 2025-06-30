'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Users } from 'lucide-react';
import { toast } from 'sonner';

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

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

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

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-2">How does the AI negotiation work?</h3>
              <p className="text-gray-400">
                Our AI uses advanced natural language processing and proven negotiation tactics to communicate with sellers and secure better prices for you.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">Is my payment information secure?</h3>
              <p className="text-gray-400">
                Yes, all payments are processed through secure, encrypted channels and we never store your payment details.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-400">
                Absolutely! You can cancel your subscription at any time with no cancellation fees or penalties.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">What are NFT receipts?</h3>
              <p className="text-gray-400">
                Your purchase receipts are minted as NFTs on the blockchain, providing immutable proof of your savings and transactions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}