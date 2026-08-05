import { useEffect, useState } from 'react';
import { INITIAL_CLASS_SESSIONS } from '../data/mockData';

export type DemoAttendanceStatus = 'pending' | 'present' | 'late' | 'no-show';
export type DemoBookingStatus = 'confirmed' | 'waitlisted' | 'attended' | 'cancelled';

export interface DemoBooking {
  id: string;
  clientId: string;
  clientName: string;
  sessionId: string;
  sessionTitle: string;
  instructorName: string;
  date: string;
  dateLabel: string;
  time: string;
  location: string;
  bedNumber: number;
  packageName: string;
  priceKES: number;
  paymentMethod: 'MPESA' | 'CARD' | 'PACKAGE_CREDIT';
  transactionRef: string;
  status: DemoBookingStatus;
  attendance: DemoAttendanceStatus;
  clinicalNote?: string;
  createdAt: string;
}

export interface DemoSubRequest {
  id: string;
  sessionTitle: string;
  dateLabel: string;
  time: string;
  requestedBy: string;
  reason: string;
  status: 'open' | 'claimed' | 'approved';
  createdAt: string;
}

export interface DemoNotification {
  id: string;
  title: string;
  message: string;
  audience: 'client' | 'instructor' | 'admin';
  read: boolean;
  createdAt: string;
}

export interface DemoState {
  bookings: DemoBooking[];
  subRequests: DemoSubRequest[];
  notifications: DemoNotification[];
  completedSessions: string[];
}

const STORAGE_KEY = 'core-balance-demo-state-v2';
const CHANGE_EVENT = 'core-balance-demo-state-change';

const seedBookings: DemoBooking[] = [
  { id: 'bk_demo_1', clientId: 'demo_client_wambui', clientName: 'Wambui Njeri', sessionId: 'session_1', sessionTitle: 'Reformer Pilates', instructorName: 'Wambui M.', date: '2026-08-05', dateLabel: 'Wed 5 Aug', time: '07:00 AM', location: 'Core Balance Studio, Spring Valley', bedNumber: 4, packageName: '10 Class Pack', priceKES: 2200, paymentMethod: 'PACKAGE_CREDIT', transactionRef: 'PKG-2026-081', status: 'confirmed', attendance: 'present', clinicalNote: 'Lumbar disc herniation (L4-L5). Avoid deep spinal flexion.', createdAt: '2026-08-03T08:30:00Z' },
  { id: 'bk_demo_2', clientId: 'demo_client_wambui', clientName: 'Wambui Njeri', sessionId: 'session_6', sessionTitle: 'Reformer Mobility Flow', instructorName: 'Tami K.', date: '2026-08-05', dateLabel: 'Wed 5 Aug', time: '02:30 PM', location: 'Core Balance Studio, Spring Valley', bedNumber: 7, packageName: 'Core Membership', priceKES: 2200, paymentMethod: 'PACKAGE_CREDIT', transactionRef: 'MBR-2026-441', status: 'confirmed', attendance: 'pending', createdAt: '2026-08-04T14:10:00Z' },
  { id: 'bk_demo_3', clientId: 'c2', clientName: 'Logan Mensah', sessionId: 'session_1', sessionTitle: 'Reformer Pilates', instructorName: 'Wambui M.', date: '2026-08-05', dateLabel: 'Wed 5 Aug', time: '07:00 AM', location: 'Core Balance Studio, Spring Valley', bedNumber: 5, packageName: '10 Class Pack', priceKES: 2200, paymentMethod: 'PACKAGE_CREDIT', transactionRef: 'PKG-2026-079', status: 'confirmed', attendance: 'pending', clinicalNote: 'Right shoulder impingement. Keep arm springs light.', createdAt: '2026-08-02T10:00:00Z' },
  { id: 'bk_demo_4', clientId: 'c3', clientName: 'Aisha Kamau', sessionId: 'session_1', sessionTitle: 'Reformer Pilates', instructorName: 'Wambui M.', date: '2026-08-05', dateLabel: 'Wed 5 Aug', time: '07:00 AM', location: 'Core Balance Studio, Spring Valley', bedNumber: 2, packageName: 'Unlimited Monthly', priceKES: 0, paymentMethod: 'PACKAGE_CREDIT', transactionRef: 'MBR-2026-439', status: 'confirmed', attendance: 'pending', createdAt: '2026-08-02T12:00:00Z' },
  { id: 'bk_demo_5', clientId: 'c4', clientName: 'Brian Otieno', sessionId: 'session_1', sessionTitle: 'Reformer Pilates', instructorName: 'Wambui M.', date: '2026-08-05', dateLabel: 'Wed 5 Aug', time: '07:00 AM', location: 'Core Balance Studio, Spring Valley', bedNumber: 8, packageName: '5 Class Pack', priceKES: 0, paymentMethod: 'PACKAGE_CREDIT', transactionRef: 'PKG-2026-077', status: 'confirmed', attendance: 'pending', createdAt: '2026-08-03T09:20:00Z' },
];

const defaultState: DemoState = {
  bookings: seedBookings,
  subRequests: [],
  notifications: [
    { id: 'n1', title: 'Clinical note needs review', message: 'Logan Mensah has a shoulder modification note before the 07:00 AM session.', audience: 'instructor', read: false, createdAt: '2026-08-05T05:45:00Z' },
    { id: 'n2', title: 'New waitlist opening', message: 'A space is available in Tower Reformer Pilates at 05:30 PM.', audience: 'client', read: false, createdAt: '2026-08-04T16:30:00Z' },
    { id: 'n3', title: 'Bed #3 maintenance due', message: 'Reformer Bed #3 is unavailable until the strap replacement is complete.', audience: 'admin', read: false, createdAt: '2026-08-05T06:00:00Z' },
  ],
  completedSessions: [],
};

function readState(): DemoState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultState, ...JSON.parse(raw) } : defaultState;
  } catch { return defaultState; }
}

function writeState(state: DemoState) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
}

export function getDemoState() { return readState(); }

export function updateDemoState(updater: (state: DemoState) => DemoState) {
  const next = updater(readState());
  writeState(next);
  return next;
}

export function useDemoState() {
  const [state, setState] = useState<DemoState>(readState);
  useEffect(() => {
    const sync = () => setState(readState());
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener(CHANGE_EVENT, sync); window.removeEventListener('storage', sync); };
  }, []);
  return state;
}

export function addDemoBooking(booking: DemoBooking) {
  return updateDemoState(state => ({ ...state, bookings: [booking, ...state.bookings] }));
}

export function updateDemoBooking(id: string, updates: Partial<DemoBooking>) {
  return updateDemoState(state => ({ ...state, bookings: state.bookings.map(b => b.id === id ? { ...b, ...updates } : b) }));
}

export function addDemoNotification(notification: DemoNotification) {
  return updateDemoState(state => ({ ...state, notifications: [notification, ...state.notifications] }));
}

export function addDemoSubRequest(request: DemoSubRequest) {
  return updateDemoState(state => ({ ...state, subRequests: [request, ...state.subRequests] }));
}

export function completeDemoSession(sessionId: string) {
  return updateDemoState(state => ({ ...state, completedSessions: state.completedSessions.includes(sessionId) ? state.completedSessions : [...state.completedSessions, sessionId] }));
}

export function getDemoSessions() {
  return INITIAL_CLASS_SESSIONS.map((session, index) => ({
    ...session,
    date: '2026-08-05',
    dayLabel: 'Wed 5 Aug',
    instructor: session.instructor,
    status: index === 7 ? 'full' as const : session.status,
  }));
}
