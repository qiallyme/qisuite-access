/**
 * Smoke tests for Portal Core integration
 * These tests verify basic functionality without requiring full setup
 */

import { describe, it, expect, vi } from 'vitest';
import { getPortalCoreConfig, isPortalCoreEnabled } from '../lib/env';

// Mock environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_FEATURE_PORTAL_CORE: 'true',
    VITE_SUPABASE_URL: 'https://test.supabase.co',
    VITE_SUPABASE_ANON_KEY: 'test-key',
    VITE_SITE_URL: 'http://localhost:5173',
    VITE_FEATURE_CLIENT_UPDATES: 'true',
  },
}));

describe('Portal Core Smoke Tests', () => {
  describe('Environment Configuration', () => {
    it('should load Portal Core configuration', () => {
      const config = getPortalCoreConfig();
      
      expect(config.enabled).toBe(true);
      expect(config.supabaseUrl).toBe('https://test.supabase.co');
      expect(config.supabaseAnonKey).toBe('test-key');
      expect(config.siteUrl).toBe('http://localhost:5173');
      expect(config.featureClientUpdates).toBe(true);
    });

    it('should detect when Portal Core is enabled', () => {
      expect(isPortalCoreEnabled()).toBe(true);
    });

    it('should detect when Portal Core is disabled', () => {
      vi.mocked(import.meta).env.VITE_FEATURE_PORTAL_CORE = 'false';
      expect(isPortalCoreEnabled()).toBe(false);
    });
  });

  describe('Feature Flag Behavior', () => {
    it('should default to enabled when flag is not set', () => {
      vi.mocked(import.meta).env.VITE_FEATURE_PORTAL_CORE = undefined;
      expect(isPortalCoreEnabled()).toBe(true);
    });

    it('should be disabled when flag is explicitly false', () => {
      vi.mocked(import.meta).env.VITE_FEATURE_PORTAL_CORE = 'false';
      expect(isPortalCoreEnabled()).toBe(false);
    });
  });
});
