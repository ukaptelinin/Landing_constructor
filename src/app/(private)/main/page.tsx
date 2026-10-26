"use client";

import Link from "next/link";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { buttonVariants } from "@heroui/react";

export default function MainPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 text-center">
      {/* Заголовок с иконкой */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <WrenchScrewdriverIcon className="h-16 w-16 text-primary animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Конструктор квиз-опросов
        </h1>
        {/* Стильная строка QUIZ CONSTRUCTOR */}
        <span className="mt-2 block text-2xl md:text-3xl font-black tracking-widest text-primary uppercase font-mono bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          QUIZ CONSTRUCTOR
        </span>
      </div>

      {/* Короткий рекламный текст */}
      <p className="max-w-xl text-lg text-default-600 mb-8">
        Создавайте увлекательные квизы и опросы за считанные минуты. Просто,
        быстро и эффективно.
      </p>

      {/* Призыв к действию */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-default-500">
          Готовы начать? Перейдите в раздел{" "}
          <Link
            href="/new_project"
            className="text-primary underline hover:text-primary-600 transition-colors font-medium"
          >
            «Новый проект»
          </Link>{" "}
          и создайте свой первый квиз!
        </p>
        <Link
          href="/new_project"
          className={buttonVariants({ variant: "primary", size: "lg" })}
        >
          Создать квиз
        </Link>
      </div>
    </div>
  );
}
