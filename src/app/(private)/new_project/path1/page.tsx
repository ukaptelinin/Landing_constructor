"use client";

import { useState } from "react";
import { Button, ButtonGroup, Input, Label, TextField } from "@heroui/react";
import {
  useQuizActions,
  useQuizProject,
} from "@/features/new-project/model/store";
import { PageType } from "@/shared/types/quiz-types";

const QUIZ_TYPES = [
  { id: "CHECKBOX", label: "Чекбоксы" },
  { id: "RADIO", label: "Радио кнопки" },
  { id: "TEXT", label: "Текстовые поля" },
  { id: "SUBMIT", label: "Финальная страница" },
] as const;

export default function NewQuizPage() {
  const [quizPageName, setQuizPageName] = useState("");
  const [quizPageType, setQuizPageType] = useState<PageType>("CHECKBOX");
  const { createQuizPage } = useQuizActions();
//  const quizProject = useQuizProject();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createQuizPage(quizPageName, quizPageType);
  };

  return (
    <div className="relative min-h-screen p-6">
      <div className="absolute top-1/6 left-1/2 flex w-full max-w-lg -translate-x-1/2 flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">
          Создание новой страницы квиза
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Название проекта */}
          <TextField fullWidth className="pb-6">
            <Label className="w-full text-center">Название страницы</Label>
            <Input
              placeholder="Введите название страницы"
              value={quizPageName}
              onChange={(e) => setQuizPageName(e.target.value)}
              required
            />
          </TextField>
          <ButtonGroup>
            {QUIZ_TYPES.map((button) => {
              const isSelected = quizPageType === button.id;
              return (
                <Button
                  key={button.id}
                  id={button.id}
                  type="button"
                  variant={isSelected ? "primary" : "outline"}
                  aria-pressed={isSelected}
                  onPress={() => setQuizPageType(button.id)}
                >
                  {button.label}
                </Button>
              );
            })}
          </ButtonGroup>
          <Button type="submit" fullWidth>
            Создать страницу
          </Button>
        </form>
      </div>
    </div>
  );
}
