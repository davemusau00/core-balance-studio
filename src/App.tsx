import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DeviceFrameSwitcher } from './components/common/DeviceFrameSwitcher';
import { Toast } from './components/common/Toast';
import { PublicWebsite } from './components/public/PublicWebsite';
import { BookingSchedule } from './components/booking/BookingSchedule';
import { ClassDetailModal } from './components/booking/ClassDetailModal';
import { ClientDashboard } from './components/client/ClientDashboard';
import { ClientMobileNav } from './components/client/ClientMobileNav';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Logo } from './components/common/Logo';
import { MobileMenuDrawer } from './components/common/MobileMenuDrawer';
import { ArrowLeft, Share2, Wifi, Battery, Signal, Award, ShieldCheck, Heart, Menu, Bell } from 'lucide-react';
import { SAVED_PROGRAMS, MOCK_PACKAGES } from './data/mockData';

const MainContent: React.FC = () => {
  const { viewMode, activeTab, setActiveTab, setViewMode, isMobileFrame, clientProfile } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderClientTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <ClientDashboard />;
      case 'book':
        return <BookingSchedule />;
      case 'programs':
        return (
          <div className="max-w-4xl mx-auto space-y-6 pb-24">
            <div className="border-b border-[#e5e2eb] pb-4">
              <h1 className="font-serif text-2xl font-bold text-[#1c1c2b]">Studio Programs & Packs</h1>
              <p className="text-xs text-[#6b7280]">Targeted movement pathways designed for long-term progression.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SAVED_PROGRAMS.map((prog) => (
                <div key={prog.id} className="bg-white rounded-3xl border border-[#e5e2eb] overflow-hidden shadow-sm p-4 flex gap-4 items-center">
                  <img src={prog.imageUrl} alt={prog.title} className="w-24 h-24 rounded-2xl object-cover" />
                  <div>
                    <span className="text-[10px] font-bold uppercase bg-[#f4f0fb] text-[#6b4cc6] px-2 py-0.5 rounded-full">
                      {prog.level}
                    </span>
                    <h3 className="font-bold text-sm text-[#1c1c2b] mt-1">{prog.title}</h3>
                    <p className="text-xs text-[#6b7280]">{prog.sessionsCount} guided reformer sessions</p>
                    <button 
                      onClick={() => setActiveTab('book')}
                      className="mt-2 text-xs font-semibold text-[#6b4cc6] hover:underline"
                    >
                      View Schedule →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#e5e2eb]">
              <h2 className="font-serif text-xl font-bold text-[#1c1c2b] mb-3">Available Class Packages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {MOCK_PACKAGES.map((pkg) => (
                  <div key={pkg.id} className="bg-white border border-[#e5e2eb] p-4 rounded-3xl space-y-2">
                    <h3 className="font-bold text-sm text-[#1c1c2b]">{pkg.name}</h3>
                    <p className="font-bold text-base text-[#4e2f80]">KES {pkg.priceKES.toLocaleString()}</p>
                    <p className="text-xs text-[#6b7280]">{pkg.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-md mx-auto bg-white border border-[#e5e2eb] rounded-3xl p-6 space-y-6 pb-24 shadow-sm">
            <div className="text-center space-y-2">
              <img
                src={clientProfile.avatarUrl}
                alt={clientProfile.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-[#f4f0fb] mx-auto shadow-md"
              />
              <h2 className="font-serif text-xl font-bold text-[#1c1c2b]">{clientProfile.name}</h2>
              <p className="text-xs text-[#6b7280]">{clientProfile.email} · {clientProfile.phone}</p>
            </div>

            <div className="bg-[#f4f0fb] border border-[#d3c2f0] p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6b7280]">Active Membership</span>
                <span className="font-bold text-[#4e2f80]">{clientProfile.membershipName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b7280]">Classes Remaining</span>
                <span className="font-bold text-[#1c1c2b]">{clientProfile.classesRemaining} Credits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6b7280]">Current Streak</span>
                <span className="font-bold text-emerald-700">{clientProfile.currentStreakWeeks} Weeks</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => setViewMode('admin')}
                className="w-full py-3 bg-[#1c1c2b] text-white rounded-2xl text-xs font-semibold hover:bg-black transition-colors"
              >
                Switch to Studio Admin Mode
              </button>
            </div>
          </div>
        );
      default:
        return <ClientDashboard />;
    }
  };

  const renderAppBody = () => {
    if (viewMode === 'public') {
      return <PublicWebsite />;
    }
    if (viewMode === 'admin') {
      return <AdminDashboard />;
    }
    return (
      <div className="min-h-screen bg-[#fbf9fd] flex flex-col">
        {/* Header Navigation for Client View (Hidden on mobile inside Frame, shown on desktop) */}
        <header className="hidden md:flex sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e5e2eb] px-8 py-3.5 items-center justify-between shadow-sm">
          <div className="flex items-center gap-8">
            <Logo size="md" />
            <nav className="flex items-center gap-6 text-sm font-semibold text-[#6b7280]">
              <button 
                onClick={() => setActiveTab('home')}
                className={`transition-colors hover:text-[#1c1c2b] ${activeTab === 'home' ? 'text-[#6b4cc6]' : ''}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('programs')}
                className={`transition-colors hover:text-[#1c1c2b] ${activeTab === 'programs' ? 'text-[#6b4cc6]' : ''}`}
              >
                Programs
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('book')}
              className="px-5 py-2.5 bg-[#6b4cc6] text-white rounded-xl text-sm font-semibold hover:bg-[#5b3894] transition-all shadow-sm shadow-[#6b4cc6]/20"
            >
              Book a Class
            </button>
            
            <div className="w-px h-8 bg-[#e5e2eb]" />
            
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img src={clientProfile.avatarUrl} alt="Profile" className="w-9 h-9 rounded-full object-cover border border-[#e5e2eb]" />
            </button>
          </div>
        </header>

        {/* Mobile Header (When not in frame mode, we need a header for mobile) */}
        {!isMobileFrame && (
          <header className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e5e2eb] px-4 py-3 flex items-center justify-between">
            <Logo size="sm" />
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-100 text-[#1c1c2b]"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </header>
        )}

        <main className="flex-1 p-4 sm:p-8">
          {renderClientTabContent()}
        </main>

        <ClientMobileNav />

        <MobileMenuDrawer
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeId={activeTab}
          onItemClick={(id) => setActiveTab(id as any)}
          items={[
            { id: 'home', label: 'Dashboard' },
            { id: 'book', label: 'Book a Class' },
            { id: 'programs', label: 'Programs & Packages' },
            { id: 'profile', label: 'My Profile' }
          ]}
          ctaLabel="Book a Class"
          onCta={() => setActiveTab('book')}
        />
      </div>
    );
  };

  // If Mobile Frame mode is enabled, encapsulate the client/public app inside a phone device mockup
  if (isMobileFrame && viewMode !== 'admin') {
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
          <div className="flex-1 bg-[#fbf9fd] text-[#1c1c2b] rounded-[38px] overflow-y-auto no-scrollbar relative pt-2 flex flex-col">
            {viewMode === 'public' ? (
              <PublicWebsite />
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="p-3 flex-1 pb-20">
                  {renderClientTabContent()}
                </div>
                <ClientMobileNav />
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }

  return renderAppBody();
};

export function App() {
  const isDev = process.env.NODE_ENV === 'development' || import.meta.env?.DEV;
  
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#fbf9fd] font-sans">
        {isDev && <DeviceFrameSwitcher />}
        <MainContent />
        <ClassDetailModal />
        <Toast />
      </div>
    </AppProvider>
  );
}

export default App;
