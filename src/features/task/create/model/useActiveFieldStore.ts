import { create } from 'zustand';

interface ActiveFieldStore {
  activeId: string | null;
  open: (id: string) => void;
  close: () => void;
}

export const useActiveFieldStore = create<ActiveFieldStore>((set) => ({
  activeId: null,
  open: (id) => set({ activeId: id }),
  close: () => set({ activeId: null }),
}));
