'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function createTodo(title: string, website: string) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from('todo').insert({ title, website }).single();
  revalidatePath('/todo');
  return JSON.stringify(result);
}

export async function readTodo() {
  noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase.from('workspaces').select('*');
}

export async function deleteTodoById(id: string) {
  const supabase = await createSupabaseServerClient();
  await supabase.from('todo').delete().eq('id', id);
  revalidatePath('/todo');
}

export async function updateTodoById(id: string, completed: boolean) {
  const supabase = await createSupabaseServerClient();
  await supabase.from('todo').update({ completed }).eq('id', id);
  revalidatePath('/todo');
}
