import { create } from "zustand";

type UiState = {
  globalLoading: boolean;
  setGlobalLoading: (v: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  globalLoading: false,
  setGlobalLoading: (v) => set({ globalLoading: v }),
}));
