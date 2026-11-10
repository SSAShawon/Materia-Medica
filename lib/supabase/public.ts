import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseConfig } from "./config";

/**
 * Cookie-less, server-side Supabase client for public reads.
 *
 * It uses only the public/publishable key, so Row Level Security still applies.
 * Never import this module from a client component.
 */
let cached:
  | {
      url: string;
      key: string;
      client: SupabaseClient;
    }
  | undefined;

export function createPublicClient(): SupabaseClient {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  if (
    !cached ||
    cached.url !== config.url ||
    cached.key !== config.publishableKey
  ) {
    cached = {
      url: config.url,
      key: config.publishableKey,
      client: createClient(config.url, config.publishableKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      }),
    };
  }

  return cached.client;
}
