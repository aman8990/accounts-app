'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function getLorryBalanceById(lorryId) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('get_a_lorry_net_balance', {
    l_lorry_id: lorryId,
  });

  if (error) {
    console.error(error);

    return {
      error: 'Error getting lorry net balance',
    };
  }

  return data ?? 0;
}
