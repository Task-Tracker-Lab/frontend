import { createStore } from 'shared/lib/store';
import { persist } from 'zustand/middleware';

type TeamState = {
  teamId: string | null;
  setTeamId: (teamId: string | null) => void;
  clearTeamId: () => void;
};

export const useTeamStore = createStore<TeamState>(
  (set) => ({
    teamId: null,
    setTeamId: (teamId) =>
      set((state) => {
        state.teamId = teamId;
      }),
    clearTeamId: () =>
      set((state) => {
        state.teamId = null;
      }),
  }),
  [
    (inner) =>
      persist(inner, {
        name: 'team',
      }),
  ]
);
