"use client";

import { useAppActions } from "@/app/model/store/app-store";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import { Dropdown } from "@heroui/react";
import { FC } from "react";

export const LoginMenu: FC = () => {
  const { setIsLoginOpen, setIsRegisterOpen } = useAppActions();
  return (
    <Dropdown.Popover>
      <Dropdown.Menu>
        <Dropdown.Item
          id="login"
          textValue="Войти"
          onAction={() => setIsLoginOpen()}
        >
          <UserIcon className="h-4 w-4" />
          Войти
        </Dropdown.Item>
        <Dropdown.Item
          id="register"
          textValue="Зарегистрироваться"
          variant="danger"
          onAction={() => setIsRegisterOpen()}
        >
          <UserPlusIcon className="h-4 w-4" />
          Зарегистрироваться
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  );
};
