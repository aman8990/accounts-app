'use client';

import Button from '@/app/_components/Button';
import Form from './Form';
import { useEffect, useMemo, useState } from 'react';
import PageTitle from '@/app/_components/PageTitle';
import { usePartyMasterStore } from '@/app/_store/partyMasterStore';
import SpinnerMini from '@/app/_components/SpinnerMini';
import Spinner from '@/app/_components/Spinner';
import { getPartyMaster } from '@/app/_actions/getPartyMasters';
import toast from 'react-hot-toast';

function PartyMasters() {
  const [id, setId] = useState(null);
  const [currentMaster, setCurrentMaster] = useState(null);
  const [search, setSearch] = useState('');

  const title =
    currentMaster === null ? 'Create Party Master' : 'Update Party Master';

  const partyMasters = usePartyMasterStore((state) => state.partyMasters);
  const loading = usePartyMasterStore((state) => state.loading);

  useEffect(() => {
    if (id === null) return;

    const loadPartyMaster = async () => {
      const master = await getPartyMaster(id);

      if (master?.error) {
        toast.dismiss();
        toast.error('Error in finding Master');
        setId(null);
        return;
      }

      setCurrentMaster(master);
      setId(null);
    };

    loadPartyMaster();
  }, [id]);

  const displayedMasters = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    if (!searchTerm) {
      return partyMasters?.slice(0, 10) || [];
    }

    return (
      partyMasters?.filter((master) =>
        master.full_name?.toLowerCase().includes(searchTerm),
      ) || []
    );
  }, [partyMasters, search]);

  return (
    <>
      <PageTitle title={title} />
      <div className="space-y-10 mb-16">
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
              placeholder="Search by Party Name..."
              className="w-xl rounded-lg border-2 border-primary-100 px-4 py-3 outline-none focus:border-accent-500 text-primary-100 text-xl font-semibold placeholder:text-primary-100"
            />
          </div>

          {loading ? (
            <Spinner size={60} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-2 text-accent-500 border-accent-500">
                    <th className="p-3 text-center">ID</th>
                    <th className="p-3 text-center">Full Name</th>
                    <th className="p-3 text-center w-60">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {displayedMasters.length > 0 ? (
                    displayedMasters?.map((master) => (
                      <tr
                        key={master.id}
                        className="border-b-2 border-r-2 border-l-2 border-primary-100 text-primary-100 font-semibold text-lg"
                      >
                        <td className="p-3 text-center">{master.id}</td>
                        <td className="p-3 text-center">{master.full_name}</td>

                        <td className="p-3">
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
                        No Party Master Found
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

export default PartyMasters;
