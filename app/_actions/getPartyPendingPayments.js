'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function getPartyPendingPayments() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from('memo')
    .select('*', { count: 'exact', head: true })
    .neq('party_net_balance', 0);

  if (error) {
    console.error(error);

    return {
      error: 'Error in loading pending balances',
    };
  }

  return count ?? 0;
}
