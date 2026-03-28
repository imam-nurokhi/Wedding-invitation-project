'use client';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-dark-brown text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto"
      >
        <p className="font-great-vibes text-3xl text-rose-gold mb-4">
          Rizky &amp; Anisa
        </p>
        <div className="w-16 h-px bg-rose-gold/40 mx-auto mb-4" />
        <p className="font-montserrat text-cream/60 text-xs tracking-wide flex items-center justify-center gap-1 mb-3">
          Made with <Heart className="w-3 h-3 text-rose-gold fill-rose-gold mx-0.5" /> for Rizky &amp; Anisa
        </p>
        <p className="font-montserrat text-cream/40 text-xs">
          © 2025 Rizky Ahmad Fauzi &amp; Anisa Rahma Putri. All rights reserved.
        </p>
        <p className="font-montserrat text-cream/30 text-xs mt-2">
          15 Juni 2025 · Jakarta Selatan
        </p>
      </motion.div>
    </footer>
  );
}
