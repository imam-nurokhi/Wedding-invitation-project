'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { CheckCircle, Send } from 'lucide-react';

interface RSVPFormData {
  name: string;
  attendance: string;
  people: number;
  message: string;
}

interface RSVPProps {
  guestName: string;
}

export default function RSVP({ guestName }: RSVPProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RSVPFormData>({
    defaultValues: {
      name: guestName ? decodeURIComponent(guestName) : '',
      attendance: '',
      people: 1,
      message: '',
    },
  });

  const onSubmit = async (data: RSVPFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 bg-wedding-gradient" id="rsvp">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-montserrat text-rose-gold text-xs tracking-widest uppercase mb-3">
            Konfirmasi Kehadiran
          </p>
          <h2 className="font-cormorant text-4xl sm:text-5xl text-dark-brown font-light mb-4">
            RSVP
          </h2>
          <p className="font-cormorant text-dark-brown/60 text-lg">
            Mohon konfirmasi kehadiran Anda sebelum 10 Juni 2025
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="wedding-card p-8"
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-cormorant text-2xl text-dark-brown mb-2">
                  Terima Kasih!
                </h3>
                <p className="font-montserrat text-sm text-dark-brown/60">
                  Konfirmasi kehadiran Anda telah kami terima. Kami sangat menantikan kehadiran Anda.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Name */}
                <div>
                  <label className="font-montserrat text-xs text-dark-brown/60 tracking-wider uppercase block mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    {...register('name', { required: 'Nama wajib diisi' })}
                    className="w-full border border-rose-gold/30 rounded-lg px-4 py-3 font-montserrat text-sm text-dark-brown focus:outline-none focus:border-rose-gold bg-cream/50 transition-colors"
                    placeholder="Masukkan nama Anda"
                  />
                  {errors.name && (
                    <p className="font-montserrat text-xs text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Attendance */}
                <div>
                  <label className="font-montserrat text-xs text-dark-brown/60 tracking-wider uppercase block mb-2">
                    Konfirmasi Kehadiran *
                  </label>
                  <select
                    {...register('attendance', { required: 'Pilih konfirmasi kehadiran' })}
                    className="w-full border border-rose-gold/30 rounded-lg px-4 py-3 font-montserrat text-sm text-dark-brown focus:outline-none focus:border-rose-gold bg-cream/50 transition-colors"
                  >
                    <option value="">-- Pilih --</option>
                    <option value="attending">Insya Allah Hadir</option>
                    <option value="not-attending">Mohon Maaf, Tidak Bisa Hadir</option>
                  </select>
                  {errors.attendance && (
                    <p className="font-montserrat text-xs text-red-500 mt-1">{errors.attendance.message}</p>
                  )}
                </div>

                {/* Number of people */}
                <div>
                  <label className="font-montserrat text-xs text-dark-brown/60 tracking-wider uppercase block mb-2">
                    Jumlah Tamu
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    {...register('people', { min: 1, max: 10 })}
                    className="w-full border border-rose-gold/30 rounded-lg px-4 py-3 font-montserrat text-sm text-dark-brown focus:outline-none focus:border-rose-gold bg-cream/50 transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="font-montserrat text-xs text-dark-brown/60 tracking-wider uppercase block mb-2">
                    Ucapan &amp; Doa
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full border border-rose-gold/30 rounded-lg px-4 py-3 font-montserrat text-sm text-dark-brown focus:outline-none focus:border-rose-gold bg-cream/50 transition-colors resize-none"
                    placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="font-montserrat text-sm">Mengirim...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span className="font-montserrat text-sm tracking-widest uppercase">
                        Kirim Konfirmasi
                      </span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
