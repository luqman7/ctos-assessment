import { create } from "zustand";
import axios, { AxiosResponse } from "axios";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserStore {
  user: User | null;
  fetchUser: (userId: number) => Promise<User | undefined>;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,

  fetchUser: async (userId: number) => {
    try {
      const response: AxiosResponse<{ data: User }> = await axios.get(
        `https://reqres.in/api/users/${userId}`
      );

      set((state) => ({ ...state, user: response.data.data }));
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },
}));

export default useUserStore;
