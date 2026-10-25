"use client";
import { useAppActions } from "@/app/model/store/app-store";
import { signOut } from "next-auth/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Dropdown } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

export const LogOut: FC = () => {
  const router = useRouter();
  const { closeAll } = useAppActions();
  const handleLogout = async () => {
    closeAll();
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
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
