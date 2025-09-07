import { createClient } from "@supabase/supabase-js";
import { getPortalCoreConfig } from "./env";

const { supabaseUrl, supabaseAnonKey } = getPortalCoreConfig();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

function createStubClient() {
  // Minimal stub to avoid crashes during development when env vars are missing
  console.warn(
    "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local",
  );
  return {
    auth: {
      async getSession() {
        return { data: { session: null } } as any;
      },
      async signInWithPassword() {
        return { error: new Error("Supabase not configured. Add keys in .env.local.") } as any;
      },
      async signOut() {
        return { error: null } as any;
      },
      onAuthStateChange(callback: any) {
        const subscription = { unsubscribe() {} };
        try {
          callback("INITIAL_SESSION", null);
        } catch {}
        return { data: { subscription } } as any;
      },
    },
    from() {
      return {
        async insert() {
          return { error: new Error("Supabase not configured. Add keys in .env.local.") } as any;
        },
      } as any;
    },
  } as any;
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        detectSessionInUrl: true,
        autoRefreshToken: true,
      },
    })
  : createStubClient();
