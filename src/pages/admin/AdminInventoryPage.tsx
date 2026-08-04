import React, { useState } from 'react';
import { Wrench, AlertTriangle, Package, ShoppingBag, Plus, Clock, CheckCircle, XCircle, TrendingDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

type EquipmentStatus = 'operational' | 'service_due' | 'maintenance' | 'retired';

interface Equipment {
  id: string;
  name: string;
  serialNo: string;
  location: string;
  status: EquipmentStatus;
  lastServiced: string;
  nextServiceDue: string;
  notes: string;
  daysUntilService: number;
}

interface RetailItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
}

const EQUIPMENT: Equipment[] = [
  { id: 'e1', name: 'Reformer Bed #1',        serialNo: 'RF-001', location: 'Studio 1', status: 'operational',  lastServiced: 'Jun 14, 2026', nextServiceDue: 'Sep 14, 2026', notes: 'Springs replaced. Footbar adjusted.', daysUntilService: 40 },
  { id: 'e2', name: 'Reformer Bed #2',        serialNo: 'RF-002', location: 'Studio 1', status: 'service_due',  lastServiced: 'Mar 01, 2026', nextServiceDue: 'Aug 07, 2026', notes: 'Carriage alignment check needed.', daysUntilService: 2 },
  { id: 'e3', name: 'Reformer Bed #3',        serialNo: 'RF-003', location: 'Studio 1', status: 'maintenance',  lastServiced: 'Jul 01, 2026', nextServiceDue: 'Aug 05, 2026', notes: 'Strap replacement in progress. Out of use.', daysUntilService: 0 },
  { id: 'e4', name: 'Reformer Bed #4',        serialNo: 'RF-004', location: 'Studio 1', status: 'operational',  lastServiced: 'Jul 10, 2026', nextServiceDue: 'Oct 10, 2026', notes: 'All springs and pulleys checked.', daysUntilService: 66 },
  { id: 'e5', name: 'Cadillac Machine',       serialNo: 'CAD-01', location: 'Studio 2', status: 'operational',  lastServiced: 'May 20, 2026', nextServiceDue: 'Aug 20, 2026', notes: 'Trapeze bar tightened.', daysUntilService: 15 },
  { id: 'e6', name: 'Wunda Chair',            serialNo: 'WC-01',  location: 'Studio 2', status: 'operational',  lastServiced: 'Apr 12, 2026', nextServiceDue: 'Jul 12, 2026', notes: 'Pedal spring tension adjusted.', daysUntilService: -24 },
  { id: 'e7', name: 'Ladder Barrel',          serialNo: 'LB-01',  location: 'Storage',  status: 'retired',     lastServiced: 'Jan 01, 2026', nextServiceDue: '—', notes: 'Decommissioned. Replacing next quarter.', daysUntilService: 0 },
];

const RETAIL: RetailItem[] = [
  { id: 'r1', name: 'Pilates Grip Socks',       category: 'Accessories', sku: 'SOCK-001', price: 850,   stock: 42,  lowStockThreshold: 10 },
  { id: 'r2', name: 'Core Balance Water Bottle', category: 'Accessories', sku: 'BTLE-001', price: 1800,  stock: 8,   lowStockThreshold: 10 },
  { id: 'r3', name: 'Studio Pilates Mat (6mm)',  category: 'Equipment',   sku: 'MAT-001',  price: 4500,  stock: 3,   lowStockThreshold: 5 },
  { id: 'r4', name: 'Resistance Band Set',       category: 'Equipment',   sku: 'BAND-003', price: 2200,  stock: 14,  lowStockThreshold: 5 },
  { id: 'r5', name: 'Studio Towel (branded)',    category: 'Accessories', sku: 'TWEL-001', price: 1200,  stock: 2,   lowStockThreshold: 8 },
  { id: 'r6', name: 'Core Balance Tote Bag',     category: 'Accessories', sku: 'TOTE-001', price: 1500,  stock: 19,  lowStockThreshold: 5 },
];

const statusConfig: Record<EquipmentStatus, { label: string; icon: any; color: string; bg: string }> = {
  operational:  { label: 'Operational',     icon: CheckCircle, color: 'text-emerald-700', bg: 'bg-emerald-50' },
  service_due:  { label: 'Service Due',     icon: AlertTriangle, color: 'text-amber-700',  bg: 'bg-amber-50' },
  maintenance:  { label: 'In Maintenance',  icon: Wrench,       color: 'text-rose-700',   bg: 'bg-rose-50' },
  retired:      { label: 'Retired',         icon: XCircle,      color: 'text-neutral-500', bg: 'bg-neutral-100' },
};

export const AdminInventoryPage: React.FC = () => {
  const { showToast } = useApp();
  const [tab, setTab] = useState<'equipment' | 'retail'>('equipment');
  const [equipment, setEquipment] = useState(EQUIPMENT);
  const [cart, setCart] = useState<{ item: RetailItem; qty: number }[]>([]);

  const scheduleService = (id: string) => {
    setEquipment(prev => prev.map(e => e.id === id ? { ...e, status: 'maintenance' } : e));
    showToast('Service Scheduled', 'Equipment marked as In Maintenance and technician notified.', 'success');
  };

  const addToCart = (item: RetailItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      return existing
        ? prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c)
        : [...prev, { item, qty: 1 }];
    });
  };

  const checkout = () => {
    const total = cart.reduce((s, c) => s + c.item.price * c.qty, 0);
    setCart([]);
    showToast('Sale Complete', `KES ${total.toLocaleString()} — receipt issued.`, 'success');
  };

  const cartTotal = cart.reduce((s, c) => s + c.item.price * c.qty, 0);
  const lowStockItems = RETAIL.filter(r => r.stock <= r.lowStockThreshold);
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
          <Wrench className="w-3.5 h-3.5 inline mr-1.5" />Equipment
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
              <div key={e.id} className={`bg-white border rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 justify-between ${e.status === 'maintenance' ? 'border-rose-200' : e.status === 'service_due' ? 'border-amber-200' : 'border-[#e5e2eb]'}`}>
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
                    <p className="text-xs text-[#6b7280] mt-1 italic">"{e.notes}"</p>
                    <div className="flex gap-4 mt-2 text-[10px] text-[#9ca3af] font-medium">
                      <span><Clock className="w-3 h-3 inline mr-1" />Last: {e.lastServiced}</span>
                      {e.nextServiceDue !== '—' && <span className={e.daysUntilService <= 7 ? 'text-amber-600 font-bold' : ''}><Clock className="w-3 h-3 inline mr-1" />Next: {e.nextServiceDue}</span>}
                    </div>
                  </div>
                </div>
                {(e.status === 'service_due' || e.status === 'operational') && (
                  <button
                    onClick={() => scheduleService(e.id)}
                    className="flex-shrink-0 px-4 py-2 bg-[#f4f0fb] text-[#6b4cc6] border border-[#d3c2f0] rounded-xl text-xs font-semibold hover:bg-[#e9e0f6] transition-colors whitespace-nowrap"
                  >
                    Schedule Service
                  </button>
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
            {RETAIL.map(item => {
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
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-sm text-[#4e2f80]">KES {item.price.toLocaleString()}</p>
                    <p className="text-[10px] text-[#6b7280]">{item.stock} in stock</p>
                  </div>
                  <button onClick={() => addToCart(item)} className="p-2 bg-[#6b4cc6] text-white rounded-xl hover:bg-[#5b3894] transition-colors flex-shrink-0">
                    <Plus className="w-4 h-4" />
                  </button>
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
                Checkout via M-Pesa
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
