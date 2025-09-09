/**
 * Environment configuration for Portal Core
 * Maps Template repo env vars to Portal Core requirements
 */

export interface PortalCoreConfig {
  enabled: boolean;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  siteUrl?: string;
  featureClientUpdates: boolean;
}

export function getPortalCoreConfig(): PortalCoreConfig {
  return {
    enabled: import.meta.env.VITE_FEATURE_PORTAL_CORE !== 'false', // default true
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    siteUrl: import.meta.env.VITE_SITE_URL,
    featureClientUpdates: import.meta.env.VITE_FEATURE_CLIENT_UPDATES === 'true',
  };
}

export function isPortalCoreEnabled(): boolean {
  return getPortalCoreConfig().enabled;
}
