'use client';

import Input from '@/app/_components/Input';
import SpinnerMini from '@/app/_components/SpinnerMini';
import { useEffect, useState } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import Button from '@/app/_components/Button';
import { updateChallan } from '@/app/_actions/updateChallan';
import Select from 'react-select';
import toast from 'react-hot-toast';
import DatePicker from '@/app/_components/DatePicker';
import { useRouter } from 'next/navigation';
import formattedDate from '@/app/_libs/formattedDate';
import { useLorryMasterStore } from '@/app/_store/lorryMasterStore';

function Form({ currentChallan, setCurrentChallan }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lorryMasters = useLorryMasterStore((state) => state.lorryMasters);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: currentChallan?.id || '',
      from: currentChallan?.from || '',
      to: currentChallan?.to || '',
      weight: currentChallan?.weight || '',
    },
  });

  const [initialCharges, detention, others, tds, munsiana, commission] =
    useWatch({
      control,
      name: [
        'initial_lorry_freight_charges',
        'lorry_detention',
        'lorry_others',
        'lorry_tds',
        'lorry_munsiana',
        'lorry_commission',
      ],
    });

  const toNumber = (value) => Number(value) || 0;

  const lorryFreightCharges =
    toNumber(initialCharges) +
    toNumber(detention) -
    toNumber(others) -
    toNumber(tds) -
    toNumber(munsiana) -
    toNumber(commission);

  const calculatedCommission = Number(
    (0.05 * toNumber(initialCharges)).toFixed(0),
  );

  const lorryOptions = lorryMasters.map((lorry) => ({
    value: lorry.id,
    label: lorry.owner_name,
  }));

  useEffect(() => {
    if (currentChallan) {
      reset({
        ...currentChallan,
        challan_date: new Date(),
      });

      toast.dismiss();
      toast.success('Added to Form');
    }
  }, [currentChallan, reset]);

  const onSubmit = async (formData) => {
    setIsSubmitting(true);

    const selectedLorry = lorryMasters.find(
      (lorry) => lorry.id === Number(formData.lorry_id),
    );

    const newData = {
      id: currentChallan?.id,
      lorry_id: Number(formData?.lorry_id),
      challan_date: formattedDate(formData?.challan_date),
      lorry_freight_charges: lorryFreightCharges,
      driver_name: formData?.driver_name,
      driver_mobile: formData?.driver_mobile,
      lic_no: formData?.lic_no,
      size: formData?.size,
      lorry_weight: formData?.lorry_weight,
      lorry_rate: formData?.lorry_rate,
      challan_done: true,
      initial_lorry_freight_charges: formData?.initial_lorry_freight_charges,
      lorry_detention: formData?.lorry_detention,
      lorry_others: formData?.lorry_others,
      lorry_tds: formData?.lorry_tds,
      lorry_munsiana: formData?.lorry_munsiana,
      lorry_commission: formData?.lorry_commission,
    };

    const result = await updateChallan(newData);

    if (result?.error) {
      toast.error(`❌ ${result.error}`);
    } else {
      toast.dismiss();
      toast.success('Challan Created');

      reset({
        id: '',
        lorry_id: null,
        challan_date: new Date(),
        lorry_no: '',
        from: '',
        to: '',
        driver_name: '',
        driver_mobile: '',
        lic_no: '',
        description: '',
        size: '',
        lorry_weight: '',
        lorry_rate: '',
        lorry_freight_charges: '',
        remarks: '',
        initial_lorry_freight_charges: '',
        lorry_detention: '',
        lorry_others: '',
        lorry_tds: '',
        lorry_munsiana: '',
        lorry_commission: '',
      });

      setCurrentChallan(null);
      router.refresh();
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
      <div className="max-w-6xl border-4 border-primary-700 rounded-2xl p-4">
        <div className="flex gap-6">
          <div className="flex-1">
            <Input
              label="Challan Number"
              id="id"
              type="number"
              register={register}
              disabled={true}
            />
          </div>

          <div className="flex-1 mt-1">
            <DatePicker
              control={control}
              name="challan_date"
              label="Challan Date :"
            />
          </div>

          <div className="flex-1">
            <Input
              label="Lorry No."
              id="lorry_no"
              type="text"
              register={register}
              disabled={true}
            />
          </div>

          <div className="flex-1">
            <Input
              label="From"
              id="from"
              type="text"
              register={register}
              disabled={true}
            />
          </div>

          <div className="flex-1">
            <Input
              label="To"
              id="to"
              type="text"
              register={register}
              disabled={true}
            />
          </div>
        </div>

        <div className="my-5 mx-3 flex flex-col gap-2">
          <div className="flex gap-5 ml-2">
            <label className="text-lg font-semibold text-accent-600">
              Name :
            </label>

            {errors.lorry_id && (
              <p className="mt-1 text-sm text-red-500">
                {errors.lorry_id.message}
              </p>
            )}
          </div>

          <Controller
            name="lorry_id"
            control={control}
            defaultValue={null}
            rules={{
              required: 'Please select a name',
            }}
            render={({ field }) => (
              <Select
                options={lorryOptions}
                placeholder="Search lorry..."
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
        </div>

        <div className="flex justify-between">
          <Input
            label="Driver"
            id="driver_name"
            type="text"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.driver_name?.message}
          />
          <Input
            label="Mobile"
            id="driver_mobile"
            type="number"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.driver_mobile?.message}
          />
          <Input
            label="Lic. No."
            id="lic_no"
            type="text"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.lic_no?.message}
          />
        </div>

        <Input
          label="Description"
          id="description"
          type="text"
          register={register}
        />

        <div className="flex justify-between gap-10">
          <Input label="Size" id="size" type="number" register={register} />
          <Input
            label="Weight"
            id="lorry_weight"
            type="text"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.lorry_weight?.message}
          />

          <Input
            label="Lorry Rate"
            id="lorry_rate"
            type="number"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.lorry_rate?.message}
          />
          <Input
            label="Initial Charges"
            id="initial_lorry_freight_charges"
            type="number"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.initial_lorry_freight_charges?.message}
          />
        </div>

        <div className="flex gap-10">
          <Input
            label="Detention(+)"
            id="lorry_detention"
            type="number"
            register={register}
          />

          <Input
            label="Commission(-)"
            id="lorry_commission"
            type="number"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.lorry_commission?.message}
          />

          <Input
            label="Others(-)"
            id="lorry_others"
            type="number"
            register={register}
          />

          <Input
            label="Munsiana(-)"
            id="lorry_munsiana"
            type="number"
            register={register}
          />

          <Input
            label="TDS(-)"
            id="lorry_tds"
            type="number"
            register={register}
          />
        </div>

        {calculatedCommission && (
          <h1 className="text-primary-100 font-semibold text-xl ml-75">
            {calculatedCommission}
          </h1>
        )}

        <Input
          label="Lorry Freight Charges"
          id="lorry_freight_charges"
          type="number"
          register={register}
          disabled={true}
          value={lorryFreightCharges}
        />

        <Input label="Remarks" id="remarks" type="text" register={register} />

        <div className="my-5 mx-3">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? <SpinnerMini /> : 'Create Challan'}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Form;
