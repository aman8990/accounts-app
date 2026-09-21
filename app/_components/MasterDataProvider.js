'use client';

import { useEffect } from 'react';

import { usePartyMasterStore } from '@/app/_store/partyMasterStore';
import { useLorryMasterStore } from '@/app/_store/lorryMasterStore';

function MasterDataProvider({ children }) {
  const loadPartyMasters = usePartyMasterStore(
    (state) => state.loadPartyMasters,
  );

  const loadLorryMasters = useLorryMasterStore(
    (state) => state.loadLorryMasters,
  );

  useEffect(() => {
    (loadLorryMasters(), loadPartyMasters());
  }, [loadPartyMasters, loadLorryMasters]);

  return children;
}

export default MasterDataProvider;
