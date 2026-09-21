import { redirect } from 'next/navigation';

import AuthForm from '@/app/_components/AuthForm';
import { getSession } from '@/app/_hooks/useSession';
import PageTitle from '@/app/_components/PageTitle';

async function Page() {
  const { user } = await getSession();

  if (user) {
    redirect('/');
  }

  return (
    <div>
      <PageTitle title="Sign In" />
      <AuthForm />
    </div>
  );
}

export default Page;
