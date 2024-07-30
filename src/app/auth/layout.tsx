import React from 'react';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function layout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log('🚀 ~ layout ~ session:', session);
  if (session) {
    redirect('/dashboard');
  }
  return <>{children}</>;
}
