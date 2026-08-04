import React, { useState } from 'react';
import { MessageSquare, AlertTriangle, TrendingUp, Users, Send, X, ChevronRight, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

type LifecycleStage = 'lead' | 'trial' | 'active' | 'vip' | 'at_risk' | 'churned';

interface CRMClient {
  id: string;
  name: string;
  avatar: string;
  email: string;
  lastClass: string;
  totalClasses: number;
  ltv: number;
  stage: LifecycleStage;
  daysInactive: number;
  membershipName: string;
}

const MOCK_CLIENTS: CRMClient[] = [
  { id: 'c1', name: 'Wambui Njeri',  avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80', email: 'wambui@example.com',  lastClass: '2 days ago',   totalClasses: 64, ltv: 128000, stage: 'vip',      daysInactive: 2,  membershipName: 'Unlimited Monthly' },
  { id: 'c2', name: 'Logan Mensah',  avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80', email: 'logan@example.com',   lastClass: '18 days ago', totalClasses: 12, ltv: 26400,  stage: 'at_risk',  daysInactive: 18, membershipName: '10 Class Pack' },
  { id: 'c3', name: 'Aisha Kamau',   avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80', email: 'aisha@example.com',   lastClass: '1 day ago',   totalClasses: 31, ltv: 62000,  stage: 'active',   daysInactive: 1,  membershipName: 'Unlimited Monthly' },
  { id: 'c4', name: 'Brian Otieno',  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80', email: 'brian@example.com',   lastClass: '5 days ago',  totalClasses: 5,  ltv: 11000,  stage: 'trial',    daysInactive: 5,  membershipName: '5 Class Pack' },
  { id: 'c5', name: 'Sarah Wanjiku', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80', email: 'sarah@example.com',   lastClass: '35 days ago', totalClasses: 3,  ltv: 6600,   stage: 'churned',  daysInactive: 35, membershipName: 'None' },
  { id: 'c6', name: 'Emeka Okafor',  avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80', email: 'emeka@example.com',   lastClass: 'Today',       totalClasses: 88, ltv: 176000, stage: 'vip',      daysInactive: 0,  membershipName: 'Unlimited Monthly' },
  { id: 'c7', name: 'Grace Muthoni', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80', email: 'grace@example.com',   lastClass: '20 days ago', totalClasses: 7,  ltv: 15400,  stage: 'at_risk',  daysInactive: 20, membershipName: '10 Class Pack' },
  { id: 'c8', name: 'David Karanja', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80', email: 'david@example.com',   lastClass: 'Never',       totalClasses: 0,  ltv: 0,      stage: 'lead',     daysInactive: 0,  membershipName: 'None' },
];

const STAGES: { key: LifecycleStage; label: string; color: string; bg: string; description: string }[] = [
  { key: 'lead',     label: 'Leads',           color: 'text-neutral-600',   bg: 'bg-neutral-100',   description: 'Enquired, not yet booked' },
  { key: 'trial',    label: 'First Trial',     color: 'text-sky-700',       bg: 'bg-sky-50',        description: 'Booked first class' },
  { key: 'active',   label: 'Active Members',  color: 'text-emerald-700',   bg: 'bg-emerald-50',    description: 'Regular attendees' },
  { key: 'vip',      label: 'VIP (50+ classes)', color: 'text-[#6b4cc6]',  bg: 'bg-[#f4f0fb]',    description: 'High-value loyal clients' },
  { key: 'at_risk',  label: 'At Risk',         color: 'text-amber-700',     bg: 'bg-amber-50',      description: 'Inactive >14 days' },
  { key: 'churned',  label: 'Churned',         color: 'text-rose-700',      bg: 'bg-rose-50',       description: 'No activity >30 days' },
];

export const AdminCRMPage: React.FC = () => {
  const { showToast } = useApp();
  const [clients, setClients] = useState(MOCK_CLIENTS);
  const [selectedClient, setSelectedClient] = useState<CRMClient | null>(null);
  const [activeStageFilter, setActiveStageFilter] = useState<LifecycleStage | 'all'>('all');

  const handleWinBack = (client: CRMClient) => {
    setClients(prev => prev.map(c =>
      c.id === client.id ? { ...c, stage: 'active', daysInactive: 0 } : c
    ));
    showToast('Win-Back Sent', `WhatsApp re-engagement sent to ${client.name.split(' ')[0]}.`, 'success');
    setSelectedClient(null);
  };

  const filteredClients = activeStageFilter === 'all'
    ? clients
    : clients.filter(c => c.stage === activeStageFilter);

  const atRiskClients = clients.filter(c => c.stage === 'at_risk');
  const vipClients = clients.filter(c => c.stage === 'vip');

  return (
    <main className="p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Client CRM</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Lifecycle pipeline, churn detection, and retention tools.</p>
        </div>
      </div>

      {/* Alert cards */}
      {atRiskClients.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-amber-900">Churn Risk Alert</h3>
              <p className="text-xs text-amber-700 mt-0.5">{atRiskClients.length} client{atRiskClients.length !== 1 && 's'} inactive for over 14 days. Act now to prevent churn.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {atRiskClients.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedClient(c)}
                className="flex items-center gap-2 bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors"
              >
                <img src={c.avatar} alt={c.name} className="w-5 h-5 rounded-full object-cover" />
                {c.name.split(' ')[0]} · {c.daysInactive}d inactive
                <ChevronRight className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Clients', value: clients.length, icon: Users, color: '#6b4cc6' },
          { label: 'VIP Members', value: vipClients.length, icon: TrendingUp, color: '#1f9d62' },
          { label: 'At-Risk', value: atRiskClients.length, icon: AlertTriangle, color: '#d97706' },
          { label: 'Total LTV', value: `KES ${(clients.reduce((s, c) => s + c.ltv, 0) / 1000).toFixed(0)}K`, icon: Zap, color: '#0891b2' },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white border border-[#e5e2eb] rounded-2xl p-4 shadow-sm flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${kpi.color}15` }}>
                <Icon className="w-4 h-4" style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-wider">{kpi.label}</p>
                <p className="font-serif text-xl font-bold mt-0.5" style={{ color: kpi.color }}>{kpi.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline Columns */}
      <div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
          <button
            onClick={() => setActiveStageFilter('all')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeStageFilter === 'all' ? 'bg-[#1c1c2b] text-white border-[#1c1c2b]' : 'bg-white border-[#e5e2eb] text-[#6b7280]'}`}
          >
            All Clients
          </button>
          {STAGES.map(s => (
            <button
              key={s.key}
              onClick={() => setActiveStageFilter(s.key)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border capitalize transition-all ${activeStageFilter === s.key ? `${s.bg} ${s.color} border-current` : 'bg-white border-[#e5e2eb] text-[#6b7280]'}`}
            >
              {s.label} ({clients.filter(c => c.stage === s.key).length})
            </button>
          ))}
        </div>

        {activeStageFilter === 'all' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
            {STAGES.map(stage => {
              const stageClients = clients.filter(c => c.stage === stage.key);
              return (
                <div key={stage.key} className="space-y-2">
                  <div className={`text-center py-2 rounded-2xl text-[10px] font-bold uppercase tracking-wider ${stage.bg} ${stage.color}`}>
                    {stage.label} <span className="font-black">({stageClients.length})</span>
                  </div>
                  <div className="space-y-2">
                    {stageClients.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedClient(c)}
                        className={`w-full text-left bg-white border rounded-2xl p-3 hover:shadow-md transition-all ${stage.key === 'at_risk' ? 'border-amber-200' : stage.key === 'vip' ? 'border-[#d3c2f0]' : 'border-[#e5e2eb]'}`}
                      >
                        <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover mb-2" />
                        <p className="font-semibold text-xs text-[#1c1c2b] leading-tight">{c.name.split(' ')[0]}</p>
                        <p className="text-[10px] text-[#9ca3af] mt-0.5">{c.totalClasses} classes</p>
                        {stage.key === 'at_risk' && (
                          <span className="block mt-1.5 text-[9px] font-bold text-amber-600 bg-amber-50 rounded-md px-1.5 py-0.5">
                            {c.daysInactive}d inactive
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredClients.map(c => {
              const stage = STAGES.find(s => s.key === c.stage)!;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedClient(c)}
                  className="text-left bg-white border border-[#e5e2eb] rounded-3xl p-5 hover:border-[#b894e6] transition-all space-y-3 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h3 className="font-bold text-sm text-[#1c1c2b]">{c.name}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stage.bg} ${stage.color}`}>{stage.label}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <div><p className="text-[#6b7280]">Classes</p><p className="font-bold text-[#1c1c2b]">{c.totalClasses}</p></div>
                    <div><p className="text-[#6b7280]">LTV</p><p className="font-bold text-[#4e2f80]">KES {(c.ltv/1000).toFixed(0)}K</p></div>
                    <div><p className="text-[#6b7280]">Last Class</p><p className="font-bold text-[#1c1c2b]">{c.lastClass}</p></div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Client Action Modal */}
      {selectedClient && (() => {
        const stage = STAGES.find(s => s.key === selectedClient.stage)!;
        return (
          <div className="fixed inset-0 z-[60] bg-black/60 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img src={selectedClient.avatar} alt={selectedClient.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-base text-[#1c1c2b]">{selectedClient.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stage.bg} ${stage.color}`}>{stage.label}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedClient(null)}><X className="w-5 h-5 text-neutral-400" /></button>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-[#fbf9fd] rounded-2xl p-3">
                  <p className="font-serif text-xl font-bold text-[#6b4cc6]">{selectedClient.totalClasses}</p>
                  <p className="text-[#6b7280] text-[10px]">Classes</p>
                </div>
                <div className="bg-[#fbf9fd] rounded-2xl p-3">
                  <p className="font-serif text-xl font-bold text-[#1f9d62]">KES {(selectedClient.ltv/1000).toFixed(0)}K</p>
                  <p className="text-[#6b7280] text-[10px]">LTV</p>
                </div>
                <div className="bg-[#fbf9fd] rounded-2xl p-3">
                  <p className="font-serif text-xl font-bold text-amber-600">{selectedClient.daysInactive}d</p>
                  <p className="text-[#6b7280] text-[10px]">Inactive</p>
                </div>
              </div>

              <p className="text-xs text-[#6b7280]">{selectedClient.email} · {selectedClient.membershipName}</p>

              <div className="space-y-2">
                {(selectedClient.stage === 'at_risk' || selectedClient.stage === 'churned') && (
                  <button
                    onClick={() => handleWinBack(selectedClient)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 text-white rounded-2xl font-semibold text-xs hover:bg-amber-600 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" /> Send WhatsApp Win-Back
                  </button>
                )}
                <button
                  onClick={() => { showToast('Promo Issued', `30% discount code sent to ${selectedClient.name.split(' ')[0]}.`, 'success'); setSelectedClient(null); }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#f4f0fb] text-[#6b4cc6] rounded-2xl font-semibold text-xs hover:bg-[#e9e0f6] transition-colors"
                >
                  <Zap className="w-4 h-4" /> Issue Promo Code (30% off)
                </button>
                <button onClick={() => setSelectedClient(null)} className="w-full py-3 border border-[#e5e2eb] rounded-2xl text-xs font-semibold text-[#6b7280] hover:bg-neutral-50">
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
};
