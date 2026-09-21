import { getPayments } from '@/app/_actions/getPayments';
import Payments from './_components/Payments';
import PageTitle from '@/app/_components/PageTitle';

async function page() {
  const payments = await getPayments(1);

  return (
    <div>
      <PageTitle title="Party Previous Payments" />
      <div className="p-4">
        <Payments payments={payments} />
      </div>
    </div>
  );
}

export default page;
