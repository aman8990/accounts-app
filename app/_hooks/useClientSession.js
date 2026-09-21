'use client';

import { createClient } from '@/app/_libs/_supabase/client';

export async function getClientSession() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return { data, error };
}
