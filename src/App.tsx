import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { DeviceFrameSwitcher } from './components/common/DeviceFrameSwitcher';
import { Toast } from './components/common/Toast';
import { ClientMobileNav } from './components/client/ClientMobileNav';
import { Signal, Wifi, Battery } from 'lucide-react';
import { useAuth } from './context/AuthContext';

const AppLayout: React.FC = () => {
  const { isMobileFrame } = useApp();
  const { user } = useAuth();
  const location = useLocation();

  // Simple logic to show bottom nav only for client dashboard routes on mobile
  const isClientRoute = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/book');
  const showBottomNav = isClientRoute && user?.role === 'client';

  const content = (
    <div className="flex-1 flex flex-col relative w-full h-full">
      <div className={`flex-1 overflow-y-auto ${showBottomNav ? 'pb-20 md:pb-0' : ''}`}>
        <Outlet />
      </div>
      {showBottomNav && <ClientMobileNav />}
    </div>
  );

  if (isMobileFrame && location.pathname !== '/admin') {
    return (
      <div className="min-h-screen bg-[#141218] p-4 sm:p-8 flex items-center justify-center">
        <div className="relative w-[385px] h-[810px] bg-black rounded-[50px] p-3 shadow-2xl border-4 border-neutral-800 ring-1 ring-white/10 overflow-hidden flex flex-col">
          {/* Phone Speaker Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-neutral-900 border border-neutral-700" />
          </div>

          {/* Status Bar */}
          <div className="pt-2 px-6 pb-2 flex items-center justify-between text-white text-[11px] font-semibold z-40 select-none">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Screen Content inside Frame */}
          <div className="flex-1 bg-[#fbf9fd] text-[#1c1c2b] rounded-[38px] overflow-hidden relative pt-2 flex flex-col">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9fd]">
      {content}
    </div>
  );
};

export const App: React.FC = () => {
  const isDev = process.env.NODE_ENV === 'development' || import.meta.env?.DEV;
  
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#fbf9fd] font-sans">
        {isDev && <DeviceFrameSwitcher />}
        <AppLayout />
        <Toast />
      </div>
    </AppProvider>
  );
};

export default App;
