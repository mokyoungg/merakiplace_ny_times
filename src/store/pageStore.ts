import { create } from 'zustand';

type PageType = 'HOME' | 'SCRAP';

type PageStore = {
  page: PageType;
  setPage: (page: PageType) => void;
  hasHeader: boolean;
  setHeader: (view: boolean) => void;
};

export const usePageStore = create<PageStore>((set) => ({
  page: 'SCRAP',
  setPage: (page) => set({ page: page }),
  hasHeader: true,
  setHeader: (view) => set({ hasHeader: view }),
}));
