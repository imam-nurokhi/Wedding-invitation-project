'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CoverProps {
  guestName: string;
  onOpen: () => void;
}

export default function Cover({ guestName, onOpen }: CoverProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background with ornamental pattern */}
      <div className="absolute inset-0 bg-cream">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-rose-gold opacity-5 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-rose-gold opacity-5 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-rose-gold opacity-5 -translate-x-1/2 translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-rose-gold opacity-5 translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blush opacity-20" />
        
        {/* SVG Ornamental corners */}
        <svg className="absolute top-4 left-4 text-rose-gold opacity-30" width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M10 10 Q60 10 60 60" stroke="#C8A97C" strokeWidth="1" fill="none"/>
          <path d="M10 10 Q10 60 60 60" stroke="#C8A97C" strokeWidth="1" fill="none"/>
          <circle cx="10" cy="10" r="4" fill="#C8A97C" fillOpacity="0.5"/>
          <circle cx="60" cy="60" r="3" fill="#C8A97C" fillOpacity="0.5"/>
          <path d="M20 10 Q20 20 10 20" stroke="#C8A97C" strokeWidth="0.5" fill="none"/>
          <path d="M10 20 Q10 30 20 30" stroke="#C8A97C" strokeWidth="0.5" fill="none"/>
          <circle cx="35" cy="10" r="2" fill="#C8A97C" fillOpacity="0.4"/>
          <circle cx="10" cy="35" r="2" fill="#C8A97C" fillOpacity="0.4"/>
        </svg>
        
        <svg className="absolute top-4 right-4 text-rose-gold opacity-30 scale-x-[-1]" width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M10 10 Q60 10 60 60" stroke="#C8A97C" strokeWidth="1" fill="none"/>
          <path d="M10 10 Q10 60 60 60" stroke="#C8A97C" strokeWidth="1" fill="none"/>
          <circle cx="10" cy="10" r="4" fill="#C8A97C" fillOpacity="0.5"/>
          <circle cx="60" cy="60" r="3" fill="#C8A97C" fillOpacity="0.5"/>
        </svg>
        
        <svg className="absolute bottom-4 left-4 text-rose-gold opacity-30 scale-y-[-1]" width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M10 10 Q60 10 60 60" stroke="#C8A97C" strokeWidth="1" fill="none"/>
          <path d="M10 10 Q10 60 60 60" stroke="#C8A97C" strokeWidth="1" fill="none"/>
          <circle cx="10" cy="10" r="4" fill="#C8A97C" fillOpacity="0.5"/>
          <circle cx="60" cy="60" r="3" fill="#C8A97C" fillOpacity="0.5"/>
        </svg>
        
        <svg className="absolute bottom-4 right-4 text-rose-gold opacity-30 scale-x-[-1] scale-y-[-1]" width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M10 10 Q60 10 60 60" stroke="#C8A97C" strokeWidth="1" fill="none"/>
          <path d="M10 10 Q10 60 60 60" stroke="#C8A97C" strokeWidth="1" fill="none"/>
          <circle cx="10" cy="10" r="4" fill="#C8A97C" fillOpacity="0.5"/>
          <circle cx="60" cy="60" r="3" fill="#C8A97C" fillOpacity="0.5"/>
        </svg>
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-6 max-w-lg mx-auto"
          >
            {/* Bismillah */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-cormorant text-rose-gold text-2xl mb-6 italic"
            >
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </motion.p>

            {/* To the guest */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-4"
            >
              <p className="font-montserrat text-sm text-dark-brown/60 tracking-widest uppercase mb-1">
                Kepada Yth.
              </p>
              {guestName && (
                <p className="font-cormorant text-2xl text-dark-brown font-medium">
                  {decodeURIComponent(guestName)}
                </p>
              )}
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="w-24 h-px bg-rose-gold mx-auto mb-6"
            />

            {/* Wedding announcement */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="font-montserrat text-xs text-dark-brown/50 tracking-widest uppercase mb-3"
            >
              Undangan Pernikahan
            </motion.p>

            {/* Names */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mb-2"
            >
              <h1 className="font-great-vibes text-5xl sm:text-6xl text-rose-gold leading-tight">
                Rizky
              </h1>
              <p className="font-cormorant text-dark-brown/60 text-lg my-1">&amp;</p>
              <h1 className="font-great-vibes text-5xl sm:text-6xl text-rose-gold leading-tight">
                Anisa
              </h1>
            </motion.div>

            {/* Date */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="font-cormorant text-dark-brown/70 text-lg mt-4 mb-8 tracking-wide"
            >
              15 . 06 . 2025
            </motion.p>

            {/* Open button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpen}
              className="btn-primary text-sm tracking-widest uppercase cursor-pointer"
            >
              ✉ Buka Undangan
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="font-montserrat text-xs text-dark-brown/40 mt-4 tracking-wide"
            >
              Geser untuk membuka undangan
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
