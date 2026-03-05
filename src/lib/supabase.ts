import { createClient } from '@supabase/supabase-js';

// This pulls your secret keys from the .env.local file securely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// This creates the "bridge" we will use to talk to your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);