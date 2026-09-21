'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function searchMemos(filters, page = 1, pageSize = 10) {
  const supabase = await createClient();

  const { dateType, fromDate, toDate, orderType, masterType, masterId } =
    filters;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  if (!['party', 'lorry'].includes(masterType)) {
    return {
      success: false,
      error: 'Invalid master type.',
    };
  }

  if (!masterId) {
    return {
      success: false,
      error:
        masterType === 'party' ? 'Party is required.' : 'Lorry is required.',
    };
  }

  let selectQuery;

  if (masterType === 'party') {
    selectQuery = `
      id,
      memo_date,
      from,
      to,
      lorry_no,
      party_net_balance,
      party_freight_charges,

      party_master (
        id,
        full_name
      ),

      party_payments (
        id,
        amount,
        type
      )
    `;
  }

  if (masterType === 'lorry') {
    selectQuery = `
      id,
      challan_date,
      from,
      to,
      lorry_no,
      lorry_net_balance,
      lorry_freight_charges,

      lorry_master (
        id,
        owner_name
      ),

      lorry_payments (
        id,
        amount,
        type
      )
    `;
  }

  let query = supabase.from('memo').select(selectQuery, {
    count: 'exact',
  });

  if (dateType === 'range') {
    if (!fromDate || !toDate) {
      return {
        success: false,
        error: 'Both dates are required.',
      };
    }

    const dateColumn = masterType === 'party' ? 'memo_date' : 'challan_date';

    query = query.gte(dateColumn, fromDate).lte(dateColumn, toDate);
  }

  if (orderType === 'pending') {
    const balanceColumn =
      masterType === 'party' ? 'party_net_balance' : 'lorry_net_balance';

    query = query.gt(balanceColumn, 0);
  }

  if (masterType === 'party') {
    query = query.eq('party_id', masterId);
  }

  if (masterType === 'lorry') {
    query = query.eq('lorry_id', masterId);
  }

  query = query
    .order('created_at', {
      ascending: false,
    })
    .range(from, to);

  const { data, error, count } = await query;

  console.log(data);

  if (error) {
    console.error('searchMemos error:', error);

    return {
      success: false,
      error: 'Error in fetching Memos',
    };
  }

  const totalPages = Math.ceil((count || 0) / pageSize);

  return {
    success: true,
    data: data || [],
    totalCount: count || 0,
    totalPages,
    currentPage: page,
    pageSize,
  };
}
