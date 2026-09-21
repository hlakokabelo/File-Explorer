import { create } from "zustand";

export const useFileStore = create((set) => ({
  filePath: "",
  fileModules: [],
  imageModules: [],
  setFilePath: (newPath: string) => set({ filePath: newPath }),
  setFileModules: (newModules: Record<string, () => Promise<string>>) =>
    set({ fileModules: newModules }),
  setImageModules: (newModules: Record<string, () => Promise<string>>) =>
    set({ imageModules: newModules }),
}));
