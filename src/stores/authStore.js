import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  chekingAuthLoading: false,

  loginLoading: false,
  loginMessage: null,

  signupLoading: false,
  signupMessage: null,

  signup: async (fullName, email, password) => {
    set({ signupLoading: true });
    try {
      const response = await axiosInstance.post("/auth/signup", { fullName, email, password });
      set({ user: response.data.user });
      set({ signupMessage: response.data.message });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      set({ signupMessage: error.response.data.message });
    } finally {
      set({ signupLoading: false });
    }
  },

  login: async (email, password) => {
    set({ loginLoading: true });
    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      set({ user: response.data.user });
      set({ loginMessage: response.data.message });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      set({ loginMessage: error.response.data.message });
    } finally {
      set({ loginLoading: false });
    }
  },

  logout: async () => {
    set({ logoutLoading: true });
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ logoutLoading: false });
    }
  },

  getMe: async () => {
    set({ chekingAuthLoading: true });
    try {
      const response = await axiosInstance.get("/auth/me");
      set({ user: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ chekingAuthLoading: false });
    }
  },
}));
