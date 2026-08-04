import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
  requireRole?: 'client' | 'admin';
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, requireRole }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbf9fd]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#6b4cc6] border-t-transparent animate-spin mx-auto" />
          <p className="text-xs text-[#6b7280] font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (requireRole && user?.role !== requireRole) {
    // Client trying to access admin → redirect to dashboard
    if (requireRole === 'admin') return <Navigate to="/dashboard" replace />;
    // Admin trying to access client → redirect to admin
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};
