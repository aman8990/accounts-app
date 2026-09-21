import { create } from 'zustand';
import { getPartyMasters } from '@/app/_actions/getPartyMasters';

export const usePartyMasterStore = create((set, get) => ({
  partyMasters: [],
  loading: false,
  initialized: false,
  error: null,

  loadPartyMasters: async () => {
    if (get().initialized) return;

    try {
      set({
        loading: true,
        error: null,
      });

      const partyMasters = await getPartyMasters();

      set({
        partyMasters,
        initialized: true,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  refreshPartyMasters: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const partyMasters = await getPartyMasters();

      set({
        partyMasters,
        initialized: true,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  addParty: (party) => {
    set((state) => ({
      partyMasters: [party, ...state.partyMasters],
    }));
  },

  updateParty: (updatedParty) => {
    set((state) => ({
      partyMasters: [
        updatedParty,
        ...state.partyMasters.filter((party) => party.id !== updatedParty.id),
      ],
    }));
  },

  clearPartyMasters: () => {
    set({
      partyMasters: [],
      initialized: false,
    });
  },
}));
