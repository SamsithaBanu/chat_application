import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "light",
  setTheme: (newTheme) => {
    localStorage.setItem("theme", newTheme); // ✅ Store theme
    set({ theme: newTheme });
  },
}));
