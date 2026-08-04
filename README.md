# Core Balance Studio

A premium, mobile-first wellness platform for a boutique Reformer Pilates studio in Nairobi.

## Overview

Core Balance Studio provides a sophisticated front-end experience across three main views:
1. **Public Website**: High-conversion landing page with studio highlights, programs, and instructor profiles.
2. **Client Booking App**: Personalized dashboard for managing classes, packages, memberships, and a streamlined booking flow.
3. **Admin Dashboard**: Comprehensive studio management for schedules, attendance, staff, and revenue analytics.

Built with **React**, **TypeScript**, and **Tailwind CSS v4**, the application is optimized for performance, accessibility, and a premium visual aesthetic.

## Features

- **Mobile-First Design**: Thoughtfully designed for one-handed use, responsive layouts, and safe-area adjustments for mobile browsers (iOS/Android).
- **Premium Aesthetics**: Clean typography, subtle micro-animations, glassmorphism elements, and a curated color palette (lavender, white, dark navy).
- **Interactive Components**: Modals, slide-in drawers, and interactive data visualizations (using Recharts).
- **Supabase Integration Ready**: Includes a client stub for easy connection to Supabase for authentication and database services.
- **Vercel Deployment Ready**: Pre-configured `vercel.json` for SPA routing and security headers.

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Vanilla CSS Tokens
- **Icons**: Lucide React
- **Charts**: Recharts
- **Database/Auth**: Supabase (Stubbed)
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or bun

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
├── src/
│   ├── components/      # UI Components grouped by domain (admin, booking, client, common, public)
│   ├── context/         # React Context for global state (AppContext)
│   ├── data/            # Mock data for initial UI population
│   ├── lib/             # Utility libraries (Supabase client)
│   ├── types/           # TypeScript interfaces and types
│   ├── index.css        # Global CSS and Tailwind tokens
│   ├── App.tsx          # Main application entry point and router
│   └── main.tsx         # React DOM rendering
├── public/              # Static assets
├── index.html           # HTML template with SEO meta tags
├── vercel.json          # Vercel deployment configuration
├── vite.config.ts       # Vite bundler configuration
└── tailwind.config.js   # Tailwind theme customization (if needed with v4)
```

## Deployment

The project is configured for seamless deployment on Vercel. 
1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. The `vercel.json` file automatically handles SPA routing fallbacks and sets proper cache headers.
4. Set up environment variables in Vercel (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

## Built For
Nairobi Wellness & Clinical Pilates.
