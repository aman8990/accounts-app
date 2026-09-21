'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export const updateOrder = async (newData) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('memo')
    .update(newData.changedData)
    .eq('id', newData.id)
    .select(
      `
      *,
      lorry_master (
        *
      ),
      party_master (
        *
      )
    `,
    )
    .single();

  if (error) {
    console.error(error);
    return { error: 'Error in updating order' };
  }

  return {
    success: true,
    updatedOrder: data,
  };
};
