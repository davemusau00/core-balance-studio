import React, { useState } from 'react';
import { Wrench, AlertTriangle, Package, ShoppingBag, Plus, Clock, CheckCircle, XCircle, TrendingDown, FileText, Printer } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useInventory, EquipmentItem, RetailProduct } from '../../lib/hooks/useInventory';

const statusConfig = {
  operational:  { label: 'Operational',     icon: CheckCircle, color: 'text-emerald-700', bg: 'bg-emerald-50' },
  service_due:  { label: 'Service Due',     icon: AlertTriangle, color: 'text-amber-700',  bg: 'bg-amber-50' },
  maintenance:  { label: 'In Maintenance',  icon: Wrench,       color: 'text-rose-700',   bg: 'bg-rose-50' },
  retired:      { label: 'Retired',         icon: XCircle,      color: 'text-neutral-500', bg: 'bg-neutral-100' },
};

export const AdminInventoryPage: React.FC = () => {
  const { showToast } = useApp();
  const { equipment, products, addMaintenanceLog, adjustStock } = useInventory();

  const [tab, setTab] = useState<'equipment' | 'retail'>('equipment');
  const [selectedEq, setSelectedEq] = useState<EquipmentItem | null>(null);
  const [techName, setTechName] = useState('');
  const [actionNotes, setActionNotes] = useState('');
  const [costKES, setCostKES] = useState('12500');

  const [cart, setCart] = useState<{ item: RetailProduct; qty: number }[]>([]);
  const [lastReceipt, setLastReceipt] = useState<{ id: string; date: string; items: typeof cart; total: number } | null>(null);

  const handleLogMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEq || !techName || !actionNotes) return;
    addMaintenanceLog(selectedEq.id, techName, actionNotes, parseFloat(costKES) || 0);
    showToast('Maintenance Logged', `Service logged for ${selectedEq.name}. Marked as Operational.`, 'success');
    setSelectedEq(null);
    setTechName('');
    setActionNotes('');
  };

  const addToCart = (item: RetailProduct) => {
    if (item.stock <= 0) {
      showToast('Out of Stock', `${item.name} has no remaining inventory.`, 'error');
      return;
    }
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      return existing
        ? prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c)
        : [...prev, { item, qty: 1 }];
    });
  };

  const checkout = () => {
    const total = cart.reduce((s, c) => s + c.item.price * c.qty, 0);
    cart.forEach(c => adjustStock(c.item.id, -c.qty));

    const receipt = {
      id: `POS-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      items: cart,
      total,
    };

    setLastReceipt(receipt);
    setCart([]);
    showToast('Sale Complete', `Receipt ${receipt.id} generated — KES ${total.toLocaleString()}`, 'success');
  };

  const cartTotal = cart.reduce((s, c) => s + c.item.price * c.qty, 0);
  const lowStockItems = products.filter(r => r.stock <= r.lowStockThreshold);
  const needsAttention = equipment.filter(e => e.status === 'service_due' || e.status === 'maintenance');

  return (
    <main className="p-4 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Inventory & Equipment</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Equipment maintenance, retail stock, and POS terminal.</p>
        </div>

        {/* Alerts summary */}
        <div className="flex gap-2">
          {needsAttention.length > 0 && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
              <Wrench className="w-3.5 h-3.5" /> {needsAttention.length} Equipment Alert{needsAttention.length > 1 ? 's' : ''}
            </span>
          )}
          {lowStockItems.length > 0 && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full">
              <TrendingDown className="w-3.5 h-3.5" /> {lowStockItems.length} Low Stock
            </span>
          )}
        </div>
      </div>

      {/* Tab Switch */}
      <div className="flex gap-1 bg-[#f4f0fb] p-1 rounded-2xl w-fit">
        <button onClick={() => setTab('equipment')} className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${tab === 'equipment' ? 'bg-white text-[#6b4cc6] shadow-sm' : 'text-[#6b7280] hover:text-[#1c1c2b]'}`}>
          <Wrench className="w-3.5 h-3.5 inline mr-1.5" />Equipment Maintenance
        </button>
        <button onClick={() => setTab('retail')} className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${tab === 'retail' ? 'bg-white text-[#6b4cc6] shadow-sm' : 'text-[#6b7280] hover:text-[#1c1c2b]'}`}>
          <ShoppingBag className="w-3.5 h-3.5 inline mr-1.5" />Retail POS
        </button>
      </div>

      {tab === 'equipment' ? (
        <div className="space-y-3">
          {equipment.map(e => {
            const st = statusConfig[e.status];
            const Icon = st.icon;
            return (
              <div key={e.id} className={`bg-white border rounded-3xl p-5 shadow-sm space-y-3 ${e.status === 'maintenance' ? 'border-rose-200' : e.status === 'service_due' ? 'border-amber-200' : 'border-[#e5e2eb]'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${st.bg}`}>
                      <Icon className={`w-5 h-5 ${st.color}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-sm text-[#1c1c2b]">{e.name}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${st.bg} ${st.color}`}>{st.label}</span>
                      </div>
                      <p className="text-[11px] text-[#9ca3af] mt-0.5">{e.serialNo} · {e.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setSelectedEq(e); setTechName(''); setActionNotes(''); }}
                      className="px-4 py-2 bg-[#f4f0fb] text-[#6b4cc6] border border-[#d3c2f0] rounded-xl text-xs font-semibold hover:bg-[#e9e0f6] transition-colors whitespace-nowrap"
                    >
                      + Log Service
                    </button>
                  </div>
                </div>

                {/* Spring Life Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-[#6b7280]">
                    <span>Spring Tension Health</span>
                    <span>{e.springLifePercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${e.springLifePercent > 60 ? 'bg-emerald-500' : e.springLifePercent > 30 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      style={{ width: `${e.springLifePercent}%` }}
                    />
                  </div>
                </div>

                {/* Maintenance Log History */}
                {e.maintenanceHistory.length > 0 && (
                  <div className="pt-2 border-t border-[#f4f0fb] space-y-1 text-xs text-[#6b7280]">
                    <span className="text-[9px] font-bold uppercase text-[#9ca3af]">Recent Log</span>
                    <p className="italic">"{e.maintenanceHistory[0].actionTaken}" — <span className="font-semibold">{e.maintenanceHistory[0].technician}</span> ({e.maintenanceHistory[0].date})</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Grid */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-sm text-[#1c1c2b]">Product Catalog</h3>
            {products.map(item => {
              const isLow = item.stock <= item.lowStockThreshold;
              return (
                <div key={item.id} className={`bg-white border rounded-2xl p-4 flex items-center justify-between gap-4 ${isLow ? 'border-rose-200' : 'border-[#e5e2eb]'}`}>
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-[#f4f0fb] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-[#6b4cc6]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-xs text-[#1c1c2b] truncate">{item.name}</p>
                      <p className="text-[10px] text-[#9ca3af]">{item.sku} · {item.category}</p>
                      {isLow && <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">LOW STOCK</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => adjustStock(item.id, -1)} className="w-6 h-6 rounded bg-neutral-100 text-xs font-bold">-</button>
                      <span className="text-xs font-bold w-6 text-center">{item.stock}</span>
                      <button onClick={() => adjustStock(item.id, 1)} className="w-6 h-6 rounded bg-neutral-100 text-xs font-bold">+</button>
                    </div>

                    <div className="text-right flex-shrink-0 min-w-[80px]">
                      <p className="font-bold text-sm text-[#4e2f80]">KES {item.price.toLocaleString()}</p>
                    </div>

                    <button onClick={() => addToCart(item)} className="p-2 bg-[#6b4cc6] text-white rounded-xl hover:bg-[#5b3894] transition-colors flex-shrink-0">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart / POS Terminal */}
          <div className="bg-[#1c1c2b] text-white rounded-3xl p-5 space-y-4 h-fit sticky top-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#b894e6]" />
              <h3 className="font-bold text-sm">POS Terminal</h3>
            </div>

            {cart.length === 0 ? (
              <p className="text-xs text-white/50 text-center py-6">Add items from the catalog.</p>
            ) : (
              <div className="space-y-2">
                {cart.map(c => (
                  <div key={c.item.id} className="flex items-center justify-between text-xs bg-white/10 rounded-xl px-3 py-2">
                    <span className="font-medium truncate mr-2">{c.item.name}</span>
                    <span className="text-white/60 whitespace-nowrap">×{c.qty} · KES {(c.item.price * c.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex justify-between text-sm font-bold">
                <span>Total</span>
                <span className="text-[#b894e6] font-serif text-lg">KES {cartTotal.toLocaleString()}</span>
              </div>
              <button
                onClick={checkout}
                disabled={cart.length === 0}
                className="w-full py-3 bg-[#6b4cc6] rounded-xl text-xs font-bold hover:bg-[#5b3894] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Checkout & Issue Receipt
              </button>
            </div>

            {/* Generated Receipt Modal */}
            {lastReceipt && (
              <div className="mt-4 p-3 bg-white/10 border border-white/20 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#b894e6] font-bold text-[10px]">
                  <span>RECEIPT {lastReceipt.id}</span>
                  <span>{lastReceipt.date}</span>
                </div>
                <div className="text-[11px] space-y-1">
                  {lastReceipt.items.map(i => (
                    <div key={i.item.id} className="flex justify-between">
                      <span>{i.item.name} ×{i.qty}</span>
                      <span>KES {(i.item.price * i.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-1.5 flex justify-between font-bold">
                  <span>PAID M-PESA</span>
                  <span>KES {lastReceipt.total.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Maintenance Logging Modal */}
      {selectedEq && (
        <div className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4">
          <form onSubmit={handleLogMaintenance} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-base text-[#1c1c2b]">
              Log Maintenance: {selectedEq.name}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Technician / Vendor</label>
                <input
                  type="text"
                  value={techName}
                  onChange={e => setTechName(e.target.value)}
                  required
                  placeholder="e.g. Kipchumba Equipment Mechanics"
                  className="w-full p-3 bg-[#fbf9fd] border border-[#e5e2eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Cost (KES)</label>
                <input
                  type="number"
                  value={costKES}
                  onChange={e => setCostKES(e.target.value)}
                  required
                  className="w-full p-3 bg-[#fbf9fd] border border-[#e5e2eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Service & Action Details</label>
                <textarea
                  value={actionNotes}
                  onChange={e => setActionNotes(e.target.value)}
                  required
                  placeholder="Replaced 4 red springs, cleaned carriage track, re-aligned footbar."
                  rows={3}
                  className="w-full p-3 bg-[#fbf9fd] border border-[#e5e2eb] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6b4cc6]"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button type="button" onClick={() => setSelectedEq(null)} className="flex-1 py-2.5 border border-[#e5e2eb] rounded-xl text-xs font-semibold text-[#6b7280]">
                Cancel
              </button>
              <button type="submit" className="flex-1 py-2.5 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold hover:bg-[#5b3894]">
                Save Service Log
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};
