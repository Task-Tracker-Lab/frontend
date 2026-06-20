import { createStore } from 'shared/lib/store';

type ProjectState = {
  projectSlug: string | null;
  setProjectSlug: (projectSlug: string | null) => void;
  clearProjectSlug: () => void;
};

export const useProjectStore = createStore<ProjectState>((set) => ({
  projectSlug: null,
  setProjectSlug: (projectSlug) =>
    set((state) => {
      state.projectSlug = projectSlug;
    }),
  clearProjectSlug: () =>
    set((state) => {
      state.projectSlug = null;
    }),
}));
