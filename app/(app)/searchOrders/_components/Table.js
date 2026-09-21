'use client';

import SpinnerMini from '@/app/_components/SpinnerMini';
import { Fragment } from 'react';
import Button from '@/app/_components/Button';
import { LuDownload } from 'react-icons/lu';
import ExportToExcel from './ExportToExcel';

function Table({ orders = [], isLoading = false, masterType }) {
  if (isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <SpinnerMini />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <p className="text-gray-500">No orders found.</p>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return '-';

    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatNumber = (value) => {
    if (value === null || value === undefined) {
      return '-';
    }

    return new Intl.NumberFormat('en-IN').format(value);
  };

  return (
    <>
      <div className="text-primary-100 flex justify-end">
        <div className="w-20">
          <ExportToExcel
            orders={orders}
            masterType={masterType}
            formatDate={formatDate}
          />
        </div>
      </div>
      <div className="mb-16 space-y-10 p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-2 border-accent-500 text-accent-500">
                <th className="p-3 text-center">Memo ID</th>
                <th className="p-3 text-center">
                  {masterType === 'party' ? 'Memo Date' : 'Challan Date'}
                </th>
                <th className="p-3 text-center">From</th>
                <th className="p-3 text-center">To</th>
                <th className="p-3 text-center">Lorry No.</th>
                <th className="p-3 text-center">
                  {masterType === 'party' ? 'Party master' : 'Lorry Master'}
                </th>
                <th className="p-3 text-center">Net Balance</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders?.map((order) => (
                <Fragment key={order.id}>
                  <tr className="border-b-2 border-r-2 border-l-2 border-primary-100 text-lg font-semibold text-primary-100">
                    <td className="p-3 text-center">{order.id}</td>

                    <td className="p-3 text-center">
                      {formatDate(
                        masterType === 'party'
                          ? order.memo_date
                          : order?.challan_date,
                      )}
                    </td>

                    <td className="p-3 text-center">
                      {order.from?.toUpperCase()}
                    </td>
                    <td className="p-3 text-center">
                      {order.to?.toUpperCase()}
                    </td>

                    <td className="p-3 text-center">
                      {order?.lorry_no?.toUpperCase() ?? '-'}
                    </td>

                    <td className="p-3 text-center">
                      {(masterType === 'party'
                        ? order?.party_master?.full_name
                        : order?.lorry_master?.owner_name) ?? '-'}
                    </td>

                    <td className="p-3 text-center">
                      ₹{' '}
                      {formatNumber(
                        masterType === 'party'
                          ? order?.party_net_balance
                          : order?.lorry_net_balance,
                      ) ?? '-'}
                    </td>

                    <td className="flex justify-center p-3">
                      <ExportToExcel
                        orders={[order]}
                        masterType={masterType}
                        formatDate={formatDate}
                      />
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
