import React, { useState } from 'react';
import { usePackages } from '../../lib/hooks/usePackages';
import { Plus, Edit3, Trash2, Sparkles, Check, ToggleLeft, ToggleRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminPackagesPage: React.FC = () => {
  const { data: packages, isLoading } = usePackages();
  const { showToast } = useApp();
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>({});

  const togglePackage = (id: string) => {
    setActiveToggles(prev => ({ ...prev, [id]: !prev[id] }));
    showToast('Package Updated', 'Visibility updated for this package.', 'success');
  };

  const TIER_COLORS = ['#6b4cc6', '#1f9d62', '#d97706', '#0891b2'];

  return (
    <main className="p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Packages & Pricing</h1>
          <p className="text-sm text-[#6b7280] mt-0.5">Manage studio memberships and class packs.</p>
        </div>
        <button
          onClick={() => showToast('Coming Soon', 'Package creation form coming next.', 'success')}
          className="w-full sm:w-auto px-4 py-2.5 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 hover:bg-[#5b3894] transition-all"
        >
          <Plus className="w-4 h-4" /> New Package
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Packages', value: packages.length, accent: '#6b4cc6' },
          { label: 'Active Packs Sold', value: '342', accent: '#1f9d62' },
          { label: 'Avg. Pack Value', value: 'KES 4.2K', accent: '#d97706' },
          { label: 'Revenue (30d)', value: 'KES 1.4M', accent: '#0891b2' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-[#e5e2eb] rounded-2xl p-4 shadow-sm">
            <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-wider">{s.label}</p>
            <p className="font-serif text-2xl font-bold mt-1" style={{ color: s.accent }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Package cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border border-[#e5e2eb] rounded-3xl p-6 animate-pulse h-52" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {packages.map((pkg, i) => {
            const isActive = activeToggles[pkg.id] !== false; // default on
            return (
              <div
                key={pkg.id}
                className={`bg-white border rounded-3xl p-6 shadow-sm space-y-4 transition-all ${
                  pkg.isBestValue ? 'border-[#6b4cc6] ring-2 ring-[#6b4cc6]/20' : 'border-[#e5e2eb]'
                } ${!isActive ? 'opacity-60' : ''}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base text-[#1c1c2b]">{pkg.name}</h3>
                      {pkg.isBestValue && (
                        <span className="flex items-center gap-1 text-[10px] font-bold bg-[#6b4cc6] text-white px-2 py-0.5 rounded-full">
                          <Sparkles className="w-2.5 h-2.5" /> Best Value
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6b7280] mt-0.5">Valid {pkg.validityDays} days</p>
                  </div>
                  <button
                    onClick={() => togglePackage(pkg.id)}
                    className="text-[#6b7280] hover:text-[#6b4cc6] transition-colors"
                  >
                    {isActive
                      ? <ToggleRight className="w-6 h-6 text-[#6b4cc6]" />
                      : <ToggleLeft className="w-6 h-6" />
                    }
                  </button>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#1c1c2b]">
                    KES {pkg.priceKES.toLocaleString()}
                  </span>
                  {pkg.savingsPercent && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {pkg.savingsPercent}% off
                    </span>
                  )}
                </div>

                {/* Color bar */}
                <div className="h-1 rounded-full w-full" style={{ backgroundColor: TIER_COLORS[i % TIER_COLORS.length] }} />

                {/* Features */}
                {pkg.features && (
                  <ul className="space-y-1.5">
                    {pkg.features.slice(0, 3).map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-[#33333f]">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-[#e5e2eb]">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-[#e5e2eb] rounded-xl text-xs font-semibold text-[#6b7280] hover:text-[#6b4cc6] hover:bg-[#f4f0fb] transition-colors">
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button className="p-2 border border-[#e5e2eb] rounded-xl text-[#6b7280] hover:text-rose-600 hover:bg-rose-50 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
