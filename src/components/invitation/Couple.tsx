'use client';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
import OrnamentDivider from './OrnamentDivider';

interface Person {
  name: string;
  nickname: string;
  description: string;
  fatherName: string;
  motherName: string;
  instagram: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
}

function PersonCard({ person, delay = 0 }: { person: Person; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className="text-center"
    >
      {/* Avatar */}
      <div className="relative inline-block mb-6">
        <div
          className="w-40 h-40 rounded-full mx-auto flex items-center justify-center text-4xl font-cormorant text-white font-light shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${person.gradientFrom}, ${person.gradientTo})`,
          }}
        >
          {person.initials}
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
          <Heart className="w-4 h-4 text-rose-gold fill-rose-gold" />
        </div>
      </div>

      <h3 className="font-great-vibes text-4xl text-rose-gold mb-2">{person.nickname}</h3>
      <h4 className="font-cormorant text-xl text-dark-brown font-medium mb-3">{person.name}</h4>
      
      <div className="flex items-center justify-center gap-1 mb-4 text-dark-brown/60">
        <Instagram className="w-3.5 h-3.5" />
        <span className="font-montserrat text-sm">{person.instagram}</span>
      </div>

      <p className="font-cormorant text-dark-brown/70 text-base leading-relaxed max-w-xs mx-auto">
        {person.description}
      </p>
      
      <div className="mt-4 space-y-1">
        <p className="font-montserrat text-sm text-dark-brown/60">
          Putra/i dari:
        </p>
        <p className="font-cormorant text-dark-brown text-base">{person.fatherName}</p>
        <p className="font-cormorant text-dark-brown/70 text-sm">&amp;</p>
        <p className="font-cormorant text-dark-brown text-base">{person.motherName}</p>
      </div>
    </motion.div>
  );
}

export default function Couple() {
  const groom: Person = {
    name: 'Muhammad Ichsan',
    nickname: 'Ichsan',
    description: 'Putra pertama yang tumbuh dengan penuh cinta dan harapan keluarga.',
    fatherName: 'Bapak Deni Setiawan',
    motherName: 'Ibu Endang Susilawati',
    instagram: '@muhammadichsan_',
    initials: 'I',
    gradientFrom: '#8B6F47',
    gradientTo: '#C8A97C',
  };

  const bride: Person = {
    name: 'Wulan Rahayu',
    nickname: 'Wulan',
    description: 'Putri yang cantik hati, tumbuh menjadi wanita yang anggun dan berbudi.',
    fatherName: 'Bapak Agus Rahayu',
    motherName: 'Ibu Sri Mulyani',
    instagram: '@wulanrahayu_',
    initials: 'W',
    gradientFrom: '#C8A97C',
    gradientTo: '#E8C99A',
  };

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
            Mempelai
          </p>
          <h2 className="font-cormorant text-4xl sm:text-5xl text-dark-brown font-light">
            Yang Berbahagia
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <PersonCard person={groom} delay={0.2} />
          
          {/* Heart divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-rose-gold hidden md:block" />
            <div className="relative">
              <Heart className="w-16 h-16 text-rose-gold fill-rose-gold animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
            <p className="font-great-vibes text-3xl text-rose-gold">&amp;</p>
            <div className="w-px h-16 bg-gradient-to-t from-transparent to-rose-gold hidden md:block" />
          </motion.div>
          
          <PersonCard person={bride} delay={0.6} />
        </div>

        <OrnamentDivider className="mt-12" />
      </div>
    </section>
  );
}
