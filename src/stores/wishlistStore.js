import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useWishlistStore = create(
  persist(
    (set) => ({
      moviesId: [],
      addLoading: false,
      fetchLoading: false,
      error: null,

      addToWishlist: async (movieId) => {
        set({ addLoading: true });
        try {
          await axiosInstance.post("/wishlist", { movieId });
          set((state) => ({
            moviesId: [...state.moviesId, movieId],
          }));
          toast.success("Movie added to wishlist");
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || "Failed to add");
        } finally {
          set({ addLoading: false });
        }
      },

      fetchWishlist: async () => {
        set({ fetchLoading: true });
        try {
          const response = await axiosInstance.get("/wishlist");
          set({ moviesId: response.data[0].movies || [] });
        } catch (error) {
          console.log(error);
          set({ error: error.response?.data?.message || "Failed to fetch" });
        } finally {
          set({ fetchLoading: false });
        }
      },

      deletMovieFromWishlist: async (id) => {
        try {
          const response = await axiosInstance.delete(`/wishlist/${id}`);
          set((state) => ({
            moviesId: state.moviesId.filter((movieId) => movieId !== id),
          }));
          toast.success(response.data.message || "Movie removed from wishlist");
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || "Failed to delete");
        }
      },
    }),
    {
      name: "wishlist-storage", // Ключ в localStorage
      getStorage: () => localStorage, // Можно заменить на sessionStorage
      partialize: (state) => ({ moviesId: state.moviesId }), // Сохраняем только moviesId
    }
  )
);
