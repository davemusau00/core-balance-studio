import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export type UserRole = 'client' | 'admin' | 'instructor';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatarUrl: string;
  role: UserRole;
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
    category: 'classic' | 'therapy' | 'power' | 'sculpt' | 'clinical' | 'advanced';
  };
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, name: string, phone: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  demoSignIn: (role: UserRole) => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Pick<AuthUser, 'name' | 'phone' | 'membershipStatus'>>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_CREDENTIALS = {
  client: { email: 'wambui@demo.corebalance.co.ke', password: 'demo_client_2026' },
  admin: { email: 'admin@corebalance.co.ke', password: 'demo_admin_2026' },
  instructor: { email: 'amara@corebalance.co.ke', password: 'demo_instructor_2026' },
};

// Fallback demo profiles
const DEMO_CLIENT_PROFILE: AuthUser = {
  id: 'demo_client_wambui',
  email: 'wambui@demo.corebalance.co.ke',
  name: 'Wambui Njoroge',
  phone: '+254 712 345 678',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
  role: 'client',
  classesRemaining: 8,
  totalClassesPurchased: 12,
  membershipName: 'Core Membership',
  membershipStatus: 'ACTIVE',
  membershipRenewalDate: '20 Jun 2026',
  currentStreakWeeks: 6,
  classesThisMonth: 6,
  upcomingBooking: {
    id: 'bk_upcoming_1', classTitle: 'Reformer Pilates', dateLabel: 'FRI 23 MAY', time: '07:00 AM',
    durationMinutes: 60, instructorName: 'Logan N.', location: 'Core Balance Studio, Nairobi', category: 'classic'
  },
};

const DEMO_ADMIN_PROFILE: AuthUser = {
  id: 'demo_admin_core',
  email: 'admin@corebalance.co.ke',
  name: 'Studio Admin',
  phone: '+254 700 000 001',
  avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=300',
  role: 'admin',
  classesRemaining: 0,
  totalClassesPurchased: 0,
  membershipName: 'Staff',
  membershipStatus: 'ACTIVE',
  membershipRenewalDate: 'N/A',
  currentStreakWeeks: 0,
  classesThisMonth: 0,
};

const DEMO_INSTRUCTOR_PROFILE: AuthUser = {
  id: 'demo_instructor_amara',
  email: 'amara@corebalance.co.ke',
  name: 'Amara Osei',
  phone: '+254 712 345 678',
  avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=300',
  role: 'instructor',
  classesRemaining: 0,
  totalClassesPurchased: 0,
  membershipName: 'Senior Instructor',
  membershipStatus: 'ACTIVE',
  membershipRenewalDate: 'N/A',
  currentStreakWeeks: 12,
  classesThisMonth: 28,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const buildProfileFromSession = async (supabaseUser: User): Promise<AuthUser> => {
    try {
      const { data: profile } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .single();

      if (profile) {
        return {
          id: profile.id,
          email: supabaseUser.email || '',
          name: profile.name,
          phone: profile.phone || '',
          avatarUrl: profile.avatar_url || DEMO_CLIENT_PROFILE.avatarUrl,
          role: (profile.role as UserRole) || 'client',
          classesRemaining: profile.classes_remaining || 0,
          totalClassesPurchased: profile.total_classes_purchased || 0,
          membershipName: profile.membership_name || 'No Membership',
          membershipStatus: (profile.membership_status as AuthUser['membershipStatus']) || 'ACTIVE',
          membershipRenewalDate: profile.membership_renewal_date || '',
          currentStreakWeeks: profile.current_streak_weeks || 0,
          classesThisMonth: profile.classes_this_month || 0,
        };
      }
    } catch (_) {}

    if (supabaseUser.email?.includes('admin')) return DEMO_ADMIN_PROFILE;
    if (supabaseUser.email?.includes('amara') || supabaseUser.email?.includes('instructor')) return DEMO_INSTRUCTOR_PROFILE;
    return { ...DEMO_CLIENT_PROFILE, email: supabaseUser.email || '' };
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        buildProfileFromSession(session.user).then((profile) => {
          setUser(profile);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        buildProfileFromSession(session.user).then(setUser);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (email === DEMO_CREDENTIALS.client.email && password === DEMO_CREDENTIALS.client.password) {
          setUser(DEMO_CLIENT_PROFILE);
          setIsLoading(false);
          return { error: null };
        }
        if (email === DEMO_CREDENTIALS.admin.email && password === DEMO_CREDENTIALS.admin.password) {
          setUser(DEMO_ADMIN_PROFILE);
          setIsLoading(false);
          return { error: null };
        }
        if (email === DEMO_CREDENTIALS.instructor.email && password === DEMO_CREDENTIALS.instructor.password) {
          setUser(DEMO_INSTRUCTOR_PROFILE);
          setIsLoading(false);
          return { error: null };
        }
        setIsLoading(false);
        return { error: 'Invalid email or password. Try the demo buttons below.' };
      }
      if (data.user) {
        const profile = await buildProfileFromSession(data.user);
        setUser(profile);
      }
      setIsLoading(false);
      return { error: null };
    } catch {
      setIsLoading(false);
      return { error: 'Sign in failed. Please try again.' };
    }
  };

  const signUp = async (email: string, password: string, name: string, phone: string): Promise<{ error: string | null }> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) { setIsLoading(false); return { error: error.message }; }
      if (data.user) {
        await supabase.from('client_profiles').insert({
          id: `client_${Date.now()}`,
          user_id: data.user.id,
          name,
          email,
          phone,
          role: 'client',
          classes_remaining: 0,
          total_classes_purchased: 0,
          membership_name: 'No Membership',
          membership_status: 'ACTIVE',
          current_streak_weeks: 0,
          classes_this_month: 0,
        });
        const profile = await buildProfileFromSession(data.user);
        setUser(profile);
      }
      setIsLoading(false);
      return { error: null };
    } catch {
      setIsLoading(false);
      return { error: 'Sign up failed. Please try again.' };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const demoSignIn = async (role: UserRole) => {
    setIsLoading(true);
    let profile = DEMO_CLIENT_PROFILE;
    if (role === 'admin') profile = DEMO_ADMIN_PROFILE;
    if (role === 'instructor') profile = DEMO_INSTRUCTOR_PROFILE;

    await new Promise(r => setTimeout(r, 600));
    setUser(profile);
    setIsLoading(false);
  };

  const refreshProfile = async () => {
    if (session?.user) {
      const profile = await buildProfileFromSession(session.user);
      setUser(profile);
    }
  };

  const updateProfile = async (updates: Partial<Pick<AuthUser, 'name' | 'phone' | 'membershipStatus'>>) => {
    setUser(current => current ? { ...current, ...updates } : current);
    if (session?.user) {
      await supabase.from('client_profiles').update({
        ...(updates.name ? { name: updates.name } : {}),
        ...(updates.phone ? { phone: updates.phone } : {}),
        ...(updates.membershipStatus ? { membership_status: updates.membershipStatus } : {}),
      }).eq('user_id', session.user.id);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isLoading,
      isAuthenticated: !!user,
      signIn,
      signUp,
      signOut,
      demoSignIn,
      refreshProfile,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
