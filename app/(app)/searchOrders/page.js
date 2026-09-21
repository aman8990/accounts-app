import PageTitle from '@/app/_components/PageTitle';
import Search from './_components/Search';

function page() {
  return (
    <div>
      <PageTitle title="Pending Orders" />
      <Search />
    </div>
  );
}

export default page;
