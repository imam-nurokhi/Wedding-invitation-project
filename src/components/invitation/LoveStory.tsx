'use client';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const milestones = [
  {
    year: '2018',
    title: 'Pertemuan Pertama',
    description: 'Rizky dan Anisa pertama kali bertemu saat Orientasi Mahasiswa Baru di Universitas Indonesia. Sebuah pertemuan sederhana yang ternyata menjadi awal dari segalanya.',
    emoji: '🌟',
  },
  {
    year: '2020',
    title: 'Resmi Berpacaran',
    description: 'Setelah dua tahun bersahabat dan saling mengenal lebih dalam, Rizky akhirnya memberanikan diri untuk mengungkapkan perasaannya. Anisa pun menerima dengan senyum manisnya.',
    emoji: '💕',
  },
  {
    year: '2022',
    title: 'Lamaran',
    description: 'Dengan restu kedua keluarga, Rizky melamar Anisa dalam sebuah acara lamaran yang sederhana namun penuh keharuan dan kebahagiaan.',
    emoji: '💍',
  },
  {
    year: '2025',
    title: 'Pernikahan',
    description: 'Atas ridho Allah SWT dan restu kedua orang tua, Rizky dan Anisa akan menyempurnakan separuh agama mereka dan memulai babak baru kehidupan bersama.',
    emoji: '👰🤵',
  },
];

export default function LoveStory() {
  return (
    <section className="py-16 px-6 bg-wedding-gradient">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-montserrat text-rose-gold text-xs tracking-widest uppercase mb-3">
            Perjalanan Cinta
          </p>
          <h2 className="font-cormorant text-4xl sm:text-5xl text-dark-brown font-light mb-4">
            Kisah Kami
          </h2>
          <p className="font-cormorant text-dark-brown/60 text-lg italic">
            &ldquo;Setiap langkah menuju kamu adalah langkah menuju kebahagiaan&rdquo;
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-rose-gold to-transparent transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:gap-8`}
              >
                {/* Content card */}
                <div className="flex-1 wedding-card p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{milestone.emoji}</span>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-montserrat text-xs font-semibold text-rose-gold tracking-wider bg-rose-gold/10 px-3 py-1 rounded-full">
                          {milestone.year}
                        </span>
                        <h3 className="font-cormorant text-xl text-dark-brown font-semibold">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="font-montserrat text-sm text-dark-brown/60 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center dot - hidden on mobile */}
                <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-rose-gold shadow-lg flex-shrink-0 z-10">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>

                {/* Empty space for the other side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
