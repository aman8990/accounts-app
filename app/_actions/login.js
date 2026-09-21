'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function login(data) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: 'Error in logging in' };
  }

  return { success: true };
}

export async function logout() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { error: 'Error in logging out' };
  }

  if (!user) {
    return { error: 'No user found' };
  }

  await supabase.auth.signOut();

  return { success: true };
}
