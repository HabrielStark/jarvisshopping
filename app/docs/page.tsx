'use client';

import { motion } from 'framer-motion';
import { Code, Database, Zap, Shield, BookOpen, ExternalLink } from 'lucide-react';

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    icon: BookOpen,
    content: `
# Jarvis API Documentation

Welcome to the Jarvis for Shopping API documentation. Our REST API allows you to integrate AI-powered price negotiation into your applications.

## Base URL
\`\`\`
https://api.jarvis-shopping.com/v1
\`\`\`

## Authentication
All API requests require authentication using an API key in the header:
\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`
    `,
  },
  {
    id: 'search',
    title: 'Search API',
    icon: Database,
    content: `
# Search Endpoint

Search for products across multiple retailers and get the best available prices.

## Endpoint
\`POST /api/search\`

### Request Body
\`\`\`json
{
  "query": "iPhone 15 Pro",
  "category": "electronics",
  "max_price": 1500,
  "retailers": ["amazon", "ebay", "mediamarkt"]
}
\`\`\`

### Response
\`\`\`json
{
  "results": [
    {
      "id": "prod_123",
      "name": "iPhone 15 Pro 256GB",
      "price": 1299,
      "retailer": "amazon",
      "url": "https://amazon.com/...",
      "negotiable": true
    }
  ],
  "total": 25
}
\`\`\`
    `,
  },
  {
    id: 'bargain',
    title: 'Bargain API',
    icon: Zap,
    content: `
# Bargain Endpoint

Initiate AI-powered price negotiations with sellers.

## Endpoint
\`POST /api/bargain\`

### Request Body
\`\`\`json
{
  "product_id": "prod_123",
  "target_price": 1149,
  "max_rounds": 5,
  "strategy": "aggressive"
}
\`\`\`

### Response
\`\`\`json
{
  "negotiation_id": "neg_456",
  "status": "in_progress",
  "current_offer": 1199,
  "rounds_completed": 2,
  "estimated_completion": "2024-01-15T10:30:00Z"
}
\`\`\`

### Webhook Events
- \`negotiation.started\`
- \`negotiation.offer_received\`
- \`negotiation.completed\`
- \`negotiation.failed\`
    `,
  },
  {
    id: 'checkout',
    title: 'Checkout API',
    icon: Shield,
    content: `
# Checkout Endpoint

Complete purchases with negotiated prices.

## Endpoint
\`POST /api/checkout\`

### Request Body
\`\`\`json
{
  "negotiation_id": "neg_456",
  "payment_method": "stripe_pm_123",
  "shipping_address": {
    "name": "John Doe",
    "street": "123 Main St",
    "city": "Berlin",
    "country": "DE",
    "postal_code": "10115"
  }
}
\`\`\`

### Response
\`\`\`json
{
  "order_id": "ord_789",
  "status": "confirmed",
  "final_price": 1149,
  "savings": 150,
  "nft_receipt": "0x8b3a7b2c9d4e5f6a...",
  "tracking_info": {
    "carrier": "DHL",
    "tracking_number": "1234567890"
  }
}
\`\`\`
    `,
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card sticky top-24"
            >
              <h2 className="text-xl font-bold mb-6">Documentation</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-cyan-400"
                  >
                    <section.icon className="w-5 h-5" />
                    <span>{section.title}</span>
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>API Status</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>SDKs & Libraries</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Postman Collection</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                API <span className="text-gradient">Documentation</span>
              </h1>
              <p className="text-xl text-gray-300">
                Integrate Jarvis AI negotiation capabilities into your applications with our comprehensive REST API.
              </p>
            </motion.div>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Support Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 glass-card text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
              <p className="text-gray-300 mb-6">
                Our support team is here to help you integrate Jarvis into your application.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary">
                  Contact Support
                </button>
                <button className="btn-secondary">
                  Join Discord
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}