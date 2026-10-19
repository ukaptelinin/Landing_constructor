"use client";

// ❌ УДАЛИТЬ: import { HeroUIProvider } from '@heroui/react';

import {
  useIsLoginOpen,
  useIsRegisterOpen,
  useAppActions,
} from "@/app/model/store/app-store";
import { LoginForm } from "@/features/auth/login/ui/LoginForm";
import { RegisterForm } from "@/features/auth/register/ui/RegisterForm";
import { FormDialog } from "@/shared/ui/form-dialog/ui/FormDialog";

export function Providers({ children }: { children: React.ReactNode }) {
  const isLoginOpen = useIsLoginOpen();
  const isRegisterOpen = useIsRegisterOpen();
  const { openLogin, openRegister, closeAll } = useAppActions();

  return (
    <>
      {children}

      <FormDialog
        title="Вход в аккаунт"
        isOpen={isLoginOpen}
        onOpenChange={(open) => (open ? openLogin() : closeAll())}
      >
        <LoginForm />
      </FormDialog>

      <FormDialog
        title="Регистрация"
        isOpen={isRegisterOpen}
        onOpenChange={(open) => (open ? openRegister() : closeAll())}
      >
        <RegisterForm />
      </FormDialog>
    </>
  );
}
