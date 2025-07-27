import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const protectedRoute = (allowedRoles: string[]) => {
    if (loading) return;
    if (!user) {
      navigate('/login');
      return;
    }
    // This is a placeholder for the actual role checking.
    // I will need to know the structure of the user roles in the database.
    // For now, I will assume the user object has a `role` property.
    const userRole = (user as any).role;
    if (!allowedRoles.includes(userRole)) {
      navigate('/');
    }
  };

  return { user, session, loading, protectedRoute };
};
