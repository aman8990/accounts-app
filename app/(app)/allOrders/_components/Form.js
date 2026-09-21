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
import { updateOrder } from '@/app/_actions/updateOrder';

function Form({ orderToEdit, setOrderToEdit, onOrderUpdate }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (orderToEdit) {
      reset({
        id: orderToEdit?.id,
        lr_no: orderToEdit?.lr_no,
        full_name: orderToEdit?.party_master?.full_name,
        from: orderToEdit?.from,
        to: orderToEdit?.to,
        length: orderToEdit?.length,
        width: orderToEdit?.width,
        height: orderToEdit?.height,
        party_weight: orderToEdit?.party_weight,
        party_rate: orderToEdit?.party_rate,
        initial_party_freight_charges:
          orderToEdit?.initial_party_freight_charges,
        party_detention: orderToEdit?.party_detention,
        party_others: orderToEdit?.party_others,
        party_rto: orderToEdit?.party_rto,
        party_tds: orderToEdit?.party_tds,
        party_munsiana: orderToEdit?.party_munsiana,
        party_freight_charges: orderToEdit?.party_freight_charges,

        lorry_no: orderToEdit.lorry_no,
        owner_name: orderToEdit?.lorry_master?.owner_name,
        driver_name: orderToEdit?.driver_name,
        driver_mobile: orderToEdit.driver_mobile,
        lic_no: orderToEdit.lic_no,
        description: orderToEdit.description,
        size: orderToEdit.size,
        lorry_weight: orderToEdit.lorry_weight,
        lorry_rate: orderToEdit.lorry_rate,
        remarks: orderToEdit.remarks,
        lorry_freight_charges: orderToEdit.lorry_freight_charges,
        initial_lorry_freight_charges:
          orderToEdit?.initial_lorry_freight_charges,
        lorry_detention: orderToEdit?.lorry_detention,
        lorry_others: orderToEdit?.lorry_others,
        lorry_tds: orderToEdit?.lorry_tds,
        lorry_munsiana: orderToEdit?.lorry_munsiana,
        lorry_commission: orderToEdit?.lorry_commission,
      });
    }
  }, [orderToEdit, reset]);

  const [IPC, PD, PO, PRTO, PTDS, PM, ILC, LD, LO, LTDS, LM, LC] = useWatch({
    control,
    name: [
      'initial_party_freight_charges',
      'party_detention',
      'party_others',
      'party_rto',
      'party_tds',
      'party_munsiana',
      'initial_lorry_freight_charges',
      'lorry_detention',
      'lorry_others',
      'lorry_tds',
      'lorry_munsiana',
      'lorry_commission',
    ],
  });

  const toNumber = (value) => Number(value) || 0;

  const partyFreightCharges =
    toNumber(IPC) +
    toNumber(PD) +
    toNumber(PO) +
    toNumber(PRTO) -
    toNumber(PTDS) -
    toNumber(PM);

  const lorryFreightCharges =
    toNumber(ILC) +
    toNumber(LD) -
    toNumber(LO) -
    toNumber(LTDS) -
    toNumber(LM) -
    toNumber(LC);

  const calculatedCommission = Number((0.05 * toNumber(ILC)).toFixed(0));

  const onSubmit = async (formData) => {
    setIsSubmitting(true);

    let changedData;

    changedData = Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key] = formData[key];
      return acc;
    }, {});

    if (partyFreightCharges !== orderToEdit?.party_freight_charges) {
      changedData = {
        ...changedData,
        party_freight_charges: partyFreightCharges,
      };
    }

    if (lorryFreightCharges !== orderToEdit?.lorry_freight_charges) {
      changedData = {
        ...changedData,
        lorry_freight_charges: lorryFreightCharges,
      };
    }

    if (Object.keys(changedData).length === 0) {
      toast.dismiss();
      toast('Nothing to Update');
      setIsSubmitting(false);
      return;
    }

    const newData = {
      id: formData.id,
      changedData,
    };

    const result = await updateOrder(newData);

    if (result?.error) {
      toast?.dismiss();
      toast.error(`❌ ${result.error}`);
      setIsSubmitting(false);
    } else {
      toast.dismiss();
      toast.success('Order Updated');

      onOrderUpdate(result.updatedOrder);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
      <div className="w-full border-2 border-primary-200 rounded-2xl p-4 space-y-4">
        <div className="flex justify-end">
          <div className="w-30">
            <Button
              color="green"
              type="button"
              onClick={() => setOrderToEdit(null)}
            >
              Close
            </Button>
          </div>
        </div>

        <h1 className="text-center text-3xl text-primary-100 font-semibold mt-5 underline">
          Memo Info
        </h1>

        <div className="flex justify-between gap-5">
          <Input
            label="Memo No."
            id="id"
            type="number"
            register={register}
            disabled={true}
          />

          <Input label="LR No." id="lr_no" type="number" register={register} />

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

        <Input
          label="Party Name"
          id="full_name"
          type="text"
          register={register}
          disabled={true}
        />

        <div className="flex justify-between gap-30">
          <Input label="Length" id="length" type="text" register={register} />
          <Input label="Width" id="width" type="text" register={register} />
          <Input label="Height" id="height" type="text" register={register} />
        </div>

        <div className="flex justify-between gap-30">
          <Input
            label="Party Weight"
            id="party_weight"
            type="text"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.party_weight?.message}
          />

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
        </div>

        <div className="flex gap-5">
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
          value={partyFreightCharges}
          disabled={true}
        />

        <h1 className="text-center text-3xl text-primary-100 font-semibold mt-10 underline">
          Challan Info
        </h1>

        <div className="flex justify-between w-full gap-70">
          <Input
            label="Lorry No."
            id="lorry_no"
            type="text"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.lorry_no?.message}
          />

          <Input
            label="Owner Name"
            id="owner_name"
            type="text"
            register={register}
            disabled={true}
          />
        </div>

        <div className="flex justify-between gap-20">
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

        <div className="flex justify-between gap-70">
          <Input label="Size" id="size" type="number" register={register} />
          <Input
            label="Lorry Weight"
            id="lorry_weight"
            type="text"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.lorry_weight?.message}
          />
        </div>

        <div className="flex justify-between gap-70">
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
          value={lorryFreightCharges}
          disabled={true}
        />

        <Input label="Remarks" id="remarks" type="text" register={register} />

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? <SpinnerMini /> : 'Update Order'}
        </Button>
      </div>
    </form>
  );
}

export default Form;
