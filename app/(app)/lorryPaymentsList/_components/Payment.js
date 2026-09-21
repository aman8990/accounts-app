'use client';

import Button from '@/app/_components/Button';
import { useState } from 'react';
import { deletePayment } from '@/app/_actions/deletePayment';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import DatePicker from '@/app/_components/DatePicker';
import { useForm } from 'react-hook-form';
import SpinnerMini from '@/app/_components/SpinnerMini';
import { getCustomPayments } from '@/app/_actions/getCustomPayments';
import formattedDate from '@/app/_libs/formattedDate';

function Payments({ payments }) {
  const [lorryPayments, setLorryPayments] = useState(payments);
  const [paymentToDelete, setPaymentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  function formatDate(date) {
    if (!date) return '-';

    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  const onSearch = async (data) => {
    setIsSearching(true);

    const date = formattedDate(data?.date);

    const result = await getCustomPayments(2, date);

    if (result?.error) {
      toast.error(`❌ ${result.error}`);
    } else {
      toast.success('Success');
      setLorryPayments(result);
    }

    setIsSearching(false);
  };

  async function handleDelete() {
    if (!paymentToDelete) return;

    try {
      setIsDeleting(true);

      await deletePayment(paymentToDelete.id, 2);

      setLorryPayments((current) =>
        current.filter((payment) => payment.id !== paymentToDelete.id),
      );

      setPaymentToDelete(null);
    } catch (error) {
      toast.dismiss();
      toast.error('Error in deleting payment');
    } finally {
      toast.dismiss();
      toast.success('Payment Deleted');
      setIsDeleting(false);
      router.refresh();
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSearch)}
        className="flex items-center mb-2"
      >
        <DatePicker control={control} name="date" />

        <div className="mt-2 w-30">
          <Button disabled={isSearching} type="submit">
            {isSearching ? <SpinnerMini /> : 'Search'}
          </Button>
        </div>
      </form>

      <div className="space-y-10 mb-16">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-2 text-accent-500 border-accent-500">
                <th className="p-3 text-center">Payment ID</th>
                <th className="p-3 text-center">Memo ID</th>
                <th className="p-3 text-center">Date</th>
                <th className="p-3 text-center">Lorry No.</th>
                <th className="p-3 text-center">Owner Name</th>
                <th className="p-3 text-center">Amount</th>
                <th className="p-3 text-center">Type</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {lorryPayments?.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b-2 border-r-2 border-l-2 border-primary-100 text-primary-100 font-semibold text-lg"
                >
                  <td className="p-3 text-center">{payment.id}</td>

                  <td className="p-3 text-center">
                    {payment?.memo?.id ?? '-'}
                  </td>

                  <td className="p-3 text-center">
                    {formatDate(payment.date)}
                  </td>

                  <td className="p-3 text-center">
                    {payment?.memo?.lorry_no.toUpperCase()}
                  </td>

                  <td className="p-3 w-80 text-center">
                    {payment?.lorry_master?.owner_name ?? '-'}
                  </td>

                  <td className="p-3 text-center">
                    ₹ {payment?.amount ?? '-'}
                  </td>

                  <td className="p-3 text-center">
                    {payment?.type.toUpperCase() ?? '-'}
                  </td>

                  <td className="p-3">
                    <Button
                      type="button"
                      onClick={() => setPaymentToDelete(payment)}
                      color="red"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {paymentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900">Delete Payment?</h2>

            <p className="mt-3 text-gray-600 text-lg">
              Are you sure you want to delete payment{' '}
              <span className="font-bold">#{paymentToDelete.id}</span>?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                onClick={() => setPaymentToDelete(null)}
                disabled={isDeleting}
                color="green"
              >
                No
              </Button>

              <Button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                color="red"
              >
                {isDeleting ? 'Deleting...' : 'Yes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Payments;
