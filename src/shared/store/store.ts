import { create } from 'zustand/react';
import { ICatItem } from '../../modules/CatList/types.ts';
import { persist } from 'zustand/middleware';

interface IBreedStore {
  breed: string;
  setBreed: (breed: string) => void;
}

interface IFavCats<T> {
  cats: T[];
  isFavoriteActive: boolean;
  setFavoriteActive: (isFavoriteActive: boolean) => void;
  toggleFavorite: (cat: T) => void;
  isLiked: (id: string) => boolean;
}

export const useBreedStore = create<IBreedStore>((set) => ({
  breed: '',
  setBreed: (breed) => set({ breed: breed }),
}));

export const useFavCats = create<IFavCats<ICatItem>>()(
  persist(
    (set, get) => ({
      cats: [],
      isFavoriteActive: false,
      setFavoriteActive: (value: boolean) => set({ isFavoriteActive: value }),
      toggleFavorite: (cat) =>
        set((state) => {
          const isLiked = state.cats.some((item) => item.imgId === cat.imgId);
          return {
            cats: isLiked
              ? state.cats.filter((item) => cat.imgId !== item.imgId)
              : [...state.cats, cat],
          };
        }),
      isLiked: (id) => get().cats.some((cat) => cat.imgId === id),
    }),
    {
      name: 'fav-cats-storage',
    },
  ),
);
