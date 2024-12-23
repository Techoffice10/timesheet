import { useState, useEffect } from 'react';
import { TimeEntry } from '../types';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';

export function useTimeClock() {
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      fetchEntries();
      checkCurrentEntry();
    }
  }, [user]);

  async function fetchEntries() {
    const { data } = await supabase
      .from('time_entries')
      .select('*')
      .order('start_time', { ascending: false })
      .limit(10);
    
    if (data) setEntries(data);
  }

  async function checkCurrentEntry() {
    const { data } = await supabase
      .from('time_entries')
      .select('*')
      .is('end_time', null)
      .single();
    
    if (data) setCurrentEntry(data);
  }

  async function clockIn(notes?: string) {
    if (!user) return;

    const { data } = await supabase
      .from('time_entries')
      .insert({
        user_id: user.id,
        start_time: new Date().toISOString(),
        notes
      })
      .select()
      .single();

    if (data) {
      setCurrentEntry(data);
      await fetchEntries();
    }
  }

  async function clockOut() {
    if (!currentEntry) return;

    await supabase
      .from('time_entries')
      .update({ end_time: new Date().toISOString() })
      .eq('id', currentEntry.id);

    setCurrentEntry(null);
    await fetchEntries();
  }

  return {
    currentEntry,
    entries,
    clockIn,
    clockOut
  };
}