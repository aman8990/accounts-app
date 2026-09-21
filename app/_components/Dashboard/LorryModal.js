'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import toast from 'react-hot-toast';
import Button from '../Button';
import { getLorryBalanceById } from '@/app/_actions/getLorryBalanceById';
import SpinnerMini from '../SpinnerMini';
import { useLorryMasterStore } from '@/app/_store/lorryMasterStore';

function LorryModal({ closeModal }) {
  const [isSearching, setIsSearching] = useState(false);
  const [amount, setAmount] = useState(null);

  const lorryMasters = useLorryMasterStore((state) => state.lorryMasters);

  const formatINR = new Intl.NumberFormat('en-IN');

  const { register, handleSubmit, control, reset } = useForm();

  const lorryOptions = lorryMasters.map((lorry) => ({
    value: lorry.id,
    label: lorry.owner_name,
  }));

  const onSubmit = async (formData) => {
    setIsSearching(true);

    const lorryId = Number(formData.lorry_id);

    const result = await getLorryBalanceById(lorryId);

    if (result?.error) {
      toast.dismiss();
      toast.error(` ${result.error}`);
      setAmount(null);
      setIsSearching(false);
    } else {
      toast.dismiss();
      toast.success('Found');
      setAmount(result);
    }

    setIsSearching(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-xl h-80 rounded-lg bg-primary-800 py-10 px-10 shadow-xl border-4 border-primary-600"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-center text-primary-100 mb-5 text-3xl underline">
          Lorry Pending Payments
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Controller
            name="lorry_id"
            control={control}
            defaultValue={null}
            rules={{
              required: 'Please select a Lorry Master',
            }}
            render={({ field }) => (
              <Select
                options={lorryOptions}
                placeholder="Search Lorry Master..."
                isSearchable
                isClearable
                value={
                  lorryOptions.find((option) => option.value === field.value) ||
                  null
                }
                onChange={(option) => field.onChange(option?.value ?? null)}
                styles={{
                  input: (base) => ({
                    ...base,
                    color: 'var(--color-primary-950)',
                    fontSize: '16px',
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: 'var(--color-primary-950)',
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: 'var(--color-primary-950)',
                  }),
                }}
              />
            )}
          />

          <Button type="submit">
            {isSearching ? <SpinnerMini /> : 'Search'}
          </Button>
        </form>

        {amount && (
          <h1 className="mt-10 text-center text-2xl font-bold text-primary-100">
            Net Balance : ₹ {formatINR.format(amount)}
          </h1>
        )}
      </div>
    </div>
  );
}

export default LorryModal;
