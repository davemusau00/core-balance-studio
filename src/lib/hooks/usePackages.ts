import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { MOCK_PACKAGES } from '../../data/mockData';
import type { PackageOption } from '../../types';

function mapPackage(raw: any): PackageOption {
  return {
    id: raw.id,
    name: raw.name,
    classCount: raw.class_count,
    validityDays: raw.validity_days,
    priceKES: raw.price_kes,
    savingsPercent: raw.savings_percent,
    badgeText: raw.badge_text,
    isBestValue: raw.is_best_value,
    description: raw.description,
  };
}

export function usePackages() {
  const [data, setData] = useState<PackageOption[]>(MOCK_PACKAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const { data: rows, error: err } = await supabase.from('packages').select('*').order('price_kes');
        if (err) throw err;
        if (rows && rows.length > 0) setData(rows.map(mapPackage));
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
