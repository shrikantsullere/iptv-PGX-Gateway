# Frontend Architecture
**PGX Gateway**

## Directory Structure

```text
src/
├── components/          # Reusable UI building blocks
│   ├── auth/            # AuthLayout, SocialLogins
│   ├── dashboard/       # Sidebar, TopBar, SuperAdminSidebar
│   └── ...              # Landing page sections
├── pages/               # Route-level components
│   ├── auth/            # Login.jsx, Register.jsx, 2FA.jsx
│   ├── dashboard/       # Dashboard roots (MerchantDashboard, Wallets)
│   │   ├── merchant/    # 12 distinct merchant config pages
│   │   └── superadmin/  # Processors, Subscriptions, EnterpriseTransactions
│   ├── LandingPage.jsx
│   └── Onboarding.jsx
├── App.jsx              # Application entry and React Router config
└── index.css            # Tailwind directives and global base styles
```

## Routing Strategy
The application uses client-side routing via `react-router-dom`. All navigation happens seamlessly without full page reloads, preserving state and providing an app-like experience. The router is centralized in `App.jsx`.

## Component Architecture
1. **Layout Wrappers:** Common layouts (like `Sidebar` and `TopBar`) are extracted into standalone components that wrap page content. This ensures layout consistency without re-rendering the navigation on every page change.
2. **Mock Data Injection:** Since the backend is not connected, pages are built with arrays of mock data (e.g., `mockTransactions`, `mockCustomers`) defined at the top of the file to populate the UI.
3. **State Management:** Local React state (`useState`) handles interactive elements like modals, slide-over editors, tab switching, and context menus.

## Styling Architecture
- **Tailwind CSS:** 100% of styling is handled via Tailwind utility classes.
- **Color Palette:** The base is a deep dark theme (`#000000` to `#09090B`). Accent colors are explicitly defined in classes (e.g., `text-primary`, `bg-purple-500`).
- **Glassmorphism:** Achieved via `bg-white/5 border border-white/10 backdrop-blur` classes to create translucent, floating elements.
- **Responsiveness:** Standard Tailwind breakpoints (`sm:`, `md:`, `lg:`) are used to convert complex data tables into scrollable areas and sidebars into bottom navs on smaller screens.
