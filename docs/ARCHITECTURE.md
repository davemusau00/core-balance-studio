# Core Balance Studio — System Architecture & Technical Specification

Welcome to the technical architecture guide for **Core Balance Studio**, a state-of-the-art boutique Pilates & wellness web platform built for studio management, online booking, client growth (CRM), and resource operations (ERP).

---

## 🏗️ 1. Technology Stack

- **Core Framework**: React 18 with TypeScript 5
- **Build Tooling & Bundler**: Vite 6
- **Routing**: React Router v6 (`createBrowserRouter` with nested route layouts)
- **Styling & Design Tokens**: Tailwind CSS v3 with custom HSL theme tokens (Lavington boutique aesthetic)
- **Database & Auth Integration**: Supabase JS Client (`@supabase/supabase-js`)
- **Data Visualization**: Recharts (Area charts, Bar charts, Stacked bars, Line charts)
- **Icons**: Lucide React
- **Animations**: Canvas Confetti & CSS keyframes (`animate-fade-in`, `animate-zoom-in`)

---

## 📁 2. Directory & Component Hierarchy

```
core-balance-studio/
├── docs/                        # Architecture, ERP/CRM, & Deployment Documentation
│   ├── ARCHITECTURE.md
│   ├── ERP_CRM_GUIDE.md
│   ├── INSTRUCTOR_PORTAL.md
│   └── DEPLOYMENT_GUIDE.md
├── src/
│   ├── components/
│   │   ├── admin/              # Admin layout & navigation shell
│   │   ├── booking/            # Schedule components & ReformerSpotPicker
│   │   ├── client/             # Client portal layout, DigitalPassModal, AchievementsGrid
│   │   ├── common/             # Logo, AppTour, HelpCenterModal, DeviceFrameSwitcher
│   │   ├── instructor/         # InstructorLayout
│   │   └── public/             # Public landing page components
│   ├── context/
│   │   ├── AppContext.tsx      # Mobile emulator toggle, toast notification state
│   │   └── AuthContext.tsx     # Client, Admin & Instructor Auth & Demo Logins
│   ├── lib/
│   │   ├── hooks/              # Custom hooks & stateful stores
│   │   │   ├── useActivities.ts
│   │   │   ├── useClassSessions.ts
│   │   │   ├── useCRM.ts       # Stateful CRM pipeline engine
│   │   │   ├── useInstructors.ts
│   │   │   ├── useInventory.ts # Equipment maintenance & Retail POS engine
│   │   │   ├── usePackages.ts
│   │   │   └── usePayroll.ts   # Commission & M-Pesa B2C payout engine
│   │   └── supabase.ts         # Supabase client singleton
│   ├── pages/
│   │   ├── admin/              # 10 Admin module pages (CRM, Payroll, Rota, POS, etc.)
│   │   ├── auth/               # SignInPage & SignUpPage
│   │   ├── booking/            # BookingCheckoutPage with Reformer bed selector
│   │   ├── client/             # Client dashboard, schedule, packages, profile
│   │   ├── instructor/         # InstructorDashboardPage (Roster, Injury notes)
│   │   └── public/             # Public landing, Instructors, Memberships, Webstore
│   ├── App.tsx                 # Root layout & mobile device emulator wrapper
│   ├── router.tsx              # Central React Router v6 route configuration
│   └── main.tsx                # React root mount point
```

---

## 🔐 3. Authentication & Role-Based Routing

The platform supports 3 primary user roles defined in `AuthContext.tsx`:

| Role | Access Scope | Default Landing Page | Demo Credentials |
| :--- | :--- | :--- | :--- |
| **`client`** | `/dashboard/*`, `/book/*` | `/dashboard` | `wambui@demo.corebalance.co.ke` |
| **`instructor`** | `/instructor/*` | `/instructor` | `amara@corebalance.co.ke` |
| **`admin`** | `/admin/*` | `/admin` | `admin@corebalance.co.ke` |

Role protection is enforced at the route level via `<RequireAuth requireRole="role">`.

---

## 📱 4. Mobile Device Emulator Mode

Development and demonstration features include an in-app mobile frame simulator controlled in `AppContext.tsx` and `DeviceFrameSwitcher.tsx`. 
- Client views default to an iPhone 15 Pro bezel frame to simulate real mobile studio usage.
- Admin & Instructor views automatically expand to full desktop view for ergonomic studio management.

---

## ⚡ 5. State Management & Hooks Strategy

Application state is modularized into specialized domain hooks in `src/lib/hooks/`:
- **`useCRM`**: Handles client lifecycle pipeline stages, interaction history logs, and At-Risk churn radar.
- **`usePayroll`**: Computes instructor base rates, per-head bonuses, and executes simulated M-Pesa B2C batch disbursements.
- **`useInventory`**: Manages Reformer bed spring tension health, technician maintenance logs, and retail stock adjustments.
