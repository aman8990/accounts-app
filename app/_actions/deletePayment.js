'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function deletePayment(paymentId, method) {
  const supabase = await createClient();

  const allowedMethods = {
    1: 'party_payments',
    2: 'lorry_payments',
  };

  const table = allowedMethods[method];

  if (!table) {
    return {
      error: 'Invalid Payment Method',
    };
  }

  if (!paymentId) {
    return {
      error: 'No Payment ID Found',
    };
  }

  const { error } = await supabase.from(table).delete().eq('id', paymentId);

  if (error) {
    return {
      error: 'Error in deleting payment',
    };
  }

  return {
    success: true,
  };
}
