import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;

/**
 * Server-side Supabase client.
 *
 * Expects the following environment variables (configure in .env.local):
 * - SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
export function getSupabaseServerClient(): SupabaseClient {
  if (supabaseClient) return supabaseClient;

  const url =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase configuration. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or ANON key) in your environment.",
    );
  }

  supabaseClient = createClient(url, key, {
    auth: {
      persistSession: false,
    },
  });

  return supabaseClient;
}
