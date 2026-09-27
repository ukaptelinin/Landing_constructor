"use client";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Dropdown } from "@heroui/react";
import { FC } from "react";

interface LoginOutProps {
  setIsLogin: (isLogin: boolean) => void;
}

export const LogOut: FC<LoginOutProps> = ({ setIsLogin }) => {
  return (
    <Dropdown.Popover>
      <Dropdown.Menu>
        <Dropdown.Item
          id="logout"
          textValue="Выйти"
          variant="danger"
          onAction={() => setIsLogin(false)}
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4" />
          Выйти
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  );
};
