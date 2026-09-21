'use client';

import Input from '@/app/_components/Input';
import { useForm } from 'react-hook-form';
import DownloadInvoice from './DownloadInvoice';
import PageTitle from '@/app/_components/PageTitle';
import DatePicker from '@/app/_components/DatePicker';
import Button from '@/app/_components/Button';
import { getMemoById } from '@/app/_actions/getMemoById';
import { useState } from 'react';
import SpinnerMini from '@/app/_components/SpinnerMini';
import toast from 'react-hot-toast';
import H1 from '@/app/_components/H1';
import MemoPreview from './MemoPreview';

function Form() {
  const [isSearching, setIsSearching] = useState(false);
  const [memo, setMemo] = useState(null);

  const formatINR = new Intl.NumberFormat('en-IN');

  const { register, handleSubmit, control } = useForm();

  function formatDate(date) {
    if (!date) return '-';

    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
  }

  const onSubmit = async (data) => {
    setIsSearching(true);

    const result = await getMemoById(data.id, 3);

    if (result?.error) {
      toast.dismiss();
      toast.error(`${result.error}`);
      setMemo(null);
    } else {
      toast.dismiss();
      toast.success('Memo Found');
      setMemo(result);
    }

    setIsSearching(false);
  };

  return (
    <>
      <PageTitle title="Invoice" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
        <div className="w-3xl">
          <Input
            label="Enter Memo ID"
            id="id"
            type="number"
            register={register}
          />

          <div className="mt-2 mx-3">
            <Button disabled={isSearching} type="submit">
              {isSearching ? <SpinnerMini /> : 'Search'}
            </Button>
          </div>
        </div>
      </form>

      {memo && (
        <div className="mt-20">
          <div className="flex justify-center">
            <div className="text-2xl space-y-10 w-6xl">
              <div className="flex gap-20">
                <H1 label="Memo ID" text={memo?.id} />
                <H1 label="Memo Date" text={formatDate(memo?.memo_date)} />
                <H1 label="Lorry No." text={memo?.lorry_no} />
              </div>

              <div className="flex gap-5">
                <div className="flex-2">
                  <H1 label="Party Name" text={memo?.party_master?.full_name} />
                </div>

                <div className="flex-1">
                  <H1 label="Party ID" text={memo?.party_master?.id} />
                </div>
              </div>

              <div className="flex gap-20">
                <H1 label="From" text={memo?.from.toUpperCase()} />
                <H1 label="To" text={memo?.to.toUpperCase()} />
              </div>

              <div className="flex gap-20">
                <H1 label="Weight" text={memo?.party_weight} />
                <H1
                  label="Rate"
                  text={`₹ ${formatINR.format(memo?.party_rate)}`}
                />
                <H1
                  label="Initial Charges"
                  text={`₹ ${formatINR.format(memo?.initial_party_freight_charges)}`}
                />
              </div>

              <div className="flex gap-20">
                <H1
                  label="Detention"
                  text={`₹ ${formatINR.format(memo?.party_detention) || 0}`}
                />
                <H1
                  label="Others"
                  text={`₹ ${formatINR.format(memo?.party_others) || 0}`}
                />
                <H1
                  label="RTO"
                  text={`₹ ${formatINR.format(memo?.party_rto) || 0}`}
                />
                <H1
                  label="TDS"
                  text={`₹ ${formatINR.format(memo?.party_tds) || 0}`}
                />
                <H1
                  label="Munsiana"
                  text={`₹ ${formatINR.format(memo?.party_munsiana) || 0}`}
                />
              </div>

              <div className="flex gap-10">
                <H1
                  label="Party Freight Charges"
                  text={`₹ ${formatINR.format(memo?.party_freight_charges)}`}
                />
                <H1
                  label="Net Balance"
                  text={`₹ ${formatINR.format(memo?.party_net_balance)}`}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10 mb-10">
            <div>
              <h1 className="text-4xl text-accent-500 text-center underline">
                Payments
              </h1>

              {memo?.party_payments?.map((payment, i) => (
                <div key={payment?.id} className="mt-3 flex gap-4 text-2xl">
                  <h1 className="text-accent-500">{i + 1}.</h1>
                  <h1 className="text-primary-100">
                    ₹ {formatINR.format(payment?.amount)} &nbsp; &nbsp;-{' '}
                  </h1>
                  <h1 className="text-primary-100">
                    {payment?.type.toUpperCase()}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {memo && <DownloadInvoice memo={memo} />}
      {/* {memo && <MemoPreview memo={memo} />} */}
    </>
  );
}

export default Form;
