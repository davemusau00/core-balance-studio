import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ClientMobileNav } from './ClientMobileNav';
import { ClientSideNav } from './ClientSideNav';

/**
 * ClientLayout wraps all authenticated client routes.
 * - Renders a persistent sidebar on desktop (md+)
 * - Renders the mobile bottom tab bar on small screens
 * - Outlet renders the active child page (home, schedule, history, profile, etc.)
 */
export const ClientLayout: React.FC = () => {
  const location = useLocation();
  const isMobileFrame = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/book');

  return (
    <div className="min-h-screen bg-[#fbf9fd] flex flex-col md:flex-row">
      {/* Desktop Sidebar - hidden on mobile */}
      <ClientSideNav />

      {/* Page content */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        {/* Scrollable content area with padding for mobile nav */}
        <div className="pb-24 md:pb-0 px-4 sm:px-6 md:px-8 py-6 md:py-10 max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <ClientMobileNav />
    </div>
  );
};
