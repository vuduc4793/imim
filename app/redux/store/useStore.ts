import {create} from 'zustand';
export const useStore = create(set => ({
  fontSize: 14,
  setFontSize: () => set((state: number) => ({fontSize: state})),
}));
