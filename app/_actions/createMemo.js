'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export const createMemo = async (memoData) => {
  const supabase = await createClient();

  const cleanedData = Object.fromEntries(
    Object.entries(memoData).map(([key, value]) => [
      key,
      value === '' ? null : value,
    ]),
  );

  const { data, error } = await supabase
    .from('memo')
    .insert([cleanedData])
    .select()
    .single();

  if (error) {
    console.error(error);
    return { error: 'Error in creating memo' };
  }

  return {
    success: true,
    memo: data,
  };
};
