import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabaseClient";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const {
          data: { session: current },
        } = await supabase.auth.getSession();
        if (!isMounted) return;
        setSession(current);
        setUser(current?.user ?? null);
      } catch (err) {
        // If env vars are missing or request fails, do not hang on loading
        console.error("Supabase init failed", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    init();

    const { data: sub } = supabase.auth.onAuthStateChange((
      _event: string,
      s: Session | null,
    ) => {
      if (!isMounted) return;
      setSession(s);
      setUser(s?.user ?? null);
    });

    return () => {
      isMounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => ({ user, session, loading }), [user, session, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useSupabaseSession() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useSupabaseSession must be used within SupabaseAuthProvider");
  return ctx;
}

export function getSupabaseSession() {
  return supabase.auth.getSession();
}
