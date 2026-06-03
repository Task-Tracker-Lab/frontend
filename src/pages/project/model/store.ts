import { create } from 'zustand';

interface BordStore {
  activeBoardId: string | null;
  activeColumnId: string | null;
  projectId: string | null;
  setProjectId: (id: string) => void;
  clearProjectId: () => void;
  setBoardId: (id: string | null) => void;
  setColumnId: (id: string | null) => void;
}

export const useBoardStore = create<BordStore>((set) => ({
  activeBoardId: null,
  activeColumnId: null,
  projectId: null,
  setProjectId(id) {
    set({ projectId: id });
  },
  clearProjectId() {
    set({ projectId: null });
  },
  setBoardId(id) {
    set({ activeBoardId: id });
  },
  setColumnId(id) {
    set({ activeColumnId: id });
  },
}));
