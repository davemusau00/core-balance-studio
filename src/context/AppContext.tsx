import React, { createContext, useContext, useState } from 'react';
import { 
  ClassSession, 
  PackageOption, 
  ClientProfile, 
  Booking, 
  WaitlistEntry, 
  ActivityItem, 
  AppViewMode, 
  ActiveTab 
} from '../types';
import { 
  INITIAL_CLASS_SESSIONS, 
  MOCK_PACKAGES, 
  INITIAL_CLIENT_PROFILE, 
  INITIAL_WAITLIST, 
  INITIAL_ACTIVITIES 
} from '../data/mockData';

interface AppContextType {
  viewMode: AppViewMode;
  setViewMode: (mode: AppViewMode) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedServiceFilter: string;
  setSelectedServiceFilter: (filter: string) => void;
  
  classSessions: ClassSession[];
  selectedSession: ClassSession | null;
  setSelectedSession: (session: ClassSession | null) => void;
  isClassDetailOpen: boolean;
  setIsClassDetailOpen: (open: boolean) => void;
  
  selectedPackage: PackageOption;
  setSelectedPackage: (pkg: PackageOption) => void;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  
  clientProfile: ClientProfile;
  bookings: Booking[];
  waitlist: WaitlistEntry[];
  activities: ActivityItem[];
  
  // Actions
  handleBookSession: (session: ClassSession) => void;
  handleConfirmBooking: (paymentMethod: 'MPESA' | 'CARD', phone?: string) => Promise<boolean>;
  handleJoinWaitlist: (session: ClassSession) => void;
  handleCancelBooking: (bookingId: string) => void;
  handleAdminCheckIn: (sessionId: string) => void;
  handleAdminNotifyWaitlist: (waitlistId: string) => void;
  handleAddNewClass: (newClass: Partial<ClassSession>) => void;
  
  // Toast / Notification
  toastInfo: { title: string; message: string; type?: 'success' | 'info' | 'warning' } | null;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  clearToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<AppViewMode>('public');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedDate, setSelectedDate] = useState<string>('2026-05-14');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string>('all');
  
  const [classSessions, setClassSessions] = useState<ClassSession[]>(INITIAL_CLASS_SESSIONS);
  const [selectedSession, setSelectedSession] = useState<ClassSession | null>(null);
  const [isClassDetailOpen, setIsClassDetailOpen] = useState<boolean>(false);
  
  const [selectedPackage, setSelectedPackage] = useState<PackageOption>(MOCK_PACKAGES[0]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  
  const [clientProfile, setClientProfile] = useState<ClientProfile>(INITIAL_CLIENT_PROFILE);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(INITIAL_WAITLIST);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  
  const [toastInfo, setToastInfo] = useState<{ title: string; message: string; type?: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastInfo({ title, message, type });
    setTimeout(() => {
      setToastInfo((current) => (current?.title === title ? null : current));
    }, 4500);
  };

  const clearToast = () => setToastInfo(null);

  const handleBookSession = (session: ClassSession) => {
    setSelectedSession(session);
    setIsClassDetailOpen(true);
  };

  const handleConfirmBooking = async (paymentMethod: 'MPESA' | 'CARD', phone?: string): Promise<boolean> => {
    if (!selectedSession) return false;

    // Simulate payment process delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update session booked count
    setClassSessions((prev) =>
      prev.map((s) => {
        if (s.id === selectedSession.id) {
          const newBooked = s.bookedCount + 1;
          const newStatus = newBooked >= s.capacity ? 'full' : newBooked >= s.capacity - 2 ? 'few-spots' : 'available';
          return { ...s, bookedCount: newBooked, status: newStatus };
        }
        return s;
      })
    );

    const newBooking: Booking = {
      id: `bk_${Date.now()}`,
      sessionId: selectedSession.id,
      sessionTitle: selectedSession.title,
      instructorName: selectedSession.instructor.name,
      date: selectedSession.dayLabel,
      time: selectedSession.startTime,
      location: selectedSession.location || 'Core Balance Studio, Nairobi',
      packageName: selectedPackage.name,
      priceKES: selectedPackage.priceKES,
      paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      mpesaPhone: phone,
      transactionRef: `MP-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Update client profile
    setClientProfile((prev) => ({
      ...prev,
      classesRemaining: Math.max(0, prev.classesRemaining - 1),
      upcomingBooking: {
        id: newBooking.id,
        classTitle: selectedSession.title,
        dateLabel: selectedSession.dayLabel.toUpperCase(),
        time: selectedSession.startTime,
        durationMinutes: selectedSession.durationMinutes,
        instructorName: selectedSession.instructor.name,
        location: selectedSession.location || 'Core Balance Studio, Nairobi',
        category: selectedSession.category
      }
    }));

    // Add activity
    setActivities((prev) => [
      {
        id: `act_${Date.now()}`,
        type: 'booking',
        title: `Booked ${selectedSession.title}`,
        subtitle: `${selectedSession.instructor.name} · ${selectedSession.dayLabel}`,
        timestamp: 'Just now',
        statusBadge: 'Confirmed'
      },
      ...prev
    ]);

    setIsPaymentModalOpen(false);
    setIsClassDetailOpen(false);

    showToast('Booking Confirmed!', `We have reserved your spot for ${selectedSession.title} on ${selectedSession.dayLabel}. Confirmation sent to your email & WhatsApp.`, 'success');

    return true;
  };

  const handleJoinWaitlist = (session: ClassSession) => {
    setClassSessions((prev) =>
      prev.map((s) => (s.id === session.id ? { ...s, waitlistCount: s.waitlistCount + 1 } : s))
    );

    const newWl: WaitlistEntry = {
      id: `wl_${Date.now()}`,
      clientName: clientProfile.name,
      clientAvatar: clientProfile.avatarUrl,
      classTitle: session.title,
      dateLabel: session.dayLabel,
      time: session.startTime,
      requestedAt: 'Just now',
      status: 'pending'
    };

    setWaitlist((prev) => [newWl, ...prev]);
    showToast('Added to Waitlist', `You are #${session.waitlistCount + 1} on the waitlist for ${session.title}. We'll notify you via SMS/WhatsApp if a spot opens!`, 'info');
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    setClientProfile((prev) => ({
      ...prev,
      classesRemaining: prev.classesRemaining + 1,
      upcomingBooking: undefined
    }));
    showToast('Booking Cancelled', 'Your booking was cancelled within the policy window. Your class credit has been restored.', 'info');
  };

  const handleAdminCheckIn = (sessionId: string) => {
    setClassSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, bookedCount: Math.min(s.capacity, s.bookedCount + 1) } : s))
    );
    showToast('Client Checked In', 'Attendance recorded successfully.', 'success');
  };

  const handleAdminNotifyWaitlist = (waitlistId: string) => {
    setWaitlist((prev) =>
      prev.map((w) => (w.id === waitlistId ? { ...w, status: 'notified' } : w))
    );
    showToast('Notification Sent', 'SMS & WhatsApp alert dispatched to client.', 'success');
  };

  const handleAddNewClass = (newClassData: Partial<ClassSession>) => {
    const newSession: ClassSession = {
      id: `session_${Date.now()}`,
      title: newClassData.title || 'Reformer Pilates',
      slug: (newClassData.title || 'reformer').toLowerCase().replace(/\s+/g, '-'),
      category: newClassData.category || 'classic',
      serviceType: newClassData.serviceType || 'Reformer Pilates',
      instructor: newClassData.instructor || INITIAL_CLASS_SESSIONS[0].instructor,
      startTime: newClassData.startTime || '09:00 AM',
      endTime: newClassData.endTime || '10:00 AM',
      date: selectedDate,
      dayLabel: 'Wed 14 May',
      durationMinutes: newClassData.durationMinutes || 60,
      difficulty: newClassData.difficulty || 'Intermediate',
      priceKES: newClassData.priceKES || 2200,
      capacity: newClassData.capacity || 12,
      bookedCount: 0,
      waitlistCount: 0,
      status: 'available',
      location: 'Core Balance Studio, Nairobi West',
      description: newClassData.description || 'Custom session scheduled by studio admin.',
      benefits: ['Core precision', 'Full body alignment']
    };

    setClassSessions((prev) => [newSession, ...prev]);
    showToast('Class Scheduled', `Added ${newSession.title} (${newSession.startTime}) to studio schedule.`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        isMobileFrame,
        setIsMobileFrame,
        activeTab,
        setActiveTab,
        selectedDate,
        setSelectedDate,
        selectedServiceFilter,
        setSelectedServiceFilter,
        classSessions,
        selectedSession,
        setSelectedSession,
        isClassDetailOpen,
        setIsClassDetailOpen,
        selectedPackage,
        setSelectedPackage,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        clientProfile,
        bookings,
        waitlist,
        activities,
        handleBookSession,
        handleConfirmBooking,
        handleJoinWaitlist,
        handleCancelBooking,
        handleAdminCheckIn,
        handleAdminNotifyWaitlist,
        handleAddNewClass,
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
