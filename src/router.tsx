import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { PublicWebsite } from './components/public/PublicWebsite';
import { InstructorsPage } from './pages/public/InstructorsPage';
import { MembershipsPage } from './pages/public/MembershipsPage';
import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ClientDashboard } from './components/client/ClientDashboard';
import { ProfilePage } from './pages/client/ProfilePage';
import { BookingHistoryPage } from './pages/client/BookingHistoryPage';
import { BookingSchedule } from './components/booking/BookingSchedule';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminClientsPage } from './pages/admin/AdminClientsPage';
import { AdminClassesPage } from './pages/admin/AdminClassesPage';
import { RequireAuth } from './components/common/RequireAuth';
import { BookingCheckoutPage } from './pages/booking/BookingCheckoutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App now serves as a layout wrapper for toast/modals
    children: [
      { index: true, element: <PublicWebsite /> },
      { path: 'instructors', element: <InstructorsPage /> },
      { path: 'memberships', element: <MembershipsPage /> },
      { path: 'signin', element: <SignInPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'book', element: <BookingSchedule /> },
      { path: 'book/:slug', element: <BookingCheckoutPage /> },
      {
        path: 'dashboard',
        element: (
          <RequireAuth requireRole="client">
            {/* The layout structure (header/mobile nav) will be handled in App or a ClientLayout */}
            <ClientDashboard />
          </RequireAuth>
        ),
      },
      {
        path: 'dashboard/profile',
        element: (
          <RequireAuth requireRole="client">
            <ProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: 'dashboard/history',
        element: (
          <RequireAuth requireRole="client">
            <BookingHistoryPage />
          </RequireAuth>
        ),
      },
      {
        path: 'admin',
        element: (
          <RequireAuth requireRole="admin">
            <AdminLayout />
          </RequireAuth>
        ),
        children: [
          { index: true, element: <AdminOverviewPage /> },
          { path: 'clients', element: <AdminClientsPage /> },
          { path: 'classes', element: <AdminClassesPage /> },
          { path: '*', element: <AdminOverviewPage /> }, // Fallback for other mock routes
        ],
      },
    ],
  },
]);
