- `[ ]` uncompleted tasks
- `[/]` in progress tasks
- `[x]` completed tasks

# Full ERP & CRM Feature Implementation

## 1. CRM Module
- `[x]` Create `AdminCRMPage.tsx` (`/admin/crm`) with lifecycle pipeline, At-Risk radar, and win-back actions
- `[x]` Create `AdminFeedbackPage.tsx` (`/admin/feedback`) with NPS gauge, weekly trend chart, and review moderation

## 2. ERP Operations Module
- `[x]` Create `AdminPayrollPage.tsx` (`/admin/payroll`) with class commission calculator & M-Pesa B2C payouts
- `[x]` Create `AdminInventoryPage.tsx` (`/admin/inventory`) with equipment maintenance logs & retail POS
- `[x]` Create `AdminRotaPage.tsx` (`/admin/rota`) with weekly shift scheduling grid & live staff attendance check-in

## 3. Public Webstore & Navigation
- `[x]` Create `WebstorePage.tsx` (`/shop`) for studio merchandise & equipment sales
- `[x]` Update `AdminLayout.tsx` with grouped sidebar navigation (Studio, CRM, Operations, Insights)
- `[x]` Update `router.tsx` with all new routes

## 4. Verification & Build
- `[ ]` Run `npm run build` to verify type safety and bundling
