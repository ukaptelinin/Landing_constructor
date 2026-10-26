"use client";
import { useAppActions } from "@/app/model/store/app-store";
import { signOut } from "next-auth/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
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
    <Button onPress={handleLogout} variant="primary">
      <span className="flex items-center gap-2">
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
        Выйти
      </span>
    </Button>
  );
};
