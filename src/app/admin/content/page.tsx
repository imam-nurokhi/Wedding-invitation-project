'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminGuard from '@/components/admin/AdminGuard';
import { Save, CheckCircle } from 'lucide-react';

const DEFAULT_CONTENT = {
  groom: {
    name: 'Rizky Ahmad Fauzi',
    nickname: 'Rizky',
    fatherName: 'Bapak Ahmad Fauzi',
    motherName: 'Ibu Siti Nurhaliza',
    instagram: '@rizkyahmad_',
  },
  bride: {
    name: 'Anisa Rahma Putri',
    nickname: 'Anisa',
    fatherName: 'Bapak Rahmat Hidayat',
    motherName: 'Ibu Dewi Lestari',
    instagram: '@anisarahmaputri',
  },
  akad: {
    date: 'Sabtu, 15 Juni 2025',
    startTime: '08:00',
    endTime: '10:00',
    venue: 'Masjid Al-Hikmah',
    address: 'Jl. Masjid No. 12, Jakarta Selatan',
  },
  reception: {
    date: 'Sabtu, 15 Juni 2025',
    startTime: '11:00',
    endTime: '15:00',
    venue: 'Gedung Serbaguna Al-Hikmah',
    address: 'Jl. Masjid No. 14, Jakarta Selatan',
  },
};

function InputField({ label, value, onChange, placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="font-montserrat text-xs text-gray-500 tracking-wider uppercase block mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 font-montserrat text-sm text-gray-700 focus:outline-none focus:border-[#C8A97C]"
      />
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="font-cormorant text-xl text-[#4A2C0A] font-semibold">{title}</h3>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

export default function AdminContent() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('wedding_content');
    if (stored) {
      try {
        setContent(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('wedding_content', JSON.stringify(content));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (section: keyof typeof content, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-cormorant text-3xl text-[#4A2C0A] font-semibold mb-1">
                  Manajemen Konten
                </h1>
                <p className="font-montserrat text-sm text-gray-500">Edit informasi pernikahan</p>
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-[#C8A97C] to-[#D4AF37] text-white font-montserrat text-sm px-5 py-2.5 rounded-lg hover:shadow-md transition-all"
              >
                {saved ? (
                  <><CheckCircle className="w-4 h-4" /> Tersimpan!</>
                ) : (
                  <><Save className="w-4 h-4" /> Simpan Perubahan</>
                )}
              </button>
            </div>

            <div className="space-y-6">
              <SectionCard title="Data Mempelai Pria">
                <InputField label="Nama Lengkap" value={content.groom.name} onChange={v => update('groom', 'name', v)} />
                <InputField label="Nama Panggilan" value={content.groom.nickname} onChange={v => update('groom', 'nickname', v)} />
                <InputField label="Nama Ayah" value={content.groom.fatherName} onChange={v => update('groom', 'fatherName', v)} />
                <InputField label="Nama Ibu" value={content.groom.motherName} onChange={v => update('groom', 'motherName', v)} />
                <InputField label="Instagram" value={content.groom.instagram} onChange={v => update('groom', 'instagram', v)} />
              </SectionCard>

              <SectionCard title="Data Mempelai Wanita">
                <InputField label="Nama Lengkap" value={content.bride.name} onChange={v => update('bride', 'name', v)} />
                <InputField label="Nama Panggilan" value={content.bride.nickname} onChange={v => update('bride', 'nickname', v)} />
                <InputField label="Nama Ayah" value={content.bride.fatherName} onChange={v => update('bride', 'fatherName', v)} />
                <InputField label="Nama Ibu" value={content.bride.motherName} onChange={v => update('bride', 'motherName', v)} />
                <InputField label="Instagram" value={content.bride.instagram} onChange={v => update('bride', 'instagram', v)} />
              </SectionCard>

              <SectionCard title="Akad Nikah">
                <InputField label="Tanggal" value={content.akad.date} onChange={v => update('akad', 'date', v)} />
                <InputField label="Waktu Mulai" value={content.akad.startTime} onChange={v => update('akad', 'startTime', v)} />
                <InputField label="Waktu Selesai" value={content.akad.endTime} onChange={v => update('akad', 'endTime', v)} />
                <InputField label="Venue" value={content.akad.venue} onChange={v => update('akad', 'venue', v)} />
                <div className="sm:col-span-2">
                  <InputField label="Alamat" value={content.akad.address} onChange={v => update('akad', 'address', v)} />
                </div>
              </SectionCard>

              <SectionCard title="Resepsi Pernikahan">
                <InputField label="Tanggal" value={content.reception.date} onChange={v => update('reception', 'date', v)} />
                <InputField label="Waktu Mulai" value={content.reception.startTime} onChange={v => update('reception', 'startTime', v)} />
                <InputField label="Waktu Selesai" value={content.reception.endTime} onChange={v => update('reception', 'endTime', v)} />
                <InputField label="Venue" value={content.reception.venue} onChange={v => update('reception', 'venue', v)} />
                <div className="sm:col-span-2">
                  <InputField label="Alamat" value={content.reception.address} onChange={v => update('reception', 'address', v)} />
                </div>
              </SectionCard>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
