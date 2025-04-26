import { create } from 'zustand';

interface UserState {
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  avatarUrl: '/default/default-avatar.svg',
  setAvatarUrl: (url) => set({ avatarUrl: url }),
}));
