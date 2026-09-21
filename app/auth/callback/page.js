'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/_libs/_supabase/client';
import Spinner from '@/app/_components/Spinner';
import toast from 'react-hot-toast';

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error || data === null) {
        console.error('Session not found or error:', error);
        return router.push('/login');
      } else {
        toast.dismiss();
        toast.success('Logged In');
        router.push('/');
        router.refresh();
      }
    }

    checkSession();
  }, [router, supabase]);

  return (
    <div className="text-center mt-10">
      <Spinner />
      <h1>Logging you in...</h1>
    </div>
  );
}
