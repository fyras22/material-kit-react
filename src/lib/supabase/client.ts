import { createBrowserClient } from '@supabase/ssr';
import SupabaseClient from '@supabase/supabase-js/dist/module/SupabaseClient';

export default function createSupabaseBrowerClient(): SupabaseClient<any, 'public', any> {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
