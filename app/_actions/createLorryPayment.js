'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export const createLorryPayment = async (newData) => {
  const supabase = await createClient();

  
  const cleanedData = Object.fromEntries(
    Object.entries(newData).filter(
      ([key, value]) => value !== null && value !== '' && value !== undefined,
    ),
  );

  

  const { data, error } = await supabase
    .from('lorry_payments')
    .insert([cleanedData])
    .select()
    .single();

  if (error) {
    console.error(error);
    return { error: 'Error in creating lorry payment' };
  }
  return {
    success: true,
    lorry_payment: data,
  };
};
