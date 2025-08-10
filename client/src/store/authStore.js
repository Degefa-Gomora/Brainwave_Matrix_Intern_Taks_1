import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (userData, userToken) => set({ user: userData, token: userToken }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage", 
    }
  )
);

export default useAuthStore;
