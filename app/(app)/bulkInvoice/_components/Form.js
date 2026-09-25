'use client';

import Input from '@/app/_components/Input';
import { useForm } from 'react-hook-form';
import PageTitle from '@/app/_components/PageTitle';
import Button from '@/app/_components/Button';
import { getMemoById } from '@/app/_actions/getMemoById';
import { useState } from 'react';
import SpinnerMini from '@/app/_components/SpinnerMini';
import toast from 'react-hot-toast';
import H1 from '@/app/_components/H1';
import DownloadBulkInvoice from './DownloadBulkInvoice';
import MemoPreview from './MemoPreview';

function Form() {
  const [isSearching, setIsSearching] = useState(false);
  const [memos, setMemos] = useState([]);

  const formatINR = new Intl.NumberFormat('en-IN');

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (!data?.id?.trim()) return;

    setIsSearching(true);
    setMemos([]);

    try {
      const ids = data.id
        .split('-')
        .map((id) => id.trim())
        .filter(Boolean);

      const memoIds = ids.map(Number);

      if (memoIds.some((id) => !Number.isInteger(id))) {
        toast.error('Please enter valid Memo IDs');
        return;
      }

      const foundMemos = [];

      for (const id of memoIds) {
        const result = await getMemoById(id, 3);

        if (result?.error) {
          throw new Error(`Memo ID ${id}: ${result.error}`);
        }

        foundMemos.push(result);

        setMemos([...foundMemos]);
      }

      toast.dismiss();
      toast.success(
        `${foundMemos.length} memo${foundMemos.length > 1 ? 's' : ''} found`,
      );
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <PageTitle title="Bulk Invoice" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
        <div className="w-3xl">
          <Input
            label="Enter Memo ID's"
            placeholder="1-2-3-4-5-6"
            id="id"
            type="text"
            register={register}
          />

          <div className="mt-2 mx-3">
            <Button disabled={isSearching} type="submit">
              {isSearching ? <SpinnerMini /> : 'Search'}
            </Button>
          </div>
        </div>
      </form>

      {memos.length > 0 && (
        <div className="flex flex-col items-center text-xl mt-20 space-y-20 mb-20">
          {memos.map((memo, i) => (
            <div key={memo.id} className="w-5xl">
              <h1 className="text-3xl text-center text-primary-100 mb-5 underline">
                No. {i + 1}
              </h1>
              <div className="flex justify-between mb-2">
                <H1 label="Memo ID" text={memo?.id} />
                <H1 label="Party Master" text={memo?.party_master?.full_name} />
                <H1 label="Party ID" text={memo?.party_master?.id} />
              </div>

              <div className="flex justify-between mb-2">
                <H1 label="Lorry No." text={memo?.lorry_no.toUpperCase()} />
                <H1 label="From" text={memo?.from.toUpperCase()} />
                <H1 label="To" text={memo?.to.toUpperCase()} />
              </div>

              <div className="flex justify-between">
                <H1 label="Weight" text={memo?.party_weight} />
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
          ))}
        </div>
      )}

      {memos.length > 0 && <DownloadBulkInvoice memos={memos} />}
      {/* {memos && <MemoPreview memos={memos} />} */}
    </>
  );
}

export default Form;
