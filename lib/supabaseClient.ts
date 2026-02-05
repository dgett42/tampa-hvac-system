import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = (() => {
  if (!url || !key) {
    // Don’t crash the build; fail only when used
    console.warn("Supabase env vars missing. Check Vercel Environment Variables.");
    return null as any;
  }
  return createClient(url, key);
})();
