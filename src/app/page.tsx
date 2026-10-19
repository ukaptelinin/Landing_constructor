"use client";

import { useAppActions } from "@/app/model/store/app-store";
import { Button } from "@heroui/react";
import { FC } from "react";

export default function LandingPage() {
  const { openLogin, openRegister } = useAppActions();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] gap-4">
      <h1 className="text-4xl font-bold">QUIZ CONSTRUCTOR</h1>
      <p className="text-default-600">Создавайте квизы за минуты</p>
      <div className="flex gap-3">
        <Button onPress={openLogin} variant="primary">
          Войти
        </Button>
        <Button onPress={openRegister} variant="secondary">
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
}
