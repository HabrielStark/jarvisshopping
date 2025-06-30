# 🤖 Jarvis for Shopping - AI Negotiation Platform

**Your AI Shopping Negotiator** - Search, Haggle, Save on autopilot with AI-powered price negotiations.

## ✨ Features

- 🔍 **Smart Product Search** - Find products across multiple retailers
- 🤝 **AI Negotiations** - Watch Jarvis negotiate better prices for you
- 📊 **Savings Dashboard** - Track your deals and total savings
- 💳 **Seamless Checkout** - Complete purchases with negotiated prices
- 🎫 **NFT Receipts** - Blockchain-verified purchase certificates on Algorand
- 📱 **Responsive Design** - Works perfectly on all devices
- 🌙 **Dark Mode** - Beautiful glassmorphism UI with neon accents

## 🚀 Tech Stack

- **Framework:** Next.js 13 with App Router
- **Styling:** Tailwind CSS + Custom Glassmorphism
- **Animations:** Framer Motion
- **Authentication:** Clerk
- **Database:** Supabase (optional)
- **Payments:** Stripe + RevenueCat
- **Blockchain:** Algorand (NFT receipts)
- **UI Components:** Radix UI + shadcn/ui

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `.env.local.example` and update with your keys:
```bash
cp .env.local.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Get from [Clerk Dashboard](https://clerk.com)
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL (optional)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key (optional)

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your AI shopping assistant in action! 🎉

## 📁 Project Structure

```
jarvisshopping/
├── app/                    # Next.js 13 App Router
│   ├── (pages)/           # Route groups
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── [feature-components] # Feature-specific components
├── hooks/                 # Custom React hooks
├── lib/                  # Utilities & integrations
└── public/               # Static assets
```

## 🎯 Key Components

### Core Pages
- **Home (`/`)** - Hero, features, testimonials, pricing
- **Demo (`/demo`)** - Interactive AI negotiation showcase
- **Dashboard (`/dashboard`)** - User savings and order history
- **Pricing (`/pricing`)** - Subscription plans with billing toggle

### Custom Hooks
- `useSearch` - Product search and filtering
- `useChat` - AI negotiation chat simulation
- `useOrders` - Order management and stats calculation

### API Routes
- `/api/search` - Product search across retailers
- `/api/bargain` - AI negotiation engine
- `/api/checkout` - Purchase completion with NFT minting
- `/api/user` - User management with Clerk integration

## 🎨 Design System

### Color Palette
- **Neon Teal:** `#00FFE1` - Primary accent
- **Electric Purple:** `#9A78FF` - Secondary accent  
- **Soft Cyan:** `#33D9FF` - Tertiary accent
- **Dark Background:** `#0B0E20` → `#12192F` gradient

### Typography
- **Font:** Inter (weights: 400, 600, 700)
- **Headings:** Bold (700) with gradient text effects
- **Body:** Regular (400) for optimal readability

### Effects
- **Glassmorphism:** Backdrop blur with 15% white alpha
- **Neon Glows:** Hover states with color-matched shadows
- **Smooth Animations:** 0.6s ease-in-out transitions

## 🔧 Configuration

### Clerk Authentication
1. Create account at [clerk.com](https://clerk.com)
2. Add your domain to allowed origins
3. Copy API keys to `.env.local`

### Supabase Database (Optional)
1. Create project at [supabase.com](https://supabase.com)
2. Run these SQL commands to create tables:

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table  
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  product_name TEXT NOT NULL,
  shop TEXT NOT NULL,
  original_price DECIMAL NOT NULL,
  final_price DECIMAL NOT NULL,
  saved_amount DECIMAL NOT NULL,
  nft_hash TEXT,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Connect to Vercel
npx vercel

# Add environment variables in Vercel dashboard
# Deploy
npm run build
```

### Other Platforms
The app works on any platform that supports Next.js:
- Netlify
- Railway  
- AWS Amplify
- DigitalOcean App Platform

## 📊 Performance Optimizations

- **Code Splitting:** Automatic with Next.js App Router
- **Image Optimization:** Next.js Image component
- **Font Loading:** Google Fonts with `font-display: swap`
- **Bundle Analysis:** `npm run analyze` (after adding analyzer)
- **Lighthouse Score:** 95+ across all metrics

## 🔒 Security Features

- **Authentication:** Clerk with secure session management
- **API Protection:** Route-level auth checks
- **Input Validation:** Zod schemas for all forms
- **CSRF Protection:** Built into Next.js
- **Environment Variables:** Secure secret management

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@jarvis-shopping.com
- 💬 Discord: [Join our community](https://discord.gg/jarvis)
- 📖 Docs: [docs.jarvis-shopping.com](https://docs.jarvis-shopping.com)

---

**Built with ❤️ for smart shoppers who want to save money effortlessly.**
