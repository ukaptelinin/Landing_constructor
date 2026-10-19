"use client";
import { useAppActions } from "@/app/model/store/app-store";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Dropdown } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

// ← возврат на лендинг

export const LogOut: FC = () => {
  const router = useRouter();
  const { setIsLogin, closeAll } = useAppActions();
  const handleLogout = () => {
    setIsLogin(false);
    closeAll();

    router.push("/");
  };

  return (
    <Dropdown.Popover>
      <Dropdown.Menu>
        <Dropdown.Item
          id="logout"
          textValue="Выйти"
          variant="danger"
          onAction={handleLogout}
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4" />
          Выйти
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Popover>
  );
};
