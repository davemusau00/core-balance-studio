export type ServiceCategory = 'classic' | 'therapy' | 'power' | 'sculpt' | 'clinical' | 'advanced';

export type ServiceType = 
  | 'Reformer Pilates'
  | 'Clinical Pilates'
  | 'Stretch Therapy'
  | 'Trapeze Yoga'
  | 'Strength & Sculpt';

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  specialties: string[];
  experienceYears: number;
  classesLedCount: number;
  rating: number;
  bio: string;
}

export interface ClassSession {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  serviceType: ServiceType;
  instructor: Instructor;
  startTime: string; // e.g. "07:00 AM"
  endTime: string;   // e.g. "08:00 AM"
  date: string;      // YYYY-MM-DD
  dayLabel: string;  // e.g. "Wed 14 May"
  durationMinutes: number;
  difficulty: 'Beginner' | 'All Levels' | 'Intermediate' | 'Advanced';
  priceKES: number;
  capacity: number;
  bookedCount: number;
  waitlistCount: number;
  status: 'available' | 'few-spots' | 'full' | 'cancelled';
  description?: string;
  benefits?: string[];
  location?: string;
}

export interface PackageOption {
  id: string;
  name: string;
  classCount: number | null;
  validityDays: number | null;
  priceKES: number;
  savingsPercent?: number;
  badgeText?: string;
  isBestValue?: boolean;
  description: string;
}

export interface Booking {
  id: string;
  sessionId: string;
  sessionTitle: string;
  instructorName: string;
  date: string;
  time: string;
  location: string;
  packageName: string;
  priceKES: number;
  paymentMethod: 'MPESA' | 'CARD' | 'PACKAGE_CREDIT';
  status: 'confirmed' | 'cancelled' | 'attended';
  createdAt: string;
  mpesaPhone?: string;
  transactionRef?: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  classesRemaining: number;
  totalClassesPurchased: number;
  membershipName: string;
  membershipStatus: 'ACTIVE' | 'EXPIRED' | 'PAUSED';
  membershipRenewalDate: string;
  currentStreakWeeks: number;
  classesThisMonth: number;
  upcomingBooking?: {
    id: string;
    classTitle: string;
    dateLabel: string;
    time: string;
    durationMinutes: number;
    instructorName: string;
    location: string;
    category: ServiceCategory;
  };
}

export interface ActivityItem {
  id: string;
  type: 'booking' | 'purchase' | 'cancellation' | 'attendance' | 'review';
  title: string;
  subtitle: string;
  timestamp: string;
  statusBadge?: string;
}

export interface WaitlistEntry {
  id: string;
  clientName: string;
  clientAvatar: string;
  classTitle: string;
  dateLabel: string;
  time: string;
  requestedAt: string;
  status: 'pending' | 'notified' | 'promoted';
}

export interface SavedProgram {
  id: string;
  title: string;
  sessionsCount: number;
  imageUrl: string;
  level: string;
}

export type AppViewMode = 'public' | 'client' | 'admin';
export type ActiveTab = 'home' | 'book' | 'programs' | 'profile' | 'admin-dashboard' | 'admin-bookings' | 'admin-clients' | 'admin-classes';
