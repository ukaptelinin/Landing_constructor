"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { Avatar, Dropdown } from "@heroui/react";
import { ThemeSwitch } from "@/features/theme-switch"; // Ваш существующий ThemeSwitch
import { UserIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { FormDialog } from "@/shared/ui/form-dialog/ui/FormDialog";
import { LoginMenu } from "./LoginMenu";
import { LogOut } from "./LogOut";
import { MenuOptions } from "./MenuOptions";
import { LoginForm } from "@/features/auth/login/ui/LoginForm";
import { RegisterForm } from "@/features/auth/register/ui/RegisterForm";

export const Navbar: FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  // Пример пунктов меню
  const menuItems = [
    { label: "Главная", href: "/" },
    { label: "Новый проект", href: "/newproject" },
    { label: "Мои проекты", href: "/myprogects" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b">
        {/* Скругленная рамка вокруг всего содержимого навбара */}
        <div className="container mx-auto flex h-16 w-full items-center justify-between rounded-2xl border border-gray-200/60 bg-background/60 px-4 shadow-sm">
          {/* Слева: Логотип с иконкой */}
          <div className="flex items-center gap-2">
            <WrenchScrewdriverIcon className="h-8 w-8 text-primary" />
            <Link href="/" className="text-lg font-bold text-foreground">
              QUIZ CONSTRUCTOR
            </Link>
          </div>

          {/* По центру: Меню из 4 элементов, сдвинутое немного влево */}
          {isLogin ? <MenuOptions menuItems={menuItems} /> : null}

          {/* Справа: ThemeSwitch и кнопка с аватаром */}
          <div className="flex items-center gap-3">
            <ThemeSwitch />

            {/* Кнопка с аватаром и выпадающим меню для входа/выхода */}
            <Dropdown>
              <Dropdown.Trigger>
                <div
                  className="flex items-center justify-center rounded-full p-1 hover:bg-default-100 transition-colors cursor-pointer"
                  aria-label="Профиль пользователя"
                >
                  <Avatar className="h-8 w-8">
                    <Avatar.Fallback>
                      <UserIcon className="h-5 w-5" />
                    </Avatar.Fallback>
                  </Avatar>
                </div>
              </Dropdown.Trigger>
              {isLogin ? (
                <LogOut setIsLogin={setIsLogin} />
              ) : (
                <LoginMenu
                  setIsLoginOpen={setIsLoginOpen}
                  setIsRegisterOpen={setIsRegisterOpen}
                />
              )}
            </Dropdown>
          </div>
        </div>
      </nav>
      <FormDialog
        titleDialog="Вход в аккаунт"
        isOpen={isLoginOpen}
        onOpenChange={setIsLoginOpen}
      >
        <LoginForm />
      </FormDialog>
      <FormDialog
        titleDialog="Регистрация"
        isOpen={isRegisterOpen}
        onOpenChange={setIsRegisterOpen}
      >
        <RegisterForm />
      </FormDialog>
    </>
  );
};
