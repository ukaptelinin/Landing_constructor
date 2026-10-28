"use client";

import { useState } from "react";
import { Button, Input, Label, TextField } from "@heroui/react";

/*const QUIZ_TYPES = [
  { id: "checkboxes", label: "Чекбоксы" },
  { id: "radio", label: "Радио кнопки" },
  { id: "text", label: "Текстовые поля" },
  { id: "final", label: "Финальная страница" },
] as const; */

export default function NewProjectPage() {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Обработка отправки формы
    console.log(projectName);
  };

  return (
    <div className="relative min-h-screen p-6">
      <div className="absolute top-1/6 left-1/2 flex w-full max-w-lg -translate-x-1/2 flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">
          Создание нового проекта
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Название проекта */}
          <TextField fullWidth className="pb-6">
            <Label className="w-full text-center">Название проекта</Label>
            <Input
              placeholder="Введите название проекта"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </TextField>

          {/* Тип страницы квиза 
        <div className="flex flex-col gap-2">
          <Label>Тип страницы квиза</Label>
          <ToggleButtonGroup
            selectionMode="multiple"
            selectedKeys={selectedType}
            onSelectionChange={setSelectedType}
            fullWidth
            isDetached
          >
            {QUIZ_TYPES.map((type) => (
              <ToggleButton key={type.id} id={type.id}>
                {type.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>*/}

          {/* Submit */}
          <Button type="submit" fullWidth>
            Создать проект
          </Button>
        </form>
      </div>
    </div>
  );
}
