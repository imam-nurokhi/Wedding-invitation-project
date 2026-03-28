'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Heart, LayoutDashboard, Users, MessageSquare, Settings, Gift, LogOut } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/rsvp', label: 'RSVP', icon: Users },
  { href: '/admin/wishes', label: 'Ucapan', icon: MessageSquare },
  { href: '/admin/content', label: 'Konten', icon: Settings },
  { href: '/admin/gifts', label: 'Hadiah', icon: Gift },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-[#4A2C0A] to-[#8B4513] text-white flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8A97C] to-[#D4AF37] flex items-center justify-center">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <p className="font-cormorant text-lg font-semibold text-[#F5E6D3]">Rizky & Anisa</p>
            <p className="font-montserrat text-xs text-white/50">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-montserrat text-sm transition-all duration-200 ${
                active
                  ? 'bg-[#C8A97C]/20 text-[#F5E6D3] border border-[#C8A97C]/30'
                  : 'text-white/60 hover:text-white/90 hover:bg-white/10'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-[#C8A97C]' : ''}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg font-montserrat text-sm text-white/60 hover:text-white/90 hover:bg-white/10 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
