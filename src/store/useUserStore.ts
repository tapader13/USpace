import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
type User = {
  id: string;
  username: string;
  email: string;
  password?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
      }),
      { name: 'userStore' }
    )
  )
);
export default useUserStore;
