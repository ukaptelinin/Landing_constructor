"use client";

import { FC } from "react";
import Link from "next/link";
import { ThemeSwitch } from "@/features/theme-switch"; // Ваш существующий ThemeSwitch
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { MenuOptions } from "./MenuOptions";
import { useAppActions, useIsLogin } from "@/app/model/store/app-store";
import { useSession } from "next-auth/react";
import { UserAvatar } from "./UserAvatar";

export const Navbar: FC = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isLogin = status === "authenticated";
  const userEmail = session?.user?.email;
  const { openLogin, openRegister } = useAppActions();

  const menuItems = [
    { label: "Главная", href: "/main" },
    { label: "Новый проект", href: "/new_project" },
    { label: "Мои проекты", href: "/my_projects" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b">
        <div className="container mx-auto flex h-16 w-full items-center justify-between rounded-2xl border border-gray-200/60 bg-background/60 px-4 shadow-sm">
          <div className="flex items-center gap-2">
            <WrenchScrewdriverIcon className="h-8 w-8 text-primary" />
            <Link href="/" className="text-lg font-bold text-foreground">
              QUIZ CONSTRUCTOR
            </Link>
          </div>
          {!isLoading && isLogin ? <MenuOptions menuItems={menuItems} /> : null}
          <div className="flex items-center gap-3">
            {!isLoading && isLogin ? <UserAvatar /> : null}
            <ThemeSwitch />
          </div>
        </div>
      </nav>
    </>
  );
};
