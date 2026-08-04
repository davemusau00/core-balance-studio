import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://aihlsfyuwwvemmyfwxry.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpaGxzZnl1d3d2ZW1teWZ3eHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NzA1MjQsImV4cCI6MjEwMTQ0NjUyNH0.yGc3AHAfIVN_7ZdL4-PvygFiaNVpH3LH7xT2KmYlYQA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
