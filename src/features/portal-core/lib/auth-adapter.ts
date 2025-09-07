/**
 * Auth Adapter - Bridges Template's Better Auth with Portal Core's Supabase Auth
 * 
 * This allows both auth systems to coexist and provides a unified interface
 * for checking authentication status across the application.
 */

import { getSupabaseSession, useSupabaseSession } from "../components/auth/SupabaseAuthProvider";
import { getPortalCoreConfig } from "./env";

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  provider: 'better-auth' | 'supabase';
}

export class AuthAdapter {
  /**
   * Get the current authenticated user from either auth system
   * Priority: Better Auth first, then Supabase
   */
  static async getCurrentUser(): Promise<AuthUser | null> {
    // If Portal Core is disabled, only use Better Auth
    if (!getPortalCoreConfig().enabled) {
      return null;
    }

    try {
      // Try Supabase first for Portal Core features
      const supabaseSession = await getSupabaseSession();
      if (supabaseSession.data.session?.user) {
        const user = supabaseSession.data.session.user;
        return {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email,
          avatar: user.user_metadata?.avatar_url,
          provider: 'supabase'
        };
      }
    } catch (error) {
      console.warn('Supabase auth check failed:', error);
    }

    return null;
  }

  /**
   * Check if user is authenticated via either system
   */
  static async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }

  /**
   * Require authentication - throws if not authenticated
   */
  static async requireAuth(): Promise<AuthUser> {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('Authentication required');
    }
    return user;
  }
}

/**
 * React hook for using the auth adapter
 */
export function useAuthAdapter() {
  const supabaseAuth = useSupabaseSession();
  
  return {
    user: supabaseAuth.user ? {
      id: supabaseAuth.user.id,
      email: supabaseAuth.user.email,
      name: supabaseAuth.user.user_metadata?.name || supabaseAuth.user.email,
      avatar: supabaseAuth.user.user_metadata?.avatar_url,
      provider: 'supabase' as const
    } : null,
    loading: supabaseAuth.loading,
    isAuthenticated: !!supabaseAuth.user,
  };
}
