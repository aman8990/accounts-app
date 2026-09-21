'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function deleteOrder(orderId) {
  const supabase = await createClient();

  if (!orderId) {
    throw new Error('Order ID is required');
  }

  // Delete party payments
  const { error: partyPaymentDeleteError } = await supabase
    .from('party_payments')
    .delete()
    .eq('memo_id', orderId);

  if (partyPaymentDeleteError) {
    return {
      error: 'Error in deleting party payments',
    };
  }

  // Delete lorry payments
  const { error: lorryPaymentDeleteError } = await supabase
    .from('lorry_payments')
    .delete()
    .eq('memo_id', orderId);

  if (lorryPaymentDeleteError) {
    return {
      error: 'Error in deleting lorry Payments',
    };
  }

  // Delete memo
  const { error: orderDeleteError } = await supabase
    .from('memo')
    .delete()
    .eq('id', orderId);

  if (orderDeleteError) {
    return {
      error: 'Error in deleting order',
    };
  }

  return {
    success: true,
  };
}
