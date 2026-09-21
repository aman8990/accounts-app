'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function getPreviousMemoId() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('memo')
    .select('id')
    .order('id', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.details === 'The result contains 0 rows') {
      return 0;
    } else {
      return {
        error: 'Error in loading previous memos',
      };
    }
  }

  return data.id;
}
