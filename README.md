# QiSuite Access
QiSuite Access Client Portal for QiAlly Partner Clients.

---

## Cloudflare Pages Deployment

- Project type: Static Vite SPA (Cloudflare Pages)
- Project name: `qisuite-access`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Node.js version: 20+ (default in Pages is fine)

### Environment Variables (Production and Preview)
- `VITE_SUPABASE_URL`: your Supabase URL
- `VITE_SUPABASE_ANON_KEY`: your Supabase anon key
- `VITE_SITE_URL`: your public URL (e.g., `https://qisuite-access.pages.dev` or custom domain)

Notes:
- Pages uses `npm ci`; keep `package-lock.json` in sync with `package.json` (done).
- Client-side env changes require a rebuild to take effect.

### Supabase Auth URLs
- Authentication → URL Configuration:
  - Site URL: match `VITE_SITE_URL`
  - Additional Redirect URLs: `http://localhost:5173`, `http://localhost:5174`

### Custom Domain (optional)
- Pages → Custom domains → Connect `portal.yourdomain.com` (or similar)
- Update:
  - `VITE_SITE_URL` → custom domain
  - Supabase Site URL and Additional Redirect URLs → include custom domain

---

## Local Development

```bash
# Install
npm install

# Start
npm run dev  # http://localhost:5173

# Build
npm run build  # outputs to dist/
```

Env file for local:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_SITE_URL=http://localhost:5173
```

---

## Delivery Plan (Methodical Path)

For each page/feature we iterate in this order: page check → page update → page text → page lock → next.

Legend:
- Page check: confirm route exists and design fits system (tailwind/ui consistency)
- Page update: build/adjust UI and wire data
- Page text: finalize copy (headings, labels, empty states)
- Page lock: auth/RBAC, route guards, and QA

Planned sequence:
1) Auth flow
   - Page check: `/signin` (email magic-link)
   - Page update: ensure magic-link + error states; optional code-based OTP next
   - Page text: finalize copy, legal links
   - Page lock: redirect logged-in users away, public access only

2) Dashboard Home
   - Page check: `/` (protected)
   - Page update: show welcome, quick stats; wire any sample KPIs
   - Page text
   - Page lock: require session

3) Client Update
   - Page check: `/client-update`
   - Page update: write to `client_updates` table (Supabase)
   - Page text: helper text, success/error messages
   - Page lock: require session

4) Profile & Settings
   - Page check: `/profile`, `/settings` (if split)
   - Page update: profile fields, passwordless session management, theme toggle
   - Page text
   - Page lock: session + per-user access

5) Organization (optional, phase 2)
   - Page check: org list/members/invites
   - Page update: CRUD + roles (owner/admin/member)
   - Page text
   - Page lock: role-based access (RBAC)

6) Billing (optional, phase 2)
   - Page check: subscription plan and invoices
   - Page update: integrate provider (Stripe), display usage
   - Page text
   - Page lock: owner/admin

7) Reports/Analytics (optional, phase 2)
   - Page check: reports routes
   - Page update: charts/tables
   - Page text
   - Page lock: roles as needed

8) Polishing & Ops
   - 404/500 pages, empty states, loading skeletons
   - Accessibility, performance (bundle/code-split where needed)
   - CI/CD (Pages), custom domain, cache headers

We will track these as tasks and move page-by-page, ensuring each is checked, updated, copy-reviewed, and locked before proceeding.
# TailAdmin React - Free React Tailwind Admin Dashboard Template

TailAdmin is a free and open-source admin dashboard template built on **React and Tailwind CSS**, providing developers
with everything they need to create a comprehensive, data-driven back-end,
dashboard, or admin panel solution for upcoming web projects.

With TailAdmin, you get access to all the necessary dashboard UI components, elements, and pages required to build a
feature-rich and complete dashboard or admin panel. Whether you're building dashboard or admin panel for a complex web
application or a simple website, TailAdmin is the perfect solution to help you get up and running quickly.

![TailAdmin React.js Dashboard Preview](./banner.png)

## Overview

TailAdmin provides essential UI components and layouts for building feature-rich, data-driven admin dashboards and
control panels. It's built on:

- React 19
- TypeScript
- Tailwind CSS

### Quick Links

- [✨ Visit Website](https://tailadmin.com)
- [📄 Documentation](https://tailadmin.com/docs)
- [⬇️ Download](https://tailadmin.com/download)
- [🖌️ Figma Design File (Community Edition)](https://www.figma.com/community/file/1214477970819985778)
- [⚡ Get PRO Version](https://tailadmin.com/pricing)

### Demos

- [Free Version](https://free-react-demo.tailadmin.com/)
- [Pro Version](https://react-demo.tailadmin.com)

### Other Versions

- [HTML Version](https://github.com/TailAdmin/tailadmin-free-tailwind-dashboard-template)
- [Next.js Version](https://github.com/TailAdmin/free-nextjs-admin-dashboard)
- [Vue.js Version](https://github.com/TailAdmin/vue-tailwind-admin-dashboard)

## Installation

### Prerequisites

To get started with TailAdmin, ensure you have the following prerequisites installed and set up:

- Node.js 18.x or later (recommended to use Node.js 20.x or later)

### Cloning the Repository

Clone the repository using the following command:

```bash
git clone https://github.com/TailAdmin/free-react-tailwind-admin-dashboard.git
```

> Windows Users: place the repository near the root of your drive if you face issues while cloning.

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

   > Use the `--legacy-peer-deps` flag, if you face issues while installing.

2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Components

TailAdmin is a pre-designed starting point for building a web-based dashboard using React.js and Tailwind CSS. The
template includes:

- Sophisticated and accessible sidebar
- Data visualization components
- Prebuilt profile management and 404 page
- Tables and Charts(Line and Bar)
- Authentication forms and input elements
- Alerts, Dropdowns, Modals, Buttons and more
- Can't forget Dark Mode 🕶️

All components are built with React and styled using Tailwind CSS for easy customization.

## Feature Comparison

### Free Version

- 1 Unique Dashboard
- 30+ dashboard components
- 50+ UI elements
- Basic Figma design files
- Community support

### Pro Version

- 5 Unique Dashboards: Analytics, Ecommerce, Marketing, CRM, Stocks (more coming soon)
- 400+ dashboard components and UI elements
- Complete Figma design file
- Email support

To learn more about pro version features and pricing, visit our [pricing page](https://tailadmin.com/pricing).

## Changelog

### Version 2.0.2 - [March 25, 2025]

- Upgraded to React 19
- Included overrides for packages to prevent peer dependency errors.
- Migrated from react-flatpickr to flatpickr package for React 19 support

### Version 2.0.1 - [February 27, 2025]

#### Update Overview

- Upgraded to Tailwind CSS v4 for better performance and efficiency.
- Updated class usage to match the latest syntax and features.
- Replaced deprecated class and optimized styles.

#### Next Steps

- Run npm install or yarn install to update dependencies.
- Check for any style changes or compatibility issues.
- Refer to the Tailwind CSS v4 [Migration Guide](https://tailwindcss.com/docs/upgrade-guide) on this release. if needed.
- This update keeps the project up to date with the latest Tailwind improvements. 🚀

### Version 2.0.0 - [February 2025]

A major update with comprehensive redesign and modern React patterns implementation.

#### Major Improvements

- Complete UI redesign with modern React patterns
- New features: collapsible sidebar, chat, and calendar
- Improved performance and accessibility
- Updated data visualization using ApexCharts

#### Key Features

- Redesigned dashboards (Ecommerce, Analytics, Marketing, CRM)
- Enhanced navigation with React Router integration
- Advanced tables with sorting and filtering
- Calendar with drag-and-drop support
- New UI components and improved existing ones

#### Breaking Changes

- Updated sidebar component API
- Migrated charts to ApexCharts
- Revised authentication system

[Read more](https://tailadmin.com/docs/update-logs/react) on this release.

### Version 1.3.7 - [June 20, 2024]

#### Enhancements

1. Remove Repetition of DefaultLayout in every Pages
2. Add ClickOutside Component for reduce repeated functionality in Header Message, Notification and User Dropdowns.

### Version 1.3.6 - [Jan 31, 2024]

#### Enhancements

1. Integrate flatpickr in [Date Picker/Form Elements]
2. Change color after select an option [Select Element/Form Elements].
3. Make it functional [Multiselect Dropdown/Form Elements].
4. Make best value editable [Pricing Table One/Pricing Table].
5. Rearrange Folder structure.

### Version 1.2.0 - [Apr 28, 2023]

- Add Typescript in TailAdmin React.

### Version 1.0.0 - Initial Release - [Mar 13, 2023]

- Initial release of TailAdmin React.

## License

TailAdmin React.js Free Version is released under the MIT License.

## Support

If you find this project helpful, please consider giving it a star on GitHub. Your support helps us continue developing
and maintaining this template.
