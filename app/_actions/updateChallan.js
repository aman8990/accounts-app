'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export const updateChallan = async (newData) => {
  const supabase = await createClient();

  const cleanedData = Object.fromEntries(
    Object.entries(newData).filter(
      ([key, value]) => value !== null && value !== '' && value !== undefined,
    ),
  );

  const { data, error } = await supabase
    .from('memo')
    .update(cleanedData)
    .eq('id', cleanedData.id)
    .select()
    .single();

  if (error) {
    console.error(error);
    return { error: 'Error in creating challan' };
  }
  return {
    success: true,
    challan: data,
  };
};
