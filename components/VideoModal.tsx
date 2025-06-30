'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative glass rounded-2xl p-6 max-w-4xl w-full max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>
            
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <video
                controls
                autoPlay
                className="w-full h-full object-cover"
                poster="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop"
              >
                <source src="/demo.mp4" type="video/mp4" />
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-cyan-400/30 shadow-2xl shadow-cyan-400/20">
                      <Image
                        src="/logo.png"
                        alt="Jarvis Logo"
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <p>Demo video placeholder</p>
                    <p className="text-sm mt-2">Your 60-second Jarvis demo would play here</p>
                  </div>
                </div>
              </video>
            </div>
            
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">See Jarvis in Action</h3>
              <p className="text-gray-400">Watch how our AI negotiates the best deals for you</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}