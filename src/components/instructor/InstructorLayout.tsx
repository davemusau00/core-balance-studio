import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Users, DollarSign, HelpCircle, LogOut, Sparkles, UserCheck, ShieldAlert } from 'lucide-react';
import { Logo } from '../common/Logo';
import { HelpCenterModal } from '../common/HelpCenterModal';

export const InstructorLayout: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [showHelpCenter, setShowHelpCenter] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbf9fd] text-[#1c1c2b] flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1c1c2b] text-white p-5 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-6">
          <div className="pb-4 border-b border-white/10 flex items-center justify-between">
            <Link to="/instructor"><Logo size="md" /></Link>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#6b4cc6] text-white px-2.5 py-1 rounded-full">
              Staff Portal
            </span>
          </div>

          {/* Instructor Badge */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl">
            <img src={user?.avatarUrl} alt={user?.name} className="w-10 h-10 rounded-full object-cover border border-white/20" />
            <div className="min-w-0">
              <h4 className="font-bold text-xs truncate">{user?.name}</h4>
              <p className="text-[10px] text-[#b894e6] font-semibold">{user?.membershipName || 'Senior Instructor'}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { label: 'My Dashboard & Roster', icon: Calendar, to: '/instructor' },
              { label: 'Client Injury Notes', icon: ShieldAlert, to: '/instructor?tab=injuries' },
              { label: 'My Earnings', icon: DollarSign, to: '/instructor?tab=earnings' },
            ].map(item => (
              <Link
                key={item.label}
                to={item.to}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              >
                <item.icon className="w-4 h-4 text-[#b894e6]" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="space-y-3 pt-6 border-t border-white/10 mt-6">
          <button
            onClick={() => setShowHelpCenter(true)}
            className="w-full flex items-center gap-2 text-xs text-white/70 hover:text-white px-2 py-1.5 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-[#b894e6]" />
            <span>Visit Help Center</span>
          </button>

          <button
            onClick={signOut}
            className="w-full flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 px-2 py-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 min-w-0 overflow-x-hidden flex flex-col">
        <Outlet context={{ user }} />
      </div>

      {/* Help Center Modal */}
      <HelpCenterModal isOpen={showHelpCenter} onClose={() => setShowHelpCenter(false)} />
    </div>
  );
};
