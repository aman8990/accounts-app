'use client';

import Button from '@/app/_components/Button';
import Form from './Form';
import { useState } from 'react';

function Challans({ challans }) {
  const [currentChallan, setCurrentChallan] = useState(null);

  function formatDate(date) {
    if (!date) return '-';

    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="space-y-10 mb-16">
      <Form
        currentChallan={currentChallan}
        setCurrentChallan={setCurrentChallan}
      />

      <div>
        <h1 className="text-center text-4xl text-accent-600 font-semibold mb-2 underline">
          Pending Challans
        </h1>

        <div className="overflow-x-auto px-4">
          <table className="w-full">
            <thead>
              <tr className="border-2 text-accent-500 border-accent-500">
                <th className="p-3 text-center">ID</th>
                <th className="p-3 text-center">Date</th>
                <th className="p-3 text-center">Party Name</th>
                <th className="p-3 text-center">Weight</th>
                <th className="p-3 text-center">From</th>
                <th className="p-3 text-center">To</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {challans?.map((challan) => (
                <tr
                  key={challan.id}
                  className="border-b-2 border-r-2 border-l-2 border-primary-100 text-primary-100 font-semibold text-lg"
                >
                  <td className="p-3 text-center">{challan.id}</td>
                  <td className="p-3 text-center">
                    {formatDate(challan.memo_date) ?? '-'}
                  </td>
                  <td className="p-3 max-w-10 text-center">
                    {challan.party_master.full_name ?? '-'}
                  </td>
                  <td className="p-3 text-center">
                    {challan.party_weight ?? '-'}
                  </td>
                  <td className="p-3 text-center">{challan.from ?? '-'}</td>
                  <td className="p-3 text-center">{challan.to ?? '-'}</td>

                  <td className="p-3">
                    <Button
                      type="button"
                      onClick={() => setCurrentChallan(challan)}
                    >
                      Proceed
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Challans;
