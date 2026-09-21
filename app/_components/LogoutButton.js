'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import SpinnerMini from '@/app/_components/SpinnerMini';
import { logout } from '@/app/_actions/login';

function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);

    const res = await logout();
    if (res?.error) {
      toast.dismiss();
      toast.error('Error in logout');
    } else {
      router.push('/');
    }

    setIsLoading(false);
  };

  return (
    <button
      className="bg-red-700 mt-5 text-xl text-white px-2 pb-2 pt-1 rounded-md"
      onClick={handleLogout}
    >
      {isLoading ? (
        <div className="flex gap-2 items-center">
          <h1>Logout</h1> <SpinnerMini size={15} />
        </div>
      ) : (
        'Logout'
      )}
    </button>
  );
}

export default LogoutButton;
