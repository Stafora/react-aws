import { create } from 'zustand';
import { UserInterface } from "@/modules/auth/interfaces/auth-base-interface";

export interface UserStoreInterface {
    user: UserInterface | null;
    setUser: (user: UserInterface | null) => void;
    clearUser: () => void;
}

const useUserStore = create<UserStoreInterface>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));

export default useUserStore;