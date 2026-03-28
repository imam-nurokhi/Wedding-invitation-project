import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel - Wedding Rizky & Anisa',
  description: 'Admin panel for wedding invitation management',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
