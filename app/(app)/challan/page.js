import { getChallans } from '@/app/_actions/getChallans';
import Challans from './_components/Challans';

async function page() {
  const challans = await getChallans();

  return (
    <div>
      <div className="text-center">
        <h1 className="inline-block text-6xl text-primary-100 my-10 border-4 border-primary-100 rounded-2xl px-4 pt-3 pb-2">
          Create Challan
        </h1>
      </div>
      <Challans challans={challans} />
    </div>
  );
}

export default page;
