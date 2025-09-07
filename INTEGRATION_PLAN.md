# Portal Core → Template Repo Integration Plan

## Current State Analysis

### Template Repo (React Starter Kit)
- **Auth**: Better Auth with OAuth, passkeys, email OTP
- **Routing**: TanStack Router with file-based routing
- **UI**: shadcn/ui components with modern Tailwind
- **Architecture**: Monorepo (apps/app, apps/api, packages/ui)
- **Dashboard**: Basic stats dashboard with activity feed
- **Auth Routes**: `/login` with OAuth flow

### Portal Core (Current Repo)
- **Auth**: Supabase with magic link authentication
- **Routing**: React Router v7
- **UI**: Custom components with Tailwind
- **Features**: Ecommerce metrics, charts, forms, tables, client updates
- **Auth Routes**: `/signin`, `/signup`
- **Dashboard**: Rich admin dashboard with multiple widgets

## Integration Strategy

### Phase 1: Foundation Setup
1. **Create Feature Branch**: `feature/portal-core-integration`
2. **Add Feature Flag**: `VITE_FEATURE_PORTAL_CORE` (default: true)
3. **Create Portal Core Module**: `apps/app/features/portal-core/`

### Phase 2: Auth System Integration
1. **Keep Template Auth as Primary**: Better Auth for new features
2. **Add Supabase Auth as Secondary**: For Portal Core features
3. **Create Auth Adapter**: Bridge between both systems
4. **Route Protection**: Use Template's auth guards with Portal Core routes

### Phase 3: Component Migration
1. **Migrate Portal Core Components**: Adapt to shadcn/ui patterns
2. **Create Portal Core Routes**: `/portal/*` namespace
3. **Preserve Existing Functionality**: All Portal Core features work
4. **Gradual Migration**: Move components one by one

### Phase 4: UI/UX Unification
1. **Standardize Styling**: Use Template's design system
2. **Update Components**: Migrate to shadcn/ui where possible
3. **Maintain Backward Compatibility**: Keep Portal Core working

## Detailed Implementation Plan

### Step 1: Create Portal Core Feature Module

```
apps/app/features/portal-core/
├── components/
│   ├── auth/
│   │   ├── SupabaseAuthProvider.tsx
│   │   ├── SignInForm.tsx
│   │   └── RequireAuth.tsx
│   ├── dashboard/
│   │   ├── EcommerceMetrics.tsx
│   │   ├── MonthlySalesChart.tsx
│   │   └── RecentOrders.tsx
│   └── layout/
│       ├── PortalLayout.tsx
│       └── PortalSidebar.tsx
├── lib/
│   ├── supabaseClient.ts
│   ├── env.ts
│   └── auth-adapter.ts
├── routes/
│   ├── portal/
│   │   ├── index.tsx
│   │   ├── dashboard.tsx
│   │   └── client-updates.tsx
│   └── auth/
│       ├── signin.tsx
│       └── signup.tsx
└── hooks/
    ├── usePortalAuth.ts
    └── useSupabaseSession.ts
```

### Step 2: Environment Configuration

```typescript
// apps/app/features/portal-core/lib/env.ts
export interface PortalCoreConfig {
  enabled: boolean;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  siteUrl?: string;
  featureClientUpdates: boolean;
}

export function getPortalCoreConfig(): PortalCoreConfig {
  return {
    enabled: import.meta.env.VITE_FEATURE_PORTAL_CORE !== 'false',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    siteUrl: import.meta.env.VITE_SITE_URL,
    featureClientUpdates: import.meta.env.VITE_FEATURE_CLIENT_UPDATES === 'true',
  };
}
```

### Step 3: Route Integration

```typescript
// apps/app/routes/portal.tsx
export const Route = createFileRoute("/portal")({
  beforeLoad: ({ context }) => {
    // Check if Portal Core is enabled
    if (!getPortalCoreConfig().enabled) {
      throw new Response("Not Found", { status: 404 });
    }
    
    // Use Template's auth system for now
    // TODO: Add Supabase auth check
  },
  component: PortalLayout,
});
```

### Step 4: Auth System Bridge

```typescript
// apps/app/features/portal-core/lib/auth-adapter.ts
export class AuthAdapter {
  constructor(
    private betterAuth: typeof auth,
    private supabaseAuth: SupabaseAuthProvider
  ) {}

  async getCurrentUser() {
    // Try Better Auth first, fallback to Supabase
    const betterAuthSession = await this.betterAuth.getSession();
    if (betterAuthSession?.user) {
      return betterAuthSession.user;
    }

    const supabaseSession = await this.supabaseAuth.getSession();
    return supabaseSession?.user || null;
  }

  async requireAuth() {
    const user = await this.getCurrentUser();
    if (!user) {
      throw redirect({ to: "/login" });
    }
    return user;
  }
}
```

## Migration Timeline

### Week 1: Foundation
- [ ] Create feature branch
- [ ] Set up Portal Core module structure
- [ ] Add environment configuration
- [ ] Create basic auth adapter

### Week 2: Auth Integration
- [ ] Implement Supabase auth provider
- [ ] Create auth bridge between systems
- [ ] Add Portal Core routes with feature flag
- [ ] Test auth flow

### Week 3: Component Migration
- [ ] Migrate dashboard components
- [ ] Adapt to shadcn/ui patterns
- [ ] Create Portal Core layout
- [ ] Test component functionality

### Week 4: Polish & Testing
- [ ] Add smoke tests
- [ ] Update documentation
- [ ] Performance optimization
- [ ] Final integration testing

## Risk Mitigation

### Technical Risks
1. **Auth System Conflicts**: Use adapter pattern to isolate systems
2. **Routing Conflicts**: Use namespace `/portal/*` for Portal Core routes
3. **Component Conflicts**: Keep Portal Core components isolated
4. **Styling Conflicts**: Use CSS modules or scoped styles

### Business Risks
1. **Feature Regression**: Maintain backward compatibility
2. **User Experience**: Gradual migration with feature flags
3. **Development Velocity**: Parallel development streams

## Success Criteria

### Functional Requirements
- [ ] Portal Core features work in Template repo
- [ ] Feature flag controls Portal Core availability
- [ ] Both auth systems work independently
- [ ] No regression in existing Template features

### Non-Functional Requirements
- [ ] Performance: No significant impact on load times
- [ ] Maintainability: Clear separation of concerns
- [ ] Scalability: Easy to add new Portal Core features
- [ ] Testing: Comprehensive test coverage

## Next Steps

1. **Get Approval**: Review plan with team
2. **Create Branch**: Set up feature branch
3. **Start Implementation**: Begin with foundation setup
4. **Iterate**: Regular check-ins and adjustments

## Questions for Discussion

1. **Auth Strategy**: Should we migrate Portal Core to Better Auth or maintain dual auth?
2. **UI Strategy**: How much should we adapt Portal Core components to shadcn/ui?
3. **Timeline**: Is the 4-week timeline realistic?
4. **Testing**: What level of testing is required before merge?
