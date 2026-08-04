import React, { useState } from 'react';
import { Megaphone, Send, Gift, Mail, Bell, MessageSquare, Plus, Eye, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const CAMPAIGNS = [
  { id: 'c1', name: 'August Wellness Promo', type: 'Email', status: 'Active', sent: 312, opened: 187, ctr: '22%', date: 'Aug 1, 2026' },
  { id: 'c2', name: 'Referral Bonus Push', type: 'WhatsApp', status: 'Active', sent: 220, opened: 198, ctr: '41%', date: 'Jul 28, 2026' },
  { id: 'c3', name: 'Re-engagement: Lapsed', type: 'Email', status: 'Completed', sent: 88, opened: 31, ctr: '18%', date: 'Jul 15, 2026' },
  { id: 'c4', name: 'New Class Announcement', type: 'Push', status: 'Draft', sent: 0, opened: 0, ctr: '—', date: '—' },
];

const STATS = [
  { label: 'Total Reach', value: '620', icon: Bell, color: '#6b4cc6' },
  { label: 'Open Rate (avg)', value: '38%', icon: Eye, color: '#1f9d62' },
  { label: 'CTR (avg)', value: '27%', icon: TrendingUp, color: '#d97706' },
  { label: 'Referrals Generated', value: '34', icon: Gift, color: '#0891b2' },
];

const statusStyle = {
  Active: 'bg-emerald-50 text-emerald-700',
  Completed: 'bg-neutral-100 text-neutral-600',
  Draft: 'bg-amber-50 text-amber-700',
};

export const AdminMarketingPage: React.FC = () => {
  const { showToast } = useApp();
  const [showCompose, setShowCompose] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [channel, setChannel] = useState<'email' | 'whatsapp' | 'push'>('email');

  const handleSend = () => {
    setShowCompose(false);
    setSubject(''); setBody('');
    showToast('Campaign Sent', 'Your message was broadcast to all active clients.', 'success');
  };

  return (
    <main className="p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Marketing</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Broadcast messages, track campaigns, and grow retention.</p>
        </div>
        <button
          onClick={() => setShowCompose(true)}
          className="w-full sm:w-auto px-4 py-2.5 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#5b3894] transition-all"
        >
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white border border-[#e5e2eb] rounded-2xl p-4 shadow-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                <Icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-wider leading-tight">{s.label}</p>
                <p className="font-serif text-xl font-bold mt-0.5" style={{ color: s.color }}>{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick blast buttons */}
      <div className="bg-[#f4f0fb] border border-[#d3c2f0] rounded-3xl p-5">
        <h3 className="font-bold text-sm text-[#1c1c2b] mb-3">Quick Broadcast</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Email Blast', icon: Mail, channel: 'email' as const },
            { label: 'WhatsApp', icon: MessageSquare, channel: 'whatsapp' as const },
            { label: 'Push Notification', icon: Bell, channel: 'push' as const },
          ].map(b => {
            const Icon = b.icon;
            return (
              <button
                key={b.channel}
                onClick={() => { setChannel(b.channel); setShowCompose(true); }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#d3c2f0] rounded-xl text-xs font-semibold text-[#4e2f80] hover:bg-white/80 transition-colors"
              >
                <Icon className="w-4 h-4 text-[#6b4cc6]" /> {b.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Campaigns table */}
      <div className="bg-white border border-[#e5e2eb] rounded-3xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#e5e2eb] flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#1c1c2b]">Campaign History</h3>
          <span className="text-xs text-[#6b7280]">{CAMPAIGNS.length} campaigns</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-[#1c1c2b]">
            <thead className="bg-[#fbf9fd] text-[#6b7280] uppercase text-[10px] font-semibold tracking-wider border-b border-[#e5e2eb]">
              <tr>
                <th className="px-6 py-3">Campaign</th>
                <th className="px-6 py-3">Channel</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Sent</th>
                <th className="px-6 py-3">Opened</th>
                <th className="px-6 py-3">CTR</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e2eb]">
              {CAMPAIGNS.map(c => (
                <tr key={c.id} className="hover:bg-[#f4f0fb]/30 transition-colors">
                  <td className="px-6 py-4 font-semibold whitespace-nowrap">{c.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center gap-1.5 text-[#6b7280]">
                      {c.type === 'Email' && <Mail className="w-3.5 h-3.5" />}
                      {c.type === 'WhatsApp' && <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />}
                      {c.type === 'Push' && <Bell className="w-3.5 h-3.5 text-amber-500" />}
                      {c.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[c.status as keyof typeof statusStyle]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{c.sent || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{c.opened || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-[#4e2f80]">{c.ctr}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#6b7280]">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compose modal */}
      {showCompose && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#1c1c2b]">New Campaign</h3>
              <button onClick={() => setShowCompose(false)} className="text-neutral-400 hover:text-neutral-600">✕</button>
            </div>

            {/* Channel selector */}
            <div className="flex gap-2">
              {(['email', 'whatsapp', 'push'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => setChannel(c)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                    channel === c
                      ? 'bg-[#6b4cc6] text-white border-[#6b4cc6]'
                      : 'border-[#e5e2eb] text-[#6b7280] hover:border-[#b894e6]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <input
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Subject line..."
                className="w-full px-3 py-2.5 bg-[#fbf9fd] border border-[#e5e2eb] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
              />
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Write your message..."
                rows={4}
                className="w-full px-3 py-2.5 bg-[#fbf9fd] border border-[#e5e2eb] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6b4cc6] resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowCompose(false)} className="flex-1 py-2.5 border border-[#e5e2eb] rounded-xl text-xs font-semibold text-[#6b7280] hover:bg-neutral-50 transition-colors">Cancel</button>
              <button
                onClick={handleSend}
                disabled={!subject || !body}
                className="flex-1 py-2.5 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#5b3894] disabled:opacity-50 transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Send Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
