import { getPayments } from '@/app/_actions/getPayments';
import PageTitle from '@/app/_components/PageTitle';
import Payments from './_components/Payment';

async function page() {
  const payments = await getPayments(2);

  return (
    <div>
      <PageTitle title="Lorry Previous Payments" />

      <div className="p-4">
        <Payments payments={payments} />
      </div>
    </div>
  );
}

export default page;
