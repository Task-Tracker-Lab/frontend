import { type TProject } from 'entities/project/';
import { type TTeam } from 'entities/team/';
import { createStore } from 'shared/lib/store';

export type AbilityState = {
  userId: string | null;
  projectRole: TProject.ProjectMemberRole | null;
  teamRole: TTeam.TeamRole | null;
};

export type AbilityActions = {
  setAbility: (data: AbilityState) => void;
  clearAbility: () => void;
};

export type UseAbilityStore = AbilityState & AbilityActions;

const initialState: AbilityState = {
  userId: null,
  projectRole: null,
  teamRole: null,
};

export const useAbilityStore = createStore<UseAbilityStore>((set) => ({
  ...initialState,
  setAbility: (data) => set(data),
  clearAbility: () => set(initialState),
}));
