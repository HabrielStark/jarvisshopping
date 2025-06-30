'use client';

import { motion } from 'framer-motion';
import { Search, MessageSquare, ShoppingCart, PiggyBank } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search',
    description: 'Tell Jarvis what you want to buy and watch it scan hundreds of stores instantly.',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    icon: MessageSquare,
    title: 'Negotiate',
    description: 'Our AI engages with sellers using proven negotiation tactics to get you the best price.',
    color: 'from-purple-400 to-pink-500'
  },
  {
    icon: ShoppingCart,
    title: 'Checkout',
    description: 'Approve the negotiated price and let Jarvis complete the purchase securely for you.',
    color: 'from-green-400 to-teal-500'
  },
  {
    icon: PiggyBank,
    title: 'Save',
    description: 'Track your savings and get detailed reports on every successful negotiation.',
    color: 'from-yellow-400 to-orange-500'
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How <span className="text-gradient">Jarvis</span> Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Four simple steps to transform your shopping experience and start saving money on every purchase.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-400 via-green-400 to-orange-400 transform -translate-y-1/2 opacity-30"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass-card text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="relative mb-6">
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`absolute inset-0 w-16 h-16 mx-auto bg-gradient-to-br ${step.color} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
                
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}