'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function getPartyBalanceById(partyId) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('get_a_party_net_balance', {
    p_party_id: partyId,
  });

  if (error) {
    console.error(error);

    return {
      error: 'Error getting party net balance',
    };
  }

  return data ?? 0;
}
