'use client';

import Input from '@/app/_components/Input';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/app/_components/Button';
import SpinnerMini from '@/app/_components/SpinnerMini';
import toast from 'react-hot-toast';
import {
  createLorryMaster,
  updateLorryMaster,
} from '@/app/_actions/createLorryMaster';
import { useRouter } from 'next/navigation';
import { useLorryMasterStore } from '@/app/_store/lorryMasterStore';

function Form({ currentMaster, setCurrentMaster }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addLorry = useLorryMasterStore((state) => state.addLorry);
  const updateLorry = useLorryMasterStore((state) => state.updateLorry);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currentMaster) {
      reset({
        id: currentMaster.id,
        owner_name: currentMaster.owner_name,
        owner_mobile: currentMaster.owner_mobile,
        owner_address: currentMaster.owner_address,
        bank_ac: currentMaster.bank_ac,
        bank_name: currentMaster.bank_name,
        pan: currentMaster.pan,
        gst: currentMaster.gst,
      });

      toast.dismiss();
      toast.success('Added to Form');
    } else {
      reset({
        id: '',
        owner_name: '',
        owner_mobile: '',
        owner_address: '',
        bank_ac: '',
        bank_name: '',
        gst: '',
        pan: '',
      });
    }
  }, [currentMaster, reset]);

  const onSubmit = async (lorryData) => {
    setIsSubmitting(true);

    try {
      const cleanedData = {
        ...lorryData,
        bank_ac: lorryData.bank_ac === '' ? null : lorryData.bank_ac,
        owner_number:
          lorryData.owner_number === '' ? null : lorryData.owner_number,
      };

      let result;

      if (currentMaster === null) {
        result = await createLorryMaster(cleanedData);

        if (!result?.error && result?.lorryMaster) {
          addLorry(result.lorryMaster);
        }
      } else {
        result = await updateLorryMaster(cleanedData);

        if (!result?.error && result?.lorryMaster) {
          updateLorry(result.lorryMaster);
        }
      }

      if (result?.error) {
        toast.error(`${result.error}`);
        return;
      }

      toast.dismiss();

      toast.success(
        currentMaster === null
          ? 'Lorry Master Created'
          : 'Lorry Master Updated',
      );

      setCurrentMaster(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
      <div className="w-4xl border-4 border-primary-200 rounded-2xl p-4">
        {currentMaster !== null && (
          <Input
            label="ID"
            id="id"
            type="text"
            register={register}
            disabled={true}
          />
        )}

        <div className="flex gap-10">
          <Input
            label="Owner Name"
            id="owner_name"
            type="text"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.owner_name?.message}
          />
          <Input
            label="Owner Mobile"
            id="owner_mobile"
            type="number"
            register={register}
          />
        </div>

        <Input
          label="Owner Address"
          id="owner_address"
          type="text"
          register={register}
        />

        <div className="flex gap-10">
          <Input
            label="Bank A/c"
            id="bank_ac"
            type="number"
            register={register}
          />
          <Input
            label="Bank Name"
            id="bank_name"
            type="text"
            register={register}
          />
        </div>

        <div className="flex gap-10">
          <Input label="PAN No." id="pan" type="text" register={register} />
          <Input label="GST No." id="gst" type="text" register={register} />
        </div>

        <div className="my-5 mx-3">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <SpinnerMini />
            ) : currentMaster === null ? (
              'Submit'
            ) : (
              'Update'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Form;
