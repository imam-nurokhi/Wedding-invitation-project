'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Wish {
  id: string;
  name: string;
  message: string;
  date: string;
}

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    loadWishes();
  }, []);

  const loadWishes = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('wedding_wishes') || '[]') as Wish[];
      setWishes([...stored].reverse());
    } catch {
      setWishes([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      const stored = JSON.parse(localStorage.getItem('wedding_wishes') || '[]') as Wish[];
      const newWish: Wish = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        date: new Date().toISOString(),
      };
      stored.push(newWish);
      localStorage.setItem('wedding_wishes', JSON.stringify(stored));
      setName('');
      setMessage('');
      setSubmitSuccess(true);
      loadWishes();
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting wish:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  const gradients = [
    'from-rose-gold to-gold',
    'from-dark-brown to-wedding-brown',
    'from-wedding-brown to-rose-gold',
    'from-gold to-rose-gold',
  ];

  return (
    <section className="py-16 px-6 bg-white" id="wishes">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-montserrat text-rose-gold text-xs tracking-widest uppercase mb-3">
            Kata-Kata Indah
          </p>
          <h2 className="font-cormorant text-4xl sm:text-5xl text-dark-brown font-light mb-4">
            Ucapan &amp; Doa
          </h2>
          <p className="font-cormorant text-dark-brown/60 text-lg">
            Doa dan ucapan dari orang-orang terkasih
          </p>
        </motion.div>

        {/* Wish form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="wedding-card p-6 mb-8"
        >
          <h3 className="font-cormorant text-xl text-dark-brown mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-rose-gold" />
            Kirim Ucapan
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Anda"
              className="w-full border border-rose-gold/30 rounded-lg px-4 py-3 font-montserrat text-sm text-dark-brown focus:outline-none focus:border-rose-gold bg-cream/50"
              required
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..."
              rows={3}
              className="w-full border border-rose-gold/30 rounded-lg px-4 py-3 font-montserrat text-sm text-dark-brown focus:outline-none focus:border-rose-gold bg-cream/50 resize-none"
              required
            />
            <AnimatePresence>
              {submitSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-montserrat text-sm text-green-600"
                >
                  ✓ Ucapan berhasil dikirim!
                </motion.p>
              )}
            </AnimatePresence>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center gap-2 disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              <span className="font-montserrat text-sm tracking-widest uppercase">
                {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
              </span>
            </button>
          </form>
        </motion.div>

        {/* Wishes list */}
        <div className="space-y-4">
          <AnimatePresence>
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                className="wedding-card p-5"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center text-white text-sm font-cormorant font-semibold flex-shrink-0`}
                  >
                    {getInitials(wish.name)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-cormorant text-dark-brown font-semibold text-base">
                        {wish.name}
                      </h4>
                      <span className="font-montserrat text-xs text-dark-brown/40">
                        {format(new Date(wish.date), 'd MMM yyyy', { locale: id })}
                      </span>
                    </div>
                    <p className="font-montserrat text-sm text-dark-brown/70 leading-relaxed">
                      {wish.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
