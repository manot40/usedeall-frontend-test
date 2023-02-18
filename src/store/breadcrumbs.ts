import { create } from 'zustand';

type BreadcrumbsState = {
  push: (breadcrumb: string) => void;
  breadcrumbs: string[];
  setBreadcrumbs: (breadcrumbs: string[]) => void;
};

export const useBreadcrumbsStore = create<BreadcrumbsState>()((set) => ({
  push: (breadcrumb: string) => set((state) => ({ breadcrumbs: [...state.breadcrumbs, breadcrumb] })),
  breadcrumbs: [],
  setBreadcrumbs: (breadcrumbs: string[]) => set({ breadcrumbs }),
}));
