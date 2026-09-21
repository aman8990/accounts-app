'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function getChallans() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('memo')
    .select(
      `
    id,
    memo_date,
    party_weight,
    from,
    to,
    party_master (full_name)
  `,
    )
    .is('challan_done', null);

  if (error) {
    console.error(error);
    return {
      error: 'Error in loading challans',
    };
  }

  return data;
}
