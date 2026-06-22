import { create } from 'zustand';

interface BoardStore {
  activeBoardId: string | null;
  activeBoardSlug: string | null;
  activeColumnId: string | null;
  setBoardId: (id: string, slug: string) => void;
  setColumnId: (id: string | null) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  activeBoardId: null,
  activeColumnId: null,
  activeBoardSlug: null,
  setBoardId(id, slug) {
    set({ activeBoardId: id, activeBoardSlug: slug });
  },
  setColumnId(id) {
    set({ activeColumnId: id });
  },
}));
