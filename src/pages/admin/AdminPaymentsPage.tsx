import React, { useState } from 'react';
import { Search, Download, Smartphone, CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';

type PaymentStatus = 'all' | 'completed' | 'pending' | 'failed';

interface Payment {
  id: string;
  ref: string;
  client: string;
  avatar: string;
  description: string;
  method: 'MPESA' | 'CARD';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

const MOCK_PAYMENTS: Payment[] = [
  { id: 'p1', ref: 'MP-4891023', client: 'Wambui Njeri', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80', description: '10 Class Pack', method: 'MPESA', amount: 18000, status: 'completed', date: 'Aug 5, 2026 · 07:14 AM' },
  { id: 'p2', ref: 'CARD-7712', client: 'Logan Mensah', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80', description: 'Unlimited Monthly', method: 'CARD', amount: 28000, status: 'completed', date: 'Aug 5, 2026 · 09:02 AM' },
  { id: 'p3', ref: 'MP-4890001', client: 'Aisha Kamau', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80', description: 'Single Drop-in', method: 'MPESA', amount: 2800, status: 'pending', date: 'Aug 5, 2026 · 10:30 AM' },
  { id: 'p4', ref: 'MP-4889112', client: 'Brian Otieno', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80', description: '5 Class Pack', method: 'MPESA', amount: 10000, status: 'completed', date: 'Aug 4, 2026 · 04:18 PM' },
  { id: 'p5', ref: 'CARD-6604', client: 'Sarah Wanjiku', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80', description: '10 Class Pack', method: 'CARD', amount: 18000, status: 'failed', date: 'Aug 4, 2026 · 02:11 PM' },
  { id: 'p6', ref: 'MP-4887563', client: 'Emeka Okafor', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80', description: 'Unlimited Monthly', method: 'MPESA', amount: 28000, status: 'completed', date: 'Aug 3, 2026 · 11:45 AM' },
];

const statusConfig = {
  completed: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Completed' },
  pending:   { icon: Clock,        color: 'text-amber-600',   bg: 'bg-amber-50',   label: 'Pending' },
  failed:    { icon: XCircle,      color: 'text-rose-600',    bg: 'bg-rose-50',    label: 'Failed' },
};

export const AdminPaymentsPage: React.FC = () => {
  const [filter, setFilter] = useState<PaymentStatus>('all');
  const [search, setSearch] = useState('');

  const filtered = MOCK_PAYMENTS.filter(p => {
    const matchFilter = filter === 'all' || p.status === filter;
    const matchSearch = p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.ref.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalRevenue = MOCK_PAYMENTS.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);

  return (
    <main className="p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Payments</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Monitor all M-Pesa and card transactions.</p>
        </div>
        <button className="w-full sm:w-auto px-4 py-2.5 bg-white border border-[#e5e2eb] text-[#1c1c2b] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-neutral-50 transition-all">
          <Download className="w-4 h-4 text-[#6b4cc6]" /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Collected', value: `KES ${(totalRevenue / 1000).toFixed(0)}K`, color: '#6b4cc6' },
          { label: 'Transactions', value: MOCK_PAYMENTS.filter(p => p.status === 'completed').length, color: '#1f9d62' },
          { label: 'Pending', value: MOCK_PAYMENTS.filter(p => p.status === 'pending').length, color: '#d97706' },
          { label: 'Failed', value: MOCK_PAYMENTS.filter(p => p.status === 'failed').length, color: '#e11d48' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-[#e5e2eb] rounded-2xl p-4 shadow-sm">
            <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-wider">{s.label}</p>
            <p className="font-serif text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'completed', 'pending', 'failed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? 'bg-[#6b4cc6] text-white'
                  : 'bg-white border border-[#e5e2eb] text-[#6b7280] hover:border-[#b894e6]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto sm:w-64">
          <Search className="w-4 h-4 text-[#9ca3af] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or ref..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#e5e2eb] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e5e2eb] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-[#1c1c2b]">
            <thead className="bg-[#fbf9fd] text-[#6b7280] uppercase text-[10px] font-semibold tracking-wider border-b border-[#e5e2eb]">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e2eb]">
              {filtered.map(p => {
                const st = statusConfig[p.status];
                const Icon = st.icon;
                return (
                  <tr key={p.id} className="hover:bg-[#f4f0fb]/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img src={p.avatar} alt={p.client} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                        <span className="font-semibold">{p.client}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#6b7280]">{p.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`flex items-center gap-1.5 font-semibold ${p.method === 'MPESA' ? 'text-[#1f9d62]' : 'text-[#6b4cc6]'}`}>
                        {p.method === 'MPESA' ? <Smartphone className="w-3.5 h-3.5" /> : <CreditCard className="w-3.5 h-3.5" />}
                        {p.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-[#4e2f80]">
                      KES {p.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold w-fit ${st.bg} ${st.color}`}>
                        <Icon className="w-3 h-3" /> {st.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#6b7280]">{p.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-[10px] text-[#9ca3af]">{p.ref}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#6b7280] text-sm">No transactions found.</div>
        )}
      </div>
    </main>
  );
};
