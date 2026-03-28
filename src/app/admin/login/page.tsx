'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 800));

    if (username === 'admin' && password === 'wedding2025') {
      localStorage.setItem('admin_token', 'wedding_admin_2025');
      router.push('/admin');
    } else {
      setError('Username atau password salah');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF8F0] to-[#F5E6D3] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-[#C8A97C]/20 w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A97C] to-[#D4AF37] mb-4 shadow-md">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <h1 className="font-cormorant text-3xl text-[#4A2C0A] font-semibold mb-1">
            Admin Panel
          </h1>
          <p className="font-montserrat text-sm text-[#4A2C0A]/50">
            Rizky & Anisa Wedding
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="font-montserrat text-xs text-[#4A2C0A]/60 tracking-wider uppercase block mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8A97C]" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#C8A97C]/30 rounded-lg font-montserrat text-sm text-[#4A2C0A] focus:outline-none focus:border-[#C8A97C] bg-[#FDF8F0]/50"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-montserrat text-xs text-[#4A2C0A]/60 tracking-wider uppercase block mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8A97C]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-[#C8A97C]/30 rounded-lg font-montserrat text-sm text-[#4A2C0A] focus:outline-none focus:border-[#C8A97C] bg-[#FDF8F0]/50"
                placeholder="wedding2025"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A2C0A]/40 hover:text-[#4A2C0A]/70"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="font-montserrat text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#C8A97C] to-[#D4AF37] text-white font-montserrat text-sm tracking-widest uppercase py-3 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>

        <p className="text-center font-montserrat text-xs text-[#4A2C0A]/40 mt-6">
          Demo credentials: admin / wedding2025
        </p>
      </div>
    </div>
  );
}
