import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { PublicWebsite } from './components/public/PublicWebsite';
import { InstructorsPage } from './pages/public/InstructorsPage';
import { MembershipsPage } from './pages/public/MembershipsPage';
import { WebstorePage } from './pages/public/WebstorePage';
import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { BookingSchedule } from './components/booking/BookingSchedule';
import { BookingCheckoutPage } from './pages/booking/BookingCheckoutPage';
import { RequireAuth } from './components/common/RequireAuth';

// Client layout + pages
import { ClientLayout } from './components/client/ClientLayout';
import { ClientDashboard } from './components/client/ClientDashboard';
import { ClientSchedulePage } from './pages/client/ClientSchedulePage';
import { ClientPackagesPage } from './pages/client/ClientPackagesPage';
import { BookingHistoryPage } from './pages/client/BookingHistoryPage';
import { ProfilePage } from './pages/client/ProfilePage';

// Admin layout + pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminClientsPage } from './pages/admin/AdminClientsPage';
import { AdminClassesPage } from './pages/admin/AdminClassesPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminInstructorsPage } from './pages/admin/AdminInstructorsPage';
import { AdminPackagesPage } from './pages/admin/AdminPackagesPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminMarketingPage } from './pages/admin/AdminMarketingPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
// ERP & CRM
import { AdminCRMPage } from './pages/admin/AdminCRMPage';
import { AdminPayrollPage } from './pages/admin/AdminPayrollPage';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage';
import { AdminRotaPage } from './pages/admin/AdminRotaPage';
import { AdminFeedbackPage } from './pages/admin/AdminFeedbackPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // ── Public routes ──────────────────────────────────────────────
      { index: true,            element: <PublicWebsite /> },
      { path: 'instructors',   element: <InstructorsPage /> },
      { path: 'memberships',   element: <MembershipsPage /> },
      { path: 'shop',          element: <WebstorePage /> },
      { path: 'signin',        element: <SignInPage /> },
      { path: 'signup',        element: <SignUpPage /> },
      { path: 'book',          element: <BookingSchedule /> },
      { path: 'book/:slug',    element: <BookingCheckoutPage /> },

      // ── Client portal (nested layout) ──────────────────────────────
      {
        path: 'dashboard',
        element: (
          <RequireAuth requireRole="client">
            <ClientLayout />
          </RequireAuth>
        ),
        children: [
          { index: true,          element: <ClientDashboard /> },
          { path: 'schedule',     element: <ClientSchedulePage /> },
          { path: 'packages',     element: <ClientPackagesPage /> },
          { path: 'history',      element: <BookingHistoryPage /> },
          { path: 'profile',      element: <ProfilePage /> },
        ],
      },

      // ── Admin portal (nested layout) ───────────────────────────────
      {
        path: 'admin',
        element: (
          <RequireAuth requireRole="admin">
            <AdminLayout />
          </RequireAuth>
        ),
        children: [
          // Studio
          { index: true,              element: <AdminOverviewPage /> },
          { path: 'bookings',         element: <AdminBookingsPage /> },
          { path: 'classes',          element: <AdminClassesPage /> },
          { path: 'rota',             element: <AdminRotaPage /> },
          // CRM
          { path: 'crm',              element: <AdminCRMPage /> },
          { path: 'clients',          element: <AdminClientsPage /> },
          { path: 'instructors',      element: <AdminInstructorsPage /> },
          { path: 'feedback',         element: <AdminFeedbackPage /> },
          // Operations
          { path: 'packages',         element: <AdminPackagesPage /> },
          { path: 'payments',         element: <AdminPaymentsPage /> },
          { path: 'payroll',          element: <AdminPayrollPage /> },
          { path: 'inventory',        element: <AdminInventoryPage /> },
          // Insights
          { path: 'reports',          element: <AdminReportsPage /> },
          { path: 'marketing',        element: <AdminMarketingPage /> },
          { path: 'settings',         element: <AdminSettingsPage /> },
          { path: '*',               element: <AdminOverviewPage /> },
        ],
      },
    ],
  },
]);
