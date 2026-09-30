import { create } from "zustand";
import { useShallow } from "zustand/shallow";

interface IAppState {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isLogin: boolean;
}

interface IAppActions {
  setIsLoginOpen: () => void;
  setIsRegisterOpen: () => void;
  setIsLogin: () => void;
}

export const defaultInitAppState: IAppState = {
  isLoginOpen: false,
  isRegisterOpen: false,
  isLogin: false,
};

export type AppStore = IAppState & IAppActions;

export const useAppStore = create<AppStore>()((set) => ({
  ...defaultInitAppState,
  setIsLoginOpen: () => set((state) => ({ isLoginOpen: !state.isLoginOpen })),
  setIsRegisterOpen: () =>
    set((state) => ({ isRegisterOpen: !state.isRegisterOpen })),
  setIsLogin: () => set((state) => ({ isLogin: !state.isLogin })),
}));
export const useIsLoginOpen = () => useAppStore((state) => state.isLoginOpen);
export const useIsRegisterOpen = () =>
  useAppStore((state) => state.isRegisterOpen);
export const useIsLogin = () => useAppStore((state) => state.isLogin);

export const useAppActions = () =>
  useAppStore(
    useShallow((state) => ({
      setIsLoginOpen: state.setIsLoginOpen,
      setIsRegisterOpen: state.setIsRegisterOpen,
      setIsLogin: state.setIsLogin,
    })),
  );
