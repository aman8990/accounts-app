// 'use server';

// import { createClient } from '@/app/_libs/_supabase/server';

// export async function getPayments(method) {
//   const supabase = await createClient();

//   const allowedMethods = {
//     1: {
//       table: 'party_payments',
//       select: `
//         *,
//         memo (*),
//         party_master (*)
//       `,
//     },

//     2: {
//       table: 'lorry_payments',
//       select: `
//         *,
//         memo (*),
//         lorry_master (*)
//       `,
//     },
//   };

//   const config = allowedMethods[method];

//   if (!config) {
//     throw new Error('Invalid method');
//   }

//   const { data, error } = await supabase
//     .from(config.table)
//     .select(config.select);

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data;
// }

'use server';

import { createClient } from '@/app/_libs/_supabase/server';

export async function getPayments(method) {
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

  // Today's date according to India (IST)
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
  }).format(new Date());

  const { data, error } = await supabase
    .from(config.table)
    .select(config.select)
    .eq('date', today)
    .order('created_at', { ascending: false });

  if (error) {
    return {
      error: 'Error in loading payments',
    };
  }

  return data;
}
