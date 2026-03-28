'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Cover from '@/components/invitation/Cover';
import Opening from '@/components/invitation/Opening';
import Couple from '@/components/invitation/Couple';
import Countdown from '@/components/invitation/Countdown';
import Events from '@/components/invitation/Events';
import LoveStory from '@/components/invitation/LoveStory';
import Gallery from '@/components/invitation/Gallery';
import RSVP from '@/components/invitation/RSVP';
import Wishes from '@/components/invitation/Wishes';
import Gift from '@/components/invitation/Gift';
import MusicPlayer from '@/components/invitation/MusicPlayer';
import Footer from '@/components/invitation/Footer';
import OrnamentDivider from '@/components/invitation/OrnamentDivider';

function WeddingContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || '';
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <main className="relative">
      {/* Cover overlay */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50"
          >
            <Cover guestName={guestName} onOpen={() => setIsOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero banner */}
            <section className="relative min-h-screen bg-cream flex items-center justify-center overflow-hidden">
              {/* Background decorations */}
              <div className="absolute inset-0 bg-pattern" />
              <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-rose-gold/5 -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-rose-gold/5 translate-x-1/2 translate-y-1/2" />
              
              {/* Corner ornaments */}
              <svg className="absolute top-6 left-6 opacity-20" width="100" height="100" viewBox="0 0 100 100" fill="none">
                <path d="M10 10 Q50 10 50 50" stroke="#C8A97C" strokeWidth="1.5" fill="none"/>
                <path d="M10 10 Q10 50 50 50" stroke="#C8A97C" strokeWidth="1.5" fill="none"/>
                <circle cx="10" cy="10" r="4" fill="#C8A97C" fillOpacity="0.6"/>
                <circle cx="50" cy="50" r="3" fill="#C8A97C" fillOpacity="0.4"/>
                <circle cx="30" cy="10" r="2" fill="#C8A97C" fillOpacity="0.3"/>
                <circle cx="10" cy="30" r="2" fill="#C8A97C" fillOpacity="0.3"/>
              </svg>
              <svg className="absolute top-6 right-6 opacity-20 scale-x-[-1]" width="100" height="100" viewBox="0 0 100 100" fill="none">
                <path d="M10 10 Q50 10 50 50" stroke="#C8A97C" strokeWidth="1.5" fill="none"/>
                <path d="M10 10 Q10 50 50 50" stroke="#C8A97C" strokeWidth="1.5" fill="none"/>
                <circle cx="10" cy="10" r="4" fill="#C8A97C" fillOpacity="0.6"/>
                <circle cx="50" cy="50" r="3" fill="#C8A97C" fillOpacity="0.4"/>
              </svg>
              <svg className="absolute bottom-6 left-6 opacity-20 scale-y-[-1]" width="100" height="100" viewBox="0 0 100 100" fill="none">
                <path d="M10 10 Q50 10 50 50" stroke="#C8A97C" strokeWidth="1.5" fill="none"/>
                <path d="M10 10 Q10 50 50 50" stroke="#C8A97C" strokeWidth="1.5" fill="none"/>
                <circle cx="10" cy="10" r="4" fill="#C8A97C" fillOpacity="0.6"/>
                <circle cx="50" cy="50" r="3" fill="#C8A97C" fillOpacity="0.4"/>
              </svg>
              <svg className="absolute bottom-6 right-6 opacity-20 scale-x-[-1] scale-y-[-1]" width="100" height="100" viewBox="0 0 100 100" fill="none">
                <path d="M10 10 Q50 10 50 50" stroke="#C8A97C" strokeWidth="1.5" fill="none"/>
                <path d="M10 10 Q10 50 50 50" stroke="#C8A97C" strokeWidth="1.5" fill="none"/>
                <circle cx="10" cy="10" r="4" fill="#C8A97C" fillOpacity="0.6"/>
                <circle cx="50" cy="50" r="3" fill="#C8A97C" fillOpacity="0.4"/>
              </svg>

              <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-cormorant text-rose-gold text-3xl mb-6 italic"
                >
                  بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="font-montserrat text-xs text-dark-brown/50 tracking-widest uppercase mb-4"
                >
                  Undangan Pernikahan
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="font-great-vibes text-7xl sm:text-8xl text-rose-gold leading-tight mb-2"
                >
                  Ichsan
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="font-cormorant text-dark-brown/50 text-2xl mb-2"
                >
                  &amp;
                </motion.p>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="font-great-vibes text-7xl sm:text-8xl text-rose-gold leading-tight mb-6"
                >
                  Wulan
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 1.2 }}
                  className="w-32 h-px bg-rose-gold mx-auto mb-6"
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="font-cormorant text-dark-brown/70 text-xl tracking-wide"
                >
                  Sabtu, 15 November 2025
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="font-montserrat text-dark-brown/50 text-sm tracking-wider mt-1"
                >
                  Jakarta
                </motion.p>

                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 }}
                  href="#opening"
                  className="btn-primary inline-block mt-8 text-xs tracking-widest"
                >
                  Lihat Undangan
                </motion.a>
              </div>
            </section>

            {/* Sections */}
            <div id="opening">
              <Opening guestName={guestName} />
            </div>
            
            <Couple />
            
            <OrnamentDivider className="bg-white px-6" />
            
            <Countdown />
            
            <Events />
            
            <LoveStory />
            
            <Gallery />
            
            <RSVP guestName={guestName} />
            
            <Wishes />
            
            <Gift />
            
            <Footer />
            
            {/* Floating music player */}
            <MusicPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-rose-gold font-cormorant text-2xl animate-pulse">Loading...</div>
      </div>
    }>
      <WeddingContent />
    </Suspense>
  );
}
