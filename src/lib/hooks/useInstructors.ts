import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { MOCK_INSTRUCTORS } from '../../data/mockData';
import type { Instructor } from '../../types';

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

export function useInstructors() {
  const [data, setData] = useState<Instructor[]>(MOCK_INSTRUCTORS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const { data: rows, error: err } = await supabase
          .from('instructors')
          .select('*')
          .order('experience_years', { ascending: false });

        if (err) throw err;
        if (rows && rows.length > 0) setData(rows.map(mapInstructor));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return { data, isLoading, error };
}
