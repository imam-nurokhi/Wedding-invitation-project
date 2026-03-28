'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Gift as GiftIcon } from 'lucide-react';

interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
  color: string;
}

const accounts: BankAccount[] = [
  {
    bank: 'Bank BCA',
    accountNumber: '1234567890',
    accountName: 'Muhammad Ichsan',
    color: 'from-blue-600 to-blue-400',
  },
  {
    bank: 'Bank Mandiri',
    accountNumber: '0987654321',
    accountName: 'Wulan Rahayu',
    color: 'from-yellow-600 to-yellow-400',
  },
];

function BankCard({ account, delay }: { account: BankAccount; delay: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(account.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className="wedding-card p-6 relative overflow-hidden"
    >
      {/* Card top decoration */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${account.color}`} />
      
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${account.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
          <span className="text-white font-bold text-xs">{account.bank.split(' ')[1]}</span>
        </div>
        <div className="flex-1">
          <p className="font-montserrat text-xs text-dark-brown/50 tracking-wider uppercase mb-1">
            {account.bank}
          </p>
          <p className="font-cormorant text-2xl text-dark-brown font-semibold tracking-wider mb-1">
            {account.accountNumber}
          </p>
          <p className="font-montserrat text-sm text-dark-brown/70">
            a.n. {account.accountName}
          </p>
        </div>
      </div>

      <button
        onClick={handleCopy}
        className="mt-4 w-full flex items-center justify-center gap-2 border border-rose-gold/40 rounded-lg py-2.5 font-montserrat text-sm text-rose-gold hover:bg-rose-gold/5 transition-colors duration-200"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-green-500">Berhasil Disalin!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Salin Nomor Rekening</span>
          </>
        )}
      </button>
    </motion.div>
  );
}

export default function Gift() {
  return (
    <section className="py-16 px-6 bg-wedding-gradient">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-montserrat text-rose-gold text-xs tracking-widest uppercase mb-3">
            Hadiah Pernikahan
          </p>
          <h2 className="font-cormorant text-4xl sm:text-5xl text-dark-brown font-light mb-4">
            Amplop Digital
          </h2>
          <p className="font-cormorant text-dark-brown/60 text-lg leading-relaxed">
            Bagi yang ingin memberikan hadiah, kami dengan senang hati menerima melalui transfer ke:
          </p>
        </motion.div>

        {/* Gift icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-gold to-gold flex items-center justify-center shadow-lg animate-float">
            <GiftIcon className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {accounts.map((account, index) => (
            <BankCard key={account.bank} account={account} delay={index * 0.2} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center font-cormorant text-dark-brown/50 text-base mt-8 italic"
        >
          Kehadiran dan doa Anda adalah hadiah terbaik bagi kami 💕
        </motion.p>
      </div>
    </section>
  );
}
