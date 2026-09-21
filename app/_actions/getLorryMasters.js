'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function getLorryMasters() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('lorry_master')
    .select('id, owner_name')
    .order('updated_at', { ascending: false, nullsFirst: false });

  if (error) {
    console.error(error);
    return {
      error: 'Error in loading lorry master',
    };
  }

  return data;
}

export async function getLorryMaster(id) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('lorry_master')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return {
      error: 'Error in loading party master',
    };
  }

  return data;
}
