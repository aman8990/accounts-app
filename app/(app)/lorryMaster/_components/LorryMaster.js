// 'use client';

// import Button from '@/app/_components/Button';
// import Form from './Form';
// import { useState } from 'react';
// import PageTitle from '@/app/_components/PageTitle';
// import { useLorryMasterStore } from '@/app/_store/lorryMasterStore';

// function LorryMasters() {
//   const [currentMaster, setCurrentMaster] = useState(null);

//   const lorryMasters = useLorryMasterStore((state) => state.lorryMasters);

//   const title =
//     currentMaster === null ? 'Create Lorry Master' : 'Update Lorry Master';

//   return (
//     <>
//       <PageTitle title={title} />
//       <div className="space-y-10 mb-16">
//         <Form
//           currentMaster={currentMaster}
//           setCurrentMaster={setCurrentMaster}
//         />

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-2 text-accent-500 border-accent-500">
//                 <th className="p-3 text-left">ID</th>
//                 <th className="p-3 text-left">Owner Name</th>
//                 <th className="p-3 text-left">Address</th>
//                 <th className="p-3 text-left">Mobile</th>
//               </tr>
//             </thead>

//             <tbody>
//               {lorryMasters?.map((master) => (
//                 <tr
//                   key={master.id}
//                   className="border-b-2 border-r-2 border-l-2 border-primary-100 text-primary-100 font-semibold text-lg"
//                 >
//                   <td className="p-3">{master.id}</td>
//                   <td className="p-3 max-w-50">{master.owner_name}</td>
//                   <td className="p-3">{master.owner_address}</td>
//                   <td className="p-3">{master.owner_mobile}</td>

//                   <td className="p-3">
//                     <Button
//                       type="button"
//                       onClick={() => setCurrentMaster(master)}
//                     >
//                       Edit
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LorryMasters;

'use client';

import Button from '@/app/_components/Button';
import Form from './Form';
import { useEffect, useMemo, useState } from 'react';
import PageTitle from '@/app/_components/PageTitle';
import { useLorryMasterStore } from '@/app/_store/lorryMasterStore';
import Spinner from '@/app/_components/Spinner';
import { getLorryMaster } from '@/app/_actions/getLorryMasters';
import SpinnerMini from '@/app/_components/SpinnerMini';
import toast from 'react-hot-toast';

function LorryMasters() {
  const [id, setId] = useState(null);
  const [currentMaster, setCurrentMaster] = useState(null);
  const [search, setSearch] = useState('');

  const lorryMasters = useLorryMasterStore((state) => state.lorryMasters);
  const loading = useLorryMasterStore((state) => state.loading);

  const title =
    currentMaster === null ? 'Create Lorry Master' : 'Update Lorry Master';

  useEffect(() => {
    if (id === null) return;

    const loadLorryMaster = async () => {
      const master = await getLorryMaster(id);

      if (master?.error) {
        toast.dismiss();
        toast.error('Error in finding Master');
        setId(null);
        return;
      }

      toast.dismiss();
      toast.success('Added to Form');
      setCurrentMaster(master);
      setId(null);
    };

    loadLorryMaster();
  }, [id]);

  const displayedMasters = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    if (!searchTerm) {
      return lorryMasters?.slice(0, 10) || [];
    }

    return (
      lorryMasters?.filter((master) =>
        master.owner_name?.toLowerCase().includes(searchTerm),
      ) || []
    );
  }, [lorryMasters, search]);

  return (
    <>
      <PageTitle title={title} />

      <div className="mb-16 space-y-15">
        <Form
          currentMaster={currentMaster}
          setCurrentMaster={setCurrentMaster}
        />

        <div>
          <div className="flex justify-center mb-5">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Owner Name..."
              className="w-xl rounded-lg border-2 border-primary-100 px-4 py-3 outline-none focus:border-accent-500 text-primary-100 text-xl font-semibold placeholder:text-primary-100"
            />
          </div>

          {loading ? (
            <Spinner size={60} />
          ) : (
            <div className="overflow-x-auto px-4">
              <table className="w-full">
                <thead>
                  <tr className="border-2 border-accent-500 text-accent-500">
                    <th className="p-3 text-center">ID</th>
                    <th className="p-3 text-center">Owner Name</th>
                    <th className="p-3 text-center w-60">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {displayedMasters.length > 0 ? (
                    displayedMasters.map((master) => (
                      <tr
                        key={master.id}
                        className="border-b-2 border-l-2 border-r-2 border-primary-100 text-lg font-semibold text-primary-100"
                      >
                        <td className="p-3 text-center">{master.id}</td>

                        <td className="p-3 text-center">{master.owner_name}</td>

                        <td className="p-3 text-center">
                          <Button
                            type="button"
                            onClick={() => setId(master.id)}
                            disabled={id === master.id}
                          >
                            {id === master.id ? <SpinnerMini /> : 'Edit'}
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-5 text-center text-primary-100 font-semibold text-xl"
                      >
                        No Lorry Master Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LorryMasters;
