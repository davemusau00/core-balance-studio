import React, { useState } from 'react';
import { MessageSquare, AlertTriangle, TrendingUp, Users, Send, X, ChevronRight, Zap, Plus, FileText, Phone, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useCRM, LifecycleStage, CRMClient } from '../../lib/hooks/useCRM';

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
  const { clients, moveClientStage, addInteraction } = useCRM();

  const [selectedClient, setSelectedClient] = useState<CRMClient | null>(null);
  const [activeStageFilter, setActiveStageFilter] = useState<LifecycleStage | 'all'>('all');
  const [newNote, setNewNote] = useState('');

  const handleWinBack = (client: CRMClient) => {
    moveClientStage(client.id, 'active');
    addInteraction(client.id, 'whatsapp', `WhatsApp Win-Back promo sent to ${client.name.split(' ')[0]}.`);
    showToast('Win-Back Sent', `Re-engagement promo sent to ${client.name.split(' ')[0]}. Stage updated to Active.`, 'success');
    setSelectedClient(null);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !newNote.trim()) return;
    addInteraction(selectedClient.id, 'clinical_note', newNote);
    showToast('Interaction Saved', 'New CRM note added to client history.', 'success');
    setNewNote('');
  };

  const filteredClients = activeStageFilter === 'all'
    ? clients
    : clients.filter(c => c.stage === activeStageFilter);

  const atRiskClients = clients.filter(c => c.stage === 'at_risk');
  const vipClients = clients.filter(c => c.stage === 'vip');

  // Keep selectedClient fresh if state updates
  const activeClient = selectedClient ? clients.find(c => c.id === selectedClient.id) || selectedClient : null;

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

      {/* Client Action & Interaction History Drawer */}
      {activeClient && (() => {
        const stage = STAGES.find(s => s.key === activeClient.stage)!;
        return (
          <div className="fixed inset-0 z-[60] bg-black/60 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between border-b border-[#e5e2eb] pb-4">
                <div className="flex items-center gap-3">
                  <img src={activeClient.avatar} alt={activeClient.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1c1c2b]">{activeClient.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${stage.bg} ${stage.color}`}>{stage.label}</span>
                      <span className="text-[10px] text-[#6b7280]">{activeClient.membershipName}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedClient(null)}><X className="w-5 h-5 text-neutral-400" /></button>
              </div>

              {/* Move Stage Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-wider">Change Stage</label>
                <div className="flex flex-wrap gap-1.5">
                  {STAGES.map(s => (
                    <button
                      key={s.key}
                      onClick={() => moveClientStage(activeClient.id, s.key)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-xl border transition-all ${
                        activeClient.stage === s.key ? `${s.bg} ${s.color} border-current ring-1` : 'bg-white border-[#e5e2eb] text-[#6b7280]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interaction History */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-xs text-[#1c1c2b] uppercase tracking-wider">Interaction History & Notes</h4>

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    placeholder="Log a call, WhatsApp, or instructor note..."
                    className="flex-1 px-3.5 py-2 bg-[#fbf9fd] border border-[#e5e2eb] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
                  />
                  <button type="submit" className="px-3.5 py-2 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold hover:bg-[#5b3894]">
                    Add
                  </button>
                </form>

                <div className="space-y-2 max-h-44 overflow-y-auto">
                  {activeClient.interactions.length === 0 ? (
                    <p className="text-xs text-neutral-400 italic">No previous interactions logged.</p>
                  ) : (
                    activeClient.interactions.map(int => (
                      <div key={int.id} className="p-3 bg-[#fbf9fd] border border-[#e5e2eb] rounded-2xl text-xs space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-[#9ca3af]">
                          <span className="font-bold text-[#6b4cc6]">{int.author} ({int.type})</span>
                          <span>{int.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#33333f]">{int.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#e5e2eb]">
                {(activeClient.stage === 'at_risk' || activeClient.stage === 'churned') && (
                  <button
                    onClick={() => handleWinBack(activeClient)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 text-white rounded-2xl font-semibold text-xs hover:bg-amber-600 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" /> Send WhatsApp Win-Back
                  </button>
                )}
                <button onClick={() => setSelectedClient(null)} className="w-full py-2.5 border border-[#e5e2eb] rounded-2xl text-xs font-semibold text-[#6b7280] hover:bg-neutral-50">
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
