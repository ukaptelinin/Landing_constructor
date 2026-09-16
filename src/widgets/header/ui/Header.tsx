// src/widgets/header/ui/Header.tsx
"use client";

import { FC } from "react";
import { Navbar } from "@/widgets/navbar";

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <Navbar />
    </header>
  );
};
