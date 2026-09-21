'use client';

import Input from '@/app/_components/Input';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Button from '@/app/_components/Button';
import SpinnerMini from '@/app/_components/SpinnerMini';
import toast from 'react-hot-toast';
import { getMemoById } from '@/app/_actions/getMemoById';
import { createLorryPayment } from '@/app/_actions/createLorryPayment';
import DatePicker from '@/app/_components/DatePicker';
import PageTitle from '@/app/_components/PageTitle';
import formattedDate from '@/app/_libs/formattedDate';
import H1 from '@/app/_components/H1';

function Form() {
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [memo, setMemo] = useState(null);

  const formatINR = new Intl.NumberFormat('en-IN');

  function formatDate(date) {
    if (!date) return '-';

    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
  }

  const {
    register: registerSearch,
    handleSubmit: handleSearchSubmit,
    formState: { errors: searchError },
  } = useForm();

  const {
    register: registerConfirm,
    handleSubmit: handleConfirmSubmit,
    control,
    reset,
    formState: { errors: confirmError },
  } = useForm();

  const modeOfPayment = useWatch({
    control,
    name: 'mode_of_payment',
  });

  const onSearch = async (data) => {
    setIsSearching(true);

    const result = await getMemoById(data.id, 2);

    if (result?.error) {
      toast.dismiss();
      toast.error(`${result.error}`);
      setMemo(null);
    } else {
      toast.dismiss();
      toast.success('Memo Found');
      if (result.challan_done === true) {
        setMemo(result);
      } else {
        toast.dismiss();
        toast.error('Please do challan first');
      }
    }

    setIsSearching(false);
  };

  const onConfirm = async (data) => {
    setIsSubmitting(true);

    if (
      data.type === 'advance' &&
      memo.lorry_net_balance === null &&
      Number(data.amount) > Number(memo.lorry_freight_charges)
    ) {
      toast.dismiss();
      toast.error(`❌ Amount Bigger than Charges`);
      setIsSubmitting(false);
      return;
    }

    if (
      data.type === 'advance' &&
      Number(memo.lorry_freight_charges) === Number(memo.lorry_net_balance) &&
      Number(data.amount) > Number(memo.lorry_freight_charges)
    ) {
      toast.dismiss();
      toast.error(`❌ Amount Bigger than Charges`);
      setIsSubmitting(false);
      return;
    }

    if (
      data.type === 'advance' &&
      memo.lorry_net_balance !== null &&
      Number(memo.lorry_freight_charges) > Number(memo.lorry_net_balance) &&
      Number(data.amount) > Number(memo.lorry_net_balance)
    ) {
      toast.dismiss();
      toast.error(`❌ Amount Bigger than Net Balance`);
      setIsSubmitting(false);
      return;
    }

    if (
      data.type === 'remaining_balance' &&
      Number(data.amount) !== Number(memo.lorry_net_balance)
    ) {
      toast.dismiss();
      toast.error(`❌ Balance Mismatch`);
      setIsSubmitting(false);
      return;
    }

    if (Number(data.amount) === 0) {
      toast.dismiss();
      toast.error(`❌ Amount cannot be zero`);
      setIsSubmitting(false);
      return;
    }

    const newData = {
      type: data?.type,
      amount: data?.amount,
      memo_id: memo?.id,
      date: formattedDate(data?.date),
      lorry_id: memo?.lorry_master?.id,
      mode_of_payment: data?.mode_of_payment,
      remarks: data?.remarks,
      cheque_rtgs_no: data?.cheque_rtgs_no || '',
    };

    const result = await createLorryPayment(newData);

    if (result?.error) {
      toast.error(`❌ ${result.error}`);
    } else {
      toast.success('Payment Added');

      const updatedMemo = await getMemoById(memo.id, 2);

      if (updatedMemo?.error) {
        toast.error(`❌ ${updatedMemo.error}`);
      } else {
        setMemo(updatedMemo);
      }
    }

    reset();
    setIsSubmitting(false);
  };

  return (
    <div>
      <PageTitle title="Lorry Payment" />
      <form
        onSubmit={handleSearchSubmit(onSearch)}
        className="flex justify-center"
      >
        <div className="w-xl">
          <Input
            label="Enter Memo ID"
            id="id"
            type="number"
            register={registerSearch}
            rules={{
              required: 'Required',
            }}
            error={searchError.id?.message}
          />

          <div className="mx-3 mt-2">
            <Button disabled={isSearching} type="submit">
              {isSearching ? <SpinnerMini /> : 'Search'}
            </Button>
          </div>
        </div>
      </form>

      {memo !== null && (
        <div>
          <div className="flex justify-center mt-10">
            <div className="flex text-primary-100 font-semibold text-xl border-2 border-primary-100 rounded-2xl w-5xl px-5 py-5">
              <div className="flex-1 ml-10 space-y-2">
                <h1 className="text-4xl mb-5">Details</h1>
                <H1 label="Challan ID" text={memo?.id} />
                <H1
                  label="Challan Date"
                  text={formatDate(memo?.challan_date)}
                />
                <H1 label="Owner Name" text={memo?.lorry_master?.owner_name} />
                <H1
                  label="Lorry Freight Charges"
                  text={`₹ ${formatINR.format(memo?.lorry_freight_charges) ?? 0}`}
                />
                <H1
                  label="Lorry Net Balance"
                  text={`₹ ${formatINR.format(
                    memo?.lorry_net_balance === null
                      ? memo?.lorry_freight_charges
                      : memo?.lorry_net_balance,
                  )}`}
                />
                <H1 label="From" text={memo?.from.toUpperCase()} />
                <H1 label="To" text={memo?.to.toUpperCase()} />
              </div>

              <div className="flex-1 ml-10">
                <h1 className="text-4xl mb-5">Last Payments</h1>

                {memo?.lorry_payments?.map((payment, i) => (
                  <div key={payment?.id} className="mt-3 flex gap-4">
                    <h1 className="text-accent-500">{i + 1}.</h1>
                    <h1>
                      {' '}
                      ₹ {formatINR.format(payment?.amount)}&nbsp; &nbsp;-{' '}
                    </h1>
                    <h1>{payment?.type.toUpperCase()}</h1>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleConfirmSubmit(onConfirm)}
            className="flex justify-center my-10"
          >
            <div className="p-5 w-xl border-2 border-primary-100 rounded-2xl">
              <div className="flex justify-between">
                <Input
                  label="Challan ID"
                  id="memo_id"
                  type="number"
                  register={registerConfirm}
                  value={memo?.id}
                  disabled={true}
                />

                <Input
                  label="Lorry ID"
                  id="lorry_id"
                  type="text"
                  register={registerConfirm}
                  value={memo?.lorry_master?.id}
                  disabled={true}
                />

                <DatePicker control={control} name="date" label="Date" />
              </div>

              <div className="flex justify-between">
                <Input
                  label="Amount"
                  id="amount"
                  type="number"
                  register={registerConfirm}
                  rules={{
                    required: 'Required',
                  }}
                  error={confirmError?.amount?.message}
                />
                <select
                  {...registerConfirm('type', {
                    required: 'Please select a payment type',
                  })}
                  className="mt-10 w-60 h-12 p-2 text-xl rounded-lg border-4 border-primary-100 bg-transparent text-primary-100 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                >
                  <option value="" className="text-primary-950">
                    Select payment type
                  </option>
                  <option value="advance" className="text-primary-950">
                    Advance
                  </option>
                  <option
                    value="remaining_balance"
                    className="text-primary-950"
                  >
                    Remaining Balance
                  </option>
                </select>
              </div>

              <select
                {...registerConfirm('mode_of_payment', {
                  required: 'Please select a mode',
                })}
                className="w-full h-12 mt-4 mb-2 p-2 text-xl rounded-lg border-4 border-primary-100 bg-transparent text-primary-100 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
              >
                <option value="" className="text-primary-950">
                  Mode of Payment
                </option>
                <option value="cash" className="text-primary-950">
                  Cash
                </option>
                <option value="bank" className="text-primary-950">
                  Bank
                </option>
              </select>

              {modeOfPayment === 'bank' && (
                <Input
                  label="Cheque No / RTGS No"
                  id="cheque_rtgs_no"
                  type="text"
                  register={registerConfirm}
                />
              )}

              <Input
                label="Remarks"
                id="remarks"
                type="text"
                register={registerConfirm}
              />

              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? <SpinnerMini /> : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Form;
