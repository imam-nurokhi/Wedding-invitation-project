'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, X } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto-show after a delay
    const timer = setTimeout(() => setIsExpanded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="music-player">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-xl border border-rose-gold/20 p-4 mb-3 w-64"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold to-gold flex items-center justify-center flex-shrink-0">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-montserrat text-xs font-semibold text-dark-brown truncate">
                  Can&apos;t Help Falling in Love
                </p>
                <p className="font-montserrat text-xs text-dark-brown/50 truncate">
                  Elvis Presley
                </p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-dark-brown/30 hover:text-dark-brown/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Progress bar (decorative) */}
            <div className="mt-3 bg-gray-100 rounded-full h-1">
              <motion.div
                className="bg-gradient-to-r from-rose-gold to-gold h-1 rounded-full"
                animate={isPlaying ? { width: ['0%', '100%'] } : { width: '35%' }}
                transition={isPlaying ? { duration: 30, repeat: Infinity, ease: 'linear' } : {}}
              />
            </div>
            
            <p className="font-montserrat text-xs text-dark-brown/40 text-center mt-2">
              {isPlaying ? '♪ Sedang diputar...' : '♪ Musik diputar otomatis'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsPlaying(!isPlaying);
          setIsExpanded(true);
        }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-gold to-gold shadow-lg flex items-center justify-center animate-pulse-gold"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-white ml-0.5" />
        )}
      </motion.button>
    </div>
  );
}
