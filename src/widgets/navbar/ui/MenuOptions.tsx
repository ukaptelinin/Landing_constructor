"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  label: string;
  href: string;
}

interface MenuOptionsProps {
  menuItems: MenuItem[];
}

export const MenuOptions: FC<MenuOptionsProps> = ({ menuItems }) => {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-6 md:flex md:mr-auto md:ml-8">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={[
                "text-sm transition-colors",
                "hover:text-yellow-500", // ← жёлтый при наведении
                isActive
                  ? "text-default-900 font-semibold border-b-2 border-current pb-1"
                  : "text-default-600 border-b-2 border-transparent pb-1",
                // ← неактивный: прозрачная граница для ровной высоты
              ].join(" ")}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
