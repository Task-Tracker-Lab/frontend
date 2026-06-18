import { create } from 'zustand';

interface ProjectStore {
  projectSlug: string | null;
  setProjectSlug: (id: string) => void;
  clearProjectSlug: () => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projectSlug: null,
  setProjectSlug(id) {
    set({ projectSlug: id });
  },
  clearProjectSlug() {
    set({ projectSlug: null });
  },
}));
