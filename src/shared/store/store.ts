import { create } from 'zustand/react';

interface IBreedStore {
  breed: string;
  setBreed: (breed: string) => void;
}

export const useBreedStore = create<IBreedStore>((set) => ({
  breed: '',
  setBreed: (breed) => set({ breed: breed }),
}));
