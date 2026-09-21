import { getMemosByDate } from '@/app/_actions/getMemoById';
import Orders from './_components/Orders';
import PageTitle from '@/app/_components/PageTitle';

async function page() {
  const orders = await getMemosByDate();

  return (
    <div>
      <PageTitle title="All Orders" />
      <div className="p-4">
        <Orders orders={orders} />
      </div>
    </div>
  );
}

export default page;
