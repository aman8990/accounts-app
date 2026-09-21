'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import toast from 'react-hot-toast';
import SpinnerMini from '@/app/_components/SpinnerMini';
import { login } from '@/app/_actions/login';
import { useRouter } from 'next/navigation';

function AuthForm() {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoggingIn(true);

    const result = await login(data);

    if (result?.error) {
      toast.error(`❌ ${result.error}`);
    } else {
      toast.dismiss();
      toast.success('Logged In');
      router.push('/');
    }

    setIsLoggingIn(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
      <div className="space-y-4 w-xl border-4 border-primary-100 rounded-2xl p-5">
        <Input
          label="Email address"
          id="email"
          type="email"
          errors={errors}
          register={register}
          disabled={isLoggingIn}
          rules={{
            required: 'Required',
          }}
          error={errors?.password?.message}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          errors={errors}
          register={register}
          disabled={isLoggingIn}
          rules={{
            required: 'Required',
          }}
          error={errors?.password?.message}
        />

        <div>
          <Button disabled={isLoggingIn} type="submit">
            {isLoggingIn ? <SpinnerMini /> : 'Sign In'}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AuthForm;
