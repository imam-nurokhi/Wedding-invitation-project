'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WEDDING_DATE = new Date('2025-06-15T08:00:00+07:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const difference = WEDDING_DATE.getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="countdown-box flex flex-col items-center">
      <span className="font-cormorant text-4xl sm:text-5xl text-dark-brown font-semibold leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-montserrat text-xs text-rose-gold tracking-widest uppercase mt-2">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const isPast = WEDDING_DATE.getTime() <= new Date().getTime();

  return (
    <section className="py-16 px-6 bg-wedding-gradient">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-montserrat text-rose-gold text-xs tracking-widest uppercase mb-3">
            Menuju Hari Bahagia
          </p>
          <h2 className="font-cormorant text-4xl sm:text-5xl text-dark-brown font-light mb-4">
            Hitung Mundur
          </h2>
          <p className="font-cormorant text-dark-brown/60 text-lg mb-10">
            Sabtu, 15 Juni 2025
          </p>

          {isPast ? (
            <p className="font-great-vibes text-4xl text-rose-gold">
              Alhamdulillah, sudah menikah! 🎉
            </p>
          ) : (
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <CountdownBox value={timeLeft.days} label="Hari" />
              <span className="font-cormorant text-3xl text-rose-gold/60 -mt-4">:</span>
              <CountdownBox value={timeLeft.hours} label="Jam" />
              <span className="font-cormorant text-3xl text-rose-gold/60 -mt-4">:</span>
              <CountdownBox value={timeLeft.minutes} label="Menit" />
              <span className="font-cormorant text-3xl text-rose-gold/60 -mt-4">:</span>
              <CountdownBox value={timeLeft.seconds} label="Detik" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
