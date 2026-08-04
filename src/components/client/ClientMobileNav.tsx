import React from 'react';
import { Home, Calendar, Layers, User, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';

export const ClientMobileNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'home',     label: 'Home',     icon: Home },
    { id: 'book',     label: 'Book',     icon: Calendar },
    { id: 'programs', label: 'Programs', icon: Layers },
    { id: 'profile',  label: 'Profile',  icon: User },
  ];

  return (
    // md:hidden – replaced by a proper nav header on desktop (App.tsx)
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#e5e2eb] px-6 pt-2 shadow-lg pb-safe"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}
      aria-label="Bottom navigation"
      role="navigation"
    >
      <div className="max-w-md mx-auto flex items-center justify-between relative">

        {/* Left two items: Home & Book */}
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center gap-0.5 min-w-[44px] min-h-[44px] justify-center transition-all ${
                isActive ? 'text-[#6b4cc6]' : 'text-[#9ca3af] hover:text-[#1c1c2b]'
              }`}
            >
              <div className={`p-1.5 rounded-xl ${isActive ? 'bg-[#f4f0fb]' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          );
        })}

        {/* Center Floating Plus Button */}
        <button
          onClick={() => setActiveTab('book')}
          className="w-14 h-14 rounded-full bg-[#6b4cc6] hover:bg-[#5b3894] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-[#6b4cc6]/30 -mt-6 transition-all"
          aria-label="Book a Class"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Right two items: Programs & Profile */}
        {navItems.slice(2, 4).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center gap-0.5 min-w-[44px] min-h-[44px] justify-center transition-all ${
                isActive ? 'text-[#6b4cc6]' : 'text-[#9ca3af] hover:text-[#1c1c2b]'
              }`}
            >
              <div className={`p-1.5 rounded-xl ${isActive ? 'bg-[#f4f0fb]' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          );
        })}

      </div>
    </div>
  );
};
