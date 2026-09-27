"use client";

import { UserPlusIcon } from "@heroicons/react/24/outline";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import { Dropdown } from "@heroui/react";
import { FC } from "react";

interface LoginMenuProps {
  setIsLoginOpen: (isOpen: boolean) => void;
  setIsRegisterOpen: (isOpen: boolean) => void;
}

export const LoginMenu: FC<LoginMenuProps> = ({
  setIsLoginOpen,
  setIsRegisterOpen,
}) => {
  return (
    <Dropdown.Popover>
      <Dropdown.Menu>
        <Dropdown.Item
          id="login"
          textValue="Войти"
          onAction={() => setIsLoginOpen(true)}
        >
          <UserIcon className="h-4 w-4" />
          Войти
        </Dropdown.Item>
        <Dropdown.Item
          id="register"
          textValue="Зарегистрироваться"
          variant="danger"
          onAction={() => setIsRegisterOpen(true)}
        >
          <UserPlusIcon className="h-4 w-4" />
          Зарегистрироваться
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  );
};
