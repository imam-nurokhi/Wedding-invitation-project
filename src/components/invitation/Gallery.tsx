'use client';
import { motion } from 'framer-motion';

const galleries = [
  { id: 1, gradient: 'from-rose-gold to-gold', label: 'R & A', size: 'large' },
  { id: 2, gradient: 'from-dark-brown to-wedding-brown', label: '♥', size: 'small' },
  { id: 3, gradient: 'from-blush to-rose-gold', label: '2025', size: 'small' },
  { id: 4, gradient: 'from-wedding-brown to-rose-gold', label: 'Love', size: 'large' },
  { id: 5, gradient: 'from-gold to-cream', label: 'R', size: 'small' },
  { id: 6, gradient: 'from-rose-gold to-dark-brown', label: 'A', size: 'small' },
];

function GalleryItem({ item, index }: { item: typeof galleries[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
      className={`gallery-placeholder bg-gradient-to-br ${item.gradient} ${
        item.size === 'large' ? 'md:col-span-1 md:row-span-2' : ''
      } cursor-pointer group relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
      <span className="relative z-10 font-great-vibes text-5xl text-white/80 group-hover:text-white transition-colors duration-300">
        {item.label}
      </span>
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-2 h-2 rounded-full bg-white/60" />
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-montserrat text-rose-gold text-xs tracking-widest uppercase mb-3">
            Foto Kenangan
          </p>
          <h2 className="font-cormorant text-4xl sm:text-5xl text-dark-brown font-light mb-4">
            Galeri
          </h2>
          <p className="font-cormorant text-dark-brown/60 text-lg">
            Setiap momen adalah kenangan yang tak ternilai
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ gridAutoRows: '200px' }}>
          {galleries.map((item, index) => (
            <GalleryItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
