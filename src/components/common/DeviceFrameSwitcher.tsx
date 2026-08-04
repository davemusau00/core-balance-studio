import React from 'react';
import { Smartphone, Monitor, Globe, UserCheck, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppViewMode } from '../../types';

export const DeviceFrameSwitcher: React.FC = () => {
  const { viewMode, setViewMode, isMobileFrame, setIsMobileFrame, setActiveTab } = useApp();

  const handleModeChange = (mode: AppViewMode) => {
    setViewMode(mode);
    if (mode === 'public') setActiveTab('home');
    if (mode === 'client') setActiveTab('home');
    if (mode === 'admin') setActiveTab('admin-dashboard');
  };

  return (
    <div className="bg-[#1c1c2b] text-white px-4 py-2 border-b border-white/10 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* App Mode Selector */}
        <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl">
          <button
            onClick={() => handleModeChange('public')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === 'public'
                ? 'bg-[#6b4cc6] text-white shadow-sm'
                : 'text-neutral-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </button>

          <button
            onClick={() => handleModeChange('client')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === 'client'
                ? 'bg-[#6b4cc6] text-white shadow-sm'
                : 'text-neutral-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Client Booking Portal</span>
          </button>

          <button
            onClick={() => handleModeChange('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === 'admin'
                ? 'bg-[#6b4cc6] text-white shadow-sm'
                : 'text-neutral-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Studio Admin</span>
          </button>
        </div>

        {/* View Mode Toggle: Responsive vs Mobile Frame */}
        <div className="flex items-center gap-2">
          <span className="text-neutral-400 hidden sm:inline">Preview Mode:</span>
          <div className="flex items-center bg-white/10 p-1 rounded-xl">
            <button
              onClick={() => setIsMobileFrame(false)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                !isMobileFrame ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Full Responsive Web View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Responsive Web</span>
            </button>

            <button
              onClick={() => setIsMobileFrame(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                isMobileFrame ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Mobile Device Frame View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mobile Frame</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
