'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminGuard from '@/components/admin/AdminGuard';
import { MessageSquare, Trash2, Search } from 'lucide-react';

interface Wish {
  id: string;
  name: string;
  message: string;
  date: string;
}

export default function AdminWishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = () => {
    fetch('/api/wishes')
      .then(r => r.json())
      .then(data => setWishes(data.reverse()));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus ucapan ini?')) return;
    setDeletingId(id);
    try {
      await fetch(`/api/wishes?id=${id}`, { method: 'DELETE' });
      setWishes(prev => prev.filter(w => w.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = wishes.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.message.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="font-cormorant text-3xl text-[#4A2C0A] font-semibold mb-1">
                Manajemen Ucapan
              </h1>
              <p className="font-montserrat text-sm text-gray-500">
                {wishes.length} ucapan diterima
              </p>
            </div>

            {/* Search */}
            <div className="relative max-w-sm mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari ucapan..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg font-montserrat text-sm text-gray-700 focus:outline-none focus:border-[#C8A97C]"
              />
            </div>

            {/* Wishes list */}
            <div className="space-y-4">
              {filtered.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                  <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="font-montserrat text-sm text-gray-400">Belum ada ucapan</p>
                </div>
              ) : (
                filtered.map(wish => (
                  <div key={wish.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8A97C] to-[#D4AF37] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {getInitials(wish.name)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-montserrat text-sm font-semibold text-gray-800">{wish.name}</h4>
                        <span className="font-montserrat text-xs text-gray-400">
                          {new Date(wish.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <p className="font-montserrat text-sm text-gray-600 leading-relaxed">{wish.message}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(wish.id)}
                      disabled={deletingId === wish.id}
                      className="text-gray-300 hover:text-red-400 transition-colors disabled:opacity-50 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
