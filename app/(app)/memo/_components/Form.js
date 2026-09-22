'use client';

import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import SpinnerMini from '@/app/_components/SpinnerMini';
import { createMemo } from '@/app/_actions/createMemo';
import { useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import Select from 'react-select';
import toast from 'react-hot-toast';
import DatePicker from '@/app/_components/DatePicker';
import { useRouter } from 'next/navigation';
import formattedDate from '@/app/_libs/formattedDate';
import { usePartyMasterStore } from '@/app/_store/partyMasterStore';

function Form({ lastMemoId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const partyMasters = usePartyMasterStore((state) => state.partyMasters);
  const router = useRouter();
  const slipNo = Number(lastMemoId) + 1;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [initialCharges, detention, others, rto, tds, munsiana] = useWatch({
    control,
    name: [
      'initial_party_freight_charges',
      'party_detention',
      'party_others',
      'party_rto',
      'party_tds',
      'party_munsiana',
    ],
  });

  const toNumber = (value) => Number(value) || 0;

  const partyFreightCharges =
    toNumber(initialCharges) +
    toNumber(detention) +
    toNumber(others) +
    toNumber(rto) -
    toNumber(tds) -
    toNumber(munsiana);

  const partyOptions = partyMasters.map((party) => ({
    value: party.id,
    label: party.full_name,
  }));

  const onSubmit = async (formData) => {
    setIsSubmitting(true);

    const selectedParty = partyMasters.find(
      (party) => party.id === Number(formData.party_id),
    );

    const partyData = {
      ...formData,
      id: slipNo,
      party_id: Number(formData.party_id),
      memo_date: formattedDate(formData.memo_date),
      party_freight_charges: partyFreightCharges,
    };

    const result = await createMemo(partyData);

    if (result?.error) {
      toast.error(`❌ ${result.error}`);
    } else {
      toast.dismiss();
      toast.success('Memo Created');
    }

    reset();
    router.refresh();
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
      <div className="max-w-6xl border-4 border-primary-700 rounded-2xl p-4 space-y-4">
        <div className="flex gap-5">
          <div className="flex-1">
            <Input
              label="Memo ID"
              id="id"
              type="number"
              register={register}
              disabled={true}
              value={slipNo}
            />
          </div>

          <div className="flex-1">
            <Input
              label="Lorry No."
              id="lorry_no"
              type="text"
              register={register}
            />
          </div>

          <div className="flex-1 mt-1">
            <DatePicker
              control={control}
              name="memo_date"
              label="Memo Date :"
              className="text-primary-100"
            />
          </div>

          <div className="flex-1">
            <Input
              label="From"
              id="from"
              type="text"
              register={register}
              rules={{
                required: 'Required',
              }}
              error={errors.from?.message}
            />
          </div>

          <div className="flex-1">
            <Input
              label="To"
              id="to"
              type="text"
              register={register}
              rules={{
                required: 'Required',
              }}
              error={errors.to?.message}
            />
          </div>
        </div>

        <div className="my-5 mx-3 flex flex-col gap-2">
          <div className="flex gap-5 ml-2">
            <label className="text-lg font-semibold text-accent-600">
              Party :
            </label>

            {errors.party_id && (
              <p className="mt-1 text-sm text-red-500">
                {errors.party_id.message}
              </p>
            )}
          </div>

          <Controller
            name="party_id"
            control={control}
            defaultValue={null}
            rules={{
              required: 'Please select a party',
            }}
            render={({ field }) => (
              <Select
                options={partyOptions}
                placeholder="Search party..."
                isSearchable
                isClearable
                value={
                  partyOptions.find((option) => option.value === field.value) ||
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
        </div>

        <div className="flex justify-between gap-10">
          <Input label="Length" id="length" type="text" register={register} />

          <Input label="Width" id="width" type="text" register={register} />

          <Input label="Height" id="height" type="text" register={register} />

          <Input
            label="Weight"
            id="party_weight"
            type="text"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.party_weight?.message}
          />
        </div>

        <div className="flex justify-between gap-30">
          <Input
            label="Party Rate"
            id="party_rate"
            type="number"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.party_rate?.message}
          />

          <Input
            label="Initial Charges"
            id="initial_party_freight_charges"
            type="number"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.initial_party_freight_charges?.message}
          />

          <Input
            label="Advance To Pay"
            id="advance_to_pay"
            type="number"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors?.advance_to_pay?.message}
          />
        </div>

        <div className="flex gap-10">
          <Input
            label="Detention(+)"
            id="party_detention"
            type="number"
            register={register}
          />
          <Input
            label="Others(+)"
            id="party_others"
            type="number"
            register={register}
          />
          <Input
            label="RTO(+)"
            id="party_rto"
            type="number"
            register={register}
          />

          <Input
            label="TDS(-)"
            id="party_tds"
            type="number"
            register={register}
          />
          <Input
            label="Munsiana(-)"
            id="party_munsiana"
            type="number"
            register={register}
          />
        </div>

        <Input
          label="Party Freight Charges"
          id="party_freight_charges"
          type="number"
          register={register}
          disabled={true}
          value={partyFreightCharges}
          rules={{
            required: 'Required',
          }}
          error={errors.party_freight_charges?.message}
        />
        <Input label="Remarks" id="remarks" type="text" register={register} />

        <div className="my-5 mx-3">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? <SpinnerMini /> : 'Create Memo'}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Form;
