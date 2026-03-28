'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminGuard from '@/components/admin/AdminGuard';
import { Users, MessageSquare, UserCheck, UserX, TrendingUp, Calendar, Heart } from 'lucide-react';

interface RSVP {
  id: string;
  name: string;
  attendance: string;
  people: number;
  message: string;
  date: string;
}

interface Wish {
  id: string;
  name: string;
  message: string;
  date: string;
}

function StatCard({ icon: Icon, label, value, color }: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <TrendingUp className="w-4 h-4 text-green-400" />
      </div>
      <p className="font-montserrat text-2xl font-bold text-gray-800">{value}</p>
      <p className="font-montserrat text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/rsvp').then(r => r.json()),
      fetch('/api/wishes').then(r => r.json()),
    ]).then(([rsvpData, wishData]) => {
      setRsvps(rsvpData);
      setWishes(wishData);
    });
  }, []);

  const attending = rsvps.filter(r => r.attendance === 'attending').length;
  const notAttending = rsvps.filter(r => r.attendance === 'not-attending').length;
  const totalGuests = rsvps.filter(r => r.attendance === 'attending').reduce((sum, r) => sum + (r.people || 0), 0);

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-cormorant text-3xl text-[#4A2C0A] font-semibold mb-1">
                Dashboard
              </h1>
              <p className="font-montserrat text-sm text-gray-500">
                Selamat datang di admin panel pernikahan Rizky & Anisa
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard icon={Users} label="Total RSVP" value={rsvps.length} color="bg-gradient-to-br from-[#C8A97C] to-[#D4AF37]" />
              <StatCard icon={UserCheck} label="Hadir" value={attending} color="bg-gradient-to-br from-green-400 to-green-600" />
              <StatCard icon={UserX} label="Tidak Hadir" value={notAttending} color="bg-gradient-to-br from-red-400 to-red-600" />
              <StatCard icon={MessageSquare} label="Ucapan" value={wishes.length} color="bg-gradient-to-br from-purple-400 to-purple-600" />
            </div>

            {/* Additional stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-[#C8A97C]" />
                  <h3 className="font-cormorant text-xl text-[#4A2C0A] font-semibold">Info Acara</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-montserrat text-gray-500">Tanggal</span>
                    <span className="font-montserrat text-gray-800 font-medium">Sabtu, 15 Juni 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-montserrat text-gray-500">Akad Nikah</span>
                    <span className="font-montserrat text-gray-800 font-medium">08:00 - 10:00 WIB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-montserrat text-gray-500">Resepsi</span>
                    <span className="font-montserrat text-gray-800 font-medium">11:00 - 15:00 WIB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-montserrat text-gray-500">Total Tamu Hadir</span>
                    <span className="font-montserrat text-[#C8A97C] font-bold">{totalGuests} orang</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-5 h-5 text-[#C8A97C]" />
                  <h3 className="font-cormorant text-xl text-[#4A2C0A] font-semibold">Ucapan Terbaru</h3>
                </div>
                <div className="space-y-3">
                  {wishes.slice(-3).reverse().map(wish => (
                    <div key={wish.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C8A97C] to-[#D4AF37] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                        {wish.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-montserrat text-xs font-semibold text-gray-700">{wish.name}</p>
                        <p className="font-montserrat text-xs text-gray-500 line-clamp-1">{wish.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent RSVPs table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-cormorant text-xl text-[#4A2C0A] font-semibold">RSVP Terbaru</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Nama', 'Kehadiran', 'Tamu', 'Tanggal'].map(h => (
                        <th key={h} className="font-montserrat text-xs text-gray-500 tracking-wider uppercase text-left px-6 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {rsvps.slice(-5).reverse().map(rsvp => (
                      <tr key={rsvp.id} className="hover:bg-gray-50">
                        <td className="font-montserrat text-sm text-gray-800 px-6 py-4">{rsvp.name}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-montserrat font-medium ${
                            rsvp.attendance === 'attending'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {rsvp.attendance === 'attending' ? 'Hadir' : 'Tidak Hadir'}
                          </span>
                        </td>
                        <td className="font-montserrat text-sm text-gray-600 px-6 py-4">{rsvp.people}</td>
                        <td className="font-montserrat text-xs text-gray-400 px-6 py-4">
                          {new Date(rsvp.date).toLocaleDateString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
