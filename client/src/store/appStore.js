// src/store/appStore.js
import { create } from "zustand";

const useAppStore = create((set) => ({
  activeView: "dashboard", // Initial state: the full dashboard is visible
  setActiveView: (view) => set({ activeView: view }),
}));

export default useAppStore;
