import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  viewMode: 'public' | 'client' | 'admin';
  setViewMode: (val: 'public' | 'client' | 'admin') => void;
  activeTab: string;
  setActiveTab: (val: string) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  
  // Toast / Notification
  toastInfo: { title: string; message: string; type?: 'success' | 'info' | 'warning' | 'error' } | null;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  clearToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<'public' | 'client' | 'admin'>('public');
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);
  const [toastInfo, setToastInfo] = useState<{ title: string; message: string; type?: 'success' | 'info' | 'warning' | 'error' } | null>(null);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToastInfo({ title, message, type });
    setTimeout(() => {
      setToastInfo((current) => (current?.title === title ? null : current));
    }, 4500);
  };

  const clearToast = () => setToastInfo(null);

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        activeTab,
        setActiveTab,
        isMobileFrame,
        setIsMobileFrame,
        toastInfo,
        showToast,
        clearToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
