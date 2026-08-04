import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Clock, Package, User, LogOut, Dumbbell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { to: '/dashboard',          label: 'Home',     icon: Home,     exact: true },
  { to: '/dashboard/schedule', label: 'Classes',  icon: Calendar, exact: false },
  { to: '/dashboard/history',  label: 'History',  icon: Clock,    exact: false },
  { to: '/dashboard/packages', label: 'Packages', icon: Package,  exact: false },
  { to: '/dashboard/profile',  label: 'Profile',  icon: User,     exact: false },
];

export const ClientSideNav: React.FC = () => {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (item: typeof NAV_ITEMS[number]) =>
    item.exact ? pathname === item.to : pathname.startsWith(item.to);

  return (
    <aside className="hidden md:flex flex-col w-64 flex-shrink-0 bg-white border-r border-[#e5e2eb] h-screen sticky top-0 p-5 justify-between overflow-y-auto">
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center gap-2 pb-4 border-b border-[#e5e2eb]">
          <div className="w-8 h-8 rounded-xl bg-[#6b4cc6] flex items-center justify-center">
            <Dumbbell className="w-4 h-4 text-white" />
          </div>
          <span className="font-serif font-bold text-[#1c1c2b] text-base tracking-tight">Core Balance</span>
        </div>

        {/* Nav items */}
        <nav className="space-y-1">
          {NAV_ITEMS.map(item => {
            const active = isActive(item);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#6b4cc6] text-white shadow-md shadow-[#6b4cc6]/20'
                    : 'text-[#6b7280] hover:text-[#1c1c2b] hover:bg-[#f4f0fb]'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User footer */}
      <div className="space-y-3 pt-4 border-t border-[#e5e2eb]">
        <div className="flex items-center gap-3 px-1">
          <img
            src={user?.avatarUrl}
            alt={user?.name}
            className="w-9 h-9 rounded-full object-cover border border-[#e5e2eb] flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#1c1c2b] truncate">{user?.name}</p>
            <p className="text-[10px] text-[#6b7280] truncate">{user?.membershipName}</p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-[#6b7280] hover:text-rose-600 hover:bg-rose-50 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
