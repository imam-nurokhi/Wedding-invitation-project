'use client';
import { motion } from 'framer-motion';
import OrnamentDivider from './OrnamentDivider';

interface OpeningProps {
  guestName: string;
}

export default function Opening({ guestName }: OpeningProps) {
  return (
    <section className="py-16 px-6 bg-wedding-gradient">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Bismillah */}
          <p className="font-cormorant text-rose-gold text-3xl mb-8 italic">
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>

          {/* Quranic verse */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-rose-gold/20 mb-8">
            <p className="font-cormorant text-dark-brown text-xl leading-relaxed mb-4 italic">
              &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
            </p>
            <p className="font-montserrat text-rose-gold text-sm tracking-wide">
              — QS. Ar-Rum: 21
            </p>
          </div>

          <OrnamentDivider />

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="font-montserrat text-dark-brown/70 text-sm leading-relaxed mb-4">
              Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
            </p>
            <p className="font-cormorant text-dark-brown text-lg leading-relaxed">
              Dengan memohon rahmat dan ridho Allah SWT, kami mengundang{' '}
              {guestName ? (
                <span className="text-rose-gold font-semibold">
                  {decodeURIComponent(guestName)}
                </span>
              ) : (
                <span className="text-rose-gold font-semibold">Bapak/Ibu/Saudara/i</span>
              )}{' '}
              untuk menghadiri acara pernikahan kami.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
