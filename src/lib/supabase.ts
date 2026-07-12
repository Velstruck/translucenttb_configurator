import { createClient } from "@supabase/supabase-js";

// ============================================================
// Server-side Supabase client (uses service role key)
// Used in API routes for full DB access
// ============================================================

export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase server environment variables");
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// ============================================================
// Client-side Supabase client (uses anon key)
// For read-only or public operations if needed
// ============================================================

export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase client environment variables");
  }

  return createClient(url, key);
}
