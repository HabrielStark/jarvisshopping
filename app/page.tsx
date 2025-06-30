'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import LiveDeals from '@/components/LiveDeals';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <LiveDeals />
      <Testimonials />
      <CallToAction />
    </div>
  );
}