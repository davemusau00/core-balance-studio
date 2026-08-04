- `[x]` uncompleted tasks
- `[/]` in progress tasks (custom notation)
- `[x]` completed tasks

# Core Balance Studio - Supabase Transition & Refinement

## Phase 1: Data Architecture & Routing (Foundation)
- `[x]` Initialize Supabase project & environment variables.
- `[x]` Run Supabase SQL schema setup (Profiles, Instructors, Packages, Class Sessions, Bookings, Waitlist).
- `[x]` Configure React Router v6 in `main.tsx` and `App.tsx`.
- `[x]` Create `RequireAuth` component for role-based route protection.
- `[x]` Rewrite `AuthContext` to use Supabase Auth and `client_profiles` sync.

## Phase 2: Data Fetching Hooks (Replacement of mockData.ts)
- `[x]` Create `useInstructors` hook (fetches from `instructors` table).
- `[x]` Create `usePackages` hook (fetches from `packages` table).
- `[x]` Create `useClassSessions` hook (fetches from `class_sessions` with realtime status updates).
- `[x]` Create `useClientProfile` and `useActivities` hooks.

## Phase 3: UI Component Refactoring (Connecting Data & Routes)
- `[x]` Refactor `PublicWebsite.tsx` to use `useInstructors` and actual `<Link>` routing.
- `[x]` Refactor `SignInPage` and `SignUpPage` to handle auth with Supabase and role redirection.
- `[x]` Refactor `BookingSchedule.tsx` to use `useClassSessions` and link to checkout pages.
- `[x]` Refactor `ClassDetailModal.tsx` into a proper route-based `BookingCheckoutPage.tsx` (`/book/:id`).
- `[x]` Refactor `ClientDashboard.tsx` and mobile navigation to use real data hooks and React Router `<Link>`.
- `[x]` Refactor `AdminDashboard.tsx` to pull live summary metrics.

## Phase 4: Polish & UX Enhancements
- `[x]` Add skeleton loaders for all major data-fetching components.
- `[x]` Implement WhatsApp share button on class checkout.
- `[x]` Implement confetti animation on successful booking.
- `[x]` Validate and fix build process.

## Final Review
- `[x]` Ensure all routes are responsive.
- `[x]` Verify "Demo Login" fallback works correctly.
- `[x]` Test checkout flow from start to finish.
