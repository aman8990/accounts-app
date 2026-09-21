'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export const createLorryMaster = async (lorryData) => {
  const supabase = await createClient();

  const cleanedData = Object.fromEntries(
    Object.entries(lorryData).filter(
      ([key, value]) => value !== null && value !== '' && value !== undefined,
    ),
  );

  const { data, error } = await supabase
    .from('lorry_master')
    .insert([cleanedData])
    .select()
    .single();

  if (error) {
    console.error(error);
    return { error: 'Error in creating lorry master' };
  }

  return {
    success: true,
    lorryMaster: data,
  };
};

export const updateLorryMaster = async (newData) => {
  const supabase = await createClient();

  const { id, ...lorryData } = newData;

  const { data, error } = await supabase
    .from('lorry_master')
    .update({
      ...lorryData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);

    return {
      error: 'Error in updating lorry master',
    };
  }

  return {
    success: true,
    lorryMaster: data,
  };
};
