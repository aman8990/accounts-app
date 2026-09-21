'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function getChallansCount() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from('memo')
    .select('*', { count: 'exact', head: true })
    .is('challan_done', null);

  if (error) {
    console.error(error);
    return {
      error: 'Error in loading challans',
    };
  }

  return count ?? 0;
}
