import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { INITIAL_ACTIVITIES } from '../../data/mockData';
import type { ActivityItem } from '../../types';

export function useActivities(clientId: string | null) {
  const [data, setData] = useState<ActivityItem[]>(clientId === 'client_wambui' ? INITIAL_ACTIVITIES : []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId) return;

    const fetch = async () => {
      setIsLoading(true);
      try {
        const { data: rows, error: err } = await supabase
          .from('activities')
          .select('*')
          .eq('client_id', clientId)
          .order('id', { ascending: false });

        if (err) throw err;
        if (rows && rows.length > 0) {
          setData(rows.map((r: any) => ({
            id: r.id,
            type: r.activity_type,
            title: r.title,
            subtitle: r.subtitle,
            timestamp: r.timestamp_text,
            statusBadge: r.status_badge,
          })));
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
