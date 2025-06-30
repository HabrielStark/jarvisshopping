'use client';

import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useScroll } from 'framer-motion';
import Image from 'next/image';
import { 
  Code, 
  Database, 
  Zap, 
  Shield, 
  BookOpen, 
  ExternalLink, 
  Copy, 
  Check, 
  ChevronRight,
  Sparkles,
  Globe,
  Key,
  ArrowRight,
  Play,
  Terminal,
  Star,
  Heart,
  Layers,
  Cpu,
  Rocket
} from 'lucide-react';

const codeExamples = {
  search: {
    curl: `curl -X POST "https://api.jarvis-shopping.com/v1/search" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "iPhone 15 Pro",
    "category": "electronics",
    "max_price": 1500,
    "retailers": ["amazon", "ebay", "mediamarkt"]
  }'`,
    javascript: `const response = await fetch('/api/search', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: "iPhone 15 Pro",
    category: "electronics",
    max_price: 1500,
    retailers: ["amazon", "ebay", "mediamarkt"]
  })
});

const data = await response.json();
console.log(data.results);`,
    python: `import requests

url = "https://api.jarvis-shopping.com/v1/search"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "query": "iPhone 15 Pro",
    "category": "electronics", 
    "max_price": 1500,
    "retailers": ["amazon", "ebay", "mediamarkt"]
}

response = requests.post(url, headers=headers, json=payload)
print(response.json())`
  },
  bargain: {
    curl: `curl -X POST "https://api.jarvis-shopping.com/v1/bargain" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "product_id": "prod_123",
    "target_price": 1149,
    "max_rounds": 5,
    "strategy": "aggressive"
  }'`,
    javascript: `const negotiation = await fetch('/api/bargain', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    product_id: "prod_123",
    target_price: 1149,
    max_rounds: 5,
    strategy: "aggressive"
  })
});

const result = await negotiation.json();
console.log('Negotiation ID:', result.negotiation_id);`,
    python: `import requests

response = requests.post(
    "https://api.jarvis-shopping.com/v1/bargain",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "product_id": "prod_123",
        "target_price": 1149,
        "max_rounds": 5,
        "strategy": "aggressive"
    }
)

print(f"Status: {response.json()['status']}")`
  }
};

const sections = [
  {
    id: 'overview',
    title: 'Getting Started',
    icon: BookOpen,
    description: 'Learn the basics of the Jarvis API',
    gradient: 'from-blue-400 to-cyan-400',
    glowColor: 'shadow-blue-400/25',
    bgPattern: 'bg-gradient-to-br from-blue-400/5 via-cyan-400/10 to-transparent'
  },
  {
    id: 'authentication',
    title: 'Authentication',
    icon: Key,
    description: 'Secure your API requests',
    gradient: 'from-purple-400 to-pink-400',
    glowColor: 'shadow-purple-400/25',
    bgPattern: 'bg-gradient-to-br from-purple-400/5 via-pink-400/10 to-transparent'
  },
  {
    id: 'search',
    title: 'Search API',
    icon: Database,
    description: 'Find products across retailers',
    gradient: 'from-green-400 to-teal-400',
    glowColor: 'shadow-green-400/25',
    bgPattern: 'bg-gradient-to-br from-green-400/5 via-teal-400/10 to-transparent'
  },
  {
    id: 'bargain',
    title: 'Bargain API',
    icon: Zap,
    description: 'AI-powered negotiations',
    gradient: 'from-orange-400 to-red-400',
    glowColor: 'shadow-orange-400/25',
    bgPattern: 'bg-gradient-to-br from-orange-400/5 via-red-400/10 to-transparent'
  },
  {
    id: 'checkout',
    title: 'Checkout API',
    icon: Shield,
    description: 'Complete secure purchases',
    gradient: 'from-indigo-400 to-purple-400',
    glowColor: 'shadow-indigo-400/25',
    bgPattern: 'bg-gradient-to-br from-indigo-400/5 via-purple-400/10 to-transparent'
  }
];

const FloatingParticle = memo(({ delay = 0, x = 0, y = 0 }: { delay?: number; x?: number; y?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [y, y - 100],
      x: [x, x + (Math.random() - 0.5) * 50]
    }}
    transition={{
      duration: 4 + Math.random() * 2,
      delay: delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 3
    }}
    className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
    style={{ left: x, top: y }}
  />
));

const OptimizedCodeBlock = memo(({ 
  code, 
  language, 
  isActive, 
  onCopy, 
  copyId, 
  copied 
}: { 
  code: string; 
  language: string; 
  isActive: boolean; 
  onCopy: () => void; 
  copyId: string; 
  copied: boolean; 
}) => (
  <AnimatePresence mode="wait">
    {isActive && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden"
      >
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-xl p-4 border border-cyan-400/20 relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-purple-400/5 animate-pulse" />
          
          <div className="flex items-center justify-between mb-3 relative z-10">
            <span className="text-xs text-cyan-400 font-medium uppercase tracking-wide flex items-center space-x-2">
              <Cpu className="w-3 h-3" />
              <span>{language} Example</span>
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCopy}
              className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group"
            >
              {copied ? 
                <Check className="w-4 h-4 text-green-400" /> : 
                <Copy className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
              }
            </motion.button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto relative z-10">
            <code className="language-${language}">{code}</code>
          </pre>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 blur-xl opacity-50" />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
));

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedCode, setCopiedCode] = useState('');
  const [activeTab, setActiveTab] = useState<{ [key: string]: string }>({
    search: 'curl',
    bargain: 'curl'
  });

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 0.6]);

  const copyCode = useCallback((code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const memoizedSections = useMemo(() => sections, []);
  const memoizedCodeExamples = useMemo(() => codeExamples, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of memoizedSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [memoizedSections]);

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary floating orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-cyan-400/15 to-purple-500/15 rounded-full blur-3xl shadow-2xl shadow-cyan-400/10"
        />
        <motion.div 
          animate={{ 
            x: [0, -150, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-teal-400/15 to-orange-500/15 rounded-full blur-3xl shadow-2xl shadow-teal-400/10"
        />
        
        {/* Secondary accent orbs */}
        <motion.div 
          animate={{ 
            x: [0, 80, 0],
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -60, 0],
            y: [0, 40, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-green-400/15 to-blue-400/15 rounded-full blur-2xl"
        />

        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.3} 
            x={Math.random() * window.innerWidth || 100} 
            y={Math.random() * window.innerHeight || 100}
          />
        ))}

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[length:50px_50px] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          {/* Floating badge with enhanced glow */}
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-400/25 to-purple-500/25 backdrop-blur-xl border border-cyan-400/40 rounded-full px-8 py-3 mb-8 shadow-2xl shadow-cyan-400/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-cyan-400/10 animate-pulse" />
            <div className="w-6 h-6 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-full flex items-center justify-center relative z-10">
              <Image
                src="/logo.png"
                alt="Jarvis Logo"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </motion.div>
            <span className="text-sm font-semibold text-cyan-400 tracking-wide relative z-10">API Documentation</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>
          
          {/* Enhanced title with animated gradient */}
          <motion.h1 
            className="text-6xl lg:text-8xl font-black mb-8 relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="block">Build with</span>
            <motion.span 
              className="block bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-teal-400 bg-clip-text text-transparent bg-300% animate-gradient"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Jarvis
            </motion.span>
            
            {/* Floating icons around title */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-8 lg:-right-16"
            >
              <Rocket className="w-8 h-8 lg:w-12 lg:h-12 text-cyan-400 opacity-60" />
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute top-1/2 -left-8 lg:-left-16"
            >
              <Code className="w-6 h-6 lg:w-10 lg:h-10 text-purple-400 opacity-60" />
            </motion.div>
          </motion.h1>
          
          {/* Enhanced description with better typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-5xl mx-auto mb-10"
          >
            <p className="text-xl lg:text-3xl text-gray-300 leading-relaxed mb-4">
              Integrate <span className="text-gradient font-bold">AI-powered shopping negotiations</span> into your applications
            </p>
            <p className="text-lg lg:text-xl text-gray-400 leading-relaxed">
              with our comprehensive REST API. 
              <span className="text-cyan-400 font-semibold"> Build the future of e-commerce today.</span>
            </p>
          </motion.div>

          {/* Enhanced action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mt-10"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary group relative overflow-hidden px-8 py-4 text-lg font-semibold"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity" />
              <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Quick Start Guide
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"
                style={{ clipPath: 'circle(0% at 50% 50%)' }}
                whileHover={{ clipPath: 'circle(100% at 50% 50%)' }}
              />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary group relative overflow-hidden px-8 py-4 text-lg font-semibold"
            >
              <Terminal className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Try Live API
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
            </motion.button>
          </motion.div>

          {/* Stats showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-8 mt-16 text-center"
          >
            {[
              { icon: Heart, value: '99.9%', label: 'Uptime', color: 'text-red-400' },
              { icon: Zap, value: '<50ms', label: 'Response Time', color: 'text-yellow-400' },
              { icon: Shield, value: '256-bit', label: 'Encryption', color: 'text-green-400' },
              { icon: Star, value: '5.0', label: 'Developer Rating', color: 'text-blue-400' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex flex-col items-center space-y-2 min-w-[120px]"
              >
                <div className={`w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Ultra-Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="glass sticky top-24 rounded-2xl overflow-hidden border border-cyan-400/20 shadow-2xl shadow-cyan-400/10"
            >
              {/* Sidebar header with animated gradient */}
              <div className="relative p-6 bg-gradient-to-br from-cyan-400/10 via-purple-500/5 to-transparent border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-cyan-400/5 animate-pulse" />
                <div className="flex items-center space-x-3 relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <Code className="w-4 h-4 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Navigation</h2>
                    <p className="text-xs text-gray-400">Jump to any section</p>
                  </div>
                </div>
              </div>
                
              <div className="p-6">
                <nav className="space-y-2">
                  {memoizedSections.map((section, index) => (
                    <motion.button
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                        activeSection === section.id 
                          ? `bg-gradient-to-r ${section.bgPattern} border border-cyan-400/30 text-cyan-400 shadow-lg ${section.glowColor}` 
                          : 'hover:bg-white/5 text-gray-300 hover:text-white border border-transparent hover:border-white/10'
                      }`}
                    >
                      {/* Active section glow effect */}
                      {activeSection === section.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 blur-sm"
                        />
                      )}
                      
                      <div className="flex items-center space-x-3 relative z-10">
                        <motion.div 
                          className={`p-2 rounded-xl bg-gradient-to-br ${section.gradient} shadow-lg ${
                            activeSection === section.id ? section.glowColor : 'shadow-gray-800/50'
                          }`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <section.icon className="w-5 h-5 text-white" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm">{section.title}</div>
                          <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                            {section.description}
                          </div>
                        </div>
                        <motion.div
                          animate={{ 
                            rotate: activeSection === section.id ? 90 : 0,
                            x: activeSection === section.id ? 2 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronRight className={`w-4 h-4 transition-colors ${
                            activeSection === section.id ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300'
                          }`} />
                        </motion.div>
                      </div>
                    </motion.button>
                ))}
              </nav>

                {/* Enhanced resources section */}
              <div className="mt-8 pt-6 border-t border-white/10">
                  <motion.h3 
                    className="font-semibold mb-4 flex items-center space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Globe className="w-4 h-4 text-cyan-400" />
                    </motion.div>
                    <span>Developer Resources</span>
                  </motion.h3>
                  <div className="space-y-3">
                    {[
                      { label: 'API Status', color: 'green-400', icon: '🟢', status: 'Online' },
                      { label: 'SDK Libraries', color: 'blue-400', icon: '📚', status: '12 Languages' },
                      { label: 'Postman Collection', color: 'orange-400', icon: '🚀', status: 'Ready' }
                    ].map((link, index) => (
                      <motion.a
                        key={link.label}
                    href="#"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        whileHover={{ x: 8, scale: 1.02 }}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group border border-transparent hover:border-white/10"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-sm">{link.icon}</span>
                          <div>
                            <div className={`text-sm font-medium group-hover:text-${link.color} transition-colors`}>
                              {link.label}
                            </div>
                            <div className="text-xs text-gray-500">{link.status}</div>
                          </div>
                        </div>
                        <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-white transition-all group-hover:scale-110" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Content */}
          <div className="lg:col-span-4 space-y-16">
            
            {/* Overview Section */}
            <motion.section
              id="overview"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-400/10 to-cyan-400/10 p-6 border-b border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Getting Started</h2>
                    <p className="text-gray-400">Learn the basics of the Jarvis API</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-cyan-400/5 to-purple-500/5 border border-cyan-400/20 rounded-xl p-6">
                    <h3 className="font-semibold mb-3 flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-cyan-400" />
                      <span>Base URL</span>
                    </h3>
                    <div className="bg-gray-800 rounded-lg p-3 font-mono text-sm text-cyan-400">
                      https://api.jarvis-shopping.com/v1
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-400/5 to-pink-500/5 border border-purple-400/20 rounded-xl p-6">
                    <h3 className="font-semibold mb-3 flex items-center space-x-2">
                      <Key className="w-5 h-5 text-purple-400" />
                      <span>Rate Limits</span>
                    </h3>
                    <div className="text-sm text-gray-300">
                      <div>Free: 100 requests/hour</div>
                      <div>Pro: 1,000 requests/hour</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Authentication Section */}
            <motion.section
              id="authentication"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-400/10 to-pink-400/10 p-6 border-b border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                    <Key className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Authentication</h2>
                    <p className="text-gray-400">Secure your API requests with Bearer tokens</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-purple-400/20 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-400">Authorization Header</span>
                    <button
                      onClick={() => copyCode('Authorization: Bearer YOUR_API_KEY', 'auth')}
                      className="p-1 hover:bg-white/10 rounded"
                    >
                      {copiedCode === 'auth' ? 
                        <Check className="w-4 h-4 text-green-400" /> : 
                        <Copy className="w-4 h-4 text-gray-400" />
                      }
                    </button>
                  </div>
                  <code className="text-cyan-400 font-mono text-sm">
                    Authorization: Bearer YOUR_API_KEY
                  </code>
                </div>
              </div>
            </motion.section>

            {/* Search API Section */}
            <motion.section
              id="search"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-400/10 to-teal-400/10 p-6 border-b border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Search API</h2>
                    <p className="text-gray-400">Find products across multiple retailers</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="bg-green-500 text-white px-2 py-1 rounded font-mono">POST</span>
                  <code className="text-cyan-400">/api/search</code>
                </div>

                {/* Interactive Code Tabs */}
                <div className="space-y-4">
                  <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
                    {Object.keys(codeExamples.search).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveTab(prev => ({ ...prev, search: lang }))}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          activeTab.search === lang
                            ? 'bg-cyan-400/20 text-cyan-400 shadow-lg'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </button>
              ))}
            </div>

                  <AnimatePresence mode="wait">
            <motion.div
                      key={activeTab.search}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="relative"
                    >
                      <div className="bg-gray-900 rounded-xl p-4 border border-green-400/20">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-green-400 font-medium uppercase tracking-wide">
                            {activeTab.search} Example
                          </span>
                          <button
                            onClick={() => copyCode(codeExamples.search[activeTab.search as keyof typeof codeExamples.search], `search-${activeTab.search}`)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            {copiedCode === `search-${activeTab.search}` ? 
                              <Check className="w-4 h-4 text-green-400" /> : 
                              <Copy className="w-4 h-4 text-gray-400" />
                            }
                          </button>
                        </div>
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{codeExamples.search[activeTab.search as keyof typeof codeExamples.search]}</code>
                        </pre>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Response Example */}
                <div className="bg-gradient-to-br from-green-400/5 to-teal-400/5 border border-green-400/20 rounded-xl p-4">
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-green-400" />
                    <span>Response</span>
                  </h4>
                  <pre className="text-sm text-gray-300 bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <code>{`{
  "results": [
    {
      "id": "prod_123",
      "name": "iPhone 15 Pro 256GB", 
      "price": 1299,
      "retailer": "amazon",
      "url": "https://amazon.com/...",
      "negotiable": true,
      "confidence": 0.95
    }
  ],
  "total": 25,
  "search_time": "142ms"
}`}</code>
                  </pre>
                </div>
              </div>
            </motion.section>

            {/* Bargain API Section */}
            <motion.section
              id="bargain"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-orange-400/10 to-red-400/10 p-6 border-b border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-xl flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Bargain API</h2>
                    <p className="text-gray-400">AI-powered price negotiations</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded font-mono">POST</span>
                  <code className="text-cyan-400">/api/bargain</code>
                </div>

                <div className="space-y-4">
                  <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
                    {Object.keys(codeExamples.bargain).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveTab(prev => ({ ...prev, bargain: lang }))}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          activeTab.bargain === lang
                            ? 'bg-orange-400/20 text-orange-400 shadow-lg'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab.bargain}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-gray-900 rounded-xl p-4 border border-orange-400/20">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-orange-400 font-medium uppercase tracking-wide">
                            {activeTab.bargain} Example
                          </span>
                          <button
                            onClick={() => copyCode(codeExamples.bargain[activeTab.bargain as keyof typeof codeExamples.bargain], `bargain-${activeTab.bargain}`)}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                          >
                            {copiedCode === `bargain-${activeTab.bargain}` ? 
                              <Check className="w-4 h-4 text-orange-400" /> : 
                              <Copy className="w-4 h-4 text-gray-400" />
                            }
                </button>
                        </div>
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{codeExamples.bargain[activeTab.bargain as keyof typeof codeExamples.bargain]}</code>
                        </pre>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Webhook Events */}
                <div className="bg-gradient-to-br from-orange-400/5 to-red-400/5 border border-orange-400/20 rounded-xl p-4">
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span>Webhook Events</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'negotiation.started',
                      'negotiation.offer_received', 
                      'negotiation.completed',
                      'negotiation.failed'
                    ].map((event) => (
                      <div key={event} className="bg-gray-800 rounded-lg p-3">
                        <code className="text-sm text-orange-400">{event}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Checkout API Section */}
            <motion.section
              id="checkout"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-400/10 to-purple-400/10 p-6 border-b border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Checkout API</h2>
                    <p className="text-gray-400">Complete secure purchases with NFT receipts</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="bg-indigo-500 text-white px-2 py-1 rounded font-mono">POST</span>
                  <code className="text-cyan-400">/api/checkout</code>
                </div>

                <div className="bg-gradient-to-br from-indigo-400/5 to-purple-400/5 border border-indigo-400/20 rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Features</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                      <span className="text-sm">Stripe Integration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-sm">NFT Receipts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                      <span className="text-sm">Real-time Tracking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-sm">Instant Confirmation</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>


          </div>
        </div>
      </div>
    </div>
  );
}