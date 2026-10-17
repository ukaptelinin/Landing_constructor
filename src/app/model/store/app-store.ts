import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface IAppState {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isLogin: boolean;
}

interface IAppActions {
  openLogin: () => void;
  openRegister: () => void;
  closeAll: () => void;
  setIsLogin: (value: boolean) => void;
  reset: () => void;
}

export const defaultInitAppState: IAppState = {
  isLoginOpen: false,
  isRegisterOpen: false,
  isLogin: false,
};

export type AppStore = IAppState & IAppActions;

export const useAppStore = create<AppStore>()((set) => ({
  ...defaultInitAppState,
  openLogin: () => set({ isLoginOpen: true, isRegisterOpen: false }),
  openRegister: () => set({ isLoginOpen: false, isRegisterOpen: true }),
  closeAll: () => set({ isLoginOpen: false, isRegisterOpen: false }),
  setIsLogin: (value) => set({ isLogin: value }),
  reset: () => set(defaultInitAppState),
}));

export const useIsLoginOpen = () => useAppStore((state) => state.isLoginOpen);
export const useIsRegisterOpen = () =>
  useAppStore((state) => state.isRegisterOpen);
export const useIsLogin = () => useAppStore((state) => state.isLogin);

export const useAppActions = () =>
  useAppStore(
    useShallow((state) => ({
      openLogin: state.openLogin,
      openRegister: state.openRegister,
      closeAll: state.closeAll,
      setIsLogin: state.setIsLogin,
      reset: state.reset,
    })),
  );
