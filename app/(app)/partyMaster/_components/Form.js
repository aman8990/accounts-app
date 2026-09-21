'use client';

import Input from '@/app/_components/Input';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/app/_components/Button';
import SpinnerMini from '@/app/_components/SpinnerMini';
import {
  createPartyMaster,
  updatePartyMaster,
} from '@/app/_actions/createPartyMaster';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { usePartyMasterStore } from '@/app/_store/partyMasterStore';

function Form({ currentMaster, setCurrentMaster }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addParty = usePartyMasterStore((state) => state.addParty);
  const updateParty = usePartyMasterStore((state) => state.updateParty);

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
        full_name: currentMaster.full_name,
        mobile: currentMaster.mobile,
        address: currentMaster.address,
        city: currentMaster.city,
        bank_name: currentMaster.bank_name,
        bank_ac: currentMaster.bank_ac,
        pan: currentMaster.pan,
        gst: currentMaster.gst,
      });

      toast.dismiss();
      toast.success('Added to Form');
    } else {
      reset({
        id: '',
        full_name: '',
        mobile: '',
        address: '',
        city: '',
        bank_name: '',
        bank_ac: '',
        pan: '',
        gst: '',
      });
    }
  }, [currentMaster, reset]);

  const onSubmit = async (partyData) => {
    setIsSubmitting(true);

    try {
      const cleanedData = {
        ...partyData,
        bank_ac: partyData.bank_ac === '' ? null : partyData.bank_ac,
      };

      let result;

      if (currentMaster === null) {
        result = await createPartyMaster(cleanedData);

        if (!result?.error && result?.partyMaster) {
          addParty(result.partyMaster);
        }
      } else {
        result = await updatePartyMaster({
          id: currentMaster.id,
          ...cleanedData,
        });

        if (!result?.error && result?.partyMaster) {
          updateParty(result.partyMaster);
        }
      }

      if (result?.error) {
        toast.error(`${result.error}`);
        return;
      }

      toast.dismiss();

      toast.success(
        currentMaster === null
          ? 'Party Master Created'
          : 'Party Master Updated',
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

        <Input
          label="Name"
          id="full_name"
          type="text"
          register={register}
          rules={{
            required: 'Required',
          }}
          error={errors.full_name?.message}
        />

        <div className="flex gap-10">
          <Input
            label="Mobile"
            id="mobile"
            type="number"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.mobile?.message}
          />
          <Input
            label="City"
            id="city"
            type="text"
            register={register}
            rules={{
              required: 'Required',
            }}
            error={errors.city?.message}
          />
        </div>

        <Input
          label="Address"
          id="address"
          type="text"
          register={register}
          rules={{
            required: 'Required',
          }}
          error={errors.address?.message}
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
