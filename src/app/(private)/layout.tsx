// src/app/(private)/layout.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIsLogin } from "@/app/model/store/app-store";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLogin = useIsLogin();
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.replace("/");
    }
  }, [isLogin, router]);

  if (!isLogin) return null;

  return <>{children}</>;
}
