// src/app/(private)/layout.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Редирект только когда сессия точно не найдена
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  // Пока сессия загружается — показываем заглушку (или null)
  if (status === "loading") {
    return null; // можно заменить на <Spinner /> или скелетон
  }

  // Если не авторизован — редирект уже в процессе, ничего не рендерим
  if (status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
}
