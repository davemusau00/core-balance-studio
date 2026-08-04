import React, { useState } from 'react';
import { Smartphone, CheckCircle, Clock, DollarSign, TrendingUp, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface InstructorPayroll {
  id: string;
  name: string;
  avatar: string;
  title: string;
  baseRatePerClass: number;
  perHeadBonus: number;
  perHeadThreshold: number;
  classesThisMonth: { title: string; date: string; clients: number; earned: number }[];
  payoutStatus: 'pending' | 'approved' | 'paid';
  phone: string;
}

const PAYROLL_DATA: InstructorPayroll[] = [
  {
    id: 'i1', name: 'Amara Osei', title: 'Senior Pilates Instructor',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80',
    baseRatePerClass: 3500, perHeadBonus: 150, perHeadThreshold: 6, phone: '0712345678',
    payoutStatus: 'pending',
    classesThisMonth: [
      { title: 'Reformer Flow', date: 'Aug 4', clients: 10, earned: 3500 + (10 - 6) * 150 },
      { title: 'Mat Pilates', date: 'Aug 3', clients: 8, earned: 3500 + (8 - 6) * 150 },
      { title: 'Reformer Flow', date: 'Aug 1', clients: 12, earned: 3500 + (12 - 6) * 150 },
    ],
  },
  {
    id: 'i2', name: 'Dr. Siti Rahmat', title: 'Clinical Pilates Specialist',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80',
    baseRatePerClass: 5000, perHeadBonus: 200, perHeadThreshold: 4, phone: '0722987654',
    payoutStatus: 'approved',
    classesThisMonth: [
      { title: 'Clinical Assessment', date: 'Aug 5', clients: 4, earned: 5000 },
      { title: 'Clinical Pilates', date: 'Aug 2', clients: 6, earned: 5000 + (6 - 4) * 200 },
    ],
  },
  {
    id: 'i3', name: 'Marcus Ferreira', title: 'Stretch & Mobility Coach',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80',
    baseRatePerClass: 2800, perHeadBonus: 120, perHeadThreshold: 5, phone: '0733456789',
    payoutStatus: 'paid',
    classesThisMonth: [
      { title: 'Stretch Therapy', date: 'Aug 4', clients: 8, earned: 2800 + (8 - 5) * 120 },
      { title: 'Stretch Therapy', date: 'Aug 2', clients: 7, earned: 2800 + (7 - 5) * 120 },
      { title: 'Stretch Therapy', date: 'Jul 31', clients: 5, earned: 2800 },
    ],
  },
];

const statusConfig = {
  pending:  { label: 'Pending Approval', color: 'text-amber-700',   bg: 'bg-amber-50',   icon: Clock },
  approved: { label: 'Approved',         color: 'text-sky-700',     bg: 'bg-sky-50',     icon: CheckCircle },
  paid:     { label: 'Paid via M-Pesa',  color: 'text-emerald-700', bg: 'bg-emerald-50', icon: CheckCircle },
};

export const AdminPayrollPage: React.FC = () => {
  const { showToast } = useApp();
  const [payroll, setPayroll] = useState(PAYROLL_DATA);
  const [expanded, setExpanded] = useState<string | null>(null);

  const totalMonthlyPayroll = payroll.reduce((sum, inst) =>
    sum + inst.classesThisMonth.reduce((s, c) => s + c.earned, 0), 0
  );

  const handleApprove = (id: string) => {
    setPayroll(prev => prev.map(p => p.id === id ? { ...p, payoutStatus: 'approved' } : p));
    showToast('Payroll Approved', 'Instructor payroll marked as approved and ready for payout.', 'success');
  };

  const handlePayout = (inst: InstructorPayroll) => {
    const total = inst.classesThisMonth.reduce((s, c) => s + c.earned, 0);
    setPayroll(prev => prev.map(p => p.id === inst.id ? { ...p, payoutStatus: 'paid' } : p));
    showToast('Payout Sent', `KES ${total.toLocaleString()} sent to ${inst.name.split(' ')[0]} via M-Pesa B2C.`, 'success');
  };

  return (
    <main className="p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Staff Payroll</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Instructor compensation, class rates & M-Pesa payouts.</p>
        </div>
        <button className="w-full sm:w-auto px-4 py-2.5 bg-white border border-[#e5e2eb] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-neutral-50">
          <Download className="w-4 h-4 text-[#6b4cc6]" /> Export Payslips
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Monthly Payroll', value: `KES ${(totalMonthlyPayroll / 1000).toFixed(1)}K`, color: '#6b4cc6' },
          { label: 'Instructors', value: payroll.length, color: '#1f9d62' },
          { label: 'Pending Approval', value: payroll.filter(p => p.payoutStatus === 'pending').length, color: '#d97706' },
          { label: 'Paid This Month', value: payroll.filter(p => p.payoutStatus === 'paid').length, color: '#0891b2' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-[#e5e2eb] rounded-2xl p-4 shadow-sm">
            <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-wider">{s.label}</p>
            <p className="font-serif text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Instructor payroll cards */}
      <div className="space-y-4">
        {payroll.map(inst => {
          const total = inst.classesThisMonth.reduce((s, c) => s + c.earned, 0);
          const st = statusConfig[inst.payoutStatus];
          const Icon = st.icon;
          const isExpanded = expanded === inst.id;

          return (
            <div key={inst.id} className="bg-white border border-[#e5e2eb] rounded-3xl overflow-hidden shadow-sm">
              {/* Instructor header */}
              <div
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#fbf9fd] transition-colors"
                onClick={() => setExpanded(isExpanded ? null : inst.id)}
              >
                <div className="flex items-center gap-4">
                  <img src={inst.avatar} alt={inst.name} className="w-12 h-12 rounded-full object-cover border border-[#e5e2eb]" />
                  <div>
                    <h3 className="font-bold text-sm text-[#1c1c2b]">{inst.name}</h3>
                    <p className="text-xs text-[#6b7280]">{inst.title}</p>
                    <p className="text-[10px] text-[#9ca3af] mt-0.5">
                      Base KES {inst.baseRatePerClass.toLocaleString()}/class · +KES {inst.perHeadBonus} per head over {inst.perHeadThreshold}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:text-right">
                  <div>
                    <p className="text-[10px] text-[#6b7280] font-bold uppercase">Monthly Total</p>
                    <p className="font-serif text-2xl font-bold text-[#4e2f80]">KES {total.toLocaleString()}</p>
                  </div>
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold ${st.bg} ${st.color}`}>
                    <Icon className="w-3 h-3" /> {st.label}
                  </span>
                </div>
              </div>

              {/* Expanded breakdown */}
              {isExpanded && (
                <div className="border-t border-[#e5e2eb] p-5 space-y-4">
                  <table className="w-full text-xs text-left">
                    <thead className="text-[10px] text-[#6b7280] uppercase font-bold border-b border-[#e5e2eb]">
                      <tr>
                        <th className="pb-2">Class</th>
                        <th className="pb-2">Date</th>
                        <th className="pb-2 text-center">Clients</th>
                        <th className="pb-2 text-right">Earned</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f4f0fb]">
                      {inst.classesThisMonth.map((c, i) => (
                        <tr key={i}>
                          <td className="py-2.5 font-medium text-[#1c1c2b]">{c.title}</td>
                          <td className="py-2.5 text-[#6b7280]">{c.date}</td>
                          <td className="py-2.5 text-center">
                            <span className="bg-[#f4f0fb] text-[#6b4cc6] px-2 py-0.5 rounded-full text-[10px] font-bold">{c.clients}</span>
                          </td>
                          <td className="py-2.5 text-right font-bold text-[#4e2f80]">KES {c.earned.toLocaleString()}</td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-[#e5e2eb]">
                        <td colSpan={3} className="py-3 font-bold text-sm text-[#1c1c2b]">Total</td>
                        <td className="py-3 text-right font-serif text-xl font-bold text-[#6b4cc6]">KES {total.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    {inst.payoutStatus === 'pending' && (
                      <button
                        onClick={() => handleApprove(inst.id)}
                        className="flex-1 py-2.5 bg-[#f4f0fb] text-[#6b4cc6] rounded-xl text-xs font-semibold hover:bg-[#e9e0f6] transition-colors"
                      >
                        ✓ Approve Payroll
                      </button>
                    )}
                    {inst.payoutStatus === 'approved' && (
                      <button
                        onClick={() => handlePayout(inst)}
                        className="flex-1 py-2.5 bg-[#1f9d62] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#178a54] transition-colors"
                      >
                        <Smartphone className="w-4 h-4" /> Pay via M-Pesa B2C
                      </button>
                    )}
                    {inst.payoutStatus === 'paid' && (
                      <div className="flex-1 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Paid · {inst.phone}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};
