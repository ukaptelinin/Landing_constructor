"use client";

import { FC } from "react";
import Link from "next/link";
import { Avatar, Button, Dropdown } from "@heroui/react";
import { ThemeSwitch } from "@/features/theme-switch"; // Ваш существующий ThemeSwitch
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export const Navbar: FC = () => {
  // Пример пунктов меню
  const menuItems = [
    { label: "Главная", href: "/" },
    { label: "Новый проект", href: "/newproject" },
    { label: "Мои проекты", href: "/myprogects" },
  ];

  return (
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
        <ul className="hidden items-center gap-6 md:flex md:mr-auto md:ml-8">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-default-600 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Справа: ThemeSwitch и кнопка с аватаром */}
        <div className="flex items-center gap-3">
          <ThemeSwitch />

          {/* Кнопка с аватаром и выпадающим меню для входа/выхода */}
          <Dropdown>
            <Dropdown.Trigger>
              <Button
                isIconOnly
                variant="tertiary"
                aria-label="Профиль пользователя"
                className="rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <Avatar.Fallback>
                    <UserIcon className="h-5 w-5" />
                  </Avatar.Fallback>
                </Avatar>
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu>
                <Dropdown.Item id="login" textValue="Войти">
                  <UserIcon className="h-4 w-4" />
                  Войти
                </Dropdown.Item>
                <Dropdown.Item id="logout" textValue="Выйти" variant="danger">
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  Выйти
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};
