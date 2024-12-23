import { useState, useEffect } from 'react';
import { Schedule } from '../types';
import { supabase } from '../lib/supabase';

export function useSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  async function fetchSchedules() {
    try {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .order('start_time', { ascending: true });

      if (error) throw error;
      setSchedules(data || []);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  }

  return { schedules, loading, fetchSchedules };
}