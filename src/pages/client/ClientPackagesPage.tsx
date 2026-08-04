import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePackages } from '../../lib/hooks/usePackages';
import { useAuth } from '../../context/AuthContext';
import { Check, Sparkles, ArrowRight, CreditCard, Smartphone, RotateCcw } from 'lucide-react';

export const ClientPackagesPage: React.FC = () => {
  const { data: packages, isLoading } = usePackages();
  const { user } = useAuth();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [purchaseState, setPurchaseState] = useState<'idle' | 'confirming' | 'done'>('idle');

  const handlePurchase = (id: string) => {
    setSelectedId(id);
    setPurchaseState('confirming');
  };

  const confirmPurchase = () => {
    setPurchaseState('done');
    setTimeout(() => {
      setPurchaseState('idle');
      setSelectedId(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c2b]">Class Packages</h1>
        <p className="text-sm text-[#6b7280] mt-1">Top-up your credits or switch your membership.</p>
      </div>

      {/* Current package status */}
      {user?.membershipName && (
        <div className="bg-[#1c1c2b] rounded-3xl p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#6b4cc6]/40 to-transparent rounded-full blur-2xl pointer-events-none" />
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Active Package</p>
          <h2 className="font-serif text-xl font-bold">{user.membershipName}</h2>
          <div className="flex items-center gap-6 mt-4">
            <div>
              <span className="font-serif text-3xl font-bold text-[#b894e6]">{user.classesRemaining}</span>
              <p className="text-[10px] text-white/60 uppercase tracking-wider mt-0.5">Credits Left</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <span className="font-serif text-3xl font-bold text-white">{user.currentStreakWeeks}w</span>
              <p className="text-[10px] text-white/60 uppercase tracking-wider mt-0.5">Streak</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${user.membershipStatus === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                {user.membershipStatus}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-white/40 mt-3">Renews {user.membershipRenewalDate}</p>
        </div>
      )}

      {/* Package cards */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border border-[#e5e2eb] rounded-3xl p-5 animate-pulse h-28" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {packages.map(pkg => {
            const isSelected = selectedId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => handlePurchase(pkg.id)}
                className={`bg-white border rounded-3xl p-5 cursor-pointer transition-all ${
                  pkg.isBestValue
                    ? 'border-[#6b4cc6] ring-2 ring-[#6b4cc6]/30'
                    : 'border-[#e5e2eb] hover:border-[#b894e6]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-base text-[#1c1c2b]">{pkg.name}</h3>
                      {pkg.isBestValue && (
                        <span className="flex items-center gap-1 text-[10px] font-bold bg-[#6b4cc6] text-white px-2 py-0.5 rounded-full">
                          <Sparkles className="w-2.5 h-2.5" /> Best Value
                        </span>
                      )}
                      {pkg.savingsPercent && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          Save {pkg.savingsPercent}%
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6b7280]">
                      {pkg.classCount ? `${pkg.classCount} classes · ` : ''}Valid for {pkg.validityDays} days
                    </p>

                    {/* Perks */}
                    {pkg.features && pkg.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {pkg.features.slice(0, 3).map(f => (
                          <span key={f} className="flex items-center gap-1 text-[10px] font-medium text-[#4e2f80] bg-[#f4f0fb] px-2 py-0.5 rounded-full">
                            <Check className="w-2.5 h-2.5" /> {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-xl text-[#1c1c2b]">KES {pkg.priceKES.toLocaleString()}</p>
                    <button className="mt-2 px-4 py-2 bg-[#6b4cc6] text-white rounded-xl text-xs font-semibold hover:bg-[#5b3894] transition-colors flex items-center gap-1 ml-auto">
                      Buy <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FAQ teaser */}
      <div className="bg-[#f4f0fb] border border-[#d3c2f0] rounded-3xl p-5 text-center space-y-2">
        <p className="text-sm font-semibold text-[#4e2f80]">Questions about packages?</p>
        <p className="text-xs text-[#6b7280]">Credits never expire if you maintain an active subscription. Freezing is free up to 30 days per year.</p>
      </div>

      {/* Purchase confirm overlay */}
      {purchaseState === 'confirming' && selectedId && (() => {
        const pkg = packages.find(p => p.id === selectedId);
        if (!pkg) return null;
        return (
          <div className="fixed inset-0 z-[60] bg-black/60 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl">
              <h3 className="font-serif text-xl font-bold text-[#1c1c2b]">{pkg.name}</h3>
              <p className="text-sm text-[#6b7280]">KES {pkg.priceKES.toLocaleString()} · Valid {pkg.validityDays} days</p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setPurchaseState('idle'); setSelectedId(null); }}
                  className="py-3 border border-[#e5e2eb] rounded-2xl text-xs font-semibold text-[#6b7280] hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPurchase}
                  className="py-3 bg-[#6b4cc6] text-white rounded-2xl text-xs font-semibold hover:bg-[#5b3894] transition-colors flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" /> Pay via M-Pesa
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {purchaseState === 'done' && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xs w-full p-8 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1c1c2b]">Package Activated!</h3>
            <p className="text-sm text-[#6b7280]">Your credits are ready. Happy moving!</p>
          </div>
        </div>
      )}
    </div>
  );
};
