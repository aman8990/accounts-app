'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function getMemoById(memoId, method) {
  const supabase = await createClient();

  const allowedMethods = {
    1: `
      id,
      memo_date,
      from,
      to,
      party_freight_charges,
      party_net_balance,
      party_master(id,full_name),
      party_payments(id,amount,type)
    `,
    2: `
      id,
      challan_date,
      from,
      to,
      lorry_freight_charges,
      lorry_net_balance,
      challan_done,
      lorry_master(id,owner_name),
      lorry_payments(id,amount,type)
    `,
    3: `
      id,
      memo_date,
      lorry_no,
      from,
      to,
      party_weight,
      party_rate,
      party_detention,
      party_others,
      party_rto,
      party_tds,
      party_munsiana,
      initial_party_freight_charges,
      party_freight_charges,
      party_net_balance,
      advance_to_pay,
      party_master(id,full_name,address,mobile),
      party_payments(id,amount,type)
    `,
    4: `
      *,
    lorry_master (*),
    party_master (*)
    `,
  };

  const relation = allowedMethods[method];

  if (!relation) {
    return {
      error: 'Invalid Method',
    };
  }

  const { data, error } = await supabase
    .from('memo')
    .select(relation)
    .eq('id', memoId)
    .single();

  if (error) {
    return { error: `No Memo with ID - ${memoId}` };
  }

  return data;
}

export async function getMemos() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('memo')
    .select(
      `
    id,
    from,
    to,
    memo_date,
    party_master (
      full_name
    )
  `,
    )
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error(error);
    return { error: `Error in finding memo with ID ${memoId}` };
  }

  return data;
}

export async function getMemosByDate(date) {
  const supabase = await createClient();

  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
  }).format(new Date());

  const queryDate = date || today;

  const { data, error } = await supabase
    .from('memo')
    .select(
      `
    id,
    memo_date,
    from,
    to,
    lorry_no,
    lorry_master (owner_name),
    party_master (full_name)
  `,
    )
    .eq('memo_date', queryDate)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return { error: `Error in finding memo with date ${date}` };
  }

  return data;
}
