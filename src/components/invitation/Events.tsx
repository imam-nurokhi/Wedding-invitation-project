'use client';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, ExternalLink } from 'lucide-react';

interface EventCardProps {
  type: 'akad' | 'resepsi';
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  address: string;
  mapsLink: string;
  delay?: number;
}

function EventCard({ type, title, date, startTime, endTime, venue, address, mapsLink, delay = 0 }: EventCardProps) {
  const iconBg = type === 'akad' 
    ? 'bg-gradient-to-br from-dark-brown to-wedding-brown' 
    : 'bg-gradient-to-br from-rose-gold to-gold';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className="wedding-card p-8 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-rose-gold/5 translate-x-16 -translate-y-16" />
      
      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${iconBg} mb-6 shadow-md`}>
        {type === 'akad' ? (
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10-6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm1 9.5L8.5 13l1.42-1.42L11 12.67l3.08-3.08L15.5 11 13 13.5z"/>
          </svg>
        ) : (
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
        )}
      </div>

      {/* Title */}
      <h3 className="font-cormorant text-2xl text-dark-brown font-semibold mb-6">
        {title}
      </h3>

      {/* Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-3">
          <Calendar className="w-4 h-4 text-rose-gold mt-0.5 flex-shrink-0" />
          <span className="font-montserrat text-sm text-dark-brown/70">{date}</span>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="w-4 h-4 text-rose-gold mt-0.5 flex-shrink-0" />
          <span className="font-montserrat text-sm text-dark-brown/70">
            {startTime} – {endTime} WIB
          </span>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-rose-gold mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-montserrat text-sm text-dark-brown font-medium">{venue}</p>
            <p className="font-montserrat text-xs text-dark-brown/60 mt-0.5">{address}</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-rose-gold/20 mb-6" />

      {/* Maps button */}
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-montserrat text-sm text-rose-gold hover:text-dark-brown transition-colors duration-200 font-medium"
      >
        <MapPin className="w-4 h-4" />
        Lihat Lokasi
        <ExternalLink className="w-3 h-3" />
      </a>
    </motion.div>
  );
}

export default function Events() {
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
            Jadwal Acara
          </p>
          <h2 className="font-cormorant text-4xl sm:text-5xl text-dark-brown font-light">
            Detail Acara
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <EventCard
            type="akad"
            title="Akad Nikah"
            date="Sabtu, 15 Juni 2025"
            startTime="08:00"
            endTime="10:00"
            venue="Masjid Al-Hikmah"
            address="Jl. Masjid No. 12, Jakarta Selatan"
            mapsLink="https://maps.google.com/?q=Masjid+Al-Hikmah+Jakarta+Selatan"
            delay={0.2}
          />
          <EventCard
            type="resepsi"
            title="Resepsi Pernikahan"
            date="Sabtu, 15 Juni 2025"
            startTime="11:00"
            endTime="15:00"
            venue="Gedung Serbaguna Al-Hikmah"
            address="Jl. Masjid No. 14, Jakarta Selatan"
            mapsLink="https://maps.google.com/?q=Gedung+Serbaguna+Al-Hikmah+Jakarta+Selatan"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}
