'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function getPartyPendingBalance() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('get_total_party_net_balance');

  if (error) {
    console.error(error);

    return {
      error: 'Error calculating total party net balance',
    };
  }

  return data ?? 0;
}
