'use client';

import { useRouter } from 'next/navigation';
import { MdOutlineAutoAwesomeMosaic } from 'react-icons/md';

function PendingChallans({ noOfChallans }) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/challan');
  };

  return (
    <div
      className="relative inline-flex h-full w-full cursor-pointer rounded-2xl border-2 border-primary-100 p-4 transition-all duration-300 ease-out hover:bg-accent-600  hover:text-accent-200 items-center justify-center"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <MdOutlineAutoAwesomeMosaic className="text-primary-100" size={60} />

        <h1 className="text-xl font-semibold text-primary-100">
          Pending Challans
        </h1>
      </div>

      {noOfChallans > 0 && (
        <span className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 px-1 text-2xl font-bold text-white">
          {noOfChallans}
        </span>
      )}
    </div>
  );
}

export default PendingChallans;
