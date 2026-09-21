'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function getSession() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { user, error };
}
