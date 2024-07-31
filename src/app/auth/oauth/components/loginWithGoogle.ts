'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function loginWithGoogle() {
  const headersList = headers();
  const header_url = headersList.get('host') || '';
  const proto = headers().get('x-forwarded-proto') || 'http';
  const supabase = await createSupabaseServerClient();
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${proto}://${header_url}/auth/oauth/callback`,
    },
  });

  if (error) {
    return { error };
  }
  redirect(data.url);
}
