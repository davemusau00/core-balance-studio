import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, Clock, XCircle, RotateCcw, Filter, Calendar } from 'lucide-react';

type BookingStatus = 'all' | 'confirmed' | 'attended' | 'cancelled';

// Sample booking history data
const SAMPLE_HISTORY = [
  { id: 'bk_1', sessionTitle: 'Reformer Pilates', instructorName: 'Wambui M.', date: 'Wed 14 May 2026', time: '07:00 AM', priceKES: 2200, paymentMethod: 'MPESA', status: 'attended', transactionRef: 'MP-381929' },
  { id: 'bk_2', sessionTitle: 'Stretch Therapy', instructorName: 'Logan N.', date: 'Sat 11 May 2026', time: '08:30 AM', priceKES: 2000, paymentMethod: 'MPESA', status: 'attended', transactionRef: 'MP-381802' },
  { id: 'bk_3', sessionTitle: 'Jumpboard Reformer', instructorName: 'Logan N.', date: 'Wed 7 May 2026', time: '01:00 PM', priceKES: 2500, paymentMethod: 'CARD', status: 'attended', transactionRef: 'CARD-4819' },
  { id: 'bk_4', sessionTitle: 'Trapeze Yoga', instructorName: 'Tami K.', date: 'Sat 4 May 2026', time: '10:00 AM', priceKES: 2300, paymentMethod: 'MPESA', status: 'cancelled', transactionRef: 'MP-377211' },
  { id: 'bk_5', sessionTitle: 'Strength & Sculpt', instructorName: 'Logan N.', date: 'Wed 30 Apr 2026', time: '04:00 PM', priceKES: 2400, paymentMethod: 'MPESA', status: 'confirmed', transactionRef: 'MP-371994' },
];

export const BookingHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<BookingStatus>('all');

  const filtered = SAMPLE_HISTORY.filter(b => filter === 'all' || b.status === filter);
  const totalSpent = SAMPLE_HISTORY.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.priceKES, 0);
  const totalAttended = SAMPLE_HISTORY.filter(b => b.status === 'attended').length;

  const statusIcon = (status: string) => {
    if (status === 'attended') return <CheckCircle className="w-4 h-4 text-emerald-600" />;
    if (status === 'cancelled') return <XCircle className="w-4 h-4 text-rose-500" />;
    return <Clock className="w-4 h-4 text-amber-500" />;
  };

  const statusBadge = (status: string) => {
    if (status === 'attended') return 'bg-emerald-50 text-emerald-800';
    if (status === 'cancelled') return 'bg-rose-50 text-rose-700';
    return 'bg-amber-50 text-amber-800';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <div className="border-b border-[#e5e2eb] pb-4">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c2b]">Booking History</h1>
        <p className="text-xs sm:text-sm text-[#6b7280] mt-0.5">Your complete class attendance and payment record.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-[#e5e2eb] rounded-2xl p-4 text-center">
          <p className="font-serif text-2xl font-bold text-[#6b4cc6]">{totalAttended}</p>
          <p className="text-[11px] text-[#6b7280] font-medium mt-0.5">Classes Attended</p>
        </div>
        <div className="bg-white border border-[#e5e2eb] rounded-2xl p-4 text-center">
          <p className="font-serif text-2xl font-bold text-[#1c1c2b]">KES {(totalSpent / 1000).toFixed(1)}K</p>
          <p className="text-[11px] text-[#6b7280] font-medium mt-0.5">Total Invested</p>
        </div>
        <div className="bg-white border border-[#e5e2eb] rounded-2xl p-4 text-center">
          <p className="font-serif text-2xl font-bold text-emerald-700">{user?.currentStreakWeeks}w</p>
          <p className="text-[11px] text-[#6b7280] font-medium mt-0.5">Current Streak</p>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <Filter className="w-4 h-4 text-[#9ca3af] flex-shrink-0" />
        {(['all', 'attended', 'confirmed', 'cancelled'] as BookingStatus[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-2xl border text-xs font-semibold whitespace-nowrap transition-all capitalize ${
              filter === f ? 'bg-[#f4f0fb] border-[#6b4cc6] text-[#4e2f80] ring-1 ring-[#6b4cc6]' : 'bg-white border-[#e5e2eb] text-[#6b7280] hover:border-[#d3c2f0]'
            }`}
          >
            {f === 'all' ? 'All Sessions' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Booking list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#e5e2eb]">
            <Calendar className="w-10 h-10 text-[#9ca3af] mx-auto mb-3" />
            <p className="font-semibold text-sm text-[#1c1c2b]">No {filter} bookings</p>
            <p className="text-xs text-[#6b7280] mt-1">
              <Link to="/book" className="text-[#6b4cc6] hover:underline font-semibold">Browse the schedule</Link> to book your next class.
            </p>
          </div>
        ) : (
          filtered.map(booking => (
            <div key={booking.id} className="bg-white border border-[#e5e2eb] rounded-2xl p-4 card-hover">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{statusIcon(booking.status)}</div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-sm text-[#1c1c2b] truncate">{booking.sessionTitle}</h3>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${statusBadge(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#6b7280] mt-0.5">
                      {booking.instructorName} · {booking.date} · {booking.time}
                    </p>
                    <p className="text-[11px] text-[#9ca3af] mt-0.5">Ref: {booking.transactionRef} · {booking.paymentMethod}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-7 sm:ml-0">
                  <span className="font-bold text-sm text-[#4e2f80] whitespace-nowrap">
                    KES {booking.priceKES.toLocaleString()}
                  </span>
                  {booking.status === 'attended' && (
                    <Link
                      to="/book"
                      className="flex items-center gap-1 text-[11px] font-semibold text-[#6b4cc6] bg-[#f4f0fb] hover:bg-[#e9e0f6] px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap"
                    >
                      <RotateCcw className="w-3 h-3" /> Rebook
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
