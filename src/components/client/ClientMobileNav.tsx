import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Clock, Package, User } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/dashboard',          label: 'Home',     icon: Home,     exact: true },
  { to: '/dashboard/schedule', label: 'Classes',  icon: Calendar, exact: false },
  { to: '/dashboard/history',  label: 'History',  icon: Clock,    exact: false },
  { to: '/dashboard/packages', label: 'Packages', icon: Package,  exact: false },
  { to: '/dashboard/profile',  label: 'Profile',  icon: User,     exact: false },
];

export const ClientMobileNav: React.FC = () => {
  const { pathname } = useLocation();

  const isActive = (item: typeof NAV_ITEMS[number]) =>
    item.exact ? pathname === item.to : pathname.startsWith(item.to);

  return (
    <nav
      aria-label="Client navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#e5e2eb] z-40 safe-area-inset-bottom"
    >
      <div className="flex justify-around items-center px-2 py-2">
        {NAV_ITEMS.map(item => {
          const active = isActive(item);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl min-w-[52px] transition-all duration-200 ${
                active
                  ? 'text-[#6b4cc6] bg-[#f4f0fb]'
                  : 'text-[#9ca3af] hover:text-[#6b7280]'
              }`}
            >
              <item.icon
                className={`w-5 h-5 transition-all ${active ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`}
              />
              <span className={`text-[10px] font-semibold leading-none ${active ? 'text-[#6b4cc6]' : 'text-[#9ca3af]'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
