import { createClient } from '@supabase/supabase-js'

// Grab the hidden environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Fail loudly during dev/build if the env is missing or misconfigured
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  )
}

// Initialize and export the client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
