import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  BarChart3, Calendar, Users, Layers, UserCheck, Package as PackageIcon, 
  CreditCard, TrendingUp, Megaphone, Settings, HelpCircle, X, Menu, ArrowUpRight,
  GitBranch, DollarSign, Boxes, CalendarRange, Star, Sparkles
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { HelpCenterModal } from '../common/HelpCenterModal';
import { AppTour } from '../common/AppTour';

const NAV_GROUPS = [
  {
    label: 'Studio',
    items: [
      { id: 'dashboard',   label: 'Dashboard',    icon: BarChart3,     to: '/admin' },
      { id: 'bookings',    label: 'Bookings',     icon: Calendar,      to: '/admin/bookings' },
      { id: 'classes',     label: 'Classes',      icon: Layers,        to: '/admin/classes' },
      { id: 'rota',        label: 'Staff Rota',   icon: CalendarRange, to: '/admin/rota' },
    ],
  },
  {
    label: 'CRM',
    items: [
      { id: 'crm',         label: 'Client Pipeline', icon: GitBranch,  to: '/admin/crm' },
      { id: 'clients',     label: 'All Clients',   icon: Users,         to: '/admin/clients' },
      { id: 'instructors', label: 'Instructors',   icon: UserCheck,     to: '/admin/instructors' },
      { id: 'feedback',    label: 'Feedback & NPS',icon: Star,          to: '/admin/feedback' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { id: 'packages',    label: 'Packages',     icon: PackageIcon,   to: '/admin/packages' },
      { id: 'payments',    label: 'Payments',     icon: CreditCard,    to: '/admin/payments' },
      { id: 'payroll',     label: 'Payroll',      icon: DollarSign,    to: '/admin/payroll' },
      { id: 'inventory',   label: 'Inventory',    icon: Boxes,         to: '/admin/inventory' },
    ],
  },
  {
    label: 'Insights',
    items: [
      { id: 'reports',     label: 'Reports',      icon: TrendingUp,    to: '/admin/reports' },
      { id: 'marketing',   label: 'Marketing',    icon: Megaphone,     to: '/admin/marketing' },
      { id: 'settings',    label: 'Settings',     icon: Settings,      to: '/admin/settings' },
    ],
  },
];

export const AdminLayout: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showTour, setShowTour] = useState(false);

  const getActiveNav = () => {
    if (location.pathname === '/admin') return 'dashboard';
    const path = location.pathname.split('/admin/')[1];
    return path || 'dashboard';
  };

  const activeAdminNav = getActiveNav();

  return (
    <div className="min-h-screen bg-[#fbf9fd] text-[#1c1c2b] flex flex-col md:flex-row relative">
      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in" onClick={() => setIsMobileSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative z-50 w-64 h-full bg-white border-r border-[#e5e2eb] p-5 flex flex-col justify-between flex-shrink-0 transition-transform duration-300 ease-in-out overflow-y-auto ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="space-y-5">
          <div className="pb-4 border-b border-[#e5e2eb] flex items-center justify-between">
            <Link to="/admin"><Logo size="md" /></Link>
            <button onClick={() => setIsMobileSidebarOpen(false)} className="md:hidden p-1 text-neutral-500 hover:bg-neutral-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Grouped Nav */}
          <nav className="space-y-5">
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#9ca3af] mb-1.5 px-3.5">{group.label}</p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeAdminNav === item.id || (item.id === 'dashboard' && activeAdminNav === '');
                    return (
                      <Link
                        key={item.id}
                        to={item.to}
                        onClick={() => setIsMobileSidebarOpen(false)}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${isActive ? 'bg-[#6b4cc6] text-white shadow-md shadow-[#6b4cc6]/20' : 'text-[#6b7280] hover:text-[#1c1c2b] hover:bg-[#f4f0fb]'}`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" /><span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="space-y-3 pt-6 border-t border-[#e5e2eb] mt-6">
          <div className="bg-[#f4f0fb] p-4 rounded-2xl border border-[#d3c2f0] space-y-2">
            <h4 className="font-serif text-xs font-bold text-[#4e2f80]">Movement with intention</h4>
            <p className="text-[11px] text-[#6b7280]">Reformer Pilates, Clinical Pilates & Wellness in Nairobi.</p>
            <Link to="/" className="text-xs font-bold text-[#6b4cc6] hover:underline flex items-center gap-1 pt-1">
              <span>View Public Site</span><ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <button
            onClick={() => setShowHelpCenter(true)}
            className="w-full flex items-center gap-2 text-xs text-[#6b7280] px-2 py-1 cursor-pointer hover:text-[#1c1c2b] transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-[#9ca3af]" /><span>Visit Help Center</span>
          </button>
          <button
            onClick={() => setShowTour(true)}
            className="w-full flex items-center gap-2 text-xs text-[#6b4cc6] font-semibold px-2 py-1 cursor-pointer hover:underline transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#6b4cc6]" /><span>Take Guided Tour</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 overflow-x-hidden flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center gap-3 p-4 bg-white border-b border-[#e5e2eb]">
          <button onClick={() => setIsMobileSidebarOpen(true)} className="p-2 -ml-2 text-neutral-500 hover:bg-neutral-100 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-serif text-xl font-bold">CORE BALANCE</span>
        </div>

        {/* Nested Routes Outlet */}
        <Outlet context={{ user }} />
      </div>

      {/* Modals */}
      <HelpCenterModal isOpen={showHelpCenter} onClose={() => setShowHelpCenter(false)} />
      <AppTour isOpen={showTour} onClose={() => setShowTour(false)} />
    </div>
  );
};
