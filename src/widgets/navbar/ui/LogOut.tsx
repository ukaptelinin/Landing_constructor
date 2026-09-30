"use client";
import { useAppActions } from "@/app/model/store/app-store";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Dropdown } from "@heroui/react";
import { FC } from "react";

export const LogOut: FC = () => {
  const { setIsLogin } = useAppActions();
  return (
    <Dropdown.Popover>
      <Dropdown.Menu>
        <Dropdown.Item
          id="logout"
          textValue="Выйти"
          variant="danger"
          onAction={() => setIsLogin()}
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4" />
          Выйти
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  );
};
