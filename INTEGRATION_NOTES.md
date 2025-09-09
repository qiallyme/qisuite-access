# Portal Core Integration Notes

## What Was Added

### 1. Portal Core Feature Module
- **Location**: `src/features/portal-core/`
- **Purpose**: Isolated Portal Core functionality with feature flag control
- **Structure**:
  ```
  src/features/portal-core/
  ├── components/
  │   ├── auth/
  │   │   ├── SupabaseAuthProvider.tsx
  │   │   ├── SignInForm.tsx
  │   │   └── RequireAuth.tsx
  │   └── layout/
  │       └── PortalLayout.tsx
  ├── lib/
  │   ├── env.ts
  │   ├── supabaseClient.ts
  │   └── auth-adapter.ts
  └── routes/
      ├── auth/
      │   └── signin.tsx
      └── portal/
          └── index.tsx
  ```

### 2. Authentication System
- **Supabase Auth Provider**: Manages Supabase authentication state
- **Auth Adapter**: Bridges Supabase auth with Template's Better Auth
- **Magic Link Authentication**: Email-based sign-in flow
- **Route Protection**: Guards Portal Core routes with authentication

### 3. Portal Core Routes
- **`/portal/auth/signin`**: Supabase magic link sign-in
- **`/portal/`**: Portal Core dashboard (protected)
- **Feature Flag Control**: Routes return 404 when `VITE_FEATURE_PORTAL_CORE=false`

### 4. Environment Configuration
- **Feature Flags**: Control Portal Core availability
- **Supabase Config**: Environment variables for Supabase connection
- **Example File**: `portal-core.env.example` with required variables

## How to Toggle the Feature

### Enable Portal Core (Default)
```bash
# In your .env.local file
VITE_FEATURE_PORTAL_CORE=true
VITE_FEATURE_CLIENT_UPDATES=true
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Disable Portal Core
```bash
# In your .env.local file
VITE_FEATURE_PORTAL_CORE=false
```

When disabled:
- All `/portal/*` routes return 404
- Portal Core components are not loaded
- No impact on existing Template functionality

## Testing the Integration

### 1. Unauthenticated Redirect Test
```bash
# Visit /portal/ without authentication
# Should redirect to /portal/auth/signin
```

### 2. Admin Dashboard Test
```bash
# Sign in via magic link
# Visit /portal/
# Should show Portal Core dashboard with user info
```

### 3. Feature Flag Test
```bash
# Set VITE_FEATURE_PORTAL_CORE=false
# Visit /portal/
# Should return 404
```

## Known Follow-ups

### 1. Template Router Integration
- **Issue**: Portal Core routes use TanStack Router syntax but need integration with Template's router
- **Solution**: Add Portal Core routes to Template's route tree
- **Files to Update**: Template's `apps/app/routes/` directory

### 2. Component Migration
- **Issue**: Portal Core components use custom styling vs Template's shadcn/ui
- **Solution**: Gradually migrate components to use shadcn/ui patterns
- **Priority**: Medium - functionality works, styling can be improved

### 3. Auth System Unification
- **Issue**: Two separate auth systems (Better Auth + Supabase)
- **Solution**: Consider migrating Portal Core to Better Auth or creating unified auth interface
- **Priority**: Low - both systems work independently

### 4. Database Integration
- **Issue**: Portal Core expects Supabase database tables
- **Solution**: Set up Supabase project or migrate to Template's database
- **Priority**: High - required for full functionality

### 5. Build System Integration
- **Issue**: Portal Core needs to be built with Template's build system
- **Solution**: Update Template's build configuration
- **Priority**: High - required for deployment

## Architecture Decisions

### 1. Feature Flag Approach
- **Decision**: Use environment variable to control Portal Core availability
- **Rationale**: Allows gradual rollout and easy disable if issues arise
- **Impact**: Low risk, high flexibility

### 2. Isolated Module Structure
- **Decision**: Keep Portal Core in separate feature module
- **Rationale**: Maintains separation of concerns and reduces conflicts
- **Impact**: Clean architecture, easy to maintain

### 3. Dual Auth Systems
- **Decision**: Support both Better Auth and Supabase simultaneously
- **Rationale**: Allows gradual migration and preserves existing functionality
- **Impact**: More complex but safer migration path

## Next Steps for Full Integration

1. **Router Integration**: Add Portal Core routes to Template's TanStack Router
2. **Build Configuration**: Update Template's build system for Portal Core
3. **Database Setup**: Configure Supabase or migrate to Template's database
4. **Component Migration**: Gradually adopt shadcn/ui patterns
5. **Testing**: Add comprehensive test suite
6. **Documentation**: Update Template's documentation with Portal Core features

## Commands for Development

```bash
# Start development server
npm run dev

# Test Portal Core routes
curl http://localhost:5173/portal/

# Test feature flag
VITE_FEATURE_PORTAL_CORE=false npm run dev

# Build for production
npm run build
```

## Support

For issues with Portal Core integration:
1. Check feature flag configuration
2. Verify Supabase environment variables
3. Check browser console for errors
4. Review integration notes for known issues
