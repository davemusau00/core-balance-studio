import React, { useState } from 'react';
import { Smartphone, CheckCircle, Clock, Download, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { usePayroll, InstructorPayrollItem } from '../../lib/hooks/usePayroll';

const statusConfig = {
  pending:  { label: 'Pending Approval', color: 'text-amber-700',   bg: 'bg-amber-50',   icon: Clock },
  approved: { label: 'Approved',         color: 'text-sky-700',     bg: 'bg-sky-50',     icon: CheckCircle },
  paid:     { label: 'Paid via M-Pesa',  color: 'text-emerald-700', bg: 'bg-emerald-50', icon: CheckCircle },
};

export const AdminPayrollPage: React.FC = () => {
  const { showToast } = useApp();
  const { payroll, approveInstructor, payoutInstructor, batchPayoutApproved } = usePayroll();
  const [expanded, setExpanded] = useState<string | null>(null);

  const totalMonthlyPayroll = payroll.reduce((sum, inst) =>
    sum + inst.classes.reduce((s, c) => s + c.totalEarned, 0), 0
  );

  const approvedCount = payroll.filter(p => p.status === 'approved').length;

  const handleApprove = (id: string) => {
    approveInstructor(id);
    showToast('Payroll Approved', 'Instructor payroll marked as approved and ready for payout.', 'success');
  };

  const handlePayout = (inst: InstructorPayrollItem) => {
    const total = inst.classes.reduce((s, c) => s + c.totalEarned, 0);
    const ref = payoutInstructor(inst.id);
    showToast('M-Pesa B2C Sent', `KES ${total.toLocaleString()} sent to ${inst.name.split(' ')[0]} (Ref: ${ref}).`, 'success');
  };

  const handleBatchPayout = () => {
    const refs = batchPayoutApproved();
    const count = Object.keys(refs).length;
    showToast('Batch Payout Success', `Disbursed M-Pesa B2C payouts to ${count} approved instructors.`, 'success');
  };

  return (
    <main className="p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Staff Payroll</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Instructor compensation, class rates & M-Pesa payouts.</p>
        </div>
        <div className="flex items-center gap-2">
          {approvedCount > 0 && (
            <button
              onClick={handleBatchPayout}
              className="px-4 py-2.5 bg-[#1f9d62] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#178a54] transition-all shadow-sm"
            >
              <Zap className="w-4 h-4" /> Batch Pay Approved ({approvedCount})
            </button>
          )}
          <button className="px-4 py-2.5 bg-white border border-[#e5e2eb] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-neutral-50">
            <Download className="w-4 h-4 text-[#6b4cc6]" /> Export Payslips
          </button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Monthly Payroll', value: `KES ${(totalMonthlyPayroll / 1000).toFixed(1)}K`, color: '#6b4cc6' },
          { label: 'Instructors', value: payroll.length, color: '#1f9d62' },
          { label: 'Pending Approval', value: payroll.filter(p => p.status === 'pending').length, color: '#d97706' },
          { label: 'Paid This Month', value: payroll.filter(p => p.status === 'paid').length, color: '#0891b2' },
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
          const total = inst.classes.reduce((s, c) => s + c.totalEarned, 0);
          const st = statusConfig[inst.status];
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
                      Base KES {inst.baseRate.toLocaleString()}/class · +KES {inst.bonusPerHead} per head over {inst.threshold}
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
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
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
                      {inst.classes.map((c, i) => (
                        <tr key={i}>
                          <td className="py-2.5 font-medium text-[#1c1c2b]">{c.title}</td>
                          <td className="py-2.5 text-[#6b7280]">{c.date}</td>
                          <td className="py-2.5 text-center">
                            <span className="bg-[#f4f0fb] text-[#6b4cc6] px-2 py-0.5 rounded-full text-[10px] font-bold">{c.clients}</span>
                          </td>
                          <td className="py-2.5 text-right font-bold text-[#4e2f80]">KES {c.totalEarned.toLocaleString()}</td>
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
                    {inst.status === 'pending' && (
                      <button
                        onClick={() => handleApprove(inst.id)}
                        className="flex-1 py-2.5 bg-[#f4f0fb] text-[#6b4cc6] rounded-xl text-xs font-semibold hover:bg-[#e9e0f6] transition-colors"
                      >
                        ✓ Approve Payroll
                      </button>
                    )}
                    {inst.status === 'approved' && (
                      <button
                        onClick={() => handlePayout(inst)}
                        className="flex-1 py-2.5 bg-[#1f9d62] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#178a54] transition-colors"
                      >
                        <Smartphone className="w-4 h-4" /> Pay via M-Pesa B2C
                      </button>
                    )}
                    {inst.status === 'paid' && (
                      <div className="flex-1 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Paid · {inst.transactionRef} ({inst.paidAt})
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
