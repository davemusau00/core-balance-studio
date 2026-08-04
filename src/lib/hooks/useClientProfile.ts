import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { INITIAL_CLIENT_PROFILE } from '../../data/mockData';
import type { ClientProfile } from '../../types';

export function useClientProfile(clientId: string | null) {
  const [data, setData] = useState<ClientProfile | null>(clientId === 'client_wambui' ? INITIAL_CLIENT_PROFILE : null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) return;

    const fetch = async () => {
      setIsLoading(true);
      try {
        const { data: profile, error: err } = await supabase
          .from('client_profiles')
          .select('*')
          .eq('id', clientId)
          .single();

        if (err) throw err;
        if (profile) {
          setData({
            id: profile.id,
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            avatarUrl: profile.avatar_url,
            classesRemaining: profile.classes_remaining,
            totalClassesPurchased: profile.total_classes_purchased,
            membershipName: profile.membership_name,
            membershipStatus: profile.membership_status,
            membershipRenewalDate: profile.membership_renewal_date,
            currentStreakWeeks: profile.current_streak_weeks,
            classesThisMonth: profile.classes_this_month,
          });
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [clientId]);

  return { data, isLoading, error };
}
