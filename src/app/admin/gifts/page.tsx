'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminGuard from '@/components/admin/AdminGuard';
import { Save, CheckCircle, Copy, Check } from 'lucide-react';

interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
}

const DEFAULT_ACCOUNTS: BankAccount[] = [
  { bank: 'Bank BCA', accountNumber: '1234567890', accountName: 'Rizky Ahmad Fauzi' },
  { bank: 'Bank Mandiri', accountNumber: '0987654321', accountName: 'Anisa Rahma Putri' },
];

export default function AdminGifts() {
  const [accounts, setAccounts] = useState<BankAccount[]>(DEFAULT_ACCOUNTS);
  const [saved, setSaved] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('wedding_bank_accounts');
    if (stored) {
      try { setAccounts(JSON.parse(stored)); } catch {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('wedding_bank_accounts', JSON.stringify(accounts));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateAccount = (index: number, field: keyof BankAccount, value: string) => {
    setAccounts(prev => prev.map((acc, i) => i === index ? { ...acc, [field]: value } : acc));
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-cormorant text-3xl text-[#4A2C0A] font-semibold mb-1">
                  Amplop Digital
                </h1>
                <p className="font-montserrat text-sm text-gray-500">Kelola rekening bank</p>
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-[#C8A97C] to-[#D4AF37] text-white font-montserrat text-sm px-5 py-2.5 rounded-lg hover:shadow-md transition-all"
              >
                {saved ? <><CheckCircle className="w-4 h-4" /> Tersimpan!</> : <><Save className="w-4 h-4" /> Simpan</>}
              </button>
            </div>

            <div className="space-y-6">
              {accounts.map((account, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-cormorant text-xl text-[#4A2C0A] font-semibold">{account.bank}</h3>
                    <button
                      onClick={() => handleCopy(account.accountNumber, index)}
                      className="flex items-center gap-1.5 text-[#C8A97C] hover:text-[#8B4513] transition-colors font-montserrat text-xs"
                    >
                      {copiedIndex === index ? (
                        <><Check className="w-3.5 h-3.5 text-green-500" /><span className="text-green-500">Disalin!</span></>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" />Salin No. Rekening</>
                      )}
                    </button>
                  </div>
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Nama Bank', field: 'bank' as keyof BankAccount },
                      { label: 'Nomor Rekening', field: 'accountNumber' as keyof BankAccount },
                      { label: 'Atas Nama', field: 'accountName' as keyof BankAccount },
                    ].map(({ label, field }) => (
                      <div key={field}>
                        <label className="font-montserrat text-xs text-gray-500 tracking-wider uppercase block mb-1.5">{label}</label>
                        <input
                          type="text"
                          value={account[field]}
                          onChange={(e) => updateAccount(index, field, e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 font-montserrat text-sm text-gray-700 focus:outline-none focus:border-[#C8A97C]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
