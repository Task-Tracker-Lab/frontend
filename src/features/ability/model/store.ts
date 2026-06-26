import { type TProject } from 'entities/project/';
import { type TTeam } from 'entities/team/';
import { createStore } from 'shared/lib/store';

export type UseAbilityStates = {
  user: {
    userId: string | null;
    projectRole: TProject.ProjectMemberRole | null;
    teamRole: TTeam.TeamRole | null;
  } | null;
};

export type UserAbilityActions = {
  setUser: (user: UseAbilityStates['user']) => void;
  clearUser: () => void;
};

export type UseAbilityStore = UseAbilityStates & UserAbilityActions;

export const useAbilityStore = createStore<UseAbilityStore>((set, g) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
