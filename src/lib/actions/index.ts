'use server';

import { unstable_noStore as noStore } from 'next/cache';

import { createSupabaseServerClient } from '../supabase/server';

export async function readUserSession() {
  noStore();
  const supabsae = await createSupabaseServerClient();
  return await supabsae.auth.getSession();
}
