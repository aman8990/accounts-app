'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export const createPartyMaster = async (partyData) => {
  const supabase = await createClient();

  const cleanedData = Object.fromEntries(
    Object.entries(partyData).filter(
      ([key, value]) => value !== null && value !== '' && value !== undefined,
    ),
  );

  const { data, error } = await supabase
    .from('party_master')
    .insert([cleanedData])
    .select()
    .single();

  if (error) {
    console.error(error);
    return { error: 'Error in creating party master' };
  }

  return {
    success: true,
    partyMaster: data,
  };
};

export const updatePartyMaster = async (newData) => {
  const supabase = await createClient();

  const { id, ...partyData } = newData;

  const { data, error } = await supabase
    .from('party_master')
    .update({
      ...partyData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    return { error: 'Error in creating party master' };
  }

  return {
    success: true,
    partyMaster: data,
  };
};
