import { createStore } from 'shared/lib/store';
import { persist } from 'zustand/middleware';

type TeamState = {
  slug: string | null;
  setSlug: (slug: string | null) => void;
  clearSlug: () => void;
};

export const useTeamStore = createStore<TeamState>(
  (set) => ({
    slug: null,
    setSlug: (slug) =>
      set((state) => {
        state.slug = slug;
      }),
    clearSlug: () =>
      set((state) => {
        state.slug = null;
      }),
  }),
  [
    (inner) =>
      persist(inner, {
        name: 'team',
      }),
  ]
);
