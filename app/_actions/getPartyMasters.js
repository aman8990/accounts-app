'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function getPartyMasters() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('party_master')
    .select('id, full_name')
    .order('updated_at', { ascending: false, nullsFirst: false });

  if (error) {
    console.error(error);
    return {
      error: 'Error in loading party masters',
    };
  }

  return data;
}

export async function getPartyMaster(id) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('party_master')
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
