'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function loginWithGoogle() {
  console.log('🚀 ~ loginWithGoogle ~ loginWithGoogle:', 'loginWithGoogle');
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
  console.log('🚀 ~ loginWithGoogle ~ data:', data);
  console.log('🚀 ~ loginWithGoogle ~ error:', error);
  if (error) {
    return { error };
  }
  redirect(data.url);
}
