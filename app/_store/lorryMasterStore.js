import { create } from 'zustand';
import { getLorryMasters } from '@/app/_actions/getLorryMasters';

export const useLorryMasterStore = create((set, get) => ({
  lorryMasters: [],
  loading: false,
  initialized: false,
  error: null,

  loadLorryMasters: async () => {
    if (get().initialized) return;

    try {
      set({
        loading: true,
        error: null,
      });

      const lorryMasters = await getLorryMasters();

      set({
        lorryMasters,
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

  refreshLorryMasters: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const lorryMasters = await getLorryMasters();

      set({
        lorryMasters,
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

  addLorry: (lorry) => {
    set((state) => ({
      lorryMasters: [lorry, ...state.lorryMasters],
    }));
  },

  updateLorry: (updatedLorry) => {
    set((state) => ({
      lorryMasters: [
        updatedLorry,
        ...state.lorryMasters.filter((lorry) => lorry.id !== updatedLorry.id),
      ],
    }));
  },

  clearLorryMasters: () => {
    set({
      lorryMasters: [],
      initialized: false,
    });
  },
}));
