# Core Balance Studio — Production Deployment Guide

This guide details the deployment procedure for publishing Core Balance Studio to **Vercel** and connecting a live **Supabase** backend.

---

## 🚀 1. Vercel Production Deployment

### Option A: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally (if needed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview / staging
vercel

# Deploy to production
vercel --prod
```

### Option B: Deploy via GitHub Repository Integration
1. Push the repository to GitHub.
2. Log in to [Vercel Dashboard](https://vercel.com).
3. Click **"New Project"** and import the `core-balance-studio` repository.
4. Configure Framework Preset: **Vite**.
5. Set Build Command: `npm run build`.
6. Set Output Directory: `dist`.

---

## 🔑 2. Environment Variables Setup

Configure the following environment variables in Vercel (**Settings -> Environment Variables**):

```env
# Supabase Backend Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Production Web Domain
VITE_APP_URL=https://corebalance.co.ke
```

---

## 🗄️ 3. Supabase Database Migration Scripts

Execute the SQL script in `supabase_setup_guide.md` or via the Supabase SQL Editor:

```sql
-- Client Profiles Table
CREATE TABLE IF NOT EXISTS public.client_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'client',
  classes_remaining INT DEFAULT 0,
  total_classes_purchased INT DEFAULT 0,
  membership_name TEXT DEFAULT 'No Membership',
  membership_status TEXT DEFAULT 'ACTIVE',
  membership_renewal_date TEXT,
  current_streak_weeks INT DEFAULT 0,
  classes_this_month INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "Users can read own profile" 
ON public.client_profiles FOR SELECT 
USING (auth.uid() = user_id);
```

---

## 🔍 4. Post-Deployment Verification Checklist

- [x] Test public website routes (`/`, `/instructors`, `/memberships`, `/shop`).
- [x] Test Demo Client, Demo Instructor, and Demo Admin sign-in flows.
- [x] Verify Reformer Spot Picker bed selection on `/book/:slug`.
- [x] Test M-Pesa B2C batch payouts under `/admin/payroll`.
- [x] Verify At-Risk churn radar actions under `/admin/crm`.
- [x] Confirm clean build execution with zero bundle or TypeScript errors (`npm run build`).
