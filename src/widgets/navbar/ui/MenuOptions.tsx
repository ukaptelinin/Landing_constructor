"use client";

import { FC } from "react";
import Link from "next/link";

interface MenuItem {
  label: string;
  href: string;
}

interface MenuOptionsProps {
  menuItems: MenuItem[];
}

export const MenuOptions: FC<MenuOptionsProps> = ({ menuItems }) => {
  return (
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
  );
};
