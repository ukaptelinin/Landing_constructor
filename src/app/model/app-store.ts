import { create } from "zustand";

interface IAppState {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isLogin: boolean;
  setIsLoginOpen: () => void;
  setIsRegisterOpen: () => void;
  setIsLogin: () => void;
}

const useAppStore = create<IAppState>()((set) => ({
  isLoginOpen: false,
  isRegisterOpen: false,
  isLogin: false,
  setIsLoginOpen: () => set((state) => ({ isLoginOpen: !state.isLoginOpen })),
  setIsRegisterOpen: () =>
    set((state) => ({ isRegisterOpen: !state.isRegisterOpen })),
  setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
}));
