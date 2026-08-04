import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar as CalendarIcon, Grid, User } from 'lucide-react';

export const ClientMobileNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { id: 'home', to: '/dashboard', label: 'Home', icon: Home },
    { id: 'book', to: '/book', label: 'Book', icon: CalendarIcon },
    { id: 'history', to: '/dashboard/history', label: 'History', icon: Grid },
    { id: 'profile', to: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-[#e5e2eb] px-6 py-2 pb-safe z-40 transition-transform duration-300">
      <div className="flex justify-between items-center max-w-sm mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || 
                           (item.id === 'book' && location.pathname.startsWith('/book'));
                           
          return (
            <Link
              key={item.id}
              to={item.to}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 min-w-[64px] ${
                isActive 
                  ? 'text-[#6b4cc6] bg-[#f4f0fb] scale-110' 
                  : 'text-[#9ca3af] hover:text-[#6b7280]'
              }`}
            >
              <item.icon className={`w-5 h-5 mb-1 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className={`text-[10px] font-semibold transition-all ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
