import { UserIcon } from "@heroicons/react/24/outline";
import { Avatar, Dropdown } from "@heroui/react";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { LogOut } from "./LogOut";

export const UserAvatar: FC = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  return (
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
          {userEmail && (
            <span className="text-sm text-default-600 hidden md:inline px-3">
              {userEmail}
            </span>
          )}
          <LogOut />
        </div>
      </Dropdown.Trigger>
    </Dropdown>
  );
};
