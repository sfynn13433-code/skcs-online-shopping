// hooks/useProfile.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  tier?: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, tier')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setProfile(data);
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    window.location.reload();
  };

  return { profile, loading, signOut };
}