import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jarvis - Your AI Shopping Negotiator',
  description: 'Search, Haggle, Save - on autopilot with AI-powered shopping negotiations',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Jarvis - Your AI Shopping Negotiator',
    description: 'Search, Haggle, Save - on autopilot with AI-powered shopping negotiations',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jarvis - Your AI Shopping Negotiator',
    description: 'Search, Haggle, Save - on autopilot with AI-powered shopping negotiations',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if Clerk keys are properly configured
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const isClerkConfigured = clerkPublishableKey && clerkPublishableKey.startsWith('pk_');

  if (isClerkConfigured) {
    return (
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <html lang="en">
          <body className={inter.className}>
            <Navbar />
            <main>{children}</main>
            <Toaster 
              theme="dark" 
              position="top-right"
              toastOptions={{
                style: {
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(0, 255, 225, 0.3)',
                  color: '#f8fafc',
                },
              }}
            />
          </body>
        </html>
      </ClerkProvider>
    );
  }

  // Demo mode without Clerk
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Toaster 
          theme="dark" 
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(0, 255, 225, 0.3)',
              color: '#f8fafc',
            },
          }}
        />
      </body>
    </html>
  );
}