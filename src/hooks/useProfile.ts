import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export type ProfileMetadata = {
  phone?: string;
  bio?: string;
  title?: string;
  location?: string;
  [key: string]: unknown;
};

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  metadata: ProfileMetadata;
};

export function useProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const {
          data: { session },
          error: sErr,
        } = await supabase.auth.getSession();
        if (sErr) throw sErr;
        const user = session?.user;
        if (!user) {
          if (active) {
            setProfile(null);
            setLoading(false);
          }
          return;
        }

        const { data, error: pErr } = await supabase
          .from("profiles")
          .select("id, email, full_name, avatar_url, metadata")
          .eq("id", user.id)
          .single();

        if (pErr && pErr.code !== "PGRST116") throw pErr; // 116 = not found

        const prof: Profile = {
          id: user.id,
          email: user.email ?? data?.email ?? "",
          full_name: data?.full_name ?? "",
          avatar_url: data?.avatar_url ?? "",
          metadata: (data?.metadata as ProfileMetadata) ?? {},
        };
        if (active) setProfile(prof);
      } catch (e: any) {
        if (active) setError(e?.message ?? "Failed to load profile");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function save(updates: Partial<Profile>) {
    if (!profile) return { error: new Error("No profile") } as const;
    const next: Profile = {
      ...profile,
      ...updates,
      metadata: { ...(profile.metadata ?? {}), ...(updates.metadata ?? {}) },
    };
    const payload = {
      id: next.id,
      email: next.email || null,
      full_name: next.full_name || null,
      avatar_url: next.avatar_url || null,
      metadata: next.metadata ?? {},
    };
    const { error: uErr } = await supabase.from("profiles").upsert(payload, { onConflict: "id" });
    if (!uErr) setProfile(next);
    return { error: uErr } as const;
  }

  return { loading, profile, error, save, setProfile } as const;
}


