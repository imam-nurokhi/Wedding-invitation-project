'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminGuard from '@/components/admin/AdminGuard';
import { Download, Filter, Search, Users } from 'lucide-react';

interface RSVP {
  id: string;
  name: string;
  attendance: string;
  people: number;
  message: string;
  date: string;
}

export default function AdminRSVP() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/rsvp')
      .then(r => r.json())
      .then(setRsvps);
  }, []);

  const filtered = rsvps.filter(r => {
    const matchesFilter = filter === 'all' || r.attendance === filter;
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const exportCSV = () => {
    const headers = ['Nama', 'Kehadiran', 'Jumlah Tamu', 'Pesan', 'Tanggal'];
    const rows = rsvps.map(r => [
      r.name,
      r.attendance === 'attending' ? 'Hadir' : 'Tidak Hadir',
      r.people,
      r.message,
      new Date(r.date).toLocaleDateString('id-ID'),
    ]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvp-rizky-anisa.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const attending = rsvps.filter(r => r.attendance === 'attending').length;
  const notAttending = rsvps.filter(r => r.attendance === 'not-attending').length;

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-cormorant text-3xl text-[#4A2C0A] font-semibold mb-1">
                  Manajemen RSVP
                </h1>
                <p className="font-montserrat text-sm text-gray-500">
                  {rsvps.length} total · {attending} hadir · {notAttending} tidak hadir
                </p>
              </div>
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 bg-gradient-to-r from-[#C8A97C] to-[#D4AF37] text-white font-montserrat text-sm px-4 py-2 rounded-lg hover:shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Total RSVP', value: rsvps.length, color: 'border-[#C8A97C]', bg: 'bg-[#C8A97C]/5' },
                { label: 'Hadir', value: attending, color: 'border-green-400', bg: 'bg-green-50' },
                { label: 'Tidak Hadir', value: notAttending, color: 'border-red-400', bg: 'bg-red-50' },
              ].map(item => (
                <div key={item.label} className={`${item.bg} border ${item.color} rounded-xl p-4 text-center`}>
                  <p className="font-montserrat text-2xl font-bold text-gray-800">{item.value}</p>
                  <p className="font-montserrat text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg font-montserrat text-sm text-gray-700 focus:outline-none focus:border-[#C8A97C]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 font-montserrat text-sm text-gray-700 focus:outline-none focus:border-[#C8A97C]"
                >
                  <option value="all">Semua</option>
                  <option value="attending">Hadir</option>
                  <option value="not-attending">Tidak Hadir</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['Nama', 'Kehadiran', 'Tamu', 'Pesan', 'Tanggal'].map(h => (
                        <th key={h} className="font-montserrat text-xs text-gray-500 tracking-wider uppercase text-left px-6 py-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-12">
                          <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                          <p className="font-montserrat text-sm text-gray-400">Belum ada data RSVP</p>
                        </td>
                      </tr>
                    ) : (
                      filtered.map(rsvp => (
                        <tr key={rsvp.id} className="hover:bg-gray-50 transition-colors">
                          <td className="font-montserrat text-sm font-medium text-gray-800 px-6 py-4">{rsvp.name}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-montserrat font-medium ${
                              rsvp.attendance === 'attending'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {rsvp.attendance === 'attending' ? '✓ Hadir' : '✗ Tidak Hadir'}
                            </span>
                          </td>
                          <td className="font-montserrat text-sm text-gray-600 px-6 py-4">{rsvp.people} orang</td>
                          <td className="font-montserrat text-sm text-gray-500 px-6 py-4 max-w-xs">
                            <p className="truncate">{rsvp.message || '-'}</p>
                          </td>
                          <td className="font-montserrat text-xs text-gray-400 px-6 py-4">
                            {new Date(rsvp.date).toLocaleDateString('id-ID')}
                          </td>
                        </tr>
                      ))
                    )}
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
