import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Calendar, Search, Filter, ChevronDown, Check, X, Clock, Eye } from 'lucide-react';

type BookingStatus = 'confirmed' | 'pending' | 'canceled' | 'waitlist';

interface Booking {
  id: string;
  client: string;
  avatar: string;
  classTitle: string;
  instructor: string;
  date: string;
  time: string;
  package: string;
  status: BookingStatus;
  amountKES: number;
}

const MOCK_BOOKINGS: Booking[] = [
  { id: 'b1', client: 'Wambui Njeri', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80', classTitle: 'Reformer Flow', instructor: 'Amara Osei', date: 'Aug 5, 2026', time: '07:00 AM', package: '10 Class Pack', status: 'confirmed', amountKES: 2200 },
  { id: 'b2', client: 'Logan Mensah', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80', classTitle: 'Clinical Pilates', instructor: 'Dr. Siti Rahmat', date: 'Aug 5, 2026', time: '09:00 AM', package: 'Single Drop-in', status: 'confirmed', amountKES: 2800 },
  { id: 'b3', client: 'Aisha Kamau', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80', classTitle: 'Stretch Therapy', instructor: 'Marcus Ferreira', date: 'Aug 5, 2026', time: '10:30 AM', package: 'Unlimited Monthly', status: 'waitlist', amountKES: 0 },
  { id: 'b4', client: 'Brian Otieno', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80', classTitle: 'Reformer Flow', instructor: 'Amara Osei', date: 'Aug 6, 2026', time: '07:00 AM', package: '5 Class Pack', status: 'pending', amountKES: 2200 },
  { id: 'b5', client: 'Sarah Wanjiku', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80', classTitle: 'Breathwork & Sound', instructor: 'Yuki Tanaka', date: 'Aug 6, 2026', time: '05:30 PM', package: '10 Class Pack', status: 'canceled', amountKES: 1800 },
  { id: 'b6', client: 'Emeka Okafor', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80', classTitle: 'Mat Pilates', instructor: 'Amara Osei', date: 'Aug 7, 2026', time: '08:00 AM', package: 'Unlimited Monthly', status: 'confirmed', amountKES: 0 },
];

const statusStyles: Record<BookingStatus, string> = {
  confirmed: 'bg-emerald-50 text-emerald-700',
  pending: 'bg-amber-50 text-amber-700',
  canceled: 'bg-rose-50 text-rose-700',
  waitlist: 'bg-[#f4f0fb] text-[#6b4cc6]',
};

export const AdminBookingsPage: React.FC = () => {
  const { user } = useOutletContext<{ user: any }>();
  const [filter, setFilter] = useState<'all' | BookingStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = MOCK_BOOKINGS.filter(b => {
    const matchesFilter = filter === 'all' || b.status === filter;
    const matchesSearch = b.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.classTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Bookings</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">View and manage all class reservations.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#9ca3af] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by client or class..."
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#e5e2eb] rounded-2xl text-xs text-[#1c1c2b] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {(['all', 'confirmed', 'pending', 'waitlist', 'canceled'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-[#6b4cc6] text-white' : 'bg-white border border-[#e5e2eb] text-[#6b7280] hover:border-[#b894e6]'}`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-xs text-[#6b7280] font-medium">{filtered.length} result{filtered.length !== 1 && 's'}</span>
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-[#e5e2eb] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1c1c2b]">
            <thead className="bg-[#fbf9fd] text-[#6b7280] uppercase tracking-wider text-[10px] font-semibold border-b border-[#e5e2eb]">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e2eb]">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-[#f4f0fb]/40 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img src={b.avatar} alt={b.client} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                      <span className="font-semibold">{b.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="block font-medium text-[#1c1c2b]">{b.classTitle}</span>
                    <span className="block text-[10px] text-[#6b7280]">{b.instructor}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="block font-medium">{b.date}</span>
                    <span className="block text-[10px] text-[#6b7280] flex items-center gap-1"><Clock className="w-3 h-3 inline" /> {b.time}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#6b7280]">{b.package}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-[#4e2f80]">
                    {b.amountKES > 0 ? `KES ${b.amountKES.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${statusStyles[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 text-neutral-400 hover:text-[#6b4cc6] hover:bg-[#f4f0fb] rounded-xl transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      {b.status === 'confirmed' && (
                        <button className="p-2 text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors" title="Check In"><Check className="w-4 h-4" /></button>
                      )}
                      {b.status !== 'canceled' && (
                        <button className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors" title="Cancel"><X className="w-4 h-4" /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#6b7280] text-sm">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-[#d3c2f0]" />
            No bookings found.
          </div>
        )}
      </div>
    </main>
  );
};
