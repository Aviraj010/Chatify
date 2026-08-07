import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");

      set({
        authUser: response.data,
        isCheckingAuth: false,
      });
    } catch (error) {
      console.log(error);

      set({
        authUser: null,
        isCheckingAuth: false,
      });
    }
  },
  signUp: async (data) => {

    //signup logic
  }
}));


export default useAuthStore;