import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { MOCK_INSTRUCTORS } from '../../data/mockData';
import { getDemoSessions } from '../demoStore';
import type { ClassSession, Instructor } from '../../types';

// Helper: map Supabase snake_case → camelCase ClassSession
function mapSession(raw: any): ClassSession {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug || raw.title.toLowerCase().replace(/\s+/g, '-'),
    category: raw.category,
    serviceType: raw.service_type,
    instructor: raw.instructor ? mapInstructor(raw.instructor) : MOCK_INSTRUCTORS[0],
    startTime: raw.start_time,
    endTime: raw.end_time,
    date: raw.session_date,
    dayLabel: raw.session_date
      ? new Date(raw.session_date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
      : '',
    durationMinutes: raw.duration_minutes,
    difficulty: raw.difficulty,
    priceKES: raw.price_kes,
    capacity: raw.capacity,
    bookedCount: raw.booked_count ?? 0,
    waitlistCount: raw.waitlist_count ?? 0,
    status: raw.status || 'available',
    location: raw.location,
    description: raw.description,
    benefits: raw.benefits,
  };
}

function mapInstructor(raw: any): Instructor {
  return {
    id: raw.id,
    name: raw.name,
    title: raw.title,
    avatarUrl: raw.avatar_url,
    specialties: raw.specialties || [],
    experienceYears: raw.experience_years,
    classesLedCount: raw.classes_led_count,
    rating: raw.rating,
    bio: raw.bio,
  };
}

interface UseClassSessionsOptions {
  date?: string;
  serviceFilter?: string;
}

export function useClassSessions(options: UseClassSessionsOptions = {}) {
  const { date, serviceFilter } = options;
  const [data, setData] = useState<ClassSession[]>(getDemoSessions());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('class_sessions')
        .select('*, instructor:instructors(*)')
        .order('start_time', { ascending: true });

      if (date) query = query.eq('session_date', date);
      if (serviceFilter && serviceFilter !== 'all') {
        query = query.eq('service_type', serviceFilter);
      }

      const { data: rows, error: err } = await query;

      if (err) throw err;
      if (rows && rows.length > 0) {
        setData(rows.map(mapSession));
      }
      if (!rows || rows.length === 0) setData(getDemoSessions());
    } catch (e: any) {
      setError(e.message);
      setData(getDemoSessions());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [date, serviceFilter]);

  // Real-time subscription for booking count changes
  useEffect(() => {
    const channel = supabase
      .channel('class_sessions_changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'class_sessions' }, (payload) => {
        setData(prev =>
          prev.map(s => s.id === payload.new.id ? { ...s, bookedCount: payload.new.booked_count, status: payload.new.status } : s)
        );
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateSessionLocally = (sessionId: string, updates: Partial<ClassSession>) => {
    setData(prev => prev.map(s => s.id === sessionId ? { ...s, ...updates } : s));
  };

  return { data, isLoading, error, refetch: fetchSessions, updateSessionLocally };
}
