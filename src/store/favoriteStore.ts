
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CryptoId } from "../types/crypto";

interface FavoriteState {
  favoriteIds: CryptoId[];
  toggleFavorite: (id: CryptoId) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set) => ({
      favoriteIds: [],

      toggleFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
            : [...state.favoriteIds, id],
        })),
    }),
    {
      name: "pulso-abierto-favorites",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
