'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function getCustomPayments(method, date) {
  const supabase = await createClient();

  const allowedMethods = {
    1: {
      table: 'party_payments',
      select: `
        *,
        memo (*),
        party_master (*)
      `,
    },
    2: {
      table: 'lorry_payments',
      select: `
        *,
        memo (*),
        lorry_master (*)
      `,
    },
  };

  const config = allowedMethods[method];

  if (!config) {
    return {
      error: 'Invalid Method',
    };
  }

  const { data, error } = await supabase
    .from(config.table)
    .select(config.select)
    .eq('date', date)
    .order('created_at', { ascending: false });

  if (error) {
    return {
      error: 'Error in loading payments',
    };
  }

  return data;
}
