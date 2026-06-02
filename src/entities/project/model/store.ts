import { create } from 'zustand';

interface ProjectStore {
  projectId: string | null;
  setProjectId: (id: string) => void;
  clearProjectId: () => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projectId: null,
  setProjectId(id) {
    set({ projectId: id });
  },
  clearProjectId() {
    set({ projectId: null });
  },
}));
