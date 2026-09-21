'use client';

import { Fragment, useEffect, useState } from 'react';
import Button from '@/app/_components/Button';
import { useRouter } from 'next/navigation';
import DatePicker from '@/app/_components/DatePicker';
import { useForm } from 'react-hook-form';
import SpinnerMini from '@/app/_components/SpinnerMini';
import toast from 'react-hot-toast';
import formattedDate from '@/app/_libs/formattedDate';
import { getMemoById, getMemosByDate } from '@/app/_actions/getMemoById';
import { deleteOrder } from '@/app/_actions/deleteOrder';

import Form from './Form';

function Orders({ orders }) {
  const [allOrders, setAllOrders] = useState(orders);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const [id, setId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();

  const { handleSubmit, control } = useForm();

  function formatDate(date) {
    if (!date) return '-';

    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
  }

  function handleOrderUpdate(updatedOrder) {
    setAllOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order,
      ),
    );

    setOrderToEdit(null);
  }

  useEffect(() => {
    if (id === null) return;

    const loadOrder = async () => {
      const order = await getMemoById(id, 4);

      if (order?.error) {
        toast.dismiss();
        toast.error('Error in finding Order');
        setId(null);
        return;
      }

      toast.dismiss();
      toast.success('Added to Form');
      setOrderToEdit(order);
      setId(null);
    };

    loadOrder();
  }, [id]);

  const onSearch = async (data) => {
    try {
      setIsSearching(true);

      const date = formattedDate(data?.date);

      const result = await getMemosByDate(date);

      if (result?.error) {
        toast.error(`❌ ${result.error}`);
        return;
      }

      setAllOrders(result);
      setOrderToEdit(null);

      toast.dismiss();
      toast.success('Success');
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error('Error while searching');
    } finally {
      setIsSearching(false);
    }
  };

  async function handleDelete() {
    if (!orderToDelete) return;

    try {
      setIsDeleting(true);

      await deleteOrder(orderToDelete.id);

      setAllOrders((current) =>
        current.filter((order) => order.id !== orderToDelete.id),
      );

      setOrderToDelete(null);

      toast.dismiss();
      toast.success('Order Deleted');

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error('Error in deleting order');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSearch)}
        className="mb-2 flex items-center"
      >
        <DatePicker control={control} name="date" />

        <div className="mt-2 w-30">
          <Button disabled={isSearching} type="submit">
            {isSearching ? <SpinnerMini /> : 'Search'}
          </Button>
        </div>
      </form>

      <div className="mb-16 space-y-10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-2 border-accent-500 text-accent-500">
                <th className="p-3 text-center">Memo ID</th>
                <th className="p-3 text-center">Date</th>
                <th className="p-3 text-center">From</th>
                <th className="p-3 text-center">To</th>
                <th className="p-3 text-center">Lorry No.</th>
                <th className="p-3 text-center">Owner Name</th>
                <th className="p-3 text-center">Party Name</th>
                <th className="p-3 text-center">Action</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {allOrders?.map((order) => (
                <Fragment key={order.id}>
                  <tr className="border-b-2 border-r-2 border-l-2 border-primary-100 text-lg font-semibold text-primary-100">
                    <td className="p-3 text-center">{order.id}</td>

                    <td className="p-3 text-center">
                      {formatDate(order.memo_date)}
                    </td>

                    <td className="p-3 text-center">{order.from}</td>
                    <td className="p-3 text-center">{order.to}</td>

                    <td className="p-3 text-center">
                      {order?.lorry_no?.toUpperCase() ?? '-'}
                    </td>

                    <td className="p-3 text-center">
                      {order?.lorry_master?.owner_name ?? '-'}
                    </td>

                    <td className="p-3 text-center">
                      {order?.party_master?.full_name ?? '-'}
                    </td>

                    <td className="p-3">
                      <Button
                        type="button"
                        onClick={() => {
                          setId(order?.id);
                        }}
                        color="natural"
                        disabled={id === order.id}
                      >
                        {id === order.id ? <SpinnerMini /> : 'Edit'}
                      </Button>
                    </td>

                    <td className="p-3">
                      <Button
                        type="button"
                        onClick={() => {
                          setOrderToDelete(order);
                        }}
                        color="red"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>

                  {orderToEdit?.id === order.id && (
                    <tr>
                      <td
                        colSpan={9}
                        className="border-b-2 border-primary-100 p-0"
                      >
                        <div className="p-4">
                          <Form
                            orderToEdit={orderToEdit}
                            setOrderToEdit={setOrderToEdit}
                            onOrderUpdate={handleOrderUpdate}
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {orderToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900">Delete Payment?</h2>

            <p className="mt-3 text-gray-600 text-lg">
              Are you sure you want to delete order{' '}
              <span className="font-bold">#{orderToDelete.id}</span>?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                onClick={() => setOrderToDelete(null)}
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

export default Orders;
